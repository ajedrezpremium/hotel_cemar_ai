/* === HOTEL CEMAR - SITIO WEB PRINCIPAL === */

let currentLang = 'es';

function t(key) {
  const keys = key.split('.');
  let val = TRANSLATIONS[currentLang];
  for (const k of keys) {
    if (val && val[k] !== undefined) val = val[k];
    else return key;
  }
  return val;
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  renderContent();

  if (window.hotelAI) {
    window.hotelAI.lang = lang;
    const input = document.getElementById('aiInput');
    if (input) input.placeholder = window.hotelAI.t('ai.placeholder');
  }
}

function renderContent() {
  // Nav
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  // Hero
  const heroBadge = document.getElementById('heroBadge');
  if (heroBadge) heroBadge.textContent = t('hero.badge');

  const heroTitle1 = document.getElementById('heroTitle1');
  const heroTitle2 = document.getElementById('heroTitle2');
  if (heroTitle1) heroTitle1.textContent = t('hero.title1');
  if (heroTitle2) heroTitle2.textContent = t('hero.title2');

  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc) heroDesc.textContent = t('hero.desc');

  const heroBtn1 = document.getElementById('heroBtn1');
  const heroBtn2 = document.getElementById('heroBtn2');
  if (heroBtn1) heroBtn1.innerHTML = `<i class="fas fa-calendar-check"></i> ${t('hero.btn1')}`;
  if (heroBtn2) heroBtn2.innerHTML = `${t('hero.btn2')} <i class="fas fa-arrow-right"></i>`;

  // Stats
  document.getElementById('stat1') && (document.getElementById('stat1').textContent = t('hero.stat1'));
  document.getElementById('stat1l') && (document.getElementById('stat1l').textContent = t('hero.stat1l'));
  document.getElementById('stat2') && (document.getElementById('stat2').textContent = t('hero.stat2'));
  document.getElementById('stat2l') && (document.getElementById('stat2l').textContent = t('hero.stat2l'));
  document.getElementById('stat3') && (document.getElementById('stat3').textContent = t('hero.stat3'));
  document.getElementById('stat3l') && (document.getElementById('stat3l').textContent = t('hero.stat3l'));

  // About
  document.getElementById('aboutTitle') && (document.getElementById('aboutTitle').textContent = t('about.title'));
  document.getElementById('aboutSubtitle') && (document.getElementById('aboutSubtitle').textContent = t('about.subtitle'));
  document.getElementById('aboutName') && (document.getElementById('aboutName').textContent = t('about.name'));
  document.getElementById('aboutDesc1') && (document.getElementById('aboutDesc1').textContent = t('about.desc1'));
  document.getElementById('aboutDesc2') && (document.getElementById('aboutDesc2').textContent = t('about.desc2'));

  document.querySelectorAll('[data-i18n-feat]').forEach(el => {
    el.textContent = t(el.dataset.i18nFeat);
  });

  document.getElementById('aboutBadgeTitle') && (document.getElementById('aboutBadgeTitle').textContent = t('about.badge'));
  document.getElementById('aboutBadgeSub') && (document.getElementById('aboutBadgeSub').textContent = t('about.badget'));

  // Rooms
  document.getElementById('roomsTitle') && (document.getElementById('roomsTitle').textContent = t('rooms.title'));
  document.getElementById('roomsSubtitle') && (document.getElementById('roomsSubtitle').textContent = t('rooms.subtitle'));

  document.querySelectorAll('[data-i18n-room-name]').forEach(el => {
    el.textContent = t(`rooms.${el.dataset.i18nRoomName}.name`);
  });
  document.querySelectorAll('[data-i18n-room-desc]').forEach(el => {
    el.textContent = t(`rooms.${el.dataset.i18nRoomDesc}.desc`);
  });
  document.querySelectorAll('[data-i18n-room-amenities]').forEach(el => {
    el.textContent = t(`rooms.${el.dataset.i18nRoomAmenities}.amenities`);
  });
  document.querySelectorAll('[data-i18n-room-from]').forEach(el => {
    el.textContent = t('rooms.from');
  });
  document.querySelectorAll('[data-i18n-room-night]').forEach(el => {
    el.textContent = t('rooms.night');
  });

  // Services
  document.getElementById('servicesTitle') && (document.getElementById('servicesTitle').textContent = t('services.title'));
  document.getElementById('servicesSubtitle') && (document.getElementById('servicesSubtitle').textContent = t('services.subtitle'));

  const serviceCards = document.querySelectorAll('[data-i18n-service]');
  const services = t('services.items');
  if (typeof services === 'object' && Array.isArray(services)) {
    serviceCards.forEach((card, i) => {
      if (services[i]) {
        card.querySelector('.service-card-name').textContent = services[i].name;
        card.querySelector('.service-card-desc').textContent = services[i].desc;
      }
    });
  }

  // Gallery
  document.getElementById('galleryTitle') && (document.getElementById('galleryTitle').textContent = t('gallery.title'));
  document.getElementById('gallerySubtitle') && (document.getElementById('gallerySubtitle').textContent = t('gallery.subtitle'));

  // Testimonials
  document.getElementById('testimonialsTitle') && (document.getElementById('testimonialsTitle').textContent = t('testimonials.title'));
  document.getElementById('testimonialsSubtitle') && (document.getElementById('testimonialsSubtitle').textContent = t('testimonials.subtitle'));

  const testimonialCards = document.querySelectorAll('[data-i18n-testimonial]');
  const testimonials = t('testimonials.items');
  if (typeof testimonials === 'object' && Array.isArray(testimonials)) {
    testimonialCards.forEach((card, i) => {
      if (testimonials[i]) {
        card.querySelector('[data-i18n-testimonial-text]').textContent = testimonials[i].text;
        card.querySelector('[data-i18n-testimonial-name]').textContent = testimonials[i].name;
        card.querySelector('[data-i18n-testimonial-role]').textContent = testimonials[i].role;
      }
    });
  }

  // Reservas
  document.getElementById('reservasTitle') && (document.getElementById('reservasTitle').textContent = t('reservas.title'));
  document.getElementById('reservasSubtitle') && (document.getElementById('reservasSubtitle').textContent = t('reservas.subtitle'));

  const formLabels = {
    'formCheckin': 'reservas.form.checkin',
    'formCheckout': 'reservas.form.checkout',
    'formGuests': 'reservas.form.guests',
    'formRoom': 'reservas.form.room',
    'formName': 'reservas.form.name',
    'formEmail': 'reservas.form.email',
    'formPhone': 'reservas.form.phone',
    'formExtras': 'reservas.form.extras'
  };
  Object.entries(formLabels).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'LABEL') el.textContent = t(key);
      else if (el.tagName === 'OPTION' && el.value === '') el.textContent = t('reservas.form.roomOpt');
      else if (el.placeholder !== undefined) el.placeholder = t(key.replace('checkin','checkin').replace('checkout','checkout').replace('guests','guests').replace('room','room').replace('name','name').replace('email','email').replace('phone','phone').replace('extras','extras'));
    }
  });

  // Fix: More specific form field translations
  const formFields = {
    'formOptionDouble': 'reservas.form.double',
    'formOptionTwin': 'reservas.form.twin',
    'formOptionFamily': 'reservas.form.family'
  };
  Object.entries(formFields).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });

  const submitBtn = document.getElementById('formSubmit');
  if (submitBtn) submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${t('reservas.form.submit')}`;

  // Payment section translations
  const paymentTitle = document.querySelector('[data-i18n="reservas.payment.title"]');
  const paymentSubtitle = document.querySelector('[data-i18n="reservas.payment.subtitle"]');
  const payStripe = document.querySelector('[data-i18n="reservas.payment.payStripe"]');
  const paySecure = document.querySelector('[data-i18n="reservas.payment.secure"]');
  const confirmTitle = document.querySelector('[data-i18n="reservas.confirmation.title"]');
  const confirmDesc = document.querySelector('[data-i18n="reservas.confirmation.desc"]');
  if (paymentTitle) paymentTitle.textContent = t('reservas.payment.title');
  if (paymentSubtitle) paymentSubtitle.textContent = t('reservas.payment.subtitle');
  if (payStripe) payStripe.textContent = t('reservas.payment.payStripe');
  if (paySecure) paySecure.textContent = t('reservas.payment.secure');
  if (confirmTitle) confirmTitle.textContent = t('reservas.confirmation.title');
  if (confirmDesc) confirmDesc.textContent = t('reservas.confirmation.desc');

  // Contact
  document.getElementById('contactTitle') && (document.getElementById('contactTitle').textContent = t('contact.title'));
  document.getElementById('contactSubtitle') && (document.getElementById('contactSubtitle').textContent = t('contact.subtitle'));

  const contactItems = {
    'contactAddress': 'contact.address',
    'contactPhone': 'contact.phone',
    'contactEmail': 'contact.email'
  };
  Object.entries(contactItems).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });

  // Footer
  document.getElementById('footerDesc') && (document.getElementById('footerDesc').textContent = t('footer.desc'));
  document.getElementById('footerLinks') && (document.getElementById('footerLinks').textContent = t('footer.links'));
  document.getElementById('footerHotel') && (document.getElementById('footerHotel').textContent = t('footer.hotel'));
  document.getElementById('footerActivities') && (document.getElementById('footerActivities').textContent = t('footer.activities'));
  document.getElementById('footerContact') && (document.getElementById('footerContact').textContent = t('footer.contactF'));
  document.getElementById('footerLegal') && (document.getElementById('footerLegal').textContent = t('footer.legal'));
  document.getElementById('footerPrivacy') && (document.getElementById('footerPrivacy').textContent = t('footer.privacy'));
  document.getElementById('footerCookies') && (document.getElementById('footerCookies').textContent = t('footer.cookies'));
  document.getElementById('footerLegal2') && (document.getElementById('footerLegal2').textContent = t('footer.legal2'));
  document.getElementById('footerNewsletter') && (document.getElementById('footerNewsletter').textContent = t('footer.newsletter'));
  document.getElementById('footerNewsPh') && (document.getElementById('footerNewsPh').placeholder = t('footer.newsPh'));
  document.getElementById('footerNewsBtn') && (document.getElementById('footerNewsBtn').textContent = t('footer.newsBtn'));
  document.getElementById('footerCopy') && (document.getElementById('footerCopy').textContent = t('footer.copy'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Detect initial language
  const browserLang = navigator.language || navigator.userLanguage || '';
  let detected = 'es';
  if (browserLang.startsWith('gl')) detected = 'gl';
  else if (browserLang.startsWith('en')) detected = 'en';
  setLang(detected);

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  mobileToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = nav?.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
      const icon = mobileToggle?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Close AI voice if navigating away
  window.addEventListener('beforeunload', () => {
    if (window.hotelAI) {
      if (window.hotelAI.isRecording) window.hotelAI.stopVoiceInput();
      if (window.hotelAI.isSpeaking) window.hotelAI.stopSpeaking();
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== RESERVATION + PAYMENT FLOW =====
  let currentReservation = null;
  let stripeElements = null;
  let stripeClient = null;

  const reservaForm = document.getElementById('reservaForm');
  reservaForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('formSubmit');
    const originalText = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t('reservas.form.processing')}`;
      submitBtn.disabled = true;
    }

    const formData = {
      room_slug: document.getElementById('roomType')?.value,
      check_in: document.getElementById('checkin')?.value,
      check_out: document.getElementById('checkout')?.value,
      guests: document.getElementById('guests')?.value || 1,
      full_name: document.getElementById('fullName')?.value,
      email: document.getElementById('email')?.value,
      phone: document.getElementById('phone')?.value,
      extras: document.getElementById('extras')?.value || '',
    };

    try {
      const res = await fetch('/api/create-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      currentReservation = data;
      showNotification(
        currentLang === 'gl' ? 'Reserva creada con éxito!' : currentLang === 'en' ? 'Reservation created!' : '¡Reserva creada con éxito!',
        'success'
      );
      document.getElementById('paymentSection').style.display = 'block';
      document.getElementById('formSubmitStep').style.display = 'none';
      document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });

      await initPaymentMethods(data);
    } catch (err) {
      showNotification(err.message || 'Error al crear la reserva', 'error');
    }

    if (submitBtn) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  async function initPaymentMethods(data) {
    const { stripe, elements, paymentElement, clientSecret, error } = await initStripePayment(
      data.id, data.total_amount,
      `Reserva Hotel CEMAR - ${data.room_slug}`
    );

    if (error) {
      showNotification(error, 'error');
      return;
    }

    stripeClient = stripe;
    stripeElements = elements;

    const container = document.getElementById('stripePaymentElement');
    if (container && paymentElement) {
      paymentElement.mount('#stripePaymentElement');
      document.getElementById('stripePayBtn').disabled = false;
    }

    try {
      await initPayPalButton(
        'paypal-button-container',
        data.id,
        data.total_amount,
        (capture) => onPaymentSuccess('paypal', data.id),
        (err) => showNotification('PayPal error: ' + (err.message || err), 'error')
      );
    } catch {
      // PayPal SDK not loaded - user can still use Stripe
    }
  }

  document.getElementById('stripePayBtn')?.addEventListener('click', async () => {
    if (!stripeClient || !stripeElements) return;
    document.getElementById('stripePayBtn').disabled = true;
    document.getElementById('stripePayBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

    const { error } = await confirmStripePayment(stripeClient, stripeElements, null, window.location.href);
    if (error) {
      showNotification(error, 'error');
      document.getElementById('stripePayBtn').disabled = false;
      document.getElementById('stripePayBtn').innerHTML = '<i class="fas fa-lock"></i> Pagar con Stripe';
    } else {
      onPaymentSuccess('stripe', currentReservation?.id);
    }
  });

  function onPaymentSuccess(method, reservationId) {
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('confirmationSection').style.display = 'block';
    document.getElementById('confirmationId').textContent =
      currentLang === 'gl' ? `ID Reserva: ${reservationId}` :
      currentLang === 'en' ? `Reservation ID: ${reservationId}` :
      `ID de Reserva: ${reservationId}`;
    document.getElementById('confirmationSection').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('reservaForm')?.reset();
  }

  // Payment method toggle
  document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-btn').forEach(b => {
        b.className = b.className.replace(' active', '');
        b.className = b.classList.contains('btn-primary') ? 'btn btn-primary payment-method-btn' : 'btn btn-outline payment-method-btn';
      });
      btn.className = 'btn btn-primary payment-method-btn active';

      const method = btn.dataset.method;
      document.getElementById('stripePaymentContainer').style.display = method === 'stripe' ? 'block' : 'none';
      document.getElementById('paypalPaymentContainer').style.display = method === 'paypal' ? 'block' : 'none';
    });
  });

  // Newsletter form handler
  const newsForm = document.getElementById('newsletterForm');
  newsForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = newsForm.querySelector('input');
    const email = input?.value.trim();
    if (email) {
      try {
        const { error } = await subscribeNewsletter(email, currentLang);
        if (error && error.code !== '23505') throw error;
        showNotification(currentLang === 'gl' ? 'Subscrito correctamente!' : currentLang === 'en' ? 'Subscribed successfully!' : '¡Suscrito correctamente!', 'success');
      } catch {
        showNotification(currentLang === 'gl' ? 'Xa estás subscrito!' : currentLang === 'en' ? 'Already subscribed!' : '¡Ya estás suscrito!', 'success');
      }
      input.value = '';
    }
  });
});

function showNotification(message, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 3000);
}
