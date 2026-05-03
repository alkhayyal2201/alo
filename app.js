const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const YEAR = 2026;

const calendarEvents = [
  { month: 1,  label: '18th Ramadan', startDate: '2026-02-18', endDate: '2026-02-18' },
  { month: 2,  label: '20th Eid Al-Fitr', startDate: '2026-03-20', endDate: '2026-03-20' },
  { month: 3,  label: 'Sale', startDate: '2026-04-01', endDate: '2026-04-30' },
  { month: 4,  label: '26th Eid Al-Adha', startDate: '2026-05-26', endDate: '2026-05-26' },
  { month: 10, label: '27th Black Friday', startDate: '2026-11-27', endDate: '2026-11-27' },
];

const blockouts = [
  { month: 2,  label: '13 Mar - 27 Mar', startDate: '2026-03-13', endDate: '2026-03-27' },
  { month: 3,  label: 'End of April', startDate: '2026-04-21', endDate: '2026-04-30' },
  { month: 4,  label: '19 May - 30 May', startDate: '2026-05-19', endDate: '2026-05-30' },
  { month: 5,  label: '01 Jun - 4 Jun', startDate: '2026-06-01', endDate: '2026-06-04' },
  { month: 10, label: '20 Nov - 30 Nov', startDate: '2026-11-20', endDate: '2026-11-30' },
];

const SEED_EMPLOYEES = [
  { name: 'Amen', leaves: [] },
  { name: 'Ousama', leaves: [
    { month: 5, status: 'pending', dates: '20 - 30 Jun', days: 11, startDate: '2026-06-20', endDate: '2026-06-30' },
    { month: 6, status: 'pending', dates: '1 - 24 Jul',  days: 24, startDate: '2026-07-01', endDate: '2026-07-24' },
  ]},
  { name: 'Ali', leaves: [] },
  { name: 'Hardeep', leaves: [
    { month: 9, status: 'pending', dates: '1 - 31 Oct', days: 31, startDate: '2026-10-01', endDate: '2026-10-31' },
  ]},
  { name: 'Ariel', leaves: [
    { month: 5, status: 'pending', dates: '30 Jun',     days: 1,  startDate: '2026-06-30', endDate: '2026-06-30' },
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31, startDate: '2026-07-01', endDate: '2026-07-31' },
  ]},
  { name: 'Jojo', leaves: [] },
  { name: 'Maryam', leaves: [
    { month: 1,  status: 'approved', dates: '6 - 15 Feb',  days: 10, startDate: '2026-02-06', endDate: '2026-02-15' },
    { month: 6,  status: 'pending',  dates: '5 - 8 Jul',   days: 4,  startDate: '2026-07-05', endDate: '2026-07-08' },
    { month: 9,  status: 'pending',  dates: '29 - 31 Oct', days: 3,  startDate: '2026-10-29', endDate: '2026-10-31' },
    { month: 10, status: 'pending',  dates: '1 - 5 Nov',   days: 5,  startDate: '2026-11-01', endDate: '2026-11-05' },
  ]},
  { name: 'Brenda', leaves: [
    { month: 0,  status: 'approved', dates: '23 - 24 Jan', days: 2,  startDate: '2026-01-23', endDate: '2026-01-24' },
    { month: 4,  status: 'pending',  dates: '1 - 14 May',  days: 14, startDate: '2026-05-01', endDate: '2026-05-14' },
    { month: 8,  status: 'pending',  dates: '15 - 28 Sep', days: 14, startDate: '2026-09-15', endDate: '2026-09-28' },
    { month: 11, status: 'pending',  dates: '1 - 28 Dec',  days: 28, startDate: '2026-12-01', endDate: '2026-12-28' },
  ]},
  { name: 'Rhea', leaves: [
    { month: 4, status: 'pending', dates: '8 - 18 May',  days: 11, startDate: '2026-05-08', endDate: '2026-05-18' },
    { month: 7, status: 'pending', dates: '15 - 30 Aug', days: 16, startDate: '2026-08-15', endDate: '2026-08-30' },
  ]},
  { name: 'Najwa', leaves: [] },
  { name: 'Roaa', leaves: [
    { month: 0, status: 'approved', dates: '26 - 31 Jan', days: 6, startDate: '2026-01-26', endDate: '2026-01-31' },
    { month: 1, status: 'approved', dates: '1 - 4 Feb',   days: 4, startDate: '2026-02-01', endDate: '2026-02-04' },
  ]},
  { name: 'Mochi', leaves: [
    { month: 0, status: 'approved', dates: '24 - 31 Jan', days: 8,  startDate: '2026-01-24', endDate: '2026-01-31' },
    { month: 1, status: 'approved', dates: '1 - 4 Feb',   days: 4,  startDate: '2026-02-01', endDate: '2026-02-04' },
    { month: 2, status: 'approved', dates: '29 - 31 Mar', days: 3,  startDate: '2026-03-29', endDate: '2026-03-31' },
    { month: 3, status: 'approved', dates: '1 - 11 Apr',  days: 11, startDate: '2026-04-01', endDate: '2026-04-11' },
    { month: 9, status: 'pending',  dates: '1 - 15 Oct',  days: 15, startDate: '2026-10-01', endDate: '2026-10-15' },
  ]},
  { name: 'Arth', leaves: [
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31, startDate: '2026-07-01', endDate: '2026-07-31' },
  ]},
  { name: 'Isa', leaves: [
    { month: 5,  status: 'pending', dates: '18 - 29 Jun', days: 12, startDate: '2026-06-18', endDate: '2026-06-29' },
    { month: 11, status: 'pending', dates: '12 - 31 Dec', days: 20, startDate: '2026-12-12', endDate: '2026-12-31' },
  ]},
];

const LOCAL_KEY = 'alo_leave_store';
const API_URL = '/api/leaves';

let store = { employees: [] };
let currentUser = null;
let activeTab = 'calendar';
let calMonth = new Date().getMonth();
let dayModalDate = null;

function isManager() { return currentUser !== null; }

// ============================================================
// API layer
// ============================================================
async function apiGet() {
  try {
    const r = await fetch(API_URL, { credentials: 'same-origin' });
    if (r.ok) return await r.json();
  } catch (_) {}
  return null;
}

async function apiPost(payload) {
  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (r.ok) return await r.json();
  } catch (_) {}
  return null;
}

// ============================================================
// Persistence
// ============================================================
function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveLocal() {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(store));
}

async function loadData() {
  const remote = await apiGet();
  if (remote && remote.employees) {
    store = remote;
    saveLocal();
    return;
  }
  const local = loadLocal();
  if (local && local.employees) {
    store = local;
    return;
  }
  store = { employees: JSON.parse(JSON.stringify(SEED_EMPLOYEES)) };
  saveLocal();
}

async function mutate(action, extra) {
  const payload = { action, ...extra };
  const remote = await apiPost(payload);
  if (remote && remote.employees) {
    store = { employees: remote.employees };
    saveLocal();
    return true;
  }
  applyLocalMutation(action, extra);
  saveLocal();
  return true;
}

function applyLocalMutation(action, extra) {
  switch (action) {
    case 'submit': {
      const emp = store.employees.find(e => e.name === extra.employee);
      if (emp) emp.leaves.push(extra.leave);
      break;
    }
    case 'approve': {
      const emp = store.employees.find(e => e.name === extra.employee);
      if (emp && emp.leaves[extra.index]) {
        emp.leaves[extra.index].status = 'approved';
        emp.leaves[extra.index].approvedBy = currentUser;
        emp.leaves[extra.index].approvedAt = new Date().toISOString();
      }
      break;
    }
    case 'reject': {
      const emp = store.employees.find(e => e.name === extra.employee);
      if (emp && emp.leaves[extra.index]) {
        emp.leaves[extra.index].status = 'rejected';
        emp.leaves[extra.index].rejectedBy = currentUser;
        emp.leaves[extra.index].rejectedAt = new Date().toISOString();
      }
      break;
    }
    case 'cancel': {
      const emp = store.employees.find(e => e.name === extra.employee);
      if (emp) emp.leaves.splice(extra.index, 1);
      break;
    }
    case 'reset': {
      store = { employees: JSON.parse(JSON.stringify(SEED_EMPLOYEES)) };
      break;
    }
  }
}

// ============================================================
// Helpers
// ============================================================
function getLeavesForDay(y, m, d) {
  const target = new Date(y, m, d);
  const results = [];
  store.employees.forEach(emp => {
    emp.leaves.forEach(leave => {
      if (!leave.startDate || !leave.endDate) return;
      const s = new Date(leave.startDate + 'T00:00:00');
      const e = new Date(leave.endDate + 'T00:00:00');
      if (target >= s && target <= e) {
        results.push({ ...leave, empName: emp.name });
      }
    });
  });
  return results;
}

function getEventsForDay(y, m, d) {
  const target = new Date(y, m, d);
  return calendarEvents.filter(ev => {
    if (!ev.startDate || !ev.endDate) return false;
    const s = new Date(ev.startDate + 'T00:00:00');
    const e = new Date(ev.endDate + 'T00:00:00');
    return target >= s && target <= e;
  });
}

function getBlockoutsForDay(y, m, d) {
  const target = new Date(y, m, d);
  return blockouts.filter(b => {
    if (!b.startDate || !b.endDate) return false;
    const s = new Date(b.startDate + 'T00:00:00');
    const e = new Date(b.endDate + 'T00:00:00');
    return target >= s && target <= e;
  });
}

function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// ============================================================
// UI state
// ============================================================
function updateAuthUI() {
  const viewerEl = document.getElementById('auth-viewer');
  const userEl = document.getElementById('auth-user');
  const roleEl = document.getElementById('user-role');
  const loginBtn = document.getElementById('manager-login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const tabMyLeaves = document.getElementById('tab-my-leaves-btn');
  const tabApprovals = document.getElementById('tab-approvals-btn');

  if (isManager()) {
    if (viewerEl) viewerEl.classList.add('hidden');
    if (userEl) userEl.classList.remove('hidden');
    if (roleEl) roleEl.classList.remove('hidden');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    if (tabMyLeaves) tabMyLeaves.classList.remove('hidden');
    if (tabApprovals) tabApprovals.classList.remove('hidden');
  } else {
    if (viewerEl) viewerEl.classList.remove('hidden');
    if (userEl) userEl.classList.add('hidden');
    if (roleEl) roleEl.classList.add('hidden');
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (tabMyLeaves) tabMyLeaves.classList.add('hidden');
    if (tabApprovals) tabApprovals.classList.add('hidden');
    if (activeTab !== 'calendar') switchTab('calendar');
  }
}

// ============================================================
// KPIs
// ============================================================
function updateKPIs() {
  const counts = { pending: 0, approved: 0, rejected: 0 };
  store.employees.forEach(e => e.leaves.forEach(l => {
    counts[l.status] = (counts[l.status] || 0) + 1;
  }));
  const pv = document.querySelector('[data-kpi-value="pending"]');
  const av = document.querySelector('[data-kpi-value="approved"]');
  const rv = document.querySelector('[data-kpi-value="rejected"]');
  if (pv) pv.textContent = counts.pending;
  if (av) av.textContent = counts.approved;
  if (rv) rv.textContent = counts.rejected;
  const pb = document.querySelector('[data-kpi="pending"]');
  const ab = document.querySelector('[data-kpi="approved"]');
  if (pb) pb.textContent = counts.pending;
  if (ab) ab.textContent = counts.approved;

  const badge = document.getElementById('approval-badge');
  if (badge) {
    if (isManager() && counts.pending > 0) {
      badge.textContent = counts.pending;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// ============================================================
// Calendar tab
// ============================================================
function renderCalendar() {
  const grid = document.getElementById('cal-grid');
  const label = document.getElementById('cal-month-label');
  if (!grid || !label) return;

  label.textContent = `${MONTHS[calMonth]} ${YEAR}`;

  const daysInMonth = new Date(YEAR, calMonth + 1, 0).getDate();
  const firstDow = new Date(YEAR, calMonth, 1).getDay();
  const today = new Date();
  const isThisMonth = today.getFullYear() === YEAR && today.getMonth() === calMonth;
  const prevMonthDays = new Date(YEAR, calMonth, 0).getDate();
  const maxShow = 3;

  let html = '';

  for (let i = 0; i < firstDow; i++) {
    const d = prevMonthDays - firstDow + 1 + i;
    html += `<div class="cal-cell cal-outside"><span class="cal-day-num">${d}</span></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (firstDow + d - 1) % 7;
    const isWeekend = dow === 5 || dow === 6;
    const isToday = isThisMonth && today.getDate() === d;
    const leaves = getLeavesForDay(YEAR, calMonth, d);
    const evts = getEventsForDay(YEAR, calMonth, d);
    const blks = getBlockoutsForDay(YEAR, calMonth, d);
    const hasContent = leaves.length + evts.length + blks.length > 0;

    let cls = 'cal-cell';
    if (isToday) cls += ' cal-today';
    if (isWeekend) cls += ' cal-weekend';
    if (hasContent) cls += ' cal-has-leaves';

    html += `<div class="${cls}" data-day="${d}">`;
    html += `<span class="cal-day-num">${d}</span>`;

    let shown = 0;
    for (const ev of evts) {
      if (shown >= maxShow) break;
      html += `<div class="cal-leave cal-event">${ev.label}</div>`;
      shown++;
    }
    for (const b of blks) {
      if (shown >= maxShow) break;
      html += `<div class="cal-leave cal-blockout">${b.label}</div>`;
      shown++;
    }
    for (const l of leaves) {
      if (shown >= maxShow) break;
      html += `<div class="cal-leave cal-${l.status}">${l.empName}</div>`;
      shown++;
    }
    const total = leaves.length + evts.length + blks.length;
    if (total > maxShow) {
      html += `<div class="cal-more">+${total - maxShow} more</div>`;
    }

    html += '</div>';
  }

  const totalCells = firstDow + daysInMonth;
  const trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= trailing; i++) {
    html += `<div class="cal-cell cal-outside"><span class="cal-day-num">${i}</span></div>`;
  }

  grid.innerHTML = html;

  grid.querySelectorAll('.cal-cell:not(.cal-outside)').forEach(cell => {
    cell.addEventListener('click', () => {
      const day = parseInt(cell.dataset.day);
      if (!isNaN(day)) openDayDetail(day);
    });
  });
}

function openDayDetail(day) {
  dayModalDate = day;
  const el = document.getElementById('day-modal');
  const title = document.getElementById('day-modal-title');
  const body = document.getElementById('day-modal-body');
  const reqBtn = document.getElementById('day-modal-request');

  title.textContent = `${MONTHS_SHORT[calMonth]} ${day}, ${YEAR}`;

  const leaves = getLeavesForDay(YEAR, calMonth, day);
  const evts = getEventsForDay(YEAR, calMonth, day);
  const blks = getBlockoutsForDay(YEAR, calMonth, day);

  let html = '';

  evts.forEach(ev => {
    html += `<div class="day-detail-entry dde-event">
      <div class="dde-avatar">\u2605</div>
      <div class="dde-info"><div class="dde-name">${ev.label}</div><div class="dde-status">Event</div></div>
    </div>`;
  });

  blks.forEach(b => {
    html += `<div class="day-detail-entry dde-blockout">
      <div class="dde-avatar">\u2298</div>
      <div class="dde-info"><div class="dde-name">${b.label}</div><div class="dde-status">Blockout Period</div></div>
    </div>`;
  });

  if (leaves.length === 0 && evts.length === 0 && blks.length === 0) {
    html = '<p style="color:var(--gray-500);text-align:center;padding:16px 0;">No leaves or events.</p>';
  }

  leaves.sort((a, b) => {
    const order = { pending: 0, approved: 1, rejected: 2 };
    return (order[a.status] || 0) - (order[b.status] || 0);
  });
  leaves.forEach(l => {
    const statusLabel = l.status[0].toUpperCase() + l.status.slice(1);
    html += `<div class="day-detail-entry dde-${l.status}">
      <div class="dde-avatar">${l.empName[0]}</div>
      <div class="dde-info">
        <div class="dde-name">${l.empName}</div>
        <div class="dde-status">${statusLabel} &middot; ${l.dates} (${l.days}d)</div>
      </div>
    </div>`;
  });

  body.innerHTML = html;

  if (reqBtn) {
    if (isManager()) reqBtn.classList.remove('hidden');
    else reqBtn.classList.add('hidden');
  }

  el.classList.remove('hidden');
}

document.getElementById('day-modal-close').addEventListener('click', () => {
  document.getElementById('day-modal').classList.add('hidden');
});

document.getElementById('day-modal-request').addEventListener('click', () => {
  document.getElementById('day-modal').classList.add('hidden');
  if (dayModalDate) {
    const d = isoDate(YEAR, calMonth, dayModalDate);
    openLeaveModal(calMonth, d);
  }
});

document.getElementById('cal-prev').addEventListener('click', () => {
  calMonth = calMonth === 0 ? 11 : calMonth - 1;
  renderCalendar();
});
document.getElementById('cal-next').addEventListener('click', () => {
  calMonth = calMonth === 11 ? 0 : calMonth + 1;
  renderCalendar();
});
document.getElementById('cal-today-btn').addEventListener('click', () => {
  calMonth = new Date().getMonth();
  renderCalendar();
});

// ============================================================
// My Leaves tab
// ============================================================
function renderMyLeaves() {
  const el = document.getElementById('my-leaves-list');
  if (!el || !currentUser) return;
  const me = store.employees.find(e => e.name === currentUser);
  if (!me || !me.leaves.length) {
    el.innerHTML = '<div class="empty-state"><p>No leave requests for your account.</p><p class="empty-sub">Use the Calendar tab to submit a new request.</p></div>';
    return;
  }
  el.innerHTML = me.leaves
    .slice()
    .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))
    .map((l) => {
      const origI = me.leaves.indexOf(l);
      return `<div class="leave-card card-${l.status}">
        <div class="leave-card-row">
          <span class="leave-card-month">${MONTHS[l.month]} 2026</span>
          <span class="chip-inline chip-${l.status}">${l.status[0].toUpperCase() + l.status.slice(1)}</span>
        </div>
        <div class="leave-card-dates">${l.dates} &middot; ${l.days} day${l.days !== 1 ? 's' : ''}</div>
        ${l.notes ? `<div class="leave-card-notes">${l.notes}</div>` : ''}
        ${l.status === 'pending' ? `<button class="btn-sm btn-danger cancel-leave" data-emp="${me.name}" data-idx="${origI}" style="margin-top:10px;">Cancel Request</button>` : ''}
      </div>`;
    }).join('');

  el.querySelectorAll('.cancel-leave').forEach(btn => {
    btn.addEventListener('click', async () => {
      await mutate('cancel', { employee: btn.dataset.emp, index: parseInt(btn.dataset.idx, 10) });
      render();
    });
  });
}

// ============================================================
// Approvals tab
// ============================================================
function renderApprovals() {
  const el = document.getElementById('approvals-list');
  if (!el || !isManager()) return;

  const pending = [];
  store.employees.forEach(emp => {
    emp.leaves.forEach((l, i) => {
      if (l.status === 'pending') pending.push({ emp, leave: l, idx: i });
    });
  });
  if (!pending.length) {
    el.innerHTML = '<div class="empty-state"><p>All caught up! No pending requests.</p></div>';
    return;
  }
  el.innerHTML =
    `<div class="approval-count">${pending.length} pending request${pending.length !== 1 ? 's' : ''}</div>` +
    pending.map(r =>
      `<div class="approval-card">
        <div class="approval-header">
          <div class="approval-emp">
            <div class="approval-avatar">${r.emp.name[0]}</div>
            <div><strong>${r.emp.name}</strong><br><span class="approval-month">${MONTHS[r.leave.month]} 2026</span></div>
          </div>
        </div>
        <div class="approval-body">${r.leave.dates} &middot; ${r.leave.days} day${r.leave.days !== 1 ? 's' : ''}</div>
        ${r.leave.notes ? `<div class="approval-notes">\u201C${r.leave.notes}\u201D</div>` : ''}
        <div class="approval-actions">
          <button class="btn-sm btn-approve approve-btn" data-emp="${r.emp.name}" data-idx="${r.idx}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Approve
          </button>
          <button class="btn-sm btn-reject reject-btn" data-emp="${r.emp.name}" data-idx="${r.idx}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Reject
          </button>
        </div>
      </div>`
    ).join('');

  el.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await mutate('approve', {
        employee: btn.dataset.emp,
        index: parseInt(btn.dataset.idx, 10),
      });
      render();
    });
  });
  el.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await mutate('reject', {
        employee: btn.dataset.emp,
        index: parseInt(btn.dataset.idx, 10),
      });
      render();
    });
  });
}

// ============================================================
// Tabs
// ============================================================
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('hidden', s.id !== `tab-${tab}`));

  if (tab === 'calendar') renderCalendar();
  else if (tab === 'my-leaves') renderMyLeaves();
  else if (tab === 'approvals') renderApprovals();
}

document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => switchTab(t.dataset.tab));
});

// ============================================================
// Leave request modal
// ============================================================
let modalMonth = null;

function populateEmployeeSelect() {
  const sel = document.getElementById('leave-employee');
  if (!sel) return;
  sel.innerHTML = store.employees.map(e => `<option value="${e.name}">${e.name}</option>`).join('');
  if (currentUser) sel.value = currentUser;
}

function openLeaveModal(month, prefillStart) {
  modalMonth = month;
  document.getElementById('leave-modal-month').textContent = `For ${MONTHS[month]} ${YEAR}`;
  populateEmployeeSelect();
  if (prefillStart) document.getElementById('leave-start').value = prefillStart;
  else document.getElementById('leave-start').value = isoDate(YEAR, month, 1);
  document.getElementById('leave-end').value = '';
  document.getElementById('leave-notes').value = '';
  document.getElementById('leave-modal').classList.remove('hidden');
}

function closeLeaveModal() {
  document.getElementById('leave-modal').classList.add('hidden');
}

document.getElementById('leave-cancel').addEventListener('click', closeLeaveModal);

document.getElementById('leave-submit').addEventListener('click', async () => {
  const empName = document.getElementById('leave-employee').value;
  const start = document.getElementById('leave-start').value;
  const end   = document.getElementById('leave-end').value;
  const notes = document.getElementById('leave-notes').value;
  if (!start || !end) { alert('Please pick start and end dates.'); return; }
  const startD = new Date(start + 'T00:00:00');
  const endD   = new Date(end + 'T00:00:00');
  if (endD < startD) { alert('End date must be on or after start date.'); return; }
  const days = Math.round((endD - startD) / 86400000) + 1;
  const fmt  = d => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
  const dates = startD.getTime() === endD.getTime() ? fmt(startD) : `${fmt(startD)} - ${fmt(endD)}`;
  const leaveObj = {
    month: modalMonth,
    status: 'pending',
    dates,
    days,
    startDate: start,
    endDate: end,
    notes: notes || undefined,
  };
  await mutate('submit', { employee: empName, leave: leaveObj });
  closeLeaveModal();
  render();
});

// ============================================================
// Render orchestrator
// ============================================================
function render() {
  updateAuthUI();
  updateKPIs();
  if (activeTab === 'calendar') renderCalendar();
  else if (activeTab === 'my-leaves') renderMyLeaves();
  else if (activeTab === 'approvals') renderApprovals();
}

// ============================================================
// Auth (Netlify Identity — voluntary manager sign-in)
// ============================================================
function onSignIn(user) {
  const display = (user.user_metadata && user.user_metadata.full_name) || user.email.split('@')[0];
  const firstName = display.split(' ')[0];
  const match = store.employees.find(e => e.name.toLowerCase() === firstName.toLowerCase());
  currentUser = match ? match.name : firstName;
  document.getElementById('user-name').textContent = currentUser;
  render();
}

function onSignOut() {
  currentUser = null;
  render();
}

function wireIdentity() {
  if (!window.netlifyIdentity) return false;

  window.netlifyIdentity.on('init', user => {
    if (user) onSignIn(user);
  });
  window.netlifyIdentity.on('login', user => {
    onSignIn(user);
    window.netlifyIdentity.close();
  });
  window.netlifyIdentity.on('logout', () => onSignOut());

  const current = window.netlifyIdentity.currentUser();
  if (current) { onSignIn(current); return true; }
  return true;
}

document.getElementById('manager-login-btn').addEventListener('click', () => {
  if (window.netlifyIdentity) window.netlifyIdentity.open('login');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  if (window.netlifyIdentity) window.netlifyIdentity.logout();
  else onSignOut();
});

// ============================================================
// Init — app visible immediately, no auth gate
// ============================================================
(async () => {
  await loadData();

  if (!wireIdentity()) {
    let tries = 0;
    const id = setInterval(() => {
      if (wireIdentity() || ++tries > 20) clearInterval(id);
    }, 100);
  }

  render();
})();
