(function () {
  // Initialize lucide icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Smooth scroll
  function smoothScrollTo(hash) {
    if (!hash) return;
    var id = hash.replace('#', '');
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  document.querySelectorAll('[data-scroll]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
        // close mobile menu after click
        closeMenu();
        history.replaceState(null, '', href);
      }
    });
  });

  // Header scrolled state
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 20;
    header.classList.toggle('bg-white/95', scrolled);
    header.classList.toggle('backdrop-blur-md', scrolled);
    header.classList.toggle('shadow-sm', scrolled);
    header.classList.toggle('py-3', scrolled);

    header.classList.toggle('bg-transparent', !scrolled);
    header.classList.toggle('py-5', !scrolled);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuIcon = document.getElementById('menuIcon');

  function openMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.remove('hidden');
    menuBtn.setAttribute('aria-expanded', 'true');
    if (menuIcon) menuIcon.setAttribute('data-lucide', 'x');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
    if (window.lucide) window.lucide.createIcons();
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      if (!mobileMenu) return;
      var isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  // If page loads with a hash, scroll nicely after layout
  if (location.hash) {
    setTimeout(function () { smoothScrollTo(location.hash); }, 50);
  }
})();



// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {

  // === Countdown Timer ===
  function countdown() {
    const offerDate = new Date("2026-02-28T23:59:59");
    const now = new Date();
    const diff = offerDate - now;

    if (diff <= 0) {
      document.getElementById("countdown").textContent = "Offer ended!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
      countdownElement.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
    }
  }
  setInterval(countdown, 1000);
  countdown(); // run immediately


  // === Smooth Scroll to Form ===
  document.querySelectorAll('a[href="#order-form"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const formSection = document.querySelector('#order-form'); // section ID
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
  });
});


  // === Sticky CTA Visibility Logic ===
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const cta = document.querySelector('#sticky-cta');
    if (hero && cta) {
      const scrollY = window.scrollY;
      cta.style.display = scrollY > hero.offsetHeight ? 'block' : 'none';
    }
  });


  // === FAQ Accordion ===
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('active');
    });
  });


  // === Fake Order Notification ===
  const fakeOrders = [
  "Ada from Lagos just ordered 3 bottles for her monthly comfort routine.",
  "Blessing from Abuja reordered—she said the pressure feeling reduced.",
  "⏳ OFFER ENDING SOON: Today’s promo price may end soon. Order now.",
  "🛡️ 30-Day Satisfaction Guarantee: Try FIBROCURE risk-free.",
  "✅ New order received from Port Harcourt.",
  "Halima from Kano ordered 2 bottles today.",
  "Ngozi from Enugu placed an order.",
  "✅ A customer in Ibadan just ordered FIBROCURE.",
  "🔔 New order received from Owerri.",
  "✅ Someone in Uyo purchased FIBROCURE."
];

  const fakePopup = document.getElementById('fake-order-popup');
  function showFakeOrder() {
    if (!fakePopup) return;
    fakePopup.textContent = fakeOrders[Math.floor(Math.random() * fakeOrders.length)];
    fakePopup.style.opacity = '1';
    setTimeout(() => {
      fakePopup.style.opacity = '0';
    }, 5000);
  }
  setInterval(showFakeOrder, 25000); // every 25 seconds


  // === Fake Comment Submit Toast ===
  const sendBtn = document.getElementById('send-comment');
  const input = document.getElementById('comment-input');
  const toast = document.getElementById('comment-toast');

  if (sendBtn && input && toast) {
    sendBtn.addEventListener('click', () => {
      if (input.value.trim() !== '') {
        toast.style.display = 'block';
        input.value = '';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 3000);
      }
    });
  }


  // === EXIT POPUP (Mobile + Desktop Friendly) ===
  let popupVisible = false;
  const exitPopup = document.getElementById('exit-popup');
  const skipPopup = document.getElementById('skip-popup');
  const popupForm = document.getElementById('popupForm');

  function showPopup() {
    if (!popupVisible && exitPopup) {
      popupVisible = true;
      exitPopup.style.display = 'flex';
    }
  }

  // === 1️⃣ Show when user presses back button ===
  (function handleBackButton() {
    // Push fake history entry so pressing back first triggers popup
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', function () {
      showPopup();
      // Push state again so user must press back twice to leave
      history.pushState(null, null, location.href);
    });
  })();


  // === 2️⃣ Show when user switches away or minimizes ===
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      showPopup();
    }
  });

  // === 3️⃣ Show after 25 seconds of inactivity AND 1 minute total ===
  let idleTimer;
  let totalIdleTimer;

  function resetIdleTimers() {
    clearTimeout(idleTimer);
    clearTimeout(totalIdleTimer);

    // 25 seconds of inactivity
    idleTimer = setTimeout(() => {
      showPopup();
    }, 45000);

    // 1 minute total inactivity (no matter what)
    totalIdleTimer = setTimeout(() => {
      showPopup();
    }, 120000);
  }

  ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'].forEach(evt =>
    document.addEventListener(evt, resetIdleTimers)
  );
  resetIdleTimers();


  (function () {
  const countEl = document.getElementById("visitorCount");
  const msgEl = document.getElementById("visitorMsg");
  if (!countEl || !msgEl) return;

  // Nigeria-style urgency messages (rotate)
  const messages = [
    "people are checking this offer right now — no dulling 🚨",
    "people dey view am now — stock fit finish today 👀",
    "people are placing orders right now — secure your own ASAP ✅",
    "people dey rush am — delivery slots dey move fast 🚚",
    "people are on this page now — price fit change anytime ⏳"
  ];

  // Start value (from HTML), fallback to 47
  let current = parseInt(countEl.textContent, 10);
  if (Number.isNaN(current)) current = 47;

  // Random helper
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Update counter + message
  function tick() {
    // Change by -3..+6 but keep within a realistic range
    const next = Math.min(120, Math.max(18, current + rand(-3, 6)));

    current = next;
    countEl.textContent = String(current);

    // bump animation
    countEl.classList.remove("bump");
    void countEl.offsetWidth; // reflow to restart animation
    countEl.classList.add("bump");

    // rotate message sometimes
    if (Math.random() < 0.6) {
      msgEl.textContent = messages[rand(0, messages.length - 1)];
    }

    // random timing: 2.5s to 6.5s
    const nextIn = rand(2500, 6500);
    setTimeout(tick, nextIn);
  }

  // Start after short delay
  setTimeout(tick, rand(1200, 2500));
})();


  // === Close popup ===
  if (skipPopup) {
    skipPopup.addEventListener('click', () => {
      exitPopup.style.display = 'none';
    });
  }

  // === Handle popup form submit ===
  if (popupForm) {
    popupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const phone = document.getElementById('popup-phone').value.trim();
      const phoneRegex = /^\d{11}$/;

      if (!phoneRegex.test(phone)) {
        alert("Phone number must be exactly 11 digits.");
        return;
      }

      const response = await fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("✅ Thank you! Your free Diabetes PDF will be sent shortly.");
        exitPopup.style.display = 'none';
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  }

}); // END DOMContentLoaded

