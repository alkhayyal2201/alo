// ============================================================
// State Management
// ============================================================
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let currentViewDate = new Date(2026, 0, 1); // Starting Jan 2026
let currentUser = null; 
let allLeaves = []; // Starts empty as requested

// Reference names for the dropdown in the modal
const employeeNames = ['Amen', 'Ousama', 'Ali', 'Hardeep', 'Ariel', 'Jojo', 'Maryam', 'Brenda', 'Rhea', 'Najwa', 'Roaa', 'Mochi', 'Arth', 'Isa'];

// ============================================================
// Calendar Logic
// ============================================================
function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  
  document.getElementById('current-month-display').textContent = `${MONTHS[month]} ${year}`;

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create empty slots for previous month days
  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(createDaySquare(null));
  }

  // Create actual days
  for (let d = 1; d <= daysInMonth; d++) {
    grid.appendChild(createDaySquare(d));
  }
  
  updateKPIs();
}

function createDaySquare(day) {
  const div = document.createElement('div');
  div.className = 'calendar-day';
  if (!day) {
    div.classList.add('empty');
    return div;
  }

  div.innerHTML = `<span class="day-num">${day}</span>`;
  
  // Filter leaves for this specific day
  const month = currentViewDate.getMonth();
  const dayLeaves = allLeaves.filter(l => l.day === day && l.month === month);

  dayLeaves.forEach(leave => {
    const chip = document.createElement('div');
    chip.className = `leave-chip chip-${leave.status}`;
    chip.innerHTML = `<strong>${leave.name}</strong>`;
    
    // Manager functionality: click chip to approve/reject
    if (currentUser) {
      chip.title = "Click to Manage Request";
      chip.onclick = (e) => {
        e.stopPropagation();
        manageRequest(leave.id);
      };
    }
    div.appendChild(chip);
  });

  // User functionality: click square to request
  div.onclick = () => openLeaveModal(day);
  return div;
}

// ============================================================
// Actions
// ============================================================
function openLeaveModal(day) {
  const modal = document.getElementById('leave-modal');
  document.getElementById('selected-date-label').textContent = `${day} ${MONTHS[currentViewDate.getMonth()]}`;
  document.getElementById('submit-day').value = day;
  modal.classList.remove('hidden');
}

function submitRequest() {
  const name = document.getElementById('request-name').value;
  const day = parseInt(document.getElementById('submit-day').value);
  
  if (!name) return alert("Please select a name");

  allLeaves.push({
    id: Date.now(),
    name: name,
    day: day,
    month: currentViewDate.getMonth(),
    status: 'pending'
  });

  closeModal();
  renderCalendar();
}

function manageRequest(id) {
  const action = confirm("Approve request? (Cancel for Reject)");
  const leave = allLeaves.find(l => l.id === id);
  if (leave) {
    leave.status = action ? 'approved' : 'rejected';
    renderCalendar();
  }
}

// ============================================================
// Identity & UI Toggles
// ============================================================
function showApp(user) {
  currentUser = user ? user.email : null;
  document.getElementById('manager-info').classList.toggle('hidden', !user);
  document.getElementById('login-btn').classList.toggle('hidden', !!user);
  document.getElementById('logout-btn').classList.toggle('hidden', !user);
  if (user) {
    document.getElementById('user-name').textContent = user.user_metadata?.full_name || "Manager";
  }
  renderCalendar();
}

// Netlify Identity Boilerplate
function initAuth() {
  if (!window.netlifyIdentity) return;
  window.netlifyIdentity.on('login', user => { showApp(user); window.netlifyIdentity.close(); });
  window.netlifyIdentity.on('logout', () => showApp(null));
  const user = window.netlifyIdentity.currentUser();
  if (user) showApp(user);
}

document.getElementById('login-btn').onclick = () => window.netlifyIdentity.open();
document.getElementById('logout-btn').onclick = () => window.netlifyIdentity.logout();
document.getElementById('leave-submit').onclick = submitRequest;
document.getElementById('leave-cancel').onclick = closeModal;
function closeModal() { document.getElementById('leave-modal').classList.add('hidden'); }

// Init
renderCalendar();
initAuth();