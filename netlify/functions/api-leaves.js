import { getStore } from '@netlify/blobs';
import {
  sql,
  ensureSchema,
  fetchEmployeesWithLeaves,
  isEmpty,
  seedFromList,
  SEED_EMPLOYEES,
} from '../lib/db.js';

const LEGACY_BLOB_STORE = 'leave-data';
const LEGACY_BLOB_KEY = 'employees';

let bootstrapPromise = null;

async function bootstrap() {
  if (bootstrapPromise) return bootstrapPromise;
  bootstrapPromise = (async () => {
    await ensureSchema();
    if (!(await isEmpty())) return;

    const legacy = await readLegacyBlob();
    if (legacy && legacy.length) {
      await importLegacy(legacy);
    } else {
      await seedFromList(SEED_EMPLOYEES);
    }
  })();
  return bootstrapPromise;
}

async function readLegacyBlob() {
  try {
    const store = getStore(LEGACY_BLOB_STORE);
    return await store.get(LEGACY_BLOB_KEY, { type: 'json' });
  } catch {
    return null;
  }
}

async function importLegacy(employees) {
  for (const e of employees) {
    const empRows = await sql`
      INSERT INTO employees (name) VALUES (${e.name})
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;
    const empId = empRows[0].id;
    for (const l of (e.leaves || [])) {
      const startDate = l.startDate;
      const endDate = l.endDate;
      if (!startDate || !endDate) continue;
      const decidedBy = l.approvedBy || l.rejectedBy || null;
      const decidedAt = l.approvedAt || l.rejectedAt || null;
      const status = l.status === 'approved' || l.status === 'rejected' ? l.status : 'pending';
      const leaveRows = await sql`
        INSERT INTO leaves (employee_id, start_date, end_date, status, notes, decided_by, decided_at)
        VALUES (${empId}, ${startDate}, ${endDate}, ${status}, ${l.notes || null}, ${decidedBy}, ${decidedAt})
        RETURNING id
      `;
      const leaveId = leaveRows[0].id;
      for (const entry of (l.approvalLog || [])) {
        if (!entry || !entry.action) continue;
        await sql`
          INSERT INTO approval_log (leave_id, action, by_user, at)
          VALUES (${leaveId}, ${entry.action}, ${entry.by || 'manager'}, ${entry.at || new Date().toISOString()})
        `;
      }
    }
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function respondWithEmployees(extra = {}) {
  const employees = await fetchEmployeesWithLeaves();
  return json({ employees, ...extra });
}

async function handleSubmit(body) {
  const { employee, leave } = body;
  if (!employee || !leave || !leave.startDate || !leave.endDate) {
    return json({ error: 'Missing employee or leave dates' }, 400);
  }
  const empRows = await sql`SELECT id FROM employees WHERE name = ${employee} LIMIT 1`;
  if (!empRows.length) return json({ error: 'Unknown employee' }, 404);
  await sql`
    INSERT INTO leaves (employee_id, start_date, end_date, status, notes)
    VALUES (${empRows[0].id}, ${leave.startDate}, ${leave.endDate}, 'pending', ${leave.notes || null})
  `;
  return respondWithEmployees();
}

async function handleDecision(body, decision) {
  const { leaveId, by } = body;
  if (!leaveId) return json({ error: 'Missing leaveId' }, 400);
  const actor = by || 'manager';

  const updated = await sql`
    UPDATE leaves
    SET status = ${decision},
        decided_by = ${actor},
        decided_at = NOW(),
        updated_at = NOW()
    WHERE id = ${leaveId}
    RETURNING id
  `;
  if (!updated.length) return json({ error: 'Leave not found' }, 404);

  await sql`
    INSERT INTO approval_log (leave_id, action, by_user)
    VALUES (${leaveId}, ${decision}, ${actor})
  `;
  return respondWithEmployees();
}

async function handleCancel(body) {
  const { leaveId } = body;
  if (!leaveId) return json({ error: 'Missing leaveId' }, 400);
  const result = await sql`DELETE FROM leaves WHERE id = ${leaveId} RETURNING id`;
  if (!result.length) return json({ error: 'Leave not found' }, 404);
  return respondWithEmployees();
}

async function handleReset() {
  await sql`TRUNCATE approval_log, leaves, employees RESTART IDENTITY CASCADE`;
  await seedFromList(SEED_EMPLOYEES);
  return respondWithEmployees({ reset: true });
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  try {
    await bootstrap();
  } catch (err) {
    return json({ error: 'Database initialization failed', detail: String(err.message || err) }, 500);
  }

  if (req.method === 'GET') {
    try {
      return await respondWithEmployees();
    } catch (err) {
      return json({ error: 'Read failed', detail: String(err.message || err) }, 500);
    }
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    try {
      switch (body.action) {
        case 'submit':  return await handleSubmit(body);
        case 'approve': return await handleDecision(body, 'approved');
        case 'reject':  return await handleDecision(body, 'rejected');
        case 'cancel':  return await handleCancel(body);
        case 'reset':   return await handleReset();
        default:        return json({ error: 'Unknown action' }, 400);
      }
    } catch (err) {
      return json({ error: 'Mutation failed', detail: String(err.message || err) }, 500);
    }
  }

  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/leaves' };
