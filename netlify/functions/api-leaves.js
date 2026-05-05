import { getStore } from '@netlify/blobs';

const BLOB_STORE = 'leave-data';
const KEY = 'employees';

const SEED = [
  { name: 'Amen', leaves: [] },
  { name: 'Ousama', leaves: [
    { month: 5, status: 'pending', dates: '20 - 30 Jun', days: 11, startDate: '2026-06-20', endDate: '2026-06-30', approvalLog: [] },
    { month: 6, status: 'pending', dates: '1 - 24 Jul',  days: 24, startDate: '2026-07-01', endDate: '2026-07-24', approvalLog: [] },
  ]},
  { name: 'Ali', leaves: [] },
  { name: 'Hardeep', leaves: [
    { month: 9, status: 'pending', dates: '1 - 31 Oct', days: 31, startDate: '2026-10-01', endDate: '2026-10-31', approvalLog: [] },
  ]},
  { name: 'Ariel', leaves: [
    { month: 5, status: 'pending', dates: '30 Jun',     days: 1,  startDate: '2026-06-30', endDate: '2026-06-30', approvalLog: [] },
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31, startDate: '2026-07-01', endDate: '2026-07-31', approvalLog: [] },
  ]},
  { name: 'Jojo', leaves: [] },
  { name: 'Maryam', leaves: [
    { month: 1,  status: 'pending', dates: '6 - 15 Feb',  days: 10, startDate: '2026-02-06', endDate: '2026-02-15', approvalLog: [] },
    { month: 6,  status: 'pending', dates: '5 - 8 Jul',   days: 4,  startDate: '2026-07-05', endDate: '2026-07-08', approvalLog: [] },
    { month: 9,  status: 'pending', dates: '29 - 31 Oct', days: 3,  startDate: '2026-10-29', endDate: '2026-10-31', approvalLog: [] },
    { month: 10, status: 'pending', dates: '1 - 5 Nov',   days: 5,  startDate: '2026-11-01', endDate: '2026-11-05', approvalLog: [] },
  ]},
  { name: 'Brenda', leaves: [
    { month: 0,  status: 'pending', dates: '23 - 24 Jan', days: 2,  startDate: '2026-01-23', endDate: '2026-01-24', approvalLog: [] },
    { month: 4,  status: 'pending', dates: '1 - 14 May',  days: 14, startDate: '2026-05-01', endDate: '2026-05-14', approvalLog: [] },
    { month: 8,  status: 'pending', dates: '15 - 28 Sep', days: 14, startDate: '2026-09-15', endDate: '2026-09-28', approvalLog: [] },
    { month: 11, status: 'pending', dates: '1 - 28 Dec',  days: 28, startDate: '2026-12-01', endDate: '2026-12-28', approvalLog: [] },
  ]},
  { name: 'Rhea', leaves: [
    { month: 4, status: 'pending', dates: '8 - 18 May',  days: 11, startDate: '2026-05-08', endDate: '2026-05-18', approvalLog: [] },
    { month: 7, status: 'pending', dates: '15 - 30 Aug', days: 16, startDate: '2026-08-15', endDate: '2026-08-30', approvalLog: [] },
  ]},
  { name: 'Najwa', leaves: [] },
  { name: 'Roaa', leaves: [
    { month: 0, status: 'pending', dates: '26 - 31 Jan', days: 6, startDate: '2026-01-26', endDate: '2026-01-31', approvalLog: [] },
    { month: 1, status: 'pending', dates: '1 - 4 Feb',   days: 4, startDate: '2026-02-01', endDate: '2026-02-04', approvalLog: [] },
  ]},
  { name: 'Mochi', leaves: [
    { month: 0, status: 'pending', dates: '24 - 31 Jan', days: 8,  startDate: '2026-01-24', endDate: '2026-01-31', approvalLog: [] },
    { month: 1, status: 'pending', dates: '1 - 4 Feb',   days: 4,  startDate: '2026-02-01', endDate: '2026-02-04', approvalLog: [] },
    { month: 2, status: 'pending', dates: '29 - 31 Mar', days: 3,  startDate: '2026-03-29', endDate: '2026-03-31', approvalLog: [] },
    { month: 3, status: 'pending', dates: '1 - 11 Apr',  days: 11, startDate: '2026-04-01', endDate: '2026-04-11', approvalLog: [] },
    { month: 9, status: 'pending', dates: '1 - 15 Oct',  days: 15, startDate: '2026-10-01', endDate: '2026-10-15', approvalLog: [] },
  ]},
  { name: 'Arth', leaves: [
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31, startDate: '2026-07-01', endDate: '2026-07-31', approvalLog: [] },
  ]},
  { name: 'Isa', leaves: [
    { month: 5,  status: 'pending', dates: '18 - 29 Jun', days: 12, startDate: '2026-06-18', endDate: '2026-06-29', approvalLog: [] },
    { month: 11, status: 'pending', dates: '12 - 31 Dec', days: 20, startDate: '2026-12-12', endDate: '2026-12-31', approvalLog: [] },
  ]},
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  const store = getStore(BLOB_STORE);

  if (req.method === 'GET') {
    let data = await store.get(KEY, { type: 'json' });
    if (!data) {
      data = JSON.parse(JSON.stringify(SEED));
      await store.setJSON(KEY, data);
    }
    return json({ employees: data, _ts: Date.now() });
  }

  if (req.method === 'POST') {
    let data = await store.get(KEY, { type: 'json' });
    if (!data) data = JSON.parse(JSON.stringify(SEED));

    let body;
    try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    switch (body.action) {
      case 'submit': {
        const emp = data.find(e => e.name === body.employee);
        if (emp) emp.leaves.push(body.leave);
        break;
      }
      case 'approve': {
        const emp = data.find(e => e.name === body.employee);
        if (emp && emp.leaves[body.index]) {
          if (!emp.leaves[body.index].approvalLog) emp.leaves[body.index].approvalLog = [];
          emp.leaves[body.index].approvalLog.push({
            action: 'approved',
            by: body.approver || 'manager',
            at: new Date().toISOString(),
          });
          emp.leaves[body.index].status = 'pending';
        }
        break;
      }
      case 'reject': {
        const emp = data.find(e => e.name === body.employee);
        if (emp && emp.leaves[body.index]) {
          if (!emp.leaves[body.index].approvalLog) emp.leaves[body.index].approvalLog = [];
          emp.leaves[body.index].approvalLog.push({
            action: 'rejected',
            by: body.rejecter || 'manager',
            at: new Date().toISOString(),
          });
          emp.leaves[body.index].status = 'pending';
        }
        break;
      }
      case 'cancel': {
        const emp = data.find(e => e.name === body.employee);
        if (emp) emp.leaves.splice(body.index, 1);
        break;
      }
      case 'reset': {
        data = JSON.parse(JSON.stringify(SEED));
        break;
      }
      default:
        return json({ error: 'Unknown action' }, 400);
    }

    await store.setJSON(KEY, data);
    return json({ ok: true, employees: data, _ts: Date.now() });
  }

  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/leaves' };
