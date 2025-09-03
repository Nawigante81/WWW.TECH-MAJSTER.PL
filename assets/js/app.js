// ========== APP CORE / ROUTER / ENHANCEMENTS ==========
// Audit fixes (2025-08-23):
// 1. Dodano import pages.js (ESM) aby funkcje renderujące były dostępne
// 2. Zdefiniowano global DEBUG (wcześniej używany a niezdefiniowany)
// 3. Ujednolicono nazwę trasy 'o-nas' vs 'onas'
// 4. Dodano ochronę przed XSS w dynamicznych toastach/print (textContent już ok) + sanity check
// 5. Ulepszono focus management + skip link support (hook na #skipLink)
// 6. Drobne optymalizacje: throttling parallax (rAF) + early returns

import { renderHome, renderServices, renderWork, renderTips, renderPricing, renderAbout, renderFAQ, renderContact } from './pages.js';

/* Global DEBUG flag with window sync and safe module alias.
   - Provides a lexical DEBUG binding used by bare `if (DEBUG)` calls
   - Keeps it in sync with window.DEBUG so you can toggle in DevTools
*/
let DEBUG = (typeof window !== 'undefined' && typeof window.DEBUG !== 'undefined') ? !!window.DEBUG : false;
try {
  Object.defineProperty(window, 'DEBUG', {
    get() { return DEBUG; },
    set(v) { DEBUG = !!v; },
    configurable: true
  });
} catch (_) {}
// ensure property initialized
window.DEBUG = DEBUG;


// Helper
const $ = sel => document.querySelector(sel);

// Matrix background – produkcja z warunkowym debug + persist
const canvas = document.getElementById('matrix-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const chars = 'アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
  let fontSize = 14;
  /* Neon palette from CSS variables with fallback */
  function hexToRgb(h){
    const m = h.trim().replace('#','');
    const bigint = parseInt(m.length===3 ? m.split('').map(x=>x+x).join('') : m, 16);
    return { r:(bigint>>16)&255, g:(bigint>>8)&255, b:bigint&255 };
  }
  function getAccentPalette(){
    try{
      const cs = getComputedStyle(document.documentElement);
      const a1 = cs.getPropertyValue('--accent-1').trim() || '#00FF88';
      const a2 = cs.getPropertyValue('--accent-2').trim() || '#24d681';
      return { c1: hexToRgb(a1), c2: hexToRgb(a2) };
    }catch(_){ return { c1:{r:0,g:255,b:136}, c2:{r:36,g:214,b:129} }; }
  }
  let palette = getAccentPalette();
  let trailAlpha = 0.06;
  const storedMatrixPref = localStorage.getItem('matrixEnabled'); // '0' = off
  let running = true;
  function setup() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
    fontSize = Math.max(12, Math.min(18, Math.round(window.innerWidth / 90)));
    if (DEBUG) console.log('[Matrix] setup', { w: canvas.width, h: canvas.height, fontSize, dpr });
  }
  setup();
  const columns = () => Math.floor(window.innerWidth / fontSize);
  let drops = Array(columns()).fill(1);

  window.addEventListener('resize', () => {
    setup();
    drops = Array(columns()).fill(1);
    if (DEBUG) console.log('[Matrix] resized -> columns:', drops.length);
  });

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) {
      if (DEBUG) console.log('[Matrix] resume after hidden');
      requestAnimationFrame(draw);
    } else if (DEBUG) {
      console.log('[Matrix] paused (tab hidden)');
    }
  });

  function draw() {
    if (!running) return;
    ctx.fillStyle = `rgba(10,10,10,${trailAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      // Interpolate between accent-1 and accent-2 for neon vibe
      const t = Math.random();
      const r = Math.round(palette.c1.r + (palette.c2.r - palette.c1.r)*t);
      const g = Math.round(palette.c1.g + (palette.c2.g - palette.c1.g)*t);
      const b = Math.round(palette.c1.b + (palette.c2.b - palette.c1.b)*t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.98) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  // Uruchom animację tylko gdy włączona
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (storedMatrixPref !== '1' || reduceMotion) {
    running = false;
    canvas.style.display = 'none';
  } else {
    requestAnimationFrame(draw);
  }

  // Publiczny kontroler (enable/disable)
  window.__matrixControl = {
    enable(){
      if (running) return;
      running = true;
      canvas.style.display = '';
      localStorage.setItem('matrixEnabled','1');
      requestAnimationFrame(draw);
    },
    disable(){
      if (!running) return;
      running = false;
      canvas.style.display = 'none';
      localStorage.setItem('matrixEnabled','0');
    },
    isEnabled(){ return running; },
    setTrailAlpha(a){
      const v = Math.max(0, Math.min(0.2, Number(a)||0.06));
      trailAlpha = v;
    },
    refreshPalette(){
      palette = getAccentPalette();
    }
  };
}
// Router z smooth scroll
const app = document.getElementById('app');
const routes = {
  home: renderHome,
  uslugi: renderServices,
  realizacje: renderWork,
  porady: renderTips,
  cennik: renderPricing,
  'o-nas': renderAbout,
  onas: renderAbout, // alias dla spójności z pages.js ROUTES
  faq: renderFAQ,
  kontakt: renderContact,
};
// (modyfikacja) navigate – lucide guard
function navigate(hash) {
  const raw = (hash || '#home').replace('#', '');
  const key = raw === 'onas' ? 'o-nas' : (raw || 'home');
  const page = routes[key] || routes.home;
  showPreloader();
  setTimeout(() => {
    app.innerHTML = page();
    try { window.lucide?.createIcons?.(); } catch(_) {}
    hydratePage(key);
    setActiveNav(key);
    hidePreloader();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500 + Math.random()*400);
}
let _parallaxBound = false; // (przeniesione wykorzystanie flagi)
// REPLACED hydratePage – dodano guard dla parallax
function hydratePage(key){
  console.log('Hydrate page:', key);
  document.querySelectorAll('.fade-in, .slide-left, .slide-right')
    .forEach(el => observer.observe(el));

  if (key === 'porady') loadTips();
  if (key === 'realizacje') { enableLightbox(); console.log('Realizacje załadowane – lightbox enabled'); }
  if (key === 'cennik') { bindPriceFilter(); bindCostSimulator(); }
  if (key === 'kontakt') { bindContactForm(); }
  if (key === 'home') { startHeroScramble(); }

  if (!_parallaxBound) {
    window.addEventListener('scroll', parallaxEffect, { passive: true });
    _parallaxBound = true;
  }

  document.querySelectorAll('button, a[href]').forEach(el => {
    if (el.dataset.hpulse) return;
    el.dataset.hpulse = '1';
    el.addEventListener('mouseenter', () => el.classList.add('hover-pulse'));
    el.addEventListener('mouseleave', () => el.classList.remove('hover-pulse'));
  });

  if (window.AOS && typeof AOS.refreshHard === 'function') AOS.refreshHard();
  initStripePayments();
  if (key === 'cennik') initStripeCardForm();
  applyScrambleToPage(key);
  window.__routeKey = key;
}
// Modyfikacja parallaxEffect – uproszczona
let _parallaxScheduled = false;
function parallaxEffect() {
  if (_parallaxScheduled) return;
  _parallaxScheduled = true;
  requestAnimationFrame(()=>{
    _parallaxScheduled = false;
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = parseFloat(el.dataset.speed || '0.5');
      const y = window.scrollY * speed;
      el.style.backgroundPositionY = `${y}px`;
    });
  });
}
window.addEventListener('popstate', () => navigate(location.hash));
// Dźwięk kliknięcia (Web Audio) + obsługa nawigacji
let __clickFx;
function __initClickFx(){
  const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return ()=>{};
  const ctx = new Ctx();
  return function play(){
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(820 + Math.random()*80, now);
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
    o.connect(g).connect(ctx.destination);
    o.start(now); o.stop(now + 0.14);
  };
}
function playClick(){ if (!__clickFx) __clickFx = __initClickFx(); __clickFx(); }
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-route]');
  if (link) {
    playClick();
    e.preventDefault();
    history.pushState({}, '', link.getAttribute('href'));
    navigate(location.hash);
    const mm = document.getElementById('mobileMenu');
    if (mm) mm.classList.add('hidden');
    const mb = document.getElementById('openMenu');
    if (mb) mb.setAttribute('aria-expanded','false');
  }
});
// Mobile menu z animacją
document.getElementById('openMenu')?.addEventListener('click', ()=>{
  const btn = document.getElementById('openMenu');
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
  const expanded = !menu.classList.contains('hidden');
  if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  if (expanded) {
    menu.style.opacity = 0;
    setTimeout(() => menu.style.opacity = 1, 50);
    const first = menu.querySelector('a,button');
    try { first?.focus(); } catch(_) {}
  }
});
// Preloader (warp) – rotacja zabawnych linii
const loaderLines = [
  'Inicjalizuję moduł anty-kabel-w-plątaninie…',
  'Skanuję BIOS w poszukiwaniu kawy ☕',
  'Defragmentuję piksele w nagłówku…',
  'Kompresuję nadmiarowe bajty entuzjazmu…',
  'Uruchamiam nano-serwis do polerowania radiatorów…',
  'Analizuję pakiety: 42% memów wykryto.',
  'Optymalizuję flux strumienia bitów…',
  'Wstrzykuję dodatkowe FPS-y…',
  'Przepycham cache sprężonym powietrzem…',
  'Szyfruję żarty admina base64…',
  'Odpalam skrypt: sudo fix_everything.sh',
  'Kalibruję czujnik dystansu od deadline’u…',
  'Sprawdzam czy użytkownik to nie bot…',
  'Uruchamiam moduł warp_drive.so',
  'Wczytuję easter eggi…',
  'Inicjalizacja: quantum-turbo-lambda…',
  'Synchronizuję czas z zegarem atomowym w piwnicy…'
];
// Ulepszony showPreloader – tworzy markup jeśli brak
function showPreloader(){
  let el = document.getElementById('preloader');
  if (!el) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="preloader" class="hidden">
        <div class="text-center px-8">
          <div class=\"mb-4 text-3xl font-display animate-pulse warp-heading\">Przechodzę w WARP...</div>
          <span class=\"text-sm opacity-80 font-mono\"></span>
        </div>
      </div>
    `);
    el = document.getElementById('preloader');
  }
  const span = el.querySelector('span');
  if (span) span.textContent = loaderLines[Math.floor(Math.random()*loaderLines.length)];
  el.classList.remove('hidden');
}
function hidePreloader(){
  const el = document.getElementById('preloader');
  if (el) el.classList.add('hidden');
}
// Observer
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if (e.isIntersecting) e.target.classList.add('appear'); });
},{threshold:0.2});
// Tips loader z pełnymi treściami + "Czytaj więcej"
async function loadTips(){
  try {
    const grid = document.getElementById('tipsGrid');
    const articlesGrid = document.getElementById('articlesGrid');
    if (!grid) return;
    // === Losowe porady (details) generowane przy KAŻDYM wejściu ===
    const pool = window.__TIPS_POOL || (window.__TIPS_POOL = [
      ['Backup 3-2-1','3 kopie, 2 nośniki, 1 offsite. Testuj odtwarzanie!','Lista', ['Automatyzuj zadania','Szyfruj kopie offsite','Monitoruj logi backupu']],
      ['Czyszczenie laptopa','Niższe temperatury = dłuższa żywotność.','Punkty', ['Sprężone powietrze','Wymiana pasty','Kontrola obrotów']],
      ['Silne hasła i 2FA','Unikalne hasła + TOTP = podstawa.','Kroki', ['Menedżer haseł','Klucze FIDO2','Brak recyklingu haseł']],
      ['Optymalizacja Windows','Wyłącz zbędny autostart.','Checklist', ['Sterowniki chipsetu','TRIM dla SSD','Aktualizacje krytyczne']],
      ['Monitoring SMART','SMART ostrzega przed awarią.','Dbaj', ['CrystalDiskInfo','Temp <55°C','Backup przy warningach']],
      ['Chłodzenie PC','Przepływ powietrza = stabilność.','Porady', ['Front intake','Rear/top exhaust','Porządek kabli']],
      ['Sieć Wi-Fi 6E','Dobór kanału redukuje zakłócenia.','Punkty', ['Aktualny firmware','Wyłącz WPS','Osobny SSID gościnny']],
      ['VPN WireGuard','Lekki i szybki protokół.','Sekcja', ['Aktualizuj klucze','Segmentuj sieć','Logi tylko diagnostyczne']],
      ['Phishing','Sprawdzaj domeny i nadawcę.','Zasady', ['2FA wszędzie','Nie podawaj kodów','Menedżer haseł wykrywa fałszywki']],
      ['Szyfrowanie dysków','BitLocker / VeraCrypt chroni dane.','Zalecenia', ['Zachowaj klucz offline','Szyfruj nośniki mobilne','Test odczytu po wdrożeniu']],
      ['Segmentacja IoT','Izoluj urządzenia IoT.','Dlaczego', ['Oddzielny VLAN/SSID','Wyłącz UPnP','Aktualizuj firmware']],
      ['Odzysk danych start','Minimalizuj zapisy na źródle.','Kroki', ['Zatrzymaj użycie','Obraz ddrescue','Pracuj na kopii']],
      ['Bezpieczne kasowanie','SSD: Secure Erase / crypto erase.','Uwagi', ['Nie 35x nadpisywanie','1-3 przejścia HDD','Weryfikuj nośnik']],
      ['Termopady / VRM','Dobre termopady = niższe temp.','Checklist', ['Mierz grubość','Nie zgniataj','Monitoruj temperatury']],
['Dobre zgłoszenie serwisowe','Szczegółowy opis przyspiesza diagnozę.','Checklist', ['Objawy i kiedy się pojawiają','Co już było robione','Zdjęcia/filmy błędów']],
, ['Przygotowanie na wizytę','Przyspiesz serwis dzięki przygotowaniu.','Kroki', ['Backup ważnych danych','Hasło odblokowania/BIOS','Zasilacz i akcesoria']]
, ['Status naprawy','Kontakt usprawnia komunikację.','Punkty', ['Aktualny numer telefonu','Sprawdzaj skrzynkę e‑mail','Odbieraj SMS z etapami']]
, ['Modernizacja – zgodność','Sprawdź kompatybilność części.','Lista', ['Socket/Chipset','Wymiary GPU/obudowy','Moc i złącza zasilacza']]
, ['Reinstalacja i licencje','Zabezpiecz dostęp i klucze.','Zalecenia', ['Zapisz licencje i klucze','Dostęp do kont (MS/Apple)','Kopia profili przeglądarek']]
, ['Odzysk danych – czego NIE robić','Nie pogarszaj sytuacji.','Uwagi', ['Nie uruchamiaj chkdsk','Nie instaluj na tym dysku','Od razu odłącz nośnik']]
, ['Ochrona przed malware','Minimalizuj ryzyko infekcji.','Zasady', ['Aktualne łatki systemu/aplikacji','EDR/antywirus + regularne skanowanie','Wyłącz makra Office lub uruchamiaj z zaufanych źródeł','Nie uruchamiaj nieznanych plików/załączników','Używaj kont bez uprawnień admina']]
, ['Dobór zasilacza do PC','Stabilność wymaga właściwej mocy i jakości.','Checklist', ['Zapas mocy 20–30% ponad realny pobór','Certyfikat 80+ Bronze lub wyżej','Właściwe złącza (PCIe/CPU) i ilość linii','Amperaż na 12V zgodny z wymaganiami GPU/CPU','Niskie ripple i zabezpieczenia OVP/UVP/OPP']]
, ['Warto wymienić HDD na SSD?','Tak — ogromny wzrost responsywności.','Kroki', ['System na SSD (NVMe jeśli możliwe)','Klonowanie vs. świeża instalacja','Sprawdź złącza/M.2 i kieszeń 2.5”','Włącz TRIM, AHCI/PCIe/NVMe','Zostaw 10–20% wolnej przestrzeni']]
, ['Phishing – jak się chronić','Najczęstszy wektor ataku.','Zasady', ['Używaj 2FA (aplikacja/klucz FIDO2)','Sprawdzaj domeny i nadawcę','Nigdy nie podawaj kodów autoryzacyjnych','Menedżer haseł wykrywa fałszywe domeny','Zgłaszaj podejrzane wiadomości']]
, ['Backup – jak często?','Trzymaj się zasady 3‑2‑1.','Lista', ['Automatyczny backup ≥ 1×/tydz.','2 różne nośniki + 1 kopia offsite','Wersjonowanie plików','Test odtworzenia co kwartał','Szyfrowanie kopii zapasowych']]
, ['Zabezpieczenie Wi‑Fi','Podnieś bezpieczeństwo i zasięg.','Checklist', ['WPA3 + silne hasło','Aktualny firmware routera','Wyłącz WPS','Osobny SSID dla gości/VLAN','Analiza kanałów (Wi‑Fi Analyzer)']]
, ['Logi systemowe','Wczesne wykrycie problemów.','Źródła', ['Event Viewer','journalctl','Alerty / SIEM']]
    ]);
    // Wylosuj 12 unikalnych (lub mniej jeśli pula mniejsza)
    // Zawsze pokaż kluczowe tematy przeniesione z FAQ (pinned), resztę dobierz losowo
    const pinnedTitles = [
      'Ochrona przed malware',
      'Dobór zasilacza do PC',
      'Warto wymienić HDD na SSD?',
      'Phishing – jak się chronić',
      'Backup – jak często?',
      'Zabezpieczenie Wi‑Fi'
    ];
    const pinned = pool.filter(t => pinnedTitles.includes(t[0]));
    const rest = pool.filter(t => !pinnedTitles.includes(t[0]));
    const count = Math.min(12, pool.length);
    const restShuffled = rest.sort(() => Math.random() - 0.5);
    const fill = restShuffled.slice(0, Math.max(0, count - pinned.length));
    const selection = pinned.concat(fill);
    // Shuffle final selection so pinned mix with others each load
    for (let i = selection.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selection[i], selection[j]] = [selection[j], selection[i]];
    }
    grid.innerHTML = selection.map((t,i)=>`
      <details class="glass rounded-2xl p-6 fade-in" data-aos="fade-up" data-aos-delay="${i*40}">
        <summary class="cursor-pointer font-display font-bold text-lg">${t[0]}<span class="block text-xs text-slate-400 mt-1">${t[1]}</span></summary>
        <div class="mt-3 text-sm text-slate-300">
          ${t[2] ? `<p class="mb-2 font-medium text-accent/80">${t[2]}:</p>`:''}
          ${Array.isArray(t[3]) ? `<ul class="list-disc list-inside space-y-1">${t[3].map(li=>`<li>${li}</li>`).join('')}</ul>`:''}
        </div>
      </details>
    `).join('');
    const first = grid.querySelector('details');
    if (first) first.open = true;
    const spaceId = window.__CONTENTFUL_SPACE_ID || 'WSTAW_SPACE_ID';
    const accessToken = window.__CONTENTFUL_CDA_TOKEN || 'WSTAW_ACCESS_TOKEN';
    let articles = [];
    if (spaceId !== 'WSTAW_SPACE_ID' && accessToken !== 'WSTAW_ACCESS_TOKEN') {
      const cfRes = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=article`);
      if (!cfRes.ok) throw new Error('Contentful HTTP '+cfRes.status);
      const cfData = await cfRes.json();
      articles = cfData.items.map(it => ({
        title: it.fields.title,
        excerpt: it.fields.excerpt,
        content: it.fields.content,
        url: it.fields.url || '#'
      }));
    }
    if (!articles.length) {
      const res = await fetch('assets/data/articles.json');
      const data = await res.json();
      articles = data;
    }
    if (articlesGrid) {
      // Jeśli już istnieją statyczne kafelki (article > a[href^="/porada-"]) to NIE nadpisujemy ich widokiem <details>
      const hasStaticCards = articlesGrid.querySelector('article a[href^="/porada-"]');
      if (!hasStaticCards) {
        try {
          const limited = articles.slice(0,12);
          const truncate = (txt, n=160) => txt && txt.length > n ? txt.slice(0,n).trimEnd()+"…" : txt || '';
          const html = limited.map((a,i)=>{
            const excerptShort = truncate(a.excerpt, 180);
            // Minimal fallback (bez obrazów) – ale w praktyce zostanie zastąpione statycznym layoutem z pages.js
            return `
            <article class=\"glass rounded-2xl p-6 fade-in\" data-aos=\"fade-up\" data-aos-delay=\"${i*50}\">
              <h4 class=\"font-display font-bold\">${a.title}</h4>
              <p class=\"text-sm text-slate-300 mt-2\">${excerptShort}</p>
              <a href=\"/porada-${i+1}.html\" class=\"text-accent mt-3 inline-block\">Czytaj dalej →</a>
            </article>`;
          }).join('');
          articlesGrid.innerHTML = html || '<div class="text-sm text-slate-400">Brak artykułów do wyświetlenia.</div>';
        } catch(err){
          console.error('[ARTICLES] Błąd renderowania artykułów', err);
          articlesGrid.innerHTML = '<div class="text-sm text-red-400">Nie udało się załadować artykułów.</div>';
        }
      } else {
        if (DEBUG) console.log('[ARTICLES] Zachowano statyczne kafelki artykułów.');
      }
    }
    document.querySelectorAll('#tipsGrid .fade-in, #articlesGrid .fade-in').forEach(el => observer.observe(el));
    if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
  } catch(e){
    console.error('Błąd ładowania porad:', e);
  }
}
// Lightbox ulepszony
function enableLightbox(){
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('img');
  const appMain = document.getElementById('app');
  let prevFocus = null;

  function setDialog(open){
    if (open){
      box.setAttribute('role','dialog');
      box.setAttribute('aria-modal','true');
      appMain?.setAttribute('aria-hidden','true');
    } else {
      box.removeAttribute('aria-modal');
      appMain?.removeAttribute('aria-hidden');
    }
  }

  function trapKey(e){
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLb(); return; }
    if (e.key !== 'Tab') return;
    const focusables = box.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  }

  function openLb(){
    prevFocus = document.activeElement;
    box.classList.add('open');
    setDialog(true);
    const closeBtn = box.querySelector('.close');
    try { closeBtn?.focus(); } catch(_) {}
    document.addEventListener('keydown', trapKey);
  }

  function closeLb(){
    box.classList.remove('open');
    setDialog(false);
    document.removeEventListener('keydown', trapKey);
    try { prevFocus?.focus(); } catch(_) {}
  }

  document.querySelectorAll('[data-full]').forEach(card => {
    card.addEventListener('click', () => {
      if (!img) return;
      img.src = card.dataset.full;
      openLb();
    });
  });

  box.addEventListener('click', (e)=>{
    if (!e.target.closest('img')) closeLb();
  });
}
// Price filter
function bindPriceFilter(){
  const input = document.getElementById('priceFilter');
  const rows = () => Array.from(document.querySelectorAll('#priceTable tbody tr'));
  input.addEventListener('input', ()=>{
    const q = input.value.toLowerCase();
    rows().forEach(r => {
      const name = r.children[0].textContent.toLowerCase();
      r.style.display = name.includes(q) ? '' : 'none';
    });
  });
}
function bindCostSimulator(){
  const service = document.getElementById('sim-service');
  const qty = document.getElementById('sim-qty');
  const express = document.getElementById('sim-express');
  const distance = document.getElementById('sim-distance');
  const distanceOut = document.getElementById('sim-distance-out');
  const outNetto = document.getElementById('sim-netto');
  const outVat = document.getElementById('sim-vat');
  const outBrutto = document.getElementById('sim-brutto');
  if (!service || !qty || !express || !distance || !outNetto || !outVat || !outBrutto) return;

  const BASE = {
    /* Komputery i laptopy */
    cool_clean: 150,        // Czyszczenie + pasta/pady — od 150 zł
    full_service: 250,      // Pełny serwis konserwacyjny — od 250 zł
    dc_jack: 200,           // Gniazdo zasilania — od 200 zł
    kb_replace: 150,        // Klawiatura — od 150 zł
    hinges_case: 200,       // Zawiasy/obudowa — od 200 zł
    upgrade_clone: 200,     // Modernizacja RAM/SSD/HDD z klonowaniem — od 200 zł
    linux_dual: 250,        // Linux/dual boot — 250 zł
    data_migration: 150,    // Migracja danych — od 150 zł
    dev_setup: 300,         // Konfiguracja środowiska — od 300 zł
    power_board: 300,       // Układy zasilania płyty — od 300 zł
    screen_replace: 300,    // Wymiana matrycy — od 300 zł
    battery_service: 200,   // Bateria — od 200 zł
    data_recovery: 0,       // Odzysk danych — indywidualna wycena

    /* Smartfony i tablety */
    phone_battery: 150,     // Wymiana baterii — od 150 zł
    phone_restore: 200,     // Odblokowanie/przywrócenie systemu — od 200 zł
    phone_security: 100,    // Zabezpieczenie telefonu — 100 zł

    /* Sieci i IoT */
    wifi_router: 150,       // Konfiguracja routera i zabezpieczeń — od 150 zł
    home_vpn: 250,          // Instalacja VPN — od 250 zł
    smarthome_iot: 200,     // Integracja Smart Home — od 200 zł

    /* Cyberbezpieczeństwo */
    phishing_training: 400, // Testy phishingowe + szkolenia — od 400 zł
    fw_ids_setup: 600,      // Firewall / IDS (mała firma) — od 600 zł
    ransomware_cleanup: 0,  // Ransomware cleanup — indywidualna wycena

    /* Usługi premium */
    gaming_opt: 250,        // Optymalizacja PC pod gry — od 250 zł
    custom_build: 300,      // Montaż custom PC — od 300 zł
    watercool_mod: 0        // Modernizacja chłodzenia wodnego — wycena indywidualna
  };
  const KM_RATE = 2;   // 2 zł/km
  const VAT_RATE = 0.23;

  function round(z){ return Math.round(Number(z)||0); }
  function fmt(z){ return `${round(z)} zł`; }

  function calc(){
    const base = BASE[service.value] || 0;
    const q = Math.max(1, parseInt(qty.value || '1', 10));
    const km = Math.max(0, parseInt(distance.value || '0', 10));
    let netto = base * q + (km * KM_RATE);
    if (express.checked) netto *= 1.30; // +30%
    const vat = netto * VAT_RATE;
    const brutto = netto + vat;

    outNetto.textContent = fmt(netto);
    outVat.textContent = fmt(vat);
    outBrutto.textContent = fmt(brutto);
    if (distanceOut) distanceOut.textContent = `${km} km`;
  }

  ['input', 'change'].forEach(ev => {
    service.addEventListener(ev, calc);
    qty.addEventListener(ev, calc);
    express.addEventListener(ev, calc);
    distance.addEventListener(ev, calc);
  });

  calc();
}
 // Contact form z walidacją
function bindContactForm(){
  const form = document.getElementById('contactForm');
  const toast = (msg, ok=true) => {
    const t = document.createElement('div');
    t.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl ${ok ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'} border ${ok ? 'border-green-500/50' : 'border-red-500/50'} shadow-glow animate-fade-in`;
    t.setAttribute('role', ok ? 'status' : 'alert');
    t.setAttribute('aria-live', ok ? 'polite' : 'assertive');
    t.setAttribute('aria-atomic', 'true');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(), 3500);
  };
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if (!form.checkValidity()) {
      toast('Sprawdź pola formularza!', false);
      return;
    }
    const fd = new FormData(form);
    if (fd.get('company')) return; // honeypot
    try{
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: {'Accept':'application/json'} });
      if (res.ok) { form.reset(); toast('Wysłane! Odpiszemy błyskawicznie.'); }
      else toast('Błąd serwera. Spróbuj później.', false);
    }catch(err){ toast('Problem z siecią. Spróbuj ponownie.', false); }
  });
}
// News w footer z więcej
const news = [
  { text: 'Rekord: Odzysk 5TB po pożarze. Porada: Backup w chmurze!', href: '#' },
  { text: 'Nowy poradnik: Wi-Fi 6E w domu – zero lagów.', href: '#porady' },
  { text: 'Ekspresowa naprawa: Ekran w 30 min. Z gwarancją!', href: '#uslugi' },
  { text: 'Cybersec tip: Używaj 2FA wszędzie.', href: '#' },
  { text: 'Modernizacja PC: +50% FPS za 500 zł.', href: '#' }
];
const newsBox = document.getElementById('news');
if (newsBox) {
  newsBox.innerHTML = news.map(n => `<a class="chip-accent rounded-full px-5 py-3 fade-in inline-flex items-center justify-center hover:animate-floaty shadow-glow" href="${n.href}">${n.text}</a>`).join('');
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
/* =========================
  Personalizacja / Motyw
   ========================= */
function initPersonalization() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = savedTheme;
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelectorAll('.personal-greet').forEach(el => el.textContent = `Witaj, ${userName}!`);
  }
}

function bindThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Repurposed: toggle Matrix background ON/OFF
  const syncToggleUI = () => {
    const enabled = localStorage.getItem('matrixEnabled') === '1';
    const ico = btn.querySelector('i');
    if (ico) {
      ico.setAttribute('data-lucide', enabled ? 'binary' : 'circle-off');
      try { window.lucide?.createIcons?.(); } catch(_) {}
    }
    // Ensure visible text "Matrix ON/OFF"
    let label = btn.querySelector('.toggle-text');
    if (!label) {
      label = document.createElement('span');
      label.className = 'toggle-text ml-2 text-xs font-mono';
      btn.appendChild(label);
    }
    label.textContent = enabled ? 'Matrix ON' : 'Matrix OFF';

    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    btn.setAttribute('aria-label', enabled ? 'Matrix ON' : 'Matrix OFF');
    btn.title = enabled ? 'Matrix ON' : 'Matrix OFF';
  };

  if (!btn.dataset.bound) {
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const enabled = localStorage.getItem('matrixEnabled') === '1';
      const next = !enabled;
      localStorage.setItem('matrixEnabled', next ? '1' : '0');
      try {
        if (window.__matrixControl) {
          next ? window.__matrixControl.enable() : window.__matrixControl.disable();
        } else {
          const canvas = document.getElementById('matrix-bg');
          if (canvas) canvas.style.display = next ? '' : 'none';
        }
      } catch(_) {}
      syncToggleUI();
    });
  }

  // Initial UI sync
  syncToggleUI();
}

// (THEME) Auto-detect system preference jeśli brak zapisanego
function initTheme() {
  if (!localStorage.getItem('theme')) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.dataset.theme = localStorage.getItem('theme');
  }
}


/* Globalny toast (uniwersalny) – używany też przez Stripe (z ARIA) */
function showToast(msg, ok = true) {
  const t = document.createElement('div');
  t.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl z-[9999] ${
    ok ? 'bg-green-500/30 text-green-200 border-green-500/50' : 'bg-red-500/30 text-red-200 border-red-500/50'
  } border shadow-glow text-sm font-display backdrop-blur`;
  t.setAttribute('role', ok ? 'status' : 'alert');
  t.setAttribute('aria-live', ok ? 'polite' : 'assertive');
  t.setAttribute('aria-atomic', 'true');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 3500);
}

/* PWA: in-app update prompt banner */
function showUpdateBanner(reg) {
  try {
    if (document.getElementById('pwaUpdateBanner')) return;
    const wrap = document.createElement('div');
    wrap.id = 'pwaUpdateBanner';
    wrap.className = 'update-banner';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Nowa wersja aplikacji dostępna');
    wrap.innerHTML = `
      <div class="inner">
        <div class="msg">Nowa wersja aplikacji jest dostępna.</div>
        <div class="actions">
          <button type="button" class="btn-ghost" id="pwaLaterBtn">Później</button>
          <button type="button" class="btn-accent" id="pwaUpdateNowBtn">Aktualizuj teraz</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    const later = document.getElementById('pwaLaterBtn');
    const update = document.getElementById('pwaUpdateNowBtn');
    update?.focus();

    const close = () => { try { wrap.remove(); } catch(_) {} };

    later?.addEventListener('click', () => {
      close();
      // Optional: remember dismiss for this session
      try { sessionStorage.setItem('pwaUpdateDismissed','1'); } catch(_) {}
    });

    update?.addEventListener('click', () => {
      try {
        const waiting = reg.waiting || reg.installing;
        if (waiting) {
          waiting.postMessage('SKIP_WAITING');
          // controllerchange reload is handled globally during registration
        } else {
          reg.update?.();
          showToast?.('Aktualizacja rozpoczyna się…', true);
        }
      } catch (e) {
        console.warn('SW update failed:', e);
      } finally {
        close();
      }
    });

    // ESC to dismiss
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onEsc);
      }
    });
  } catch (e) {
    console.warn('showUpdateBanner failed', e);
  }
}

/* =========================
   Stripe Checkout (prosty wrapper)
   ========================= */
let __stripeInstance = null;
function initStripePayments(){
  if (!window.Stripe) return; // CDN nie załadowany
  if (!__stripeInstance){
    const pubKey = window.__STRIPE_PUBLISHABLE_KEY || 'pk_test_WSTAW_SWOJ_PUBLISHABLE_KEY';
    try {
      __stripeInstance = Stripe(pubKey);
    } catch(err){
      console.warn('Stripe init fail:', err);
      return;
    }
  }
  // Bindowanie przycisków tylko raz
  document.querySelectorAll('[data-checkout-plan]').forEach(btn=>{
    if (btn.dataset.stripeBound) return;
    btn.dataset.stripeBound = '1';
    btn.addEventListener('click', async ()=>{
      const plan = btn.getAttribute('data-checkout-plan');
      showToast('Przygotowuję płatność...', true);
      try{
        const res = await fetch('/api/create-checkout-session', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ plan })
        });
        if(!res.ok) throw new Error('HTTP '+res.status);
        const { id } = await res.json();
        if(!id) throw new Error('Brak ID sesji');
        const { error } = await __stripeInstance.redirectToCheckout({ sessionId: id });
        if (error) throw error;
      }catch(e){
        showToast('Błąd płatności: '+ e.message, false);
      }
    });
  });
}

// (STRIPE ELEMENTS) – dodatkowe płatności kartą
let __stripeCardMounted = false;
function initStripeCardForm(){
  if (!window.Stripe) return;
  const form = document.getElementById('payment-form');
  const mountPoint = document.getElementById('card-element');
  if (!form || !mountPoint || __stripeCardMounted) return;
  const stripe = Stripe(window.__STRIPE_PUBLISHABLE_KEY || 'pk_test_WSTAW_SWOJ_PUBLISHABLE_KEY');
  const elements = stripe.elements();
  const card = elements.create('card', { hidePostalCode: true });
  card.mount('#card-element');
  __stripeCardMounted = true;
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    showToast('Przetwarzam płatność...', true);
    const { paymentMethod, error } = await stripe.createPaymentMethod({ type:'card', card });
    if (error) {
      showToast('Błąd karty: '+error.message, false);
      return;
    }
    try {
      // Wyślij paymentMethod.id do backendu
      const r = await fetch('/api/process-payment', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ paymentMethodId: paymentMethod.id })
      });
      if(!r.ok) throw new Error('Serwer: '+r.status);
      showToast('Płatność przyjęta – dziękujemy!', true);
      form.reset();
    } catch(err){
      showToast('Błąd serwera: '+err.message, false);
    }
  });
}

/* ============ Web Vitals ============ */
function initWebVitals() {
  if (window.__vitalsInited) return;
  window.__vitalsInited = true;

  const wire = ({ name, value }) => {
    console.log('[WebVitals]', name, value);
    // fetch('/analytics',{method:'POST',body:JSON.stringify({name,value})}).catch(()=>{});
  };

  function bindAPI(api){
    api.getCLS(wire);
    api.getFID(wire);
    api.getLCP(wire);
    api.getINP?.(wire);
    api.getTTFB?.(wire);
  }

  if (window.webVitals) {
    bindAPI(window.webVitals);
  } else {
    // pozostajemy przy lekkim fallbacku lokalnym (web-vitals-fallback.js)
    if (DEBUG) console.log('[WebVitals] Using local fallback');
  }
}


// Hook po pierwszym renderze (po navigate)
function postInitialEnhancements() {
  initPersonalization();
  bindThemeToggle();
  initStripePayments();
  if (window.AOS && !window.__aosInited) {
    window.AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
    window.__aosInited = true;
  }
  const skip = document.getElementById('skipLink');
  if (skip) {
    skip.addEventListener('click', (e)=>{
      e.preventDefault();
      const main = document.getElementById('app');
      if (main) { main.setAttribute('tabindex','-1'); main.focus({preventScroll:false}); }
    });
  } else {
    const homeLink = document.querySelector('a[href="#home"], a[href="#"]');
    if (homeLink) { try { homeLink.focus(); } catch(_) {} }
  }
  // dodatkowe metryki
  initWebVitals();
  // usunięto initThreePreview (sekcja 3D wyłączona)

  // Sync panel theme checkbox jeśli istnieje
  const themeChk = document.getElementById('toggleTheme');
  if (themeChk) themeChk.checked = (document.documentElement.dataset.theme || 'dark') === 'dark';

}

/* --- Panel ustawień + Chatbot bindings --- */
// Settings button toggle
const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
let __settingsLastFocus = null;
if (settingsBtn && settingsMenu && !settingsBtn.dataset.bound) {
  settingsBtn.dataset.bound = '1';
  settingsBtn.addEventListener('click', () => {
    const willOpen = settingsMenu.classList.contains('hidden');
    if (willOpen) {
      settingsMenu.classList.remove('hidden');
      settingsBtn.setAttribute('aria-expanded','true');
      try { positionPanel(settingsBtn, settingsMenu); } catch(_) {}
      settingsMenu.setAttribute('aria-modal','true');
      __settingsLastFocus = document.activeElement;
      const focusable = settingsMenu.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      try { focusable?.focus(); } catch(_) {}
    } else {
      settingsMenu.classList.add('hidden');
      settingsBtn.setAttribute('aria-expanded','false');
      settingsMenu.setAttribute('aria-modal','false');
      try { (__settingsLastFocus || settingsBtn).focus(); } catch(_) {}
    }
  });
}
// Settings close (X)
const settingsClose = document.getElementById('settingsClose');
if (settingsClose && !settingsClose.dataset.bound) {
  settingsClose.dataset.bound = '1';
  settingsClose.addEventListener('click', () => settingsMenu?.classList.add('hidden'));
}
// Click outside to close
document.addEventListener('click', (e) => {
  if (!settingsMenu || settingsMenu.classList.contains('hidden')) return;
  if (e.target.closest('#settingsMenu') || e.target.closest('#settingsBtn')) return;
  settingsMenu.classList.add('hidden');
  settingsBtn?.setAttribute('aria-expanded','false');
  settingsMenu.setAttribute('aria-modal','false');
  try { settingsBtn?.focus(); } catch(_) {}
});
// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && settingsMenu && !settingsMenu.classList.contains('hidden')) {
    settingsMenu.classList.add('hidden');
    settingsBtn?.setAttribute('aria-expanded','false');
    settingsMenu.setAttribute('aria-modal','false');
    try { settingsBtn?.focus(); } catch(_) {}
  }
});

// Matrix toggle
const matrixCanvas = document.getElementById('matrix-bg');
const toggleMatrixEl = document.getElementById('toggleMatrix');
if (toggleMatrixEl && !toggleMatrixEl.dataset.bound) {
  toggleMatrixEl.dataset.bound = '1';
  // initial sync (jeśli user odpalił przed matrix init)
  if (localStorage.getItem('matrixEnabled') !== '1') toggleMatrixEl.checked = false;
  toggleMatrixEl.addEventListener('change', e => {
    const checked = e.target.checked;
    localStorage.setItem('matrixEnabled', checked ? '1' : '0');
    if (window.__matrixControl) {
      checked ? window.__matrixControl.enable() : window.__matrixControl.disable();
    } else if (matrixCanvas) {
      matrixCanvas.style.display = checked ? '' : 'none';
    }
  });
}

// Hacker mode, Animations, Accent preset
const toggleHackerEl = document.getElementById('toggleHacker');
const toggleAnimsEl = document.getElementById('toggleAnims');
const accentPresetEl = document.getElementById('accentPreset');

function applyAccentPreset(name){
  const root = document.documentElement;
  let a1 = '#00FF88', a2 = '#24d681';
  switch((name||'neon')){
    case 'emerald': a1 = '#34d399'; a2 = '#059669'; break;
    case 'aqua': a1 = '#22d3ee'; a2 = '#0ea5e9'; break;
    case 'neon':
    default: a1 = '#00FF88'; a2 = '#24d681';
  }
  root.style.setProperty('--accent-1', a1);
  root.style.setProperty('--accent-2', a2);
  root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${a1}, ${a2})`);
  localStorage.setItem('accentPreset', name||'neon');
  try { window.__matrixControl?.refreshPalette?.(); } catch(_) {}
}

function setHackerMode(on){
  const root = document.documentElement;
  if (on) root.setAttribute('data-hacker','1'); else root.removeAttribute('data-hacker');
  localStorage.setItem('hacker', on ? '1' : '0');
  // W trybie hakerskim wymuś dark + matrix on dla klimatu (opcjonalnie respektuj matrixEnabled)
  if (on) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('theme','dark');
    try { window.__matrixControl?.enable?.(); } catch(_) {}
    if (toggleMatrixEl) toggleMatrixEl.checked = true;
  }
}

function setAnimations(on){
  const root = document.documentElement;
  root.setAttribute('data-animations', on ? 'on' : 'off');
  localStorage.setItem('anims', on ? '1' : '0');
}

function initSettingsFromStorage(){
  // Accent
  const preset = localStorage.getItem('accentPreset') || 'neon';
  applyAccentPreset(preset);
  if (accentPresetEl) accentPresetEl.value = preset;

  // Hacker
  const hacker = localStorage.getItem('hacker') === '1';
  setHackerMode(hacker);
  if (toggleHackerEl) toggleHackerEl.checked = hacker;

  // Animations
  const anims = localStorage.getItem('anims');
  const animationsOn = anims == null ? true : (anims === '1');
  setAnimations(animationsOn);
  if (toggleAnimsEl) toggleAnimsEl.checked = animationsOn;

  // Matrix checkbox already synced above; ensure UI reflects storage
  if (toggleMatrixEl) {
    toggleMatrixEl.checked = (localStorage.getItem('matrixEnabled') === '1');
  }
}

// Bind UI controls once
if (toggleHackerEl && !toggleHackerEl.dataset.bound){
  toggleHackerEl.dataset.bound = '1';
  toggleHackerEl.addEventListener('change', e => setHackerMode(!!e.target.checked));
}
if (toggleAnimsEl && !toggleAnimsEl.dataset.bound){
  toggleAnimsEl.dataset.bound = '1';
  toggleAnimsEl.addEventListener('change', e => setAnimations(!!e.target.checked));
}
if (accentPresetEl && !accentPresetEl.dataset.bound){
  accentPresetEl.dataset.bound = '1';
  accentPresetEl.addEventListener('change', e => applyAccentPreset(e.target.value));
}

// Initialize persisted preferences
initSettingsFromStorage();

/* --- Chatbot ("Czas bota") --- */
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

function appendMsg(role, text){
  if (!chatLog) return;
  const msg = document.createElement('div');
  msg.className = `msg ${role} flex ${role==='user' ? 'justify-end' : 'justify-start'}`;
  msg.innerHTML = role === 'user'
    ? `<div class="max-w-[85%] rounded-xl px-3 py-2 bg-accent-gradient text-black font-medium shadow-glow">${text}</div>`
    : `<div class="max-w-[85%] rounded-xl px-3 py-2 border border-accent/30 bg-black/30 text-slate-200">${text}</div>`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function botAnswer(q){
  const s = (q||'').toLowerCase();
  if (!s.trim()) return 'Zadaj pytanie, np. „Ile trwa naprawa?”, „Czy dojeżdżacie?”, „Cennik?”.';
  if (s.includes('godzin') || s.includes('czynne') || s.includes('otwarte')) {
    return 'Godziny: pn–pt 9:00–17:00. W soboty po umówieniu. Pilne naprawy – kontakt telefoniczny.';
  }
  if (s.includes('dojazd') || s.includes('u klienta') || s.includes('dojezdz')) {
    return 'Tak, dojazd Zgorzelec + 50 km. Zdalnie (TeamViewer) także możliwe.';
  }
  if (s.includes('cena') || s.includes('koszt') || s.includes('cennik') || s.includes('ile koszt')) {
    return 'Przykładowe ceny: diagnoza 0–150 zł, reinstalacja 200 zł, odzysk danych od 300 zł. Pełny cennik w sekcji #cennik.';
  }
  if (s.includes('kontakt') || s.includes('telefon') || s.includes('mail') || s.includes('e-mail')) {
    return 'Telefon: +48 724 316 523, e-mail: acidsecurity@proton.me. Albo formularz w sekcji #kontakt.';
  }
  if (s.includes('napraw') || s.includes('ile trwa')) {
    return 'Typowo 1–3 dni. Pilne przypadki nawet w kilka godzin (zależnie od części).';
  }
  if (s.includes('backup') || s.includes('kopi') || s.includes('danych')) {
    return 'Zasada 3-2-1: 3 kopie, 2 nośniki, 1 poza lokalizacją. Szyfruj nośniki i testuj odtworzenie co kwartał.';
  }
  return 'Nie jestem pewien – zajrzyj do sekcji FAQ/Cennik lub napisz: #kontakt. Możesz też zapytać o: godziny, dojazd, cennik.';
}

function bindChatbot(){
  if (chatbotBtn && !chatbotBtn.dataset.bound){
    chatbotBtn.dataset.bound = '1';
    chatbotBtn.addEventListener('click', ()=>{
      const willOpen = chatbotPanel?.classList.contains('hidden');
      if (willOpen) {
        chatbotPanel.classList.remove('hidden'); try { positionPanel(chatbotBtn, chatbotPanel); } catch(_) {}
        chatbotBtn.setAttribute('aria-expanded','true');
        chatbotPanel.setAttribute('aria-modal','true');
        try { (chatInput || chatbotPanel).focus(); } catch(_) {}
      } else {
        chatbotPanel.classList.add('hidden');
        chatbotBtn.setAttribute('aria-expanded','false');
        chatbotPanel.setAttribute('aria-modal','false');
        try { chatbotBtn.focus(); } catch(_) {}
      }
      try { window.lucide?.createIcons?.(); } catch(_) {}
      if (chatLog && !chatLog.dataset.greeted) {
        chatLog.dataset.greeted = '1';
        appendMsg('bot','Cześć! Jestem bot od szybkich pytań. Zapytaj o godziny, dojazd, czy cennik.');
      }
    });
  }
  if (chatbotClose && !chatbotClose.dataset.bound){
    chatbotClose.dataset.bound = '1';
    chatbotClose.addEventListener('click', ()=>{
      if (!chatbotPanel) return;
      chatbotPanel.classList.add('hidden');
      chatbotPanel.setAttribute('aria-modal','false');
      chatbotBtn?.setAttribute('aria-expanded','false');
      try { chatbotBtn?.focus(); } catch(_) {}
    });
  }
  if (chatForm && !chatForm.dataset.bound){
    chatForm.dataset.bound = '1';
    chatForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const q = chatInput?.value?.trim();
      if (!q) return;
      appendMsg('user', q);
      chatInput.value = '';
      setTimeout(()=> appendMsg('bot', botAnswer(q)), 250);
    });
  }
}
// Bind chatbot once DOM is ready (elements są już w index.html)
bindChatbot();

// --- Inicjalizacja (dodano initTheme przed navigate) ---
// Krótka animacja boot (kolorowy pseudo-kod) zamiast promptu o imię
function bootAnimation(){
  return new Promise(res=>{
    if (sessionStorage.getItem('bootShown')) return res();
    sessionStorage.setItem('bootShown','1');
    const wrap = document.createElement('div');
    wrap.id = 'bootScreen';
    wrap.innerHTML = `<div class="boot-inner" aria-label="Ładowanie systemu">
<pre class="boot-log" id="bootLog"></pre>
</div>`;
    document.body.appendChild(wrap);
    const lines = [
      '[ INIT ] Inicjalizacja modułów...',
      '[ LOAD ] Sieć ⇢ OK',
      '[ CHECK] Bezpieczeństwo ⇢ OK',
      '[ GPU  ] Akceleracja efektów...',
      '[ READY] System Tech-Majster uruchomiony'
    ];
    const colors = ['clr-a','clr-b','clr-c','clr-d'];
    const logEl = document.getElementById('bootLog');
    let i=0;
    const tick = ()=>{
      if (i < lines.length){
        const span = document.createElement('span');
        span.className = colors[i % colors.length];
        span.textContent = lines[i];
        logEl.appendChild(span); logEl.appendChild(document.createTextNode('\n'));
        i++; setTimeout(tick, 90 + i*40);
      } else {
        setTimeout(()=>{
          wrap.classList.add('boot-done');
          setTimeout(()=>wrap.remove(), 250);
          res();
        }, 250);
      }
    };
    tick();
  });
}

initTheme(); // ustala motyw
bootAnimation().then(()=>{
  navigate(location.hash);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          const notify = (registration) => {
            const sw = registration.installing || registration.waiting;
            if (!sw) return;
            sw.addEventListener('statechange', () => {
              if (sw.state === 'installed' && navigator.serviceWorker.controller) {
                try {
                  if (typeof showUpdateBanner === 'function') {
                    showUpdateBanner(registration);
                  } else {
                    showToast?.('Nowa wersja dostępna – odśwież, aby zaktualizować.', true);
                  }
                } catch(_) {}
              }
            });
          };
          reg.addEventListener('updatefound', () => notify(reg));
          if (reg.waiting) {
            try {
              if (typeof showUpdateBanner === 'function') showUpdateBanner(reg);
              else showToast?.('Nowa wersja dostępna – odśwież, aby zaktualizować.', true);
            } catch(_) {}
          }
        })
        .catch(console.error);

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!window.__reloadingForSW) {
          window.__reloadingForSW = true;
          location.reload();
        }
      });
    });
  }
  postInitialEnhancements();
});

// ====== Accessibility helpers ======
function setActiveNav(active){
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href = a.getAttribute('href')||'';
    const r = href.replace('#','') || 'home';
    const match = r === active;
    a.classList.toggle('active', match);
    if (match) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
}

// funkcja initVoiceInput została usunięta (usunięto UI wymagające obsługi)

// ====== Hero scramble effect ======
const SCRAMBLE_CHARS = '█▓▒░#@%&/?+=<>_|{}[]()*$€01OILSEAxyzqwe!^~';
function scrambleText(el, options = {}) {
  if (!el || el.dataset.scrambled) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const animsOff = document.documentElement.getAttribute('data-animations') === 'off';
  const target = el.getAttribute('data-text') || el.textContent?.trim() || '';
  if (!target) return;
  el.dataset.scrambled = '1';
  if (reduce || animsOff) { el.textContent = target; return; }

  // Measure final size at current available width to lock height (avoid layout shake)
  const clone = document.createElement('span');
  const cs = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  clone.style.font = cs.font;
  clone.style.fontSize = cs.fontSize;
  clone.style.fontWeight = cs.fontWeight;
  clone.style.letterSpacing = cs.letterSpacing;
  clone.style.whiteSpace = cs.whiteSpace; // respect current wrapping
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.width = Math.ceil(rect.width || 0) + 'px';
  clone.textContent = target;
  document.body.appendChild(clone);
  const h = clone.offsetHeight;
  clone.remove();

  // Lock height on the heading container to avoid layout shake without changing wrapping
  const lockTarget = el.closest('h1, h2, h3') || el;
  lockTarget.style.minHeight = h + 'px';

  const letters = target.split('');
  const reveal = new Array(letters.length).fill(false);
  let frame = 0;
  const iterations = Math.max(10, Math.min(20, Math.round(letters.length * 0.8)));

  function tick(){
    let output = '';
    let done = true;
    for (let i=0; i<letters.length; i++) {
      if (reveal[i]) { output += letters[i]; continue; }
      if (frame > iterations + i*1.3) { reveal[i] = true; output += letters[i]; continue; }
      done = false;
      output += SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)];
    }
    el.textContent = output;
    frame++;
    if (done) {
      el.textContent = target;
      // release height lock a moment later (restore original layout)
      setTimeout(()=>{
        try { (lockTarget).style.minHeight=''; } catch(_){}
      }, 50);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function applyScrambleToPage(route){
  try{
    const root = document.getElementById('app') || document;
    let candidates = Array.from(root.querySelectorAll('h1, h2, h3'))
      .filter(el => el.id !== 'heroScramble' && !el.dataset.scrambled && (el.textContent||'').trim().length >= 8);
    if (!candidates.length) return;
    // Choose ~50%, cap to 12 to avoid heavy work
    candidates = candidates.filter((_,i)=> i%2===0).slice(0,12);
    candidates.forEach(el => scrambleText(el));
  }catch(e){ if (DEBUG) console.warn('applyScrambleToPage failed', e); }
}
function startHeroScramble(){
  const el = document.getElementById('heroScramble');
  if (!el) return;
  scrambleText(el);
}
/* === I18N + Panel positioning (appended) === */
function positionPanel(anchor, panel){
  try{
    if (!anchor || !panel) return;
    const r = anchor.getBoundingClientRect();
    const right = Math.max(20, window.innerWidth - r.right + 8);
    const bottom = Math.max(20, window.innerHeight - r.bottom + 8);
    panel.style.position = 'fixed';
    panel.style.left = 'auto';
    panel.style.right = right + 'px';
    panel.style.bottom = bottom + 48 + 'px';
  }catch(_){}
}
