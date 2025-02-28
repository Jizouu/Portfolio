// Toggle mobile menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      // Only prevent default if the link is not just "#"
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  }
  
  // Initialize skill bars animation
  const skillLevels = document.querySelectorAll('.skill-level');
  
  // Set initial width to 0
  skillLevels.forEach(skill => {
    skill.style.width = '0%';
  });
  
  // Create intersection observer for skill bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When skill section is visible, animate the bars
        setTimeout(() => {
          skillLevels.forEach(skill => {
            const targetWidth = skill.textContent;
            skill.style.width = targetWidth;
          });
        }, 300);
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe the experience section
  const experienceSection = document.querySelector('#experience');
  if (experienceSection) {
    observer.observe(experienceSection);
  }
  
  // Add scroll to top button
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.classList.add('scroll-top');
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple form validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Add active class to navigation links based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial call to set active link
  updateActiveNavLink();
});

// Typing animation for the title
document.addEventListener('DOMContentLoaded', function() {
  const titles = document.querySelectorAll('.title');
  
  titles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Only apply typing effect to the main title
    if (title.closest('#profile')) {
      setTimeout(typeWriter, 500);
    } else {
      title.textContent = text;
    }
  });
});