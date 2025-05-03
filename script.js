// Dark Mode Toggle
document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
});

// Smooth Scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - navbar.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Active Link and Scroll Progress
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveLink, 100);
  updateScrollProgress();
});

function updateActiveLink() {
  const scrollY = window.scrollY + navbar.offsetHeight + 10;
  let currentSection = null;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      currentSection = section;
    }
  });

  navLinks.forEach(link => {
    if (currentSection && link.getAttribute('href') === `#${currentSection.id}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updateScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (window.scrollY / docHeight) * 100;
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '5px';
    progressBar.style.background = '#007BFF';
    progressBar.style.width = scrollPercentage + '%';
  }
}
