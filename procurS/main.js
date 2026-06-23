document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll effect for Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation toggle (simple)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      // Simple toggle menu
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
        navToggle.style.transform = 'rotate(0)';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = 'var(--header-height)';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-light)';
        navLinks.style.boxShadow = 'var(--shadow-lg)';
        navToggle.style.transform = 'rotate(90deg)';
      }
    });
  }

  // 3. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 4. Interactive Tabs for Target Audience
  const tabBtns = document.querySelectorAll('.tab-btn');
  const audiencePanes = document.querySelectorAll('.audience-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.getAttribute('data-role');
      
      // Toggle active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle active panel
      audiencePanes.forEach(pane => {
        if (pane.getAttribute('id') === `pane-${targetRole}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // 5. Interactive Demo Section (Quotation File Extraction)
  const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
  const demoPanes = document.querySelectorAll('.demo-pane');
  const filePicker = document.getElementById('demo-file-picker');
  const uploadArea = document.getElementById('upload-area');
  const extractionResult = document.getElementById('extraction-result');

  if (demoTabBtns.length > 0) {
    demoTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPane = btn.getAttribute('data-pane');
        demoTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        demoPanes.forEach(pane => {
          if (pane.getAttribute('id') === `pane-demo-${targetPane}`) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // Mock upload interaction
  if (uploadArea && filePicker && extractionResult) {
    uploadArea.addEventListener('click', () => {
      filePicker.click();
    });

    filePicker.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Show loading state
        uploadArea.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
          <p style="margin-top: 0.5rem; font-weight: 500;">Đang phân tích báo giá bằng AI...</p>
        `;

        setTimeout(() => {
          // Show extraction result
          uploadArea.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p style="margin-top: 0.5rem; font-weight: 600; color: #22c55e;">Trích xuất hoàn tất!</p>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Tên file: ${file.name}</p>
          `;

          // Populate mock data into results
          extractionResult.style.display = 'block';
          document.getElementById('mock-vendor-name').innerText = 'Công ty TNHH Vật tư ABC';
          document.getElementById('mock-total-price').innerText = '145.800.000 ₫';
          document.getElementById('mock-delivery-time').innerText = '1-2 ngày làm việc';
        }, 1500);
      }
    });
  }

  // 6. Early Access Form Submission
  const earlyAccessForm = document.getElementById('early-access-form');
  const toastMsg = document.getElementById('toast-msg');

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const phone = document.getElementById('register-phone').value;
      const business = document.getElementById('register-business').value;
      
      // Store in LocalStorage (mock saving to DB)
      const registrations = JSON.parse(localStorage.getItem('stally_registrations') || '[]');
      registrations.push({ name, phone, business, date: new Date().toISOString() });
      localStorage.setItem('stally_registrations', JSON.stringify(registrations));
      
      // Reset form
      earlyAccessForm.reset();
      
      // Show Toast Notification
      if (toastMsg) {
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 4000);
      }
    });
  }

  // Style helper for spinning loading state in uploadArea
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
