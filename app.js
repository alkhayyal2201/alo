// ============================================================
// Static data — month is 0-indexed (0 = Jan, 11 = Dec)
// ============================================================
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const events = [
  { month: 1,  label: '18 First of Ramadan' },
  { month: 2,  label: '20th Eid Al-Fitr' },
  { month: 3,  label: 'Sale' },
  { month: 4,  label: '26th Eid Al-Adha' },
  { month: 10, label: '27th Black Friday' },
];

const blockouts = [
  { month: 2,  label: '13 Mar - 27 Mar' },
  { month: 3,  label: 'End of April' },
  { month: 4,  label: '19 May - 30 May' },
  { month: 5,  label: '01 Jun - 4 Jun' },
  { month: 10, label: '20 Nov - 30 Nov' },
];

const employees = [
  { name: 'Amen',    leaves: [] },
  { name: 'Ousama',  leaves: [
    { month: 5, status: 'pending', dates: '20 - 30 Jun', days: 11 },
    { month: 6, status: 'pending', dates: '1 - 24 Jul',  days: 24 },
  ]},
  { name: 'Ali',     leaves: [] },
  { name: 'Hardeep', leaves: [
    { month: 9, status: 'pending', dates: '1 - 31 Oct', days: 31 },
  ]},
  { name: 'Ariel',   leaves: [
    { month: 5, status: 'pending', dates: '30 Jun',     days: 1  },
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31 },
  ]},
  { name: 'Jojo',    leaves: [] },
  { name: 'Maryam',  leaves: [
    { month: 1,  status: 'approved', dates: '6 - 15 Feb',  days: 10 },
    { month: 6,  status: 'pending',  dates: '5 - 8 Jul',   days: 4  },
    { month: 9,  status: 'pending',  dates: '29 - 31 Oct', days: 3  },
    { month: 10, status: 'pending',  dates: '1 - 5 Nov',   days: 5  },
  ]},
  { name: 'Brenda',  leaves: [
    { month: 0,  status: 'approved', dates: '23 - 24 Jan', days: 2  },
    { month: 4,  status: 'pending',  dates: '1 - 14 May',  days: 14 },
    { month: 8,  status: 'pending',  dates: '15 - 28 Sep', days: 14 },
    { month: 11, status: 'pending',  dates: '1 - 28 Dec',  days: 28 },
  ]},
  { name: 'Rhea',    leaves: [
    { month: 4, status: 'pending', dates: '8 - 18 May',  days: 11 },
    { month: 7, status: 'pending', dates: '15 - 30 Aug', days: 16 },
  ]},
  { name: 'Najwa',   leaves: [] },
  { name: 'Roaa',    leaves: [
    { month: 0, status: 'approved', dates: '26 - 31 Jan', days: 6 },
    { month: 1, status: 'approved', dates: '1 - 4 Feb',   days: 4 },
  ]},
  { name: 'Mochi',   leaves: [
    { month: 0, status: 'approved', dates: '24 - 31 Jan', days: 8  },
    { month: 1, status: 'approved', dates: '1 - 4 Feb',   days: 4  },
    { month: 2, status: 'approved', dates: '29 - 31 Mar', days: 3  },
    { month: 3, status: 'approved', dates: '1 - 11 Apr',  days: 11 },
    { month: 9, status: 'pending',  dates: '1 - 15 Oct',  days: 15 },
  ]},
  { name: 'Arth',    leaves: [
    { month: 6, status: 'pending', dates: '1 - 31 Jul', days: 31 },
  ]},
  { name: 'Isa',     leaves: [
    { month: 5,  status: 'pending', dates: '18 - 29 Jun', days: 12 },
    { month: 11, status: 'pending', dates: '12 - 31 Dec', days: 20 },
  ]},
];

let currentUser = 'Isa';
let statusFilter = 'all';

// ============================================================
// Render
// ============================================================
function buildEventRow() {
  const cells = ['<td class="col-name">Events</td>'];
  for (let m = 0; m < 12; m++) {
    const ev = events.find(e => e.month === m);
    cells.push(ev ? `<td class="event-cell">${ev.label}</td>` : '<td></td>');
  }
  return `<tr class="row-events">${cells.join('')}</tr>`;
}

function buildBlockoutRow() {
  const cells = ['<td class="col-name">Blockout</td>'];
  for (let m = 0; m < 12; m++) {
    const b = blockouts.find(x => x.month === m);
    cells.push(b ? `<td class="blockout-cell">${b.label}</td>` : '<td></td>');
  }
  return `<tr class="row-blockout">${cells.join('')}</tr>`;
}

function buildEmployeeRow(emp) {
  const cells = [`<td class="col-name">${emp.name}</td>`];
  for (let m = 0; m < 12; m++) {
    const leave = emp.leaves.find(l => l.month === m);
    const passesFilter = leave && (statusFilter === 'all' || leave.status === statusFilter);

    if (passesFilter) {
      const label = leave.status[0].toUpperCase() + leave.status.slice(1);
      cells.push(
        `<td><div class="chip chip-${leave.status}">` +
          `<span class="chip-status">${label}</span>` +
          `<span>${leave.dates} (${leave.days}d)</span>` +
        `</div></td>`
      );
    } else if (emp.name === currentUser && !leave) {
      cells.push(`<td><button class="request-btn" data-month="${m}">+ Request leave</button></td>`);
    } else {
      cells.push('<td></td>');
    }
  }
  return `<tr>${cells.join('')}</tr>`;
}

function render() {
  const tbody = document.getElementById('grid-body');
  tbody.innerHTML =
    buildEventRow() +
    buildBlockoutRow() +
    employees.map(buildEmployeeRow).join('');

  document.querySelectorAll('.request-btn').forEach(btn => {
    btn.addEventListener('click', () => openLeaveModal(parseInt(btn.dataset.month, 10)));
  });

  updateKPIs();
}

function updateKPIs() {
  const counts = { pending: 0, approved: 0, rejected: 0 };
  employees.forEach(e => e.leaves.forEach(l => { counts[l.status] = (counts[l.status] || 0) + 1; }));

  document.querySelector('[data-kpi-value="pending"]').textContent  = counts.pending;
  document.querySelector('[data-kpi-value="approved"]').textContent = counts.approved;
  document.querySelector('[data-kpi-value="rejected"]').textContent = counts.rejected;

  document.querySelector('[data-kpi="pending"]').textContent  = counts.pending;
  document.querySelector('[data-kpi="approved"]').textContent = counts.approved;
}

// ============================================================
// Modal — request a new leave
// ============================================================
let modalMonth = null;

function openLeaveModal(month) {
  modalMonth = month;
  document.getElementById('leave-modal-month').textContent = `For ${MONTHS[month]} 2026`;
  document.getElementById('leave-modal').classList.remove('hidden');
}

function closeLeaveModal() {
  document.getElementById('leave-modal').classList.add('hidden');
  document.getElementById('leave-start').value = '';
  document.getElementById('leave-end').value = '';
  document.getElementById('leave-notes').value = '';
}

document.getElementById('leave-cancel').addEventListener('click', closeLeaveModal);

document.getElementById('leave-submit').addEventListener('click', () => {
  const start = document.getElementById('leave-start').value;
  const end   = document.getElementById('leave-end').value;
  if (!start || !end) {
    alert('Please pick start and end dates.');
    return;
  }
  const startD = new Date(start);
  const endD   = new Date(end);
  if (endD < startD) {
    alert('End date must be after start date.');
    return;
  }
  const days = Math.round((endD - startD) / 86400000) + 1;
  const fmt  = d => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const dates = startD.getTime() === endD.getTime() ? fmt(startD) : `${fmt(startD)} - ${fmt(endD)}`;

  const me = employees.find(e => e.name === currentUser);
  if (me) {
    me.leaves.push({ month: modalMonth, status: 'pending', dates, days });
    render();
  }
  closeLeaveModal();
});

// ============================================================
// Filter + reset
// ============================================================
document.getElementById('status-filter').addEventListener('change', e => {
  statusFilter = e.target.value;
  render();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('status-filter').value = 'all';
  statusFilter = 'all';
  render();
});

// ============================================================
// Netlify Identity
// ============================================================
function showApp(user) {
  document.getElementById('auth-gate').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  const display = (user.user_metadata && user.user_metadata.full_name) || user.email.split('@')[0];
  const firstName = display.split(' ')[0];
  document.getElementById('user-name').textContent = firstName;

  const match = employees.find(e => e.name.toLowerCase() === firstName.toLowerCase());
  currentUser = match ? match.name : 'Isa';
  render();
}

function showAuthGate() {
  document.getElementById('app').classList.add('hidden');
  document.getElementById('auth-gate').classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
      if (user) showApp(user);
      else showAuthGate();
    });
    window.netlifyIdentity.on('login', user => {
      showApp(user);
      window.netlifyIdentity.close();
    });
    window.netlifyIdentity.on('logout', () => showAuthGate());
    window.netlifyIdentity.init();
  } else {
    // Local preview fallback when the widget script isn't loaded
    showApp({ email: 'isa@local', user_metadata: { full_name: 'Isa' } });
  }

  document.getElementById('login-btn').addEventListener('click', () => {
    if (window.netlifyIdentity) window.netlifyIdentity.open('login');
    else alert('Deploy to Netlify and enable Identity for sign-in to work.');
  });
  document.getElementById('signup-btn').addEventListener('click', () => {
    if (window.netlifyIdentity) window.netlifyIdentity.open('signup');
    else alert('Deploy to Netlify and enable Identity for sign-up to work.');
  });
  document.getElementById('logout-btn').addEventListener('click', () => {
    if (window.netlifyIdentity) window.netlifyIdentity.logout();
    else showAuthGate();
  });
});
