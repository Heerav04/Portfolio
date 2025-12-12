// Theme Toggle
const themeToggle = document.getElementById("themeToggle")

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark"
if (currentTheme === "light") {
  document.body.classList.add("light-mode")
  themeToggle.textContent = "☀️"
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode")
  const isLight = document.body.classList.contains("light-mode")
  localStorage.setItem("theme", isLight ? "light" : "dark")
  themeToggle.textContent = isLight ? "☀️" : "🌙"
})

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    } else {
      entry.target.classList.remove("visible")
    }
  })
}, observerOptions)

// Observe all animate-on-scroll elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Project Category Filter

const projectCategoryBtns = document.querySelectorAll('.project-category-btn');
const projectCards = document.querySelectorAll('.project-card');

function setActiveTabAndFilter(category) {
  projectCategoryBtns.forEach(b => {
    if (b.getAttribute('data-category') === category) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  projectCards.forEach(card => {
    const cardCategories = card.getAttribute('data-category').split(' ');
    if (category === 'all' || cardCategories.includes(category)) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

projectCategoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    setActiveTabAndFilter(category);
  });
});

// On page load, set Full Stack Development as default
window.addEventListener('DOMContentLoaded', () => {
  setActiveTabAndFilter('fullstack');
});


// Mouse Proximity Animation (projects/certs) and Skill Card FadeUp on Hover
let mouseX = 0
let mouseY = 0
const PROXIMITY_RADIUS = 300

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  // Project and cert cards (proximity effect)
  document.querySelectorAll(".project-card, .cert-card").forEach((card) => {
    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    const distance = Math.sqrt(Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2))
    if (distance < PROXIMITY_RADIUS) {
      if (!card.classList.contains("animate-mouse-hover")) {
        card.classList.add("animate-mouse-hover")
      }
    } else {
      card.classList.remove("animate-mouse-hover")
    }
  })
})

// Skill card fade up only on hover
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('skill-fadeup');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('skill-fadeup');
  });
});

// Contact Form Handler
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector(".submit-btn")
  submitBtn.disabled = true
  submitBtn.textContent = "Sending..."

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      formMessage.textContent = "✓ Message sent successfully! I'll get back to you soon."
      formMessage.className = "form-message success"
      contactForm.reset()
    } else {
      throw new Error(data.error || 'Form submission failed')
    }
  } catch (error) {
    formMessage.textContent = "× Error sending message. Please try again."
    formMessage.className = "form-message error"
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = "Send Message"
    
    setTimeout(() => {
      formMessage.textContent = ""
      formMessage.className = ""
    }, 5000)
  }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})

// Typing animation for hero name
const typingTextTarget = document.getElementById("typing-text");
const typingText = "Heerav Amin";
let typingIndex = 0;

function typeWriter() {
  if (typingTextTarget && typingIndex <= typingText.length) {
    typingTextTarget.textContent = typingText.slice(0, typingIndex);
    typingIndex++;
    setTimeout(typeWriter, 120);
  }
}

if (typingTextTarget) {
  typeWriter();
}
