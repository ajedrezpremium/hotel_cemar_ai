/* === HOTEL AI - ASISTENTE VIRTUAL INTELIGENTE CON RAG === */
/* Basado en el megaprompt: Hotel AI Ecosystem - Arquitectura de Agentes */
/* Integración con OpenRouter + Voz (STT/TTS) + Compartir/Copiar/RRSS */

class HotelAI {
  constructor() {
    this.lang = 'es';
    this.context = { profile: 'guest', authenticated: false, agent: 'orquestrador' };
    this.conversationHistory = [];
    this.chatOpen = false;
    this.isRecording = false;
    this.speechRecognition = null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.init();
  }

  init() {
    this.detectLanguage();
    this.render();
    this.bindEvents();
    this.showWelcomeBubble();
    this.setupSpeechRecognition();
  }

  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.startsWith('gl')) this.lang = 'gl';
    else if (browserLang.startsWith('en')) this.lang = 'en';
    else this.lang = 'es';
  }

  t(key) {
    const keys = key.split('.');
    let val = TRANSLATIONS[this.lang];
    for (const k of keys) {
      if (val && val[k] !== undefined) val = val[k];
      else return key;
    }
    if (typeof val === 'string' && val.includes('{lang}')) {
      const langNames = { es: 'español', gl: 'galego', en: 'English' };
      val = val.replace('{lang}', langNames[this.lang] || this.lang);
    }
    return val;
  }

  get langBCP() {
    return { es: 'es-ES', gl: 'gl-ES', en: 'en-US' }[this.lang] || 'es-ES';
  }

  get ttsLang() {
    return { es: 'es-ES', gl: 'gl-ES', en: 'en-US' }[this.lang] || 'es-ES';
  }

  render() {
    const html = `
      <div class="ai-widget" id="aiWidget">
        <div class="ai-widget-bubble" id="aiBubble">
          <strong>Hotel AI</strong><br>
          <span id="aiBubbleText">${this.t('ai.welcome').replace(/\*\*/g, '').split('.')[0]}.</span>
        </div>
        <button class="ai-widget-btn" id="aiToggle" aria-label="Abrir asistente Hotel AI">
          <span class="pulse"></span>
          <i class="fas fa-comment-dots"></i>
        </button>
      </div>

      <div class="ai-chat" id="aiChat">
        <div class="ai-chat-header">
          <div class="ai-chat-header-left">
            <div class="ai-chat-avatar">AI</div>
            <div class="ai-chat-title">
              <h4>Hotel AI</h4>
              <p>${this.lang === 'es' ? 'Online · 24/7' : this.lang === 'gl' ? 'En liña · 24/7' : 'Online · 24/7'}</p>
            </div>
          </div>
          <button class="ai-chat-close" id="aiClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="ai-chat-messages" id="aiMessages">
          <div class="ai-message">
            <div class="ai-message-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-message-body">
              <div class="ai-message-content">${this.formatMsg(this.t('ai.welcome'))}</div>
              <div class="ai-message-actions">
                <button class="ai-action-btn" onclick="hotelAI.speakText('${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}')" title="Escuchar"><i class="fas fa-volume-up"></i></button>
                <button class="ai-action-btn" onclick="hotelAI.shareText('${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}')" title="Compartir"><i class="fas fa-share-alt"></i></button>
                <button class="ai-action-btn" onclick="hotelAI.copyText(this)" data-copy="${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}" title="Copiar"><i class="fas fa-copy"></i></button>
                <button class="ai-action-btn ai-share-whatsapp" onclick="hotelAI.shareWhatsApp('${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}')" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                <button class="ai-action-btn ai-share-twitter" onclick="hotelAI.shareTwitter('${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}')" title="Twitter/X"><i class="fab fa-x-twitter"></i></button>
                <button class="ai-action-btn ai-share-facebook" onclick="hotelAI.shareFacebook('${this.t('ai.welcome').replace(/'/g, "\\'").replace(/\*\*/g, '').replace(/"/g, '&quot;')}')" title="Facebook"><i class="fab fa-facebook-f"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="ai-chat-input">
          <button class="ai-mic-btn" id="aiMic" title="${this.lang === 'es' ? 'Hablar' : this.lang === 'gl' ? 'Falar' : 'Speak'}">
            <i class="fas fa-microphone"></i>
          </button>
          <input type="text" id="aiInput" placeholder="${this.t('ai.placeholder')}" autocomplete="off">
          <button id="aiSend"><i class="fas fa-paper-plane"></i></button>
        </div>
        <div class="ai-voice-status" id="aiVoiceStatus" style="display:none;">
          <i class="fas fa-circle" style="color:#ef4444;animation:blink 1s infinite;font-size:0.5rem;vertical-align:middle;"></i>
          <span id="aiVoiceStatusText">${this.lang === 'es' ? 'Escuchando...' : this.lang === 'gl' ? 'Escoitando...' : 'Listening...'}</span>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'hotelAIContainer';
    container.innerHTML = html;
    document.body.appendChild(container);
    this.loadFontAwesome();
  }

  loadFontAwesome() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }

  bindEvents() {
    const toggle = document.getElementById('aiToggle');
    const chat = document.getElementById('aiChat');
    const close = document.getElementById('aiClose');
    const send = document.getElementById('aiSend');
    const input = document.getElementById('aiInput');
    const mic = document.getElementById('aiMic');
    const bubble = document.getElementById('aiBubble');

    toggle?.addEventListener('click', () => this.toggleChat());
    close?.addEventListener('click', () => this.closeChat());
    send?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.sendMessage(); });
    mic?.addEventListener('click', () => this.toggleVoiceInput());

    setTimeout(() => { bubble?.classList.add('show'); }, 1500);
    setTimeout(() => { bubble?.classList.remove('show'); }, 8000);

    toggle?.addEventListener('mouseenter', () => { bubble?.classList.add('show'); });
    toggle?.addEventListener('mouseleave', () => {
      if (!this.chatOpen) setTimeout(() => bubble?.classList.remove('show'), 2000);
    });

    document.addEventListener('click', (e) => {
      if (this.isSpeaking && !e.target.closest('.ai-action-btn')) {
        // Don't stop speaking on other clicks
      }
    });
  }

  showWelcomeBubble() {
    const bubble = document.getElementById('aiBubble');
    const text = document.getElementById('aiBubbleText');
    if (bubble && text) {
      text.textContent = this.t('ai.greeting').replace(/\*\*/g, '');
    }
  }

  toggleChat() {
    const chat = document.getElementById('aiChat');
    const bubble = document.getElementById('aiBubble');
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) {
      chat?.classList.add('open');
      bubble?.classList.remove('show');
      setTimeout(() => {
        const msgs = document.getElementById('aiMessages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
        document.getElementById('aiInput')?.focus();
      }, 100);
    } else {
      chat?.classList.remove('open');
    }
  }

  closeChat() {
    document.getElementById('aiChat')?.classList.remove('open');
    this.chatOpen = false;
    if (this.isRecording) this.stopVoiceInput();
    if (this.isSpeaking) this.stopSpeaking();
  }

  async sendMessage() {
    const input = document.getElementById('aiInput');
    const text = input?.value.trim();
    if (!text) return;
    input.value = '';

    this.addMessage(text, 'user');
    this.conversationHistory.push({ sender: 'user', text });

    this.showTyping();

    try {
      const response = await this.callAI(text);
      this.hideTyping();
      this.addMessage(response, 'ai');
      this.conversationHistory.push({ sender: 'ai', text: response });
    } catch {
      this.hideTyping();
      const fallback = await this.processLocalFallback(text);
      this.addMessage(fallback, 'ai');
      this.conversationHistory.push({ sender: 'ai', text: fallback });
    }
  }

  async callAI(message) {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        lang: this.lang,
        agent: this.context.agent || 'orquestrador',
        history: this.conversationHistory.slice(-10),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data.agent) this.context.agent = data.agent;
    return data.response;
  }

  addMessage(text, sender) {
    const container = document.getElementById('aiMessages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `ai-message ${sender}`;
    const plain = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/\n/g, ' ');
    const escaped = plain.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    div.innerHTML = `
      <div class="ai-message-avatar"><i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i></div>
      <div class="ai-message-body">
        <div class="ai-message-content">${this.formatMsg(text)}</div>
        ${sender === 'ai' ? `
        <div class="ai-message-actions">
          <button class="ai-action-btn" onclick="hotelAI.speakText('${escaped}')" title="${this.lang === 'es' ? 'Escuchar' : this.lang === 'gl' ? 'Escoitar' : 'Listen'}"><i class="fas fa-volume-up"></i></button>
          <button class="ai-action-btn" onclick="hotelAI.shareText('${escaped}')" title="${this.lang === 'es' ? 'Compartir' : this.lang === 'gl' ? 'Compartir' : 'Share'}"><i class="fas fa-share-alt"></i></button>
          <button class="ai-action-btn" onclick="hotelAI.copyText(this)" data-copy="${escaped}" title="${this.lang === 'es' ? 'Copiar' : this.lang === 'gl' ? 'Copiar' : 'Copy'}"><i class="fas fa-copy"></i></button>
          <button class="ai-action-btn ai-share-whatsapp" onclick="hotelAI.shareWhatsApp('${escaped}')" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
          <button class="ai-action-btn ai-share-twitter" onclick="hotelAI.shareTwitter('${escaped}')" title="Twitter/X"><i class="fab fa-x-twitter"></i></button>
          <button class="ai-action-btn ai-share-facebook" onclick="hotelAI.shareFacebook('${escaped}')" title="Facebook"><i class="fab fa-facebook-f"></i></button>
        </div>` : ''}
      </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  showTyping() {
    const container = document.getElementById('aiMessages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'ai-message';
    div.id = 'aiTyping';
    div.innerHTML = `
      <div class="ai-message-avatar"><i class="fas fa-robot"></i></div>
      <div class="ai-chat-typing"><span></span><span></span><span></span></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('aiTyping');
    typing?.remove();
  }

  formatMsg(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;');
  }

  matchAny(text, keywords) {
    return keywords.some(k => text.includes(k));
  }

  // ============================================================
  //  VOZ: SPEECH-TO-TEXT (STT) - MICRÓFONO
  // ============================================================

  setupSpeechRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      document.getElementById('aiMic')?.style.setProperty('display', 'none');
      return;
    }
    this.speechRecognition = new SR();
    this.speechRecognition.continuous = false;
    this.speechRecognition.interimResults = true;
    this.speechRecognition.lang = this.langBCP;

    this.speechRecognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          document.getElementById('aiInput').value = transcript;
          this.stopVoiceInput();
          this.sendMessage();
          return;
        } else {
          interim = transcript;
        }
      }
      document.getElementById('aiInput').value = interim;
    };

    this.speechRecognition.onerror = (event) => {
      console.warn('STT error:', event.error);
      this.stopVoiceInput();
      if (event.error === 'not-allowed') {
        this.showToast(this.lang === 'es' ? 'Permiso de micrófono denegado' : this.lang === 'gl' ? 'Permiso de micrófono denegado' : 'Microphone permission denied');
      }
    };

    this.speechRecognition.onend = () => {
      this.stopVoiceInput();
    };
  }

  toggleVoiceInput() {
    if (this.isRecording) {
      this.stopVoiceInput();
    } else {
      this.startVoiceInput();
    }
  }

  startVoiceInput() {
    if (!this.speechRecognition) {
      this.showToast(this.lang === 'es' ? 'Reconocimiento de voz no disponible' : this.lang === 'gl' ? 'Recoñecemento de voz non dispoñible' : 'Speech recognition not available');
      return;
    }
    try {
      this.speechRecognition.lang = this.langBCP;
      this.speechRecognition.start();
      this.isRecording = true;
      const mic = document.getElementById('aiMic');
      if (mic) {
        mic.classList.add('recording');
        mic.innerHTML = '<i class="fas fa-stop"></i>';
      }
      document.getElementById('aiVoiceStatus').style.display = 'flex';
      document.getElementById('aiInput').placeholder = this.lang === 'es' ? 'Habla ahora...' : this.lang === 'gl' ? 'Fala agora...' : 'Speak now...';
    } catch (e) {
      console.warn('STT start error:', e);
    }
  }

  stopVoiceInput() {
    try { this.speechRecognition?.stop(); } catch {}
    this.isRecording = false;
    const mic = document.getElementById('aiMic');
    if (mic) {
      mic.classList.remove('recording');
      mic.innerHTML = '<i class="fas fa-microphone"></i>';
    }
    document.getElementById('aiVoiceStatus').style.display = 'none';
    document.getElementById('aiInput').placeholder = this.t('ai.placeholder');
  }

  // ============================================================
  //  VOZ: TEXT-TO-SPEECH (TTS) - LEER RESPUESTA
  // ============================================================

  speakText(text) {
    if (!window.speechSynthesis) {
      this.showToast(this.lang === 'es' ? 'Síntesis de voz no disponible' : this.lang === 'gl' ? 'Síntese de voz non dispoñible' : 'Speech synthesis not available');
      return;
    }

    if (this.isSpeaking) {
      this.stopSpeaking();
      return;
    }

    const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = this.ttsLang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  // ============================================================
  //  COMPARTIR / COPIAR / RRSS
  // ============================================================

  copyText(btn) {
    const text = btn?.dataset?.copy;
    if (!text) return;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(this.lang === 'es' ? '✓ Copiado al portapapeles' : this.lang === 'gl' ? '✓ Copiado ao portapapeis' : '✓ Copied to clipboard');
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(this.lang === 'es' ? '✓ Copiado al portapapeles' : this.lang === 'gl' ? '✓ Copiado ao portapapeis' : '✓ Copied to clipboard');
    }
  }

  shareText(text) {
    const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
    if (navigator.share) {
      navigator.share({
        title: 'Hotel CEMAR - Hotel AI',
        text: clean,
        url: window.location.href,
      }).catch(() => {});
    } else {
      this.copyText({ dataset: { copy: clean } });
    }
  }

  shareWhatsApp(text) {
    const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
    const url = `https://wa.me/?text=${encodeURIComponent(clean + '\n\n— Hotel CEMAR AI')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  shareTwitter(text) {
    const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(clean)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  shareFacebook(text) {
    const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(clean)}&u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  showToast(msg) {
    const existing = document.querySelector('.ai-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'ai-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ============================================================
  //  FALLBACK LOCAL (cuando OpenRouter no responde)
  // ============================================================

  async processLocalFallback(text) {
    const lower = text.toLowerCase().trim();

    if (this.matchAny(lower, ['gracias', 'grazas', 'thank', 'thanks'])) return this.t('ai.thanks');
    if (this.matchAny(lower, ['hola', 'ola', 'hello', 'hi', 'hey'])) return this.t('ai.greeting');

    if (this.matchAny(lower, ['habitacion', 'habitación', 'room', 'cama', 'suite', 'alojamiento'])) {
      this.context.agent = 'comercial';
      const rooms = await this.fetchRoomsFromDB();
      if (rooms) return rooms;
      return this.t('ai.rooms');
    }

    if (this.matchAny(lower, ['precio', 'prezo', 'price', 'tarifa', 'canto', 'cost'])) {
      this.context.agent = 'comercial';
      const prices = await this.fetchPricesFromDB();
      if (prices) return prices;
      return this.t('ai.fallbackPrice');
    }

    if (this.matchAny(lower, ['reserv', 'booking', 'book', 'reserva'])) {
      this.context.agent = 'comercial';
      return `${this.t('ai.prices')}<br><br>👉 <a href="#reservas" onclick="document.getElementById('aiClose')?.click(); smoothScroll('#reservas')">${this.lang === 'es' ? 'Ir al formulario de reserva' : this.lang === 'gl' ? 'Ir ao formulario de reserva' : 'Go to booking form'}</a>`;
    }

    if (this.matchAny(lower, ['promoción', 'promocion', 'promotion', 'oferta', 'offer', 'desconto'])) {
      this.context.agent = 'comercial';
      return this.lang === 'es'
        ? 'Actualmente tenemos activas varias promociones. Te recomiendo consultar todas las ofertas disponibles en nuestra sección de <a href="#servicios">Promociones</a> o contactar con recepción para ofertas personalizadas.'
        : this.lang === 'gl'
        ? 'Actualmente temos activas varias promocións. Recoméndoche consultar todas as ofertas dispoñibles na nosa sección de <a href="#servizos">Promocións</a> ou contactar con recepción para ofertas personalizadas.'
        : 'We currently have several promotions active. I recommend checking all available offers in our <a href="#services">Promotions</a> section or contacting reception for personalized offers.';
    }

    if (this.matchAny(lower, ['spa', 'relax', 'bienestar', 'benestar', 'wellness'])) {
      this.context.agent = 'comercial';
      return this.lang === 'es'
        ? 'Contamos con un entorno natural ideal para el bienestar. Aunque no disponemos de spa cubierto, nuestra piscina exterior, jardines y el Club Hípico ofrecen experiencias de relajación únicas. Más información en <a href="#servicios">Servicios</a>.'
        : this.lang === 'gl'
        ? 'Contamos cun entorno natural ideal para o benestar. Aínda que non dispoñemos de spa cuberto, a nosa piscina exterior, xardíns e o Club Hípico ofrecen experiencias de relaxación únicas. Máis información en <a href="#servizos">Servizos</a>.'
        : 'We have a natural environment ideal for wellness. Although we don\'t have an indoor spa, our outdoor pool, gardens, and Equestrian Club offer unique relaxation experiences. More info at <a href="#services">Services</a>.';
    }

    if (this.matchAny(lower, ['localización', 'ubicación', 'location', 'onde', 'where', 'dirección', 'address', 'mapa', 'como chegar', 'como llegar'])) return this.t('ai.location');
    if (this.matchAny(lower, ['contacto', 'contact', 'teléfono', 'phone', 'email', 'correo'])) return this.t('ai.contact');

    if (this.matchAny(lower, ['actividad', 'actividade', 'activity', 'horse', 'cabalo', 'hípico', 'paintball', 'kayak', 'piscina', 'pool', 'campamento', 'senderismo'])) return this.t('ai.activities');

    if (this.matchAny(lower, ['mondariz', 'balneario', 'villa termal', 'augas', 'termas', 'termal', 'spa town', 'pueblo', 'valle del tea', 'val do tea'])) return this.t('ai.mondariz');

    if (this.matchAny(lower, ['restaurante', 'restaurant', 'comida', 'food', 'comer', 'cena', 'dinner', 'breakfast', 'cociña'])) {
      return this.lang === 'es'
        ? 'Nuestro restaurante ofrece gastronomía gallega tradicional con productos de temporada. Disponemos de desayuno, media pensión y menú del día. ¡Pregúntanos por nuestros platos estrella! Más info en <a href="#servicios">Servicios</a>.'
        : this.lang === 'gl'
        ? 'O noso restaurante ofrece gastronomía galega tradicional con produtos de tempada. Dispomos de almorzo, media pensión e menú do día. Pregúntanos polos nosos pratos estrela! Máis info en <a href="#servizos">Servizos</a>.'
        : 'Our restaurant offers traditional Galician cuisine with seasonal products. We serve breakfast, half board, and daily menu. Ask us about our signature dishes! More info at <a href="#services">Services</a>.';
    }

    if (this.matchAny(lower, ['proveedor', 'provedor', 'supplier', 'invoice', 'factura', 'pago', 'payment'])) {
      this.context.agent = 'administrativo';
      this.context.profile = 'proveedor';
      return this.lang === 'es'
        ? 'Bienvenido, proveedor. Para gestión de facturas y pagos, contacta con nuestro departamento administrativo en <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> o llama al <strong>+34 986 664 506</strong>.'
        : this.lang === 'gl'
        ? 'Benvido, provedor. Para xestión de facturas e pagos, contacta co noso departamento administrativo en <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> ou chama ao <strong>+34 986 664 506</strong>.'
        : 'Welcome, supplier. For invoice and payment management, contact our administrative department at <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> or call <strong>+34 986 664 506</strong>.';
    }

    if (this.matchAny(lower, ['mantenimiento', 'mantemento', 'maintenance', 'avaría', 'avería', 'incidencia', 'técnico', 'staff'])) {
      this.context.agent = 'tecnico';
      this.context.profile = 'staff';
      return this.lang === 'es'
        ? 'Hola. Para reportar una incidencia técnica, contacta con el equipo de mantenimiento interno en recepción o escribe a <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> indicando el parte de avería. Si eres staff autenticado, puedes acceder al panel interno desde el menú de administración.'
        : this.lang === 'gl'
        ? 'Ola. Para reportar unha incidencia técnica, contacta co equipo de mantemento interno en recepción ou escribe a <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> indicando o parte de avaría. Se es staff autenticado, podes acceder ao panel interno dende o menú de administración.'
        : 'Hello. To report a technical issue, contact the internal maintenance team at reception or write to <a href="mailto:recepcion@hhotelcemar.es">recepcion@hhotelcemar.es</a> with the breakdown report. If you are authenticated staff, you can access the internal panel from the admin menu.';
    }

    this.context.agent = 'orquestrador';
    return this.t('ai.notFound');
  }

  async fetchRoomsFromDB() {
    try {
      const res = await fetch('/api/rooms');
      if (!res.ok) return null;
      const rooms = await res.json();
      if (!rooms || rooms.length === 0) return null;

      let msg = this.lang === 'es' ? 'Contamos con estas habitaciones disponibles:\n\n' :
                this.lang === 'gl' ? 'Contamos con estas habitacións dispoñibles:\n\n' :
                'We have these rooms available:\n\n';

      rooms.forEach(r => {
        const name = r[`name_${this.lang}`] || r.name_es;
        msg += `• **${name}** — desde **${r.base_price}€**/noche\n`;
      });

      msg += `\n👉 Puedes consultar disponibilidad y reservar en nuestro [Sistema de Reservas](/reservas).`;
      return msg;
    } catch { return null; }
  }

  async fetchPricesFromDB() {
    try {
      const res = await fetch('/api/rooms');
      if (!res.ok) return null;
      const rooms = await res.json();
      if (!rooms || rooms.length === 0) return null;

      let msg = this.lang === 'es' ? 'Estas son nuestras tarifas actuales:\n\n' :
                this.lang === 'gl' ? 'Estas son as nosas tarifas actuais:\n\n' :
                'These are our current rates:\n\n';

      rooms.forEach(r => {
        const name = r[`name_${this.lang}`] || r.name_es;
        msg += `• **${name}**: **${r.base_price}€**/noche\n`;
      });

      msg += `\n${this.lang === 'es' ? 'Los precios pueden variar según temporada. Consulta nuestro' :
               this.lang === 'gl' ? 'Os prezos poden variar segundo tempada. Consulta o noso' :
               'Prices may vary by season. Check our'} [buscador de reservas online](/reservas) ${this.lang === 'es' ? 'para precios actualizados.' : this.lang === 'gl' ? 'para prezos actualizados.' : 'for updated prices.'}`;
      return msg;
    } catch { return null; }
  }
}

function smoothScroll(target) {
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  window.hotelAI = new HotelAI();
  window.smoothScroll = smoothScroll;
});
