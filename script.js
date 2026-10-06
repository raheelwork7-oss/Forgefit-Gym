

document.addEventListener('DOMContentLoaded', () => {

  
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  const revealItems = document.querySelectorAll('.section-header, .hero-content, .recommendation-panel, .split-layout, .builder-container, .progress-tracker-box, .challenge-box, .contact-grid, .footer-container');
  const staggerItems = document.querySelectorAll('.stats-grid, .paths-grid, .programs-grid, .coaches-grid, .pricing-grid, .metrics-grid, .transformations-grid, .facility-grid, .gallery-grid, .faq-accordion, .challenge-days-grid');

  revealItems.forEach(item => item.classList.add('reveal'));
  staggerItems.forEach(item => item.classList.add('reveal-stagger'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(item => revealObserver.observe(item));

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          let current = 0;
          const increment = Math.ceil(target / 40);

          const updateCount = () => {
            current += increment;
            if (current >= target) {
              stat.innerText = target.toLocaleString();
            } else {
              stat.innerText = current.toLocaleString();
              setTimeout(updateCount, 30);
            }
          };
          updateCount();
        });
      }
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }


  
  const pathCards = document.querySelectorAll('.path-card');
  const recTitle = document.getElementById('rec-title');
  const recBadge = document.getElementById('rec-badge');
  const recDesc = document.getElementById('rec-desc');
  const recFreq = document.getElementById('rec-freq');
  const recIntensity = document.getElementById('rec-intensity');
  const recModality = document.getElementById('rec-modality');

  const pathData = {
    muscle: {
      title: "Build Muscle",
      badge: "Hypertrophy Blueprint",
      desc: "Maximizes muscle hypertrophy using precise resistance loads and targeted muscle isolation.",
      freq: "4 - 5 Days / Week",
      intensity: "Moderate-High (RPE 7-9)",
      modality: "Barbells, Cables, Dumbbells"
    },
    fatloss: {
      title: "Lose Fat",
      badge: "Metabolic Shred",
      desc: "Combines high-density resistance work with short recovery windows to maximize caloric burn.",
      freq: "3 - 4 Days / Week",
      intensity: "High (RPE 8-10)",
      modality: "Kettlebells, Bodyweight, HIIT Circuits"
    },
    strength: {
      title: "Build Strength",
      badge: "Power & Force Protocol",
      desc: "Emphasizes neurological force development across heavy compound movements.",
      freq: "3 - 4 Days / Week",
      intensity: "Very High (RPE 8-9.5)",
      modality: "Barbells, Squat Racks, Heavy Free Weights"
    },
    fitness: {
      title: "Improve Fitness",
      badge: "Hybrid Performance",
      desc: "Balanced protocol designed for general longevity, joint health, and spatial endurance.",
      freq: "3 - 5 Days / Week",
      intensity: "Moderate (RPE 6-8)",
      modality: "Turf Work, Cardio Ergometers, Mobility Tools"
    }
  };

  pathCards.forEach(card => {
    card.addEventListener('click', () => {
      pathCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const goal = card.getAttribute('data-goal');
      const data = pathData[goal];

      if (data) {
        recTitle.textContent = data.title;
        recBadge.textContent = data.badge;
        recDesc.textContent = data.desc;
        recFreq.textContent = data.freq;
        recIntensity.textContent = data.intensity;
        recModality.textContent = data.modality;
      }
    });
  });


  
  const programModal = document.getElementById('program-modal');
  const pmOverlay = document.getElementById('pm-overlay');
  const pmClose = document.getElementById('pm-close');
  const pmBody = document.getElementById('pm-body');
  const programBtns = document.querySelectorAll('.view-program-btn');

  const programDetails = {
    "strength-power": {
      title: "Strength & Power Blueprint",
      desc: "Designed for advanced lifters looking to push heavy compound movement maximums safely.",
      freq: "4 Days per Week",
      focus: "Central Nervous System adaptation & pure mechanical power.",
      exercises: ["Barbell Back Squat (4x5)", "Bench Press (4x5)", "Conventional Deadlift (3x3)", "Overhead Press (4x6)"]
    },
    "muscle-building": {
      title: "Hypertrophy System",
      desc: "High-volume hypertrophy programming focused on time-under-tension and mechanical damage.",
      freq: "5 Days per Week",
      focus: "Muscle isolation and structural symmetry.",
      exercises: ["Incline Dumbbell Press (4x10)", "Barbell Rows (4x8)", "Romanian Deadlifts (3x12)", "Cable Lateral Raises (4x15)"]
    },
    "fat-loss": {
      title: "Metabolic Fat Loss Protocol",
      desc: "Elevates resting metabolic rate through strategic circuit pairing.",
      freq: "4 Days per Week",
      focus: "Maximum metabolic expenditure while preserving lean mass.",
      exercises: ["Kettlebell Swings (4x20)", "Goblet Squats (4x12)", "Dumbbell Thrusters (3x15)", "Row Ergometer Intervals"]
    },
    "hiit-conditioning": {
      title: "HIIT & Athletic Conditioning",
      desc: "Engineered to maximize VO2 max and increase cardiovascular output.",
      freq: "3 Days per Week",
      focus: "Cardiovascular efficiency and high-intensity stamina.",
      exercises: ["Assault Bike Sprints", "Box Jumps", "Sled Pushes", "Battle Rope Slams"]
    },
    "functional-training": {
      title: "Functional & Mobility Engine",
      desc: "Protects joints, corrects imbalances, and increases overall athletic durability.",
      freq: "4 Days per Week",
      focus: "Multi-planar movement and core stabilization.",
      exercises: ["Turkish Get-Ups", "Single-Leg RDLs", "Pull-Ups", "Landmine Rotations"]
    },
    "personal-coaching": {
      title: "1-on-1 Bespoke Personal Coaching",
      desc: "Fully customized private program built entirely around your biomechanics.",
      freq: "Customized to User",
      focus: "Tailored goals, form refinement, and private coaching.",
      exercises: ["Custom Diagnostic Plan Included"]
    }
  };

  programBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-program');
      const data = programDetails[key];
      if (data) {
        pmBody.innerHTML = `
          <h2 style="color: var(--accent-primary); margin-bottom: 0.5rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.desc}</p>
          <div style="margin-bottom: 1rem;"><strong>Weekly Frequency:</strong> ${data.freq}</div>
          <div style="margin-bottom: 1.5rem;"><strong>Primary Focus:</strong> ${data.focus}</div>
          <h4>Core Movements:</h4>
          <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-secondary);">
            ${data.exercises.map(ex => `<li style="margin-bottom: 0.4rem;">${ex}</li>`).join('')}
          </ul>
        `;
        programModal.classList.add('active');
      }
    });
  });

  if (pmClose) pmClose.addEventListener('click', () => programModal.classList.remove('active'));
  if (pmOverlay) pmOverlay.addEventListener('click', () => programModal.classList.remove('active'));


  
  const coachModal = document.getElementById('coach-modal');
  const cmOverlay = document.getElementById('cm-overlay');
  const cmClose = document.getElementById('cm-close');
  const cmBody = document.getElementById('cm-body');
  const coachBtns = document.querySelectorAll('.view-coach-btn');

  const coachDetails = {
    marcus: {
      name: "Marcus Vance",
      role: "Head Strength & Conditioning Coach",
      bio: "Marcus has spent over a decade training elite collegiate and professional athletes. His training philosophy hinges on strict biomechanical efficiency.",
      philosophy: "Load mechanics first, intensity second.",
      specialties: ["Powerlifting", "Olympic Weightlifting", "Rehabilitation"]
    },
    elena: {
      name: "Elena Rostova",
      role: "Hypertrophy & Physique Specialist",
      bio: "An IFBB Pro athlete with 8+ years of dedicated coaching experience helping clients reshape their body composition.",
      philosophy: "Symmetry, precision, and consistency.",
      specialties: ["Physique Transformation", "Macronutrient Diagnostic", "Hypertrophy"]
    },
    sarah: {
      name: "Sarah Jenkins",
      role: "Functional Fitness & Mobility Specialist",
      bio: "Sarah focuses on fixing movement dysfunctions, relieving chronic joint tension, and restoring peak athletic mobility.",
      philosophy: "Move well to move heavy.",
      specialties: ["Functional Movement", "Injury Prevention", "Core Stability"]
    },
    david: {
      name: "David Sterling",
      role: "Metabolic Conditioning & Boxing Master",
      bio: "Former competitive boxer specializing in high-energy conditioning and athletic cardiac endurance.",
      philosophy: "Condition the mind, and the body follows.",
      specialties: ["Boxing Fundamentals", "High-Density Circuits", "VO2 Max Training"]
    }
  };

  coachBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-coach');
      const data = coachDetails[key];
      if (data) {
        cmBody.innerHTML = `
          <h2 style="margin-bottom: 0.25rem;">${data.name}</h2>
          <span style="color: var(--accent-primary); font-weight: 700; display: block; margin-bottom: 1rem;">${data.role}</span>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.bio}</p>
          <blockquote style="border-left: 2px solid var(--accent-primary); padding-left: 1rem; font-style: italic; margin-bottom: 1.5rem; color: #fff;">
            "${data.philosophy}"
          </blockquote>
          <h4>Specialties:</h4>
          <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-secondary);">
            ${data.specialties.map(s => `<li style="margin-bottom: 0.3rem;">${s}</li>`).join('')}
          </ul>
        `;
        coachModal.classList.add('active');
      }
    });
  });

  if (cmClose) cmClose.addEventListener('click', () => coachModal.classList.remove('active'));
  if (cmOverlay) cmOverlay.addEventListener('click', () => coachModal.classList.remove('active'));


  
  const billingToggle = document.getElementById('billing-toggle');
  const prices = document.querySelectorAll('.pricing-card .price');

  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isYearly = billingToggle.checked;
      prices.forEach(priceEl => {
        const targetPrice = isYearly ? priceEl.getAttribute('data-yearly') : priceEl.getAttribute('data-monthly');
        priceEl.textContent = targetPrice;
      });
    });
  }


  
  const workoutForm = document.getElementById('workout-builder-form');
  const builderResult = document.getElementById('builder-result');

  if (workoutForm) {
    workoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const goal = document.getElementById('builder-goal').value;
      const level = document.getElementById('builder-level').value;
      const days = document.getElementById('builder-days').value;

      builderResult.innerHTML = `
        <div class="workout-plan-output">
          <h3>Generated ${days}-Day Blueprint (${level.toUpperCase()})</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            Tailored for: <strong>${goal.toUpperCase()}</strong>
          </p>

          <div class="workout-day-item">
            <h4>Day 1: Primary Compound Focus</h4>
            <p>Bench Press or Barbell Squat: 4 Sets x 6-8 Reps (2 min rest)</p>
            <p>Accessory Circuit: 3 Sets x 10-12 Reps</p>
          </div>

          <div class="workout-day-item">
            <h4>Day 2: Secondary Pull / Posterior Chain</h4>
            <p>Deadlift or Barbell Row: 4 Sets x 5-8 Reps (2.5 min rest)</p>
            <p>Isolation Work: 3 Sets x 12 Reps</p>
          </div>

          ${days >= 4 ? `
          <div class="workout-day-item">
            <h4>Day 3: Hypertrophy & Volume Focus</h4>
            <p>Dumbbell Press / Lunges: 4 Sets x 10-12 Reps</p>
          </div>
          ` : ''}

          ${days >= 5 ? `
          <div class="workout-day-item">
            <h4>Day 4: Weak Point Isolation & Core</h4>
            <p>Cables, Arms & Core Stability Circuit</p>
          </div>
          ` : ''}
        </div>
      `;
    });
  }
  const bmiForm = document.getElementById('bmi-form');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const h = parseFloat(document.getElementById('bmi-height').value) / 100;
      const w = parseFloat(document.getElementById('bmi-weight').value);

      if (h > 0 && w > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        document.getElementById('bmi-num').textContent = bmi;

        const badge = document.getElementById('bmi-badge');
        if (bmi < 18.5) {
          badge.textContent = "Underweight";
          badge.style.color = "#3b82f6";
        } else if (bmi < 25) {
          badge.textContent = "Normal / Healthy";
          badge.style.color = "#22c55e";
        } else if (bmi < 30) {
          badge.textContent = "Overweight";
          badge.style.color = "#eab308";
        } else {
          badge.textContent = "Obese Category";
          badge.style.color = "#ef4444";
        }
      }
    });
  }
  const calorieForm = document.getElementById('calorie-form');
  if (calorieForm) {
    calorieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('cal-age').value);
      const gender = document.getElementById('cal-gender').value;
      const h = parseFloat(document.getElementById('cal-height').value);
      const w = parseFloat(document.getElementById('cal-weight').value);
      const act = parseFloat(document.getElementById('cal-activity').value);
      let bmr = (10 * w) + (6.25 * h) - (5 * age);
      bmr = (gender === 'male') ? bmr + 5 : bmr - 161;

      const tdee = Math.round(bmr * act);
      document.getElementById('calorie-num').textContent = `${tdee} kcal`;

      const breakdown = document.getElementById('calorie-breakdown');
      breakdown.innerHTML = `
        <div><strong>Weight Loss Target:</strong> ~${tdee - 500} kcal/day</div>
        <div><strong>Muscle Gain Target:</strong> ~${tdee + 300} kcal/day</div>
      `;
    });
  }


  
  const trackerForm = document.getElementById('tracker-form');
  if (trackerForm) {
    trackerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const start = parseFloat(document.getElementById('track-start').value);
      const current = parseFloat(document.getElementById('track-current').value);
      const target = parseFloat(document.getElementById('track-target').value);

      const change = (current - start).toFixed(1);
      const pct = (((current - start) / start) * 100).toFixed(1);
      const remaining = Math.abs(current - target).toFixed(1);

      document.getElementById('t-change').textContent = `${change > 0 ? '+' : ''}${change} kg`;
      document.getElementById('t-pct').textContent = `${pct}%`;
      document.getElementById('t-rem').textContent = `${remaining} kg`;
      const totalDist = Math.abs(start - target);
      const progressDist = Math.abs(start - current);
      let progressPct = Math.min(100, Math.round((progressDist / totalDist) * 100));
      if (isNaN(progressPct)) progressPct = 0;

      document.getElementById('t-bar').style.width = `${progressPct}%`;
      document.getElementById('t-pct-label').textContent = `${progressPct}% Goal Completed`;
    });
  }


  
  const transFilters = document.querySelectorAll('#transformation-filters .filter-btn');
  const transCards = document.querySelectorAll('.trans-card');

  transFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      transFilters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      transCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  
  const schedBtns = document.querySelectorAll('#schedule-filters .sched-btn');
  const schedRows = document.querySelectorAll('#schedule-body tr');

  schedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      schedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const day = btn.getAttribute('data-day');
      schedRows.forEach(row => {
        if (day === 'all' || row.getAttribute('data-day') === day) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });


  
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbOverlay = document.getElementById('lb-overlay');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  let currentGalleryIndex = 0;
  const gallerySrcs = Array.from(galleryItems).map(item => item.getAttribute('data-src'));

  const openLightbox = (index) => {
    currentGalleryIndex = index;
    lbImg.src = gallerySrcs[currentGalleryIndex];
    lightbox.classList.add('active');
  };

  const closeLightbox = () => lightbox.classList.remove('active');

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbOverlay) lbOverlay.addEventListener('click', closeLightbox);

  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
      lbImg.src = gallerySrcs[currentGalleryIndex];
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % gallerySrcs.length;
      lbImg.src = gallerySrcs[currentGalleryIndex];
    });
  }
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });


  
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  let currentSlide = 0;
  let autoRotateInterval;
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const startAutoRotate = () => {
    autoRotateInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  };

  const stopAutoRotate = () => clearInterval(autoRotateInterval);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoRotate();
      goToSlide(currentSlide - 1);
      startAutoRotate();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoRotate();
      goToSlide(currentSlide + 1);
      startAutoRotate();
    });
  }

  startAutoRotate();


  
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });


  
  const challengeGrid = document.getElementById('challenge-grid');
  const challengeFill = document.getElementById('challenge-fill');
  const challengePctText = document.getElementById('challenge-pct-text');
  const resetChallengeBtn = document.getElementById('reset-challenge-btn');
  let challengeState = JSON.parse(localStorage.getItem('forgefit_challenge')) || {};

  const updateChallengeUI = () => {
    let completedCount = 0;
    const dayCards = challengeGrid.querySelectorAll('.day-card');

    dayCards.forEach(card => {
      const day = card.getAttribute('data-day');
      const btn = card.querySelector('.check-day-btn');

      if (challengeState[day]) {
        card.classList.add('completed');
        btn.textContent = "✓ Completed";
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');
        completedCount++;
      } else {
        card.classList.remove('completed');
        btn.textContent = "Mark Complete";
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
      }
    });

    const percent = Math.round((completedCount / 7) * 100);
    challengeFill.style.width = `${percent}%`;
    challengePctText.textContent = `${percent}% Completed (${completedCount}/7 Days)`;
  };

  if (challengeGrid) {
    challengeGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('check-day-btn')) {
        const card = e.target.closest('.day-card');
        const day = card.getAttribute('data-day');

        challengeState[day] = !challengeState[day];
        localStorage.setItem('forgefit_challenge', JSON.stringify(challengeState));
        updateChallengeUI();
      }
    });

    if (resetChallengeBtn) {
      resetChallengeBtn.addEventListener('click', () => {
        challengeState = {};
        localStorage.removeItem('forgefit_challenge');
        updateChallengeUI();
      });
    }

    updateChallengeUI();
  }


  
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('c-name');
      const email = document.getElementById('c-email');
      const phone = document.getElementById('c-phone');

      const errName = document.getElementById('err-name');
      const errEmail = document.getElementById('err-email');
      const errPhone = document.getElementById('err-phone');
      if (!name.value.trim()) {
        name.classList.add('invalid');
        errName.style.display = 'block';
        isValid = false;
      } else {
        name.classList.remove('invalid');
        errName.style.display = 'none';
      }

      if (!email.value.includes('@')) {
        email.classList.add('invalid');
        errEmail.style.display = 'block';
        isValid = false;
      } else {
        email.classList.remove('invalid');
        errEmail.style.display = 'none';
      }

      if (!phone.value.trim()) {
        phone.classList.add('invalid');
        errPhone.style.display = 'block';
        isValid = false;
      } else {
        phone.classList.remove('invalid');
        errPhone.style.display = 'none';
      }

      if (isValid) {
        formSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }

});