// --- Registration Logic for Standalone Signup Pages ---
const registerForm = document.getElementById('registerForm');
const regUserType = document.getElementById('regUserType');
const toastContainer = document.getElementById('toastContainer');

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2200);
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
  registerForm.reset();
}); 