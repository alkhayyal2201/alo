const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let currentViewDate = new Date(2026, 0, 1); 
let currentUser = null; 
let allLeaves = []; 

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  document.getElementById('current-month-display').textContent = `${MONTHS[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Padding for start of month
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty';
    grid.appendChild(empty);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayBox = document.createElement('div');
    dayBox.className = 'calendar-day';
    dayBox.innerHTML = `<span class="day-num">${d}</span>`;
    
    const dayLeaves = allLeaves.filter(l => l.day === d && l.month === month);
    dayLeaves.forEach(leave => {
      const chip = document.createElement('div');
      chip.className = `leave-chip chip-${leave.status}`;
      chip.innerHTML = `<strong>${leave.name}</strong> <span class="status-label">${leave.status}</span>`;
      
      if (currentUser) {
        chip.classList.add('manager-view');
        chip.onclick = (e) => {
          e.stopPropagation();
          handleManagerAction(leave.id);
        };
      }
      dayBox.appendChild(chip);
    });

    dayBox.onclick = () => openLeaveModal(d);
    grid.appendChild(dayBox);
  }
}

function openLeaveModal(day) {
  document.getElementById('selected-date-label').textContent = `${day} ${MONTHS[currentViewDate.getMonth()]} 2026`;
  document.getElementById('submit-day').value = day;
  document.getElementById('leave-modal').classList.remove('hidden');
}

document.getElementById('leave-cancel').onclick = () => {
  document.getElementById('leave-modal').classList.add('hidden');
};

document.getElementById('leave-submit').onclick = () => {
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

  document.getElementById('leave-modal').classList.add('hidden');
  renderCalendar();
};

function handleManagerAction(leaveId) {
  const leave = allLeaves.find(l => l.id === leaveId);
  if (!leave) return;

  const choice = confirm(`Manage ${leave.name}'s request:\n\nOK to APPROVE\nCancel to REJECT`);
  leave.status = choice ? 'approved' : 'rejected';
  renderCalendar();
}

// Auth Logic
function updateUI(user) {
  currentUser = user;
  document.getElementById('manager-info').classList.toggle('hidden', !user);
  document.getElementById('login-btn').classList.toggle('hidden', !!user);
  document.getElementById('logout-btn').classList.toggle('hidden', !user);
  if (user) {
    document.getElementById('user-name').textContent = user.user_metadata?.full_name || "Manager";
  }
  renderCalendar();
}

function initIdentity() {
  if (!window.netlifyIdentity) return;
  window.netlifyIdentity.on('login', user => { updateUI(user); window.netlifyIdentity.close(); });
  window.netlifyIdentity.on('logout', () => updateUI(null));
  const user = window.netlifyIdentity.currentUser();
  if (user) updateUI(user);
}

document.getElementById('login-btn').onclick = () => window.netlifyIdentity.open();
document.getElementById('logout-btn').onclick = () => window.netlifyIdentity.logout();

// Boot
renderCalendar();
initIdentity();