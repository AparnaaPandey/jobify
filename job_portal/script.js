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

// Sign up button alerts
const clientSignup = document.getElementById('clientSignup');
const contractorSignup = document.getElementById('contractorSignup');

clientSignup.addEventListener('click', () => {
  alert('Client sign up coming soon!');
});
contractorSignup.addEventListener('click', () => {
  alert('Contractor sign up coming soon!');
}); 