// Smooth scroll with easing effect and scroll offset for elegance
function scrollToContent() {
  const target = document.getElementById('content');
  const yOffset = -50;
  const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}

// Fade in effect for the entire content section
window.addEventListener('scroll', () => {
  const content = document.getElementById('content');
  const position = content.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (position < windowHeight - 100) {
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
  }
});

// Soft fade-in for each section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('#content > *');
  sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
  });

  // Quote carousel
  const quotes = [
    "They danced until they dropped, and some never rose again.",
    "A mystery that has baffled scholars for centuries.",
    "When the body dances and the mind is lost."
  ];

  let quoteIndex = 0;
  const quoteBox = document.getElementById('quoteBox');
  if (quoteBox) {
    quoteBox.textContent = quotes[quoteIndex];
    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteBox.textContent = quotes[quoteIndex];
    }, 5000);
  }

  // Keyboard navigation for timeline sections
  document.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    if (e.key === 'ArrowDown') {
      let next = current.nextElementSibling;
      while (next && !next.classList.contains('timeline-entry')) {
        next = next.nextElementSibling;
      }
      if (next) next.focus();
    } else if (e.key === 'ArrowUp') {
      let prev = current.previousElementSibling;
      while (prev && !prev.classList.contains('timeline-entry')) {
        prev = prev.previousElementSibling;
      }
      if (prev) prev.focus();
    }
  });

  // Simple pagination
  const entriesPerPage = 5;
  const allEntries = document.querySelectorAll('.timeline-entry');
  const paginationContainer = document.getElementById('pagination');
  let currentPage = 1;

  function showPage(page) {
    allEntries.forEach((entry, index) => {
      const start = (page - 1) * entriesPerPage;
      const end = page * entriesPerPage;
      entry.style.display = index >= start && index < end ? 'block' : 'none';
    });

    // Update pagination UI
    if (paginationContainer) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(allEntries.length / entriesPerPage);
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === page ? 'active-page' : '';
        btn.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
        });
        paginationContainer.appendChild(btn);
      }
    }
  }

  if (allEntries.length > entriesPerPage) {
    showPage(currentPage);
  }
});
