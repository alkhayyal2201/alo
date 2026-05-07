import { neon } from '@netlify/neon';

export const sql = neon();

export const SEED_EMPLOYEES = [
  { name: 'Amen', leaves: [] },
  { name: 'Ousama', leaves: [
    { startDate: '2026-06-20', endDate: '2026-06-30' },
    { startDate: '2026-07-01', endDate: '2026-07-24' },
  ]},
  { name: 'Ali', leaves: [] },
  { name: 'Hardeep', leaves: [
    { startDate: '2026-10-01', endDate: '2026-10-31' },
  ]},
  { name: 'Ariel', leaves: [
    { startDate: '2026-06-30', endDate: '2026-06-30' },
    { startDate: '2026-07-01', endDate: '2026-07-31' },
  ]},
  { name: 'Jojo', leaves: [] },
  { name: 'Maryam', leaves: [
    { startDate: '2026-02-06', endDate: '2026-02-15' },
    { startDate: '2026-07-05', endDate: '2026-07-08' },
    { startDate: '2026-10-29', endDate: '2026-10-31' },
    { startDate: '2026-11-01', endDate: '2026-11-05' },
  ]},
  { name: 'Brenda', leaves: [
    { startDate: '2026-01-23', endDate: '2026-01-24' },
    { startDate: '2026-05-01', endDate: '2026-05-14' },
    { startDate: '2026-09-15', endDate: '2026-09-28' },
    { startDate: '2026-12-01', endDate: '2026-12-28' },
  ]},
  { name: 'Rhea', leaves: [
    { startDate: '2026-05-08', endDate: '2026-05-18' },
    { startDate: '2026-08-15', endDate: '2026-08-30' },
  ]},
  { name: 'Najwa', leaves: [] },
  { name: 'Roaa', leaves: [
    { startDate: '2026-01-26', endDate: '2026-01-31' },
    { startDate: '2026-02-01', endDate: '2026-02-04' },
  ]},
  { name: 'Mochi', leaves: [
    { startDate: '2026-01-24', endDate: '2026-01-31' },
    { startDate: '2026-02-01', endDate: '2026-02-04' },
    { startDate: '2026-03-29', endDate: '2026-03-31' },
    { startDate: '2026-04-01', endDate: '2026-04-11' },
    { startDate: '2026-10-01', endDate: '2026-10-15' },
  ]},
  { name: 'Arth', leaves: [
    { startDate: '2026-07-01', endDate: '2026-07-31' },
  ]},
  { name: 'Isa', leaves: [
    { startDate: '2026-06-18', endDate: '2026-06-29' },
    { startDate: '2026-12-12', endDate: '2026-12-31' },
  ]},
];

let schemaReady = null;

export async function ensureSchema() {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS leaves (
        id          SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        start_date  DATE NOT NULL,
        end_date    DATE NOT NULL,
        status      TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','approved','rejected')),
        notes       TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        decided_by  TEXT,
        decided_at  TIMESTAMPTZ,
        CHECK (end_date >= start_date)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS leaves_employee_id_idx ON leaves(employee_id)`;
    await sql`CREATE INDEX IF NOT EXISTS leaves_start_idx ON leaves(start_date)`;
    await sql`
      CREATE TABLE IF NOT EXISTS approval_log (
        id       SERIAL PRIMARY KEY,
        leave_id INTEGER NOT NULL REFERENCES leaves(id) ON DELETE CASCADE,
        action   TEXT NOT NULL CHECK (action IN ('approved','rejected')),
        by_user  TEXT NOT NULL,
        at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS approval_log_leave_idx ON approval_log(leave_id)`;
  })();
  return schemaReady;
}

export async function seedFromList(employees) {
  for (const e of employees) {
    const rows = await sql`
      INSERT INTO employees (name) VALUES (${e.name})
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `;
    const empId = rows[0].id;
    for (const l of (e.leaves || [])) {
      await sql`
        INSERT INTO leaves (employee_id, start_date, end_date, status, notes)
        VALUES (${empId}, ${l.startDate}, ${l.endDate}, ${l.status || 'pending'}, ${l.notes || null})
      `;
    }
  }
}

export async function isEmpty() {
  const rows = await sql`SELECT COUNT(*)::int AS n FROM employees`;
  return rows[0].n === 0;
}

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function toIsoDate(d) {
  if (typeof d === 'string') return d.slice(0, 10);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatDates(startIso, endIso) {
  const [sy, sm, sd] = startIso.split('-').map(Number);
  const [ey, em, ed] = endIso.split('-').map(Number);
  if (startIso === endIso) return `${sd} ${MONTHS_SHORT[sm - 1]}`;
  if (sy === ey && sm === em)  return `${sd} - ${ed} ${MONTHS_SHORT[sm - 1]}`;
  return `${sd} ${MONTHS_SHORT[sm - 1]} - ${ed} ${MONTHS_SHORT[em - 1]}`;
}

function dayDiff(startIso, endIso) {
  const s = new Date(startIso + 'T00:00:00Z').getTime();
  const e = new Date(endIso + 'T00:00:00Z').getTime();
  return Math.round((e - s) / 86400000) + 1;
}

export async function fetchEmployeesWithLeaves() {
  const employees = await sql`SELECT id, name FROM employees ORDER BY id`;
  const leaves = await sql`
    SELECT id, employee_id, start_date, end_date, status, notes, decided_by, decided_at
    FROM leaves
    ORDER BY start_date
  `;
  const logs = await sql`
    SELECT leave_id, action, by_user, at
    FROM approval_log
    ORDER BY at
  `;

  const logByLeave = new Map();
  for (const l of logs) {
    const arr = logByLeave.get(l.leave_id) || [];
    arr.push({ action: l.action, by: l.by_user, at: l.at });
    logByLeave.set(l.leave_id, arr);
  }

  const leavesByEmp = new Map();
  for (const l of leaves) {
    const startIso = toIsoDate(l.start_date);
    const endIso = toIsoDate(l.end_date);
    const month = parseInt(startIso.slice(5, 7), 10) - 1;
    const shaped = {
      id: l.id,
      month,
      status: l.status,
      dates: formatDates(startIso, endIso),
      days: dayDiff(startIso, endIso),
      startDate: startIso,
      endDate: endIso,
      notes: l.notes || undefined,
      approvalLog: logByLeave.get(l.id) || [],
    };
    if (l.status === 'approved') {
      shaped.approvedBy = l.decided_by || undefined;
      shaped.approvedAt = l.decided_at || undefined;
    } else if (l.status === 'rejected') {
      shaped.rejectedBy = l.decided_by || undefined;
      shaped.rejectedAt = l.decided_at || undefined;
    }
    const arr = leavesByEmp.get(l.employee_id) || [];
    arr.push(shaped);
    leavesByEmp.set(l.employee_id, arr);
  }

  return employees.map(e => ({
    id: e.id,
    name: e.name,
    leaves: leavesByEmp.get(e.id) || [],
  }));
}
