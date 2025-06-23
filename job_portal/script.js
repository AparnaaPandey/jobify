// Job search filter
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const jobList = document.getElementById('jobList');
const jobItems = Array.from(document.querySelectorAll('.job-item'));

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  filterJobs();
});

searchInput.addEventListener('input', filterJobs);

function filterJobs() {
  const query = searchInput.value.toLowerCase();
  jobItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? '' : 'none';
  });
}

// --- User Type Switch ---
const userTypeSwitch = document.getElementById('userTypeSwitch');
const postJobSection = document.getElementById('postJobSection');
const jobList = document.getElementById('jobList');

userTypeSwitch.addEventListener('change', function() {
  if (userTypeSwitch.value === 'client') {
    postJobSection.style.display = '';
  } else {
    postJobSection.style.display = 'none';
  }
});
// Default to contractor view
postJobSection.style.display = 'none';

// --- Toast Notification ---
function showToast(message) {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// --- Job Data Management ---
const JOBS_KEY = 'jobify_jobs';

function getJobs() {
  return JSON.parse(localStorage.getItem(JOBS_KEY)) || [
    {title: 'Web Developer Needed', type: 'Remote | Full Time', desc: 'Build and maintain web applications for our clients.'},
    {title: 'Graphic Designer', type: 'Onsite | Part Time', desc: 'Create visual concepts and designs for marketing materials.'},
    {title: 'Content Writer', type: 'Remote | Freelance', desc: 'Write engaging content for blogs and social media.'}
  ];
}
function saveJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

function renderJobs(filter = '') {
  const jobs = getJobs();
  jobList.innerHTML = '';
  jobs.forEach((job, idx) => {
    if (
      job.title.toLowerCase().includes(filter) ||
      job.type.toLowerCase().includes(filter) ||
      job.desc.toLowerCase().includes(filter)
    ) {
      const li = document.createElement('li');
      li.className = 'job-item';
      li.innerHTML = `<h4>${job.title}</h4><p>${job.type}</p>`;
      li.addEventListener('click', () => showJobModal(job));
      jobList.appendChild(li);
    }
  });
}

// --- Job Posting ---
const postJobForm = document.getElementById('postJobForm');
if (postJobForm) {
  postJobForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('jobTitle').value.trim();
    const type = document.getElementById('jobType').value.trim();
    const desc = document.getElementById('jobDesc').value.trim();
    if (!title || !type || !desc) {
      showToast('Please fill in all fields.');
      return;
    }
    const jobs = getJobs();
    jobs.unshift({title, type, desc});
    saveJobs(jobs);
    renderJobs(searchInput.value.toLowerCase());
    postJobForm.reset();
    showToast('Job posted successfully!');
  });
}

// --- Job Details Modal ---
const jobModal = document.getElementById('jobModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

function showJobModal(job) {
  modalBody.innerHTML = `<h3>${job.title}</h3><p><strong>Type:</strong> ${job.type}</p><p>${job.desc}</p>`;
  jobModal.style.display = 'flex';
}
closeModal.addEventListener('click', () => {
  jobModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === jobModal) jobModal.style.display = 'none';
});

// --- Initial Render ---
renderJobs();

// --- Remove old sign up alerts ---
const clientSignup = document.getElementById('clientSignup');
const contractorSignup = document.getElementById('contractorSignup');
if (clientSignup) {
  clientSignup.addEventListener('click', () => {
    showToast('Client sign up coming soon!');
  });
}
if (contractorSignup) {
  contractorSignup.addEventListener('click', () => {
    showToast('Contractor sign up coming soon!');
  });
}

// --- Registration Modal Logic ---
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('registerForm');
const regUserType = document.getElementById('regUserType');
const registerTitle = document.getElementById('registerTitle');

function openRegisterModal(type) {
  regUserType.value = type;
  registerTitle.textContent = `Sign Up as ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  registerModal.style.display = 'flex';
}
function closeRegister() {
  registerModal.style.display = 'none';
  registerForm.reset();
}
closeRegisterModal.addEventListener('click', closeRegister);
window.addEventListener('click', (e) => {
  if (e.target === registerModal) closeRegister();
});

if (clientSignup) {
  clientSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openRegisterModal('client');
  });
}
if (contractorSignup) {
  contractorSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openRegisterModal('contractor');
  });
}

const USERS_KEY = 'jobify_users';
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;
  const userType = regUserType.value;
  if (!name || !email || !password) {
    showToast('Please fill in all fields.');
    return;
  }
  const users = getUsers();
  if (users.some(u => u.email === email)) {
    showToast('Email already registered.');
    return;
  }
  users.push({ name, email, password, userType });
  saveUsers(users);
  showToast('Registration successful!');
  closeRegister();
}); 