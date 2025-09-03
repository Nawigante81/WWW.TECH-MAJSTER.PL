// pages.js z dużo więcej treści, zdjęciami, opisami, poradami
export function renderHome(){
  return `
  <section class="relative grid md:grid-cols-2 gap-8 items-center parallax pattern-bg" data-speed="0.4" aria-labelledby="homeTitle">
    <div class="fade-in neumorph p-4 rounded-2xl" data-aos="fade-up">
      <h1 id="homeTitle" class="text-5xl md:text-7xl font-extrabold font-display leading-tight hero-gradient font-brutal" data-aos="fade-right" aria-label="Serwis IT, który ogarnia temat.">
        <span id="heroScramble" data-text="Serwis IT, który ogarnia temat.">Serwis IT, który ogarnia temat.</span>
      </h1>
      <p class="mt-6 text-lg text-slate-300 personal-greet" data-aos="fade-up">Witaj! Kompleksowe naprawy z przejrzystą diagnostyką.</p>
      <p class="mt-4 text-base text-slate-300" data-aos="fade-up" data-aos-delay="50">
        Diagnoza, odzyskiwanie danych, zabezpieczenia, modernizacje i sieci – konkretnie, szybko i bez żargonu. Jasne terminy, czytelne wyceny, zero zaskoczeń.
      </p>
      <div class="mt-8 flex flex-wrap gap-4 items-center" data-aos="zoom-in" data-aos-delay="100">
        <a href="#kontakt" data-route="kontakt" class="btn-accent hover:animate-floaty hover-pulse will-change-transform" aria-label="Przejdź do sekcji Kontakt">Kontakt</a>
        <!-- SEO: stałe podstrony dla mocniejszego crawl -->
        <a href="/uslugi.html" class="btn-ghost hover:animate-floaty hover-pulse will-change-transform" aria-label="Przejdź do podstrony Usługi">Zobacz ofertę →</a>
        <a href="/cennik.html" class="btn-ghost hover:animate-floaty hover-pulse will-change-transform" aria-label="Przejdź do podstrony Cennik">Cennik →</a>
      </div>
      <ul class="mt-10 grid sm:grid-cols-3 gap-4 text-base" aria-label="Kluczowe atuty serwisu">
        <li class="glass rounded-xl p-4 slide-left" data-aos="fade-up"><b>95%+</b> skuteczności w odzysku. Porada: Zawsze backup!</li>
        <li class="glass rounded-xl p-4 slide-left" data-aos="fade-up" data-aos-delay="60"><b>1–2 dni</b> na naprawę. Szybko jak błyskawica.</li>
        <li class="glass rounded-xl p-4 slide-left" data-aos="fade-up" data-aos-delay="120"><b>12 mies.</b> gwarancji. Bezpieczeństwo na maxa.</li>
      </ul>
      <div class="mt-8" data-aos="fade-up" data-aos-delay="150">
        <h3 class="text-xl font-bold mb-4">Szybka porada: Jak chronić dane?</h3>
        <p class="text-sm text-slate-300">Stosuj zasadę 3-2-1, szyfruj nośniki mobilne, testuj odtwarzanie backupu co kwartał.</p>
      </div>
      <div class="mt-8" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-xl font-bold mb-4">Porada trendowa: CSS Grid > złożone layouty</h3>
        <p class="text-sm text-slate-300">Łącz Grid + minmax() + clamp() aby osiągnąć responsywność bez wielu media queries.</p>
      </div>
    </div>
    <div class="slide-right md:justify-self-end" aria-label="Ilustracje serwisowe" data-aos="fade-left">
      <div class="relative" data-aos="zoom-in">
  <img class="rounded-2xl shadow-glow animate-floaty" src="/assets/img/optimized/akin-cakiner-Otm0qEYA8K0-unsplash-1200.webp" srcset="/assets/img/optimized/akin-cakiner-Otm0qEYA8K0-unsplash-400.webp 400w, /assets/img/optimized/akin-cakiner-Otm0qEYA8K0-unsplash-800.webp 800w, /assets/img/optimized/akin-cakiner-Otm0qEYA8K0-unsplash-1200.webp 1200w, /assets/img/optimized/akin-cakiner-Otm0qEYA8K0-unsplash-1600.webp 1600w" sizes="(min-width:1024px) 50vw, 100vw" alt="Stanowisko diagnostyczne serwisu IT" loading="eager" fetchpriority="high" decoding="async" width="1200" height="800">
        <div class="absolute -bottom-8 -right-8 hidden sm:block glass p-4 rounded-2xl animate-floaty delay-1000" aria-label="Opis funkcji AI">
          <div class="text-accent font-display font-bold">Real-time diag + AI</div>
          <div class="text-xs text-slate-300">Logi, AI analiza, predykcja błędów.</div>
        </div>
      </div>
  <img class="mt-4 rounded-2xl shadow-glow" src="/assets/img/optimized/alessio-zaccaria-nT1UmzgFAXY-unsplash-1200.webp" srcset="/assets/img/optimized/alessio-zaccaria-nT1UmzgFAXY-unsplash-400.webp 400w, /assets/img/optimized/alessio-zaccaria-nT1UmzgFAXY-unsplash-800.webp 800w, /assets/img/optimized/alessio-zaccaria-nT1UmzgFAXY-unsplash-1200.webp 1200w, /assets/img/optimized/alessio-zaccaria-nT1UmzgFAXY-unsplash-1600.webp 1600w" sizes="(min-width:1024px) 50vw, 100vw" alt="Elektronika w trakcie serwisu" loading="lazy" decoding="async" width="1200" height="800">
    </div>
  </section>
  <section class="mt-24 grid md:grid-cols-3 gap-8 home-shortcuts" aria-label="Skróty usług">
    ${['Naprawy laptopów','Odzyskiwanie danych – krok po kroku','Usuwanie malware + hardening','Konfiguracja sieci Wi-Fi 6','Modernizacja PC dla gamerów','Serwis mobilny z dojazdem'].map((t,i)=>`
      <div class="glass rounded-2xl p-6 fade-in hover-pulse neumorph home-card" data-aos="fade-up" data-aos-delay="${i*60}">
        <div class="flex items-center gap-4 mb-3">
          <i data-lucide="${['wrench','hard-drive','shield','wifi','cpu','smartphone'][i]}" class="w-6 h-6 text-accent" aria-hidden="true"></i>
          <h3 class="font-display font-bold text-lg">${t}</h3>
        </div>
  ${([4,5].includes(i) ? `
    <figure class="svc-media">
      <img
        src="${[
          '/assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-800.webp',   /* 0: Naprawy laptopów */
          '/assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-800.webp',         /* 1: Odzyskiwanie danych */
          '/assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-800.webp',       /* 2: Usuwanie malware */
          '/assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-800.webp',             /* 3: Wi‑Fi 6 */
          '/assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-800.webp',      /* 4: Modernizacja PC */
          '/assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-800.webp'        /* 5: Serwis mobilny */
        ][i]}"
        srcset="${[
          '/assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-400.webp 400w, /assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-800.webp 800w, /assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-1200.webp 1200w',
          '/assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-400.webp 400w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-800.webp 800w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-1200.webp 1200w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-1600.webp 1600w',
          '/assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-400.webp 400w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-800.webp 800w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-1200.webp 1200w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-1600.webp 1600w',
          '/assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-400.webp 400w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-800.webp 800w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-1200.webp 1200w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-1600.webp 1600w',
          '/assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-400.webp 400w, /assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-800.webp 800w, /assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-1600.webp 1600w',
          '/assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-400.webp 400w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-800.webp 800w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-1200.webp 1200w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-1600.webp 1600w'
        ][i]}"
        sizes="(min-width:1024px) 300px, (min-width:768px) 45vw, 100vw"
        alt="Ilustracja usługi: ${t}" loading="lazy" decoding="async">
    </figure>
  ` : `
    <figure class="svc-media">
      <img
        src="${[
          '/assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-800.webp',   /* 0: Naprawy laptopów */
          '/assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-800.webp',         /* 1: Odzyskiwanie danych */
          '/assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-800.webp',       /* 2: Usuwanie malware */
          '/assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-800.webp',             /* 3: Wi‑Fi 6 */
          '/assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-800.webp',      /* 4: Modernizacja PC */
          '/assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-800.webp'        /* 5: Serwis mobilny */
        ][i]}"
        srcset="${[
          '/assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-400.webp 400w, /assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-800.webp 800w, /assets/img/optimized/john-karlo-mendoza-x0fIsFr0chc-unsplash-1200.webp 1200w',
          '/assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-400.webp 400w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-800.webp 800w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-1200.webp 1200w, /assets/img/optimized/joseph-greve-rst3YOh6LXA-unsplash-1600.webp 1600w',
          '/assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-400.webp 400w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-800.webp 800w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-1200.webp 1200w, /assets/img/optimized/anthony-choren-vThmudCFS_A-unsplash-1600.webp 1600w',
          '/assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-400.webp 400w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-800.webp 800w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-1200.webp 1200w, /assets/img/optimized/leon-lin-iDtkc80qGWw-unsplash-1600.webp 1600w',
          '/assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-400.webp 400w, /assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-800.webp 800w, /assets/img/optimized/auzi-asfarian-9wZfKxazNwU-unsplash-1600.webp 1600w',
          '/assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-400.webp 400w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-800.webp 800w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-1200.webp 1200w, /assets/img/optimized/jimmy-syachoke-ADRfECIm3uA-unsplash-1600.webp 1600w'
        ][i]}"
        sizes="(min-width:1024px) 300px, (min-width:768px) 45vw, 100vw"
        alt="Ilustracja usługi: ${t}" loading="lazy" decoding="async">
    </figure>
  `)}
        <div class="card-overlay">
          <p>${[
            'Szybka diagnoza, wymiana podzespołów, czyszczenie układu chłodzenia. Od prostych usterek po poważne awarie – ogarniemy temat.',
            'Dysk padł? Pendrive nie widzi plików? Przywracamy zdjęcia, dokumenty i wszystko, co ważne.',
            'Wykrywanie i eliminacja wirusów, trojanów i ransomware. Do tego dodatkowe zabezpieczenia, żeby drugi raz już nie wróciły.',
            'Stabilny internet bez lagów i zrywów. Ustawimy, zoptymalizujemy i zabezpieczymy Twoją sieć.',
            'Upgrade RAM, SSD, GPU – co tylko potrzebujesz. Zoptymalizujemy sprzęt pod maksymalne FPS-y i płynność.',
            'Nie musisz ruszać się z domu – przyjeżdżamy do Ciebie. Naprawy, instalacje i konfiguracje na miejscu.'
          ][i]}</p>
        </div>
      </div>
    `).join('')}
  </section>
  `;
}
export function renderServices(){
  return `
  <section class="space-y-10" aria-labelledby="servicesHeading">
    <header class="fade-in" data-aos="fade-up">
      <h2 id="servicesHeading" class="text-4xl md:text-5xl font-display font-bold">Usługi</h2>
    </header>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 services-grid">
      ${serviceCards().join('')}
    </div>
    <div id="lightbox" class="lightbox">
      <img src="" alt="Preview">
      <button class="close" aria-label="Zamknij lightbox">✕</button>
    </div>
  </section>
  `;
}
function serviceCards(){
  // Karty w stylu referencji – same usługi (bez porad)
  const items = [
    {
      icon:'cpu',
      title:'Diagnoza i naprawa',
      desc:'Płyty główne, zasilanie, chłodzenie, reinstalacje.',
      list:['Laptopy','Komputery PC','MacBook / iMac','Konsole (PS/Xbox/Nintendo)','Smartfony i tablety'],
      alt:'Diagnostyka i naprawa komputera – wnętrze PC'
    },
    {
      icon:'database',
      title:'Odzyskiwanie danych',
      desc:'HDD/SSD/RAID – logiczne i wybrane fizyczne.',
      list:['HDD 2.5"/3.5"','SSD SATA/NVMe','RAID 0/1/5/10','NAS/SAN','Karty SD/USB'],
      alt:'Nośniki danych – odzyskiwanie danych w serwisie'
    },
    {
      icon:'wifi',
      title:'Sieci i Wi‑Fi',
      desc:'Wi‑Fi 6/6E, mesh, VLAN, VPN. Koniec lagów.',
      list:['Routery Wi‑Fi 6/6E','Systemy Mesh','Access Pointy','Okablowanie LAN','VPN (WireGuard)'],
      alt:'Konfiguracja sieci bezprzewodowej – router i okablowanie'
    },
    {
      icon:'bug',
      title:'Usuwanie malware',
      desc:'Rootkity, ransomware, hardening systemu.',
      list:['Windows / macOS / Linux','Ransomware','Phishing cleanup','Antywirus / EDR','Hardening przeglądarek'],
      alt:'Bezpieczeństwo systemu – analiza zagrożeń'
    },
    {
      icon:'battery-charging',
      title:'Modernizacje',
      desc:'SSD, RAM, GPU – ciszej i szybciej.',
      list:['SSD / NVMe','RAM','GPU','Zasilacz (PSU)','Chłodzenie / airflow'],
      alt:'Modernizacja podzespołów komputera'
    },
    {
      icon:'smartphone',
      title:'Mobile',
      desc:'Ekrany, baterie, porty. Szybko z gwarancją.',
      list:['iPhone','Android','Wymiana baterii','Ekrany / szybki','Porty ładowania'],
      alt:'Serwis smartfonów – wymiana komponentów'
    },
    {
      icon:'shield',
      title:'Cyberbezpieczeństwo',
      desc:'Audyt, firewall, szkolenia dla zespołu.',
      list:['Audyt konfiguracji','Firewall / UTM','Polityka kopii','IAM / 2FA','Szkolenia użytkowników'],
      alt:'Ochrona systemów i sieci – cyberbezpieczeństwo'
    },
    {
      icon:'cloud',
      title:'Chmura i backup',
      desc:'OneDrive/Google Drive/NAS – automatyczne kopie.',
      list:['OneDrive / Google Drive','Synology / TrueNAS','Wersjonowanie plików','Kopie offsite','Szyfrowanie danych'],
      alt:'Usługi chmurowe i kopie zapasowe'
    }
  ];
  // STAŁE przypisanie obrazów (spójne z prerenderowaną uslugi.html)
  const IMG_BASES = [
    'clint-patterson-yGPxCYPS8H4-unsplash',      // Diagnoza i naprawa
    'samsung-memory-A5EG0zVPKRU-unsplash',       // Odzyskiwanie danych
    'caspar-camille-rubin-7SDoly3FV_0-unsplash', // Sieci i Wi‑Fi
    'growtika-P1gELxxufW0-unsplash',             // Usuwanie malware
    'gamercomp-ru-IDE_tD3rxV0-unsplash',         // Modernizacje
    'onur-binay-4Ykxp_t4i08-unsplash',           // Mobile
    'florian-olivo-gRQXs2KjrAo-unsplash',        // Cyberbezpieczeństwo
    'walling-qRyQWEAWaNY-unsplash'               // Chmura i backup
  ];
  const OPT_BASE = '/assets/img/optimized/';
  function buildFixed(base){
    const widths = [400,800,1200,1600];
    const srcset = widths.map(w=>`${OPT_BASE}${base}-${w}.webp ${w}w`).join(', ');
    return {
      thumb: `${OPT_BASE}${base}-400.webp`,
      full: `${OPT_BASE}${base}-1600.webp`,
      mid: `${OPT_BASE}${base}-800.webp`,
      srcset
    };
  }
  return items.map((i,idx)=>{
    const p = buildFixed(IMG_BASES[idx] || IMG_BASES[0]);
    return `
    <article class="svc-card slide-left" data-aos="fade-up" data-aos-delay="${idx*70}">
      <header class="svc-head">
        <div class="ico"><i data-lucide="${i.icon}" class="w-5 h-5 text-accent"></i></div>
        <h3 class="svc-title">${i.title}</h3>
      </header>
      
      ${Array.isArray(i.list) ? `<ul class="svc-list">${i.list.map(li=>`<li>${li}</li>`).join('')}</ul>` : ''}
      <figure class="svc-media" style="background:#030a06 url('${p.mid}') center/cover no-repeat;">
        <button class="group relative block rounded-xl overflow-hidden" data-full="${p.full}" aria-label="Powiększ zdjęcie: ${i.title}" style="position:absolute; inset:0;">
          <picture>
            <source type="image/webp" srcset="${p.srcset}" sizes="(min-width:1024px) 360px, (min-width:768px) 45vw, 100vw">
            <img src="${p.thumb}" alt="${i.alt}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">
          </picture>
          <noscript><img src="${p.mid}" alt="${i.alt}" style="width:100%;height:100%;object-fit:cover;"></noscript>
        </button>
      </figure>
    </article>
    `;
  });
}
export function renderWork(){
  // Lokalne zoptymalizowane obrazy (stałe) – spójne z wersją statyczną realizacje.html
  const OPT_BASE = '/assets/img/optimized/';
  const bases = [
    ['clint-patterson-yGPxCYPS8H4-unsplash','Serwis PC'],
    ['aedrian-salazar-VbUWr1tf5rI-unsplash','Mikrolutowanie'],
    ['caspar-camille-rubin-7SDoly3FV_0-unsplash','Sieci'],
    ['john-karlo-mendoza-x0fIsFr0chc-unsplash','Laptopy'],
    ['joseph-greve-rst3YOh6LXA-unsplash','iPhone'],
    ['samsung-memory-A5EG0zVPKRU-unsplash','Odzysk danych'],
    ['auzi-asfarian-9wZfKxazNwU-unsplash','Modernizacja'],
    ['florian-olivo-gRQXs2KjrAo-unsplash','Cybersec']
  ];

  // Dodatkowe losowe zdjęcia (16) z katalogu optimized
  const extra = [
  ['1click-2sQWytjcL1o-unsplash','Warsztat'],
    ['akin-cakiner-Otm0qEYA8K0-unsplash','Ilustracja serwisu'],
    ['alessio-zaccaria-nT1UmzgFAXY-unsplash','Elektronika'],
    ['alex-diffor-c7IACkxm9KE-unsplash','Schemat naprawy'],
    ['andre-tan-8yesL5ZPjIU-unsplash','Montaż'],
    ['andrew-_IBhDwV6PgI-unsplash','Diagnostyka'],
    ['anthony-choren-vThmudCFS_A-unsplash','Analiza sprzętu'],
    ['gamercomp-ru-IDE_tD3rxV0-unsplash','Modernizacja PC'],
    ['jimmy-syachoke-ADRfECIm3uA-unsplash','Serwis mobile'],
    ['leon-lin-iDtkc80qGWw-unsplash','Sieci i konfiguracja'],
    ['onur-binay-4Ykxp_t4i08-unsplash','Mobile – naprawa'],
    ['paulo-almeida-u_aOcQcF9Xc-unsplash','Konfiguracja'],
    ['raymond-hsu-eFBKa5Rw-0U-unsplash','Testy sprzętu'],
    ['walling-qRyQWEAWaNY-unsplash','Backup i chmura'],
    ['yannick-pipke-hHIk58IC2vI-unsplash','Warsztat 2'],
    ['zany-jadraque-bQuTdjCQfE0-unsplash','Realizacja']
  ];

  // Scal listę baz (oryginalne + dodatkowe)
  const allBases = bases.concat(extra);
  function buildSet(base, alt){
    const w = [400,800,1200,1600];
    return {
      alt,
      thumb: `${OPT_BASE}${base}-400.webp`,
      mid: `${OPT_BASE}${base}-800.webp`,
      full: `${OPT_BASE}${base}-1600.webp`,
      srcset: w.map(x=>`${OPT_BASE}${base}-${x}.webp ${x}w`).join(', ')
    };
  }
  const pics = allBases.map(([b,a])=>buildSet(b,a));
  return `
    <section>
  <h2 class="text-4xl md:text-5xl font-display font-bold fade-in">Realizacje – Galeria</h2>
      <p class="text-lg text-slate-300 fade-in">Mnóstwo zdjęć z warsztatu. Kliknij dla powiększenia z animacją.</p>
      <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${pics.map(p=>`
          <button class="group relative glass p-2 rounded-2xl overflow-hidden hover:shadow-glow slide-right" data-full="${p.full}" aria-label="Otwórz zdjęcie: ${p.alt}" style="background:#03140b url('${p.mid}') center/cover no-repeat;">
            <picture>
              <source type="image/webp" srcset="${p.srcset}" sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw">
              <img src="${p.thumb}" alt="${p.alt}" class="rounded-xl w-full h-64 object-cover transition group-hover:scale-105 group-hover:rotate-2" loading="lazy" decoding="async" width="400" height="300" style="mix-blend:normal;">
            </picture>
            <noscript><img src="${p.mid}" alt="${p.alt}" class="rounded-xl w-full h-64 object-cover" width="800" height="533"></noscript>
          </button>
        `).join('')}
      </div>
      <div id="lightbox" class="lightbox">
        <img src="" alt="Preview">
        <button class="close" aria-label="Zamknij lightbox">✕</button>
      </div>
    </section>
  `;
}
// Centralna lista artykułów (legacy modal – obecnie używamy osobnych stron porada-X.html)
const ARTICLES = [
  { base: 'akin-cakiner-Otm0qEYA8K0-unsplash', title: 'Jak zabezpieczyć domową sieć Wi-Fi — praktyczne kroki', excerpt: 'WPA3, silne hasło, segmentacja IoT, firewall i monitoring logów.' },
  { base: 'alessio-zaccaria-nT1UmzgFAXY-unsplash', title: 'Backup danych — strategia 3-2-1 w praktyce', excerpt: '3-2-1, wersjonowanie, test przywracania i szyfrowanie off‑site.' },
  { base: 'alex-diffor-c7IACkxm9KE-unsplash', title: 'Odzyskiwanie danych — co zrobić zanim będzie za późno', excerpt: 'Natychmiast zatrzymaj zapisy, obrazy sektorowe i plan DR.' },
  { base: '1click-5gIiuxKEBE0-unsplash', title: 'Bezpieczeństwo haseł — menedżery, MFA i higiena dostępu', excerpt: 'Unikalne hasła, MFA, passkey, monitorowanie wycieków.' },
  { base: 'benjamin-lehman-GNyjCePVRs8-unsplash', title: 'Optymalizacja Windows — porządki, zasoby i aktualizacje', excerpt: 'Autostart, czyszczenie, sterowniki, monitoring throttling.' },
  { base: 'christian-wiediger-3GUW88tRmv8-unsplash', title: 'Sieć domowa — segmentacja, IoT i VLAN-y', excerpt: 'VLAN, DNS filtering, aktualizacje firmware, logowanie zdarzeń.' },
  { base: 'dan-lefebvre-RfUy0XMCkhQ-unsplash', title: 'Phishing — rozpoznawanie i minimalizacja ryzyka', excerpt: 'DMARC, szkolenia, sandbox linków, raportowanie incydentów.' },
  { base: 'greg0rygall3gos-5RhScByvs4c-unsplash', title: 'Bezpieczeństwo urządzeń mobilnych — aktualizacje i MDM', excerpt: 'MDM, szyfrowanie, separacja danych i kontrola aplikacji.' },
  { base: 'hudson-mcnamara-Lf6exev6Ey0-unsplash', title: 'Bezpieczna przeglądarka — ustawienia, rozszerzenia, sandbox', excerpt: 'Hardening, anty‑tracking, separacja profili i analiza ryzyka.' },
  { base: 'mateus-duraes-dos-santos-ecJ0olHYrVU-unsplash', title: 'Domowy serwer/NAS — architektura, ZFS i backupy', excerpt: 'ZFS RAIDZ, VPN, szyfrowanie datasetów, 3‑2‑1 backup.' },
  { base: 'reinhart-julian-p5v8DENKY60-unsplash', title: 'Jak przyspieszyć komputer — sprzątanie systemu i autostart', excerpt: 'Porządek, TRIM, sterowniki, monitor zasobów, prewencja.' },
  { base: 'victor-chaidez-duVyXWDmtVI-unsplash', title: 'Jak wybrać komputer — balans CPU, GPU, RAM i zasilania', excerpt: 'Analiza potrzeb, parowanie CPU/GPU, RAM, PSU z zapasem.' }
];

export function renderTips(){
  const OPT_BASE = '/assets/img/optimized/';
  const articles = [
    { base: 'akin-cakiner-Otm0qEYA8K0-unsplash', title: 'Pełna diagnostyka laptopa — krok po kroku', excerpt: 'Jak przeprowadzić rzetelną diagnostykę laptopa, które narzędzia użyć i co zapisać w raporcie klienta.' },
    { base: 'alessio-zaccaria-nT1UmzgFAXY-unsplash', title: 'Odzyskiwanie danych: przypadki trudne i jak ich unikać', excerpt: 'Praktyczne wskazówki co robić po wykryciu utraty danych i kiedy natychmiast wyłączyć urządzenie.' },
    { base: 'alex-diffor-c7IACkxm9KE-unsplash', title: 'Malware— analiza i usuwanie', excerpt: 'Metody identyfikacji ransomware, narzędzia do czyszczenia i przywracania systemów.' },
    { base: '1click-5gIiuxKEBE0-unsplash', title: 'Modernizacja PC: dobór komponentów dla graczy', excerpt: 'Jak dobrać SSD, RAM i GPU aby zmaksymalizować wydajność bez przepłacania.' },
    { base: 'benjamin-lehman-GNyjCePVRs8-unsplash', title: 'Serwis mobilny — wymiana ekranów i baterii', excerpt: 'Najczęstsze problemy z telefonami i jak przyspieszyć naprawę zachowując jakość.' },
    { base: 'christian-wiediger-3GUW88tRmv8-unsplash', title: 'Naprawy płyt głównych — kiedy warto naprawiać', excerpt: 'Analiza kosztów naprawy płyty głównej vs. wymiana oraz mechanizmy decyzyjne.' },
    { base: 'dan-lefebvre-RfUy0XMCkhQ-unsplash', title: 'Bezpieczne podejście do odzysku z SSD', excerpt: 'Specyfika SSD — dlaczego procedury różnią się od dysków talerzowych i jak to wpływa na skuteczność.' },
    { base: 'greg0rygall3gos-5RhScByvs4c-unsplash', title: 'Audyt bezpieczeństwa dla małej firmy', excerpt: 'Krok po kroku: audyt konfiguracji, polityki backupu i podstawy segmentacji sieci.' },
    { base: 'hudson-mcnamara-Lf6exev6Ey0-unsplash', title: 'Backup hybrydowy: chmura + lokalnie', excerpt: 'Implementacja 3-2-1 w małej firmie z ograniczonym budżetem i narzędziami.' },
    { base: 'mateus-duraes-dos-santos-ecJ0olHYrVU-unsplash', title: 'Szybkie porady: naprawa portów i ładowania', excerpt: 'Diagnostyka i najczęstsze przyczyny uszkodzeń portów oraz jak je naprawić w warsztacie.' },
    { base: 'reinhart-julian-p5v8DENKY60-unsplash', title: 'Konfiguracja sieci domowej bez lagów', excerpt: 'Praktyczne ustawienia routera, QoS i optymalizacja sieci dla domowego biura.' },
    { base: 'victor-chaidez-duVyXWDmtVI-unsplash', title: 'Chłodzenie i termika: pasta, pasty i jeszcze raz pasta', excerpt: 'Jak poprawnie aplikować pastę, które produkty wybrać i kiedy wymieniać termopady.' }
  ];

  return `
    <section data-aos="fade-up">
      <h2 class="text-4xl md:text-5xl font-display font-bold fade-in">Porady – Dużo Tipów i Opisów</h2>
      <p class="text-lg text-slate-300 fade-in">Rozszerzone porady z przykładami i zdjęciami. Czytaj i stosuj!</p>
  <!-- Dynamiczne losowe porady (details) -->
  <div id="tipsGrid" class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite"></div>
  <h3 class="mt-16 text-2xl font-display font-bold">Artykuły / Dłuższe wpisy</h3>
  <div id="articlesGrid" class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${articles.map((a,i)=>`
      <article class="glass rounded-2xl p-6 fade-in" data-aos="fade-up" data-aos-delay="${i*60}">
        <picture>
          <source type="image/webp" srcset="${OPT_BASE}${a.base}-400.webp 400w, ${OPT_BASE}${a.base}-800.webp 800w, ${OPT_BASE}${a.base}-1200.webp 1200w, ${OPT_BASE}${a.base}-1600.webp 1600w" sizes="(min-width:1024px) 300px, (min-width:768px) 45vw, 100vw">
          <img class="rounded-xl w-full h-40 object-cover" src="${OPT_BASE}${a.base}-400.webp" alt="${a.title}" loading="lazy" decoding="async">
        </picture>
        <h4 class="font-display font-bold mt-4">${a.title}</h4>
        <p class="text-sm text-slate-300 mt-2">${a.excerpt}</p>
  <a href="/porada-${i+1}.html" class="text-accent mt-3 inline-block" aria-label="Przejdź do artykułu: ${a.title}">Czytaj dalej →</a>
      </article>
    `).join('')}
  </div>
    </section>
  `;
}

// Modal do wyświetlania pełnych artykułów
function setupArticleModal() {
  if (window._articleModalBound) return;

  // utility: get focusable elements inside node
  function getFocusable(container) {
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  }

  document.addEventListener('click', function handler(e){
    const btn = e.target.closest('.article-read');
    if (btn) {
      e.preventDefault();
      const idx = Number(btn.getAttribute('data-idx'));
      const art = ARTICLES[idx];
      if (!art) return;
      const modal = document.getElementById('articleModal');
      if (!modal) return;

      // remember opener to restore focus later
      window._lastArticleOpener = btn;
      btn.setAttribute('aria-expanded', 'true');

      const inner = modal.querySelector('.article-inner');
      inner.innerHTML = `
        <div class="article-media">
          <img src="/assets/img/optimized/${art.base}-1200.webp" srcset="/assets/img/optimized/${art.base}-400.webp 400w, /assets/img/optimized/${art.base}-800.webp 800w, /assets/img/optimized/${art.base}-1200.webp 1200w, /assets/img/optimized/${art.base}-1600.webp 1600w" alt="${art.title}" loading="lazy" decoding="async" style="width:100%;height:auto;border-radius:12px;">
        </div>
        <h2 id="modalTitle" data-modal-title class="mt-4">${art.title}</h2>
        <p class="text-slate-300 mt-2">${art.excerpt}</p>
        <div id="modalBody" class="mt-4 text-base text-slate-300">${art.body || ''}</div>
      `;

      // show modal and lock scroll
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // focus management
      const closeBtn = modal.querySelector('.article-close');
      const focusables = getFocusable(modal);
      // focus close button (first interactive control)
      setTimeout(() => {
        (closeBtn || focusables[0] || modal).focus();
      }, 10);

      // keydown handler for ESC and Tab trap
      function onKeyDown(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeModal();
          return;
        }
        if (e.key === 'Tab') {
          const nodes = getFocusable(modal);
          if (!nodes.length) {
            e.preventDefault();
            return;
          }
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      }

      function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown, true);
        // restore focus
        const opener = window._lastArticleOpener;
        if (opener) {
          opener.setAttribute('aria-expanded', 'false');
          try { opener.focus(); } catch (e) {}
        }
      }

      // attach keydown listener
      window.addEventListener('keydown', onKeyDown, true);

      // attach close click via event delegation (we already listen at document level below), but ensure clicking close/backdrop closes
      // store close function for use by delegated handler
      modal._closeModal = closeModal;
      return;
    }

    // delegated close: close button or backdrop click
    if (e.target.closest('.article-close') || e.target.id === 'articleModal') {
      const m = document.getElementById('articleModal');
      if (m) {
        // if we stored modal._closeModal, call it else fallback
        if (typeof m._closeModal === 'function') m._closeModal();
        else m.classList.remove('open');
      }
    }
  });

  window._articleModalBound = true;
}
export function renderPricing(){
  const rows = [
    ['Diagnoza sprzętu', '0–150 zł'],
    ['Reinstalacja OS + optymalizacja', '200 zł'],
    ['Odzyskiwanie danych (logiczne)', 'od 300 zł'],
    ['Odzyskiwanie danych (fizyczne)', 'wycena indywidualna'],
    ['Naprawy płyt głównych BGA', 'od 400 zł'],
    ['Instalacja sieci mesh Wi-Fi', 'od 400 zł'],
    ['Usuwanie malware + hardening', '250 zł'],
    ['Modernizacja PC (SSD + RAM)', 'od 150 zł'],
    ['Wymiana ekranu w smartfonie', 'od 200 zł'],
    ['Audyt cyberbezpieczeństwa', '500 zł'],
    // Dodane więcej pozycji
    ['Konfiguracja VPN', '150 zł'],
    ['Backup i chmura setup', '200 zł'],
    ['Czyszczenie i pasta termiczna', '100 zł']
  ];
  return `
    <section aria-labelledby="pricingTitle">
  <h2 id="pricingTitle" class="text-4xl md:text-5xl font-display font-bold fade-in" data-aos="fade-up">Cennik</h2>
  <p class="text-lg text-slate-300 fade-in" data-aos="fade-up" data-aos-delay="40">Rabaty dla stałych klientów.</p>
      <div class="mt-6 glass rounded-2xl p-6" data-aos="fade-up" data-aos-delay="120">
        <input id="priceFilter" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent" placeholder="Szukaj usługi..." aria-label="Filtr usług cennika">
        <div class="overflow-x-auto mt-4" role="region" aria-label="Tabela cen">
          <table id="priceTable" class="w-full text-base">
            <thead><tr class="text-left text-slate-400">
              <th class="py-3">Usługa</th><th class="py-3">Cena</th></tr></thead>
            <tbody>
              ${rows.map((r,i)=>`<tr class="border-t border-accent/15 fade-in" data-aos="fade-up" data-aos-delay="${i*40}"><td class="py-3">${r[0]}</td><td class="py-3">${r[1]}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="text-sm text-slate-400 mt-3">* Ceny netto + VAT. Porada: Zapytaj o pakiet usług dla zniżki.</p>
      </div>

      <!-- Symulator kosztów (zamiast przycisków Stripe i formularza) -->
      <div class="mt-8 glass rounded-2xl p-6" data-aos="fade-up">
        <h3 class="text-xl font-bold mb-4 font-display">Symulator kosztów (szacunkowo)</h3>
        <form id="sim-form" class="grid gap-4 md:grid-cols-2">
          <label class="block sim-tile">
            <span class="text-xs uppercase tracking-wide text-slate-400">Usługa</span>
            <select id="sim-service" class="mt-1 w-full field-dark">
  <optgroup label="Komputery i laptopy">
    <option value="cool_clean">Czyszczenie układu chłodzenia + wymiana pasty i termopadów — od 150 zł</option>
    <option value="full_service">Pełny serwis konserwacyjny laptopa (rozbiórka, czyszczenie, wymiana pasty/padów, kontrola chłodzenia) — od 250 zł</option>
    <option value="dc_jack">Wymiana/wlutowanie gniazda zasilania w laptopie — od 200 zł</option>
    <option value="kb_replace">Wymiana klawiatury w laptopie — od 150 zł</option>
    <option value="hinges_case">Wymiana zawiasów / obudowy — od 200 zł</option>
    <option value="upgrade_clone">Modernizacja pamięci RAM / SSD / HDD (z klonowaniem systemu) — od 200 zł</option>
    <option value="linux_dual">Instalacja systemu Linux/dual boot obok Windows — 250 zł</option>
    <option value="data_migration">Migracja danych między komputerami/laptopami — od 150 zł</option>
    <option value="dev_setup">Konfiguracja środowiska pracy (IDE, narzędzia developerskie, VPN) — od 300 zł</option>
    <option value="power_board">Diagnostyka i naprawa układów zasilania płyty głównej — od 300 zł</option>
    <option value="screen_replace">Wymiana matrycy w laptopie (FHD/4K) — od 300 zł</option>
    <option value="battery_service">Kalibracja i testy baterii, wymiana ogniw — od 200 zł</option>
    <option value="data_recovery">Odzyskiwanie danych z dysków SSD/HDD (fizyczne/logic) — indywidualna wycena</option>
  </optgroup>
  <optgroup label="Smartfony i tablety">
    <option value="phone_battery">Wymiana baterii w smartfonie/tablecie — od 150 zł</option>
    <option value="phone_restore">Odblokowanie / przywrócenie systemu (Android/iOS) — od 200 zł</option>
    <option value="phone_security">Zabezpieczenie telefonu (antywirus, blokady, kopie danych) — 100 zł</option>
  </optgroup>
  <optgroup label="Sieci i IoT">
    <option value="wifi_router">Konfiguracja routera i zabezpieczeń Wi‑Fi — od 150 zł</option>
    <option value="home_vpn">Instalacja VPN dla domu/firmy — od 250 zł</option>
    <option value="smarthome_iot">Integracja urządzeń Smart Home (IoT) — od 200 zł</option>
  </optgroup>
  <optgroup label="Cyberbezpieczeństwo">
    <option value="phishing_training">Testy phishingowe i szkolenia dla użytkowników — od 400 zł</option>
    <option value="fw_ids_setup">Konfiguracja firewall / IDS w małej firmie — od 600 zł</option>
    <option value="ransomware_cleanup">Usuwanie śladów po infekcji ransomware (analiza + restore) — indywidualna wycena</option>
  </optgroup>
  <optgroup label="Usługi premium">
    <option value="gaming_opt">Optymalizacja PC pod gry (sterowniki, OC, chłodzenie) — od 250 zł</option>
    <option value="custom_build">Montaż custom PC (na częściach klienta) — od 300 zł</option>
    <option value="watercool_mod">Modernizacja chłodzenia wodnego (AIO/custom loop) — wycena indywidualna</option>
  </optgroup>
</select>
          </label>

          <label class="block sim-tile">
            <span class="text-xs uppercase tracking-wide text-slate-400">Ilość urządzeń</span>
            <input id="sim-qty" type="number" min="1" value="1" class="mt-1 w-full field-dark">
          </label>

          <label class="flex items-center gap-3 sim-tile">
            <input id="sim-express" type="checkbox">
            <span>Tryb ekspresowy (+30%)</span>
          </label>

          <label class="block sim-tile">
            <span class="text-xs uppercase tracking-wide text-slate-400">Dojazd: <b id="sim-distance-out" class="text-accent">0 km</b></span>
            <input id="sim-distance" type="range" min="0" max="50" value="0" class="w-full">
            <span class="text-xs text-slate-400">0–50 km (2 zł/km)</span>
          </label>
        </form>

        <div class="mt-4 p-4 rounded-xl border border-accent/30 bg-black/30">
          <div class="text-sm text-slate-300">Suma netto: <b id="sim-netto">0 zł</b></div>
          <div class="text-sm text-slate-300">VAT 23%: <b id="sim-vat">0 zł</b></div>
          <div class="text-base font-display font-bold text-accent mt-1">Suma brutto: <span id="sim-brutto">0 zł</span></div>
          <p class="text-xs text-slate-500 mt-2">Wycena orientacyjna. Ostateczna cena po diagnozie.</p>
        </div>
      </div>
    </section>
  `;
}
export function renderAbout(){
  return `
    <section class="space-y-8" aria-labelledby="aboutTitle">
  <h2 id="aboutTitle" class="text-4xl md:text-5xl font-display font-bold fade-in" data-aos="fade-up">O nas</h2>
      <p class="text-lg text-slate-300 fade-in" data-aos="fade-up" data-aos-delay="40">Zespół ekspertów z 15+ lat doświadczenia. Specjalizujemy się w hardware, software, sieciach i cybersec.</p>
      <div class="grid md:grid-cols-3 gap-6">
        ${['onas3','onas2','onas1'].map((base,i)=>{
          const titles = ['Doświadczenie 15+ lat w IT','Zaawansowane lab z AI diag','Certyfikaty CISSP, CompTIA+'];
            const icon = ['trophy','microscope','badge-check'][i];
            const t = titles[i];
            const delay = i*80;
            const srcset = [400,800,1200,1600].map(w=>`/assets/img/optimized/${base}-${w}.webp ${w}w`).join(', ');
            return `
            <div class=\"glass rounded-2xl p-6 slide-right neumorph\" data-aos=\"fade-up\" data-aos-delay=\"${delay}\">\n              <div class=\"flex items-center gap-4 mb-3\">\n                <i data-lucide=\"${icon}\" class=\"w-6 h-6 text-accent\" aria-hidden=\"true\"></i>\n                <h3 class=\"font-display font-bold text-lg\">${t}</h3>\n              </div>\n              <p class=\"text-base text-slate-300 mb-4\">Stawiamy na jakość i przewidywalność. Aktualizacje bezpieczeństwa to priorytet.</p>\n              <picture>\n                <source type=\"image/webp\" srcset=\"${srcset}\" sizes=\"(min-width:1024px) 300px, (min-width:768px) 45vw, 100vw\">\n                <img class=\"rounded-xl\" src=\"/assets/img/optimized/${base}-400.webp\" alt=\"Zespół: ${t}\" loading=\"lazy\" decoding=\"async\" width=\"400\" height=\"300\">\n              </picture>\n              <noscript><img class=\"rounded-xl\" src=\"/assets/img/optimized/${base}-800.webp\" alt=\"Zespół: ${t}\" width=\"800\" height=\"533\"></noscript>\n            </div>`;}).join('')}
        </div>
      <div class="mt-8" data-aos="fade-up" data-aos-delay="260">
        <h3 class="text-xl font-bold mb-4">Nasza misja</h3>
        <p class="text-base text-slate-300">Dostarczać najlepsze rozwiązania IT z efektami wizualnymi i praktycznymi poradami.</p>
      </div>
    </section>
  `;
}
export function renderFAQ(){
  const qa = [
    ['Ile trwa naprawa?', 'Zazwyczaj 1–3 dni. Pilne – nawet w godziny.'],
    ['Czy dojeżdżacie do klienta?', 'Tak, Zgorzelec + 50 km. Zdalnie przez TeamViewer.'],
    ['Czy odzyskacie 100% danych?', 'Staramy się o 95%+. Nikt nie gwarantuje 100%.'],
    ['Jaka gwarancja na usługi?', '12 miesięcy na części i pracę.'],
    ['Co z sieciami w dużym domu?', 'System mesh.'],
    ['Ile kosztuje modernizacja?', 'Od 150 zł.'],
    ['Czy tracę dane przy reinstalacji?', 'Nie, jeśli wykonamy kopię lub masz backup.'],
    ['Czy naprawiacie MacBooki?', 'Tak – diagnostyka, klawiatury, płyty, układy zasilania.'],
    ['Co jeśli sprzęt się przegrzewa?', 'Czyszczenie i pasta termiczna często rozwiązuje problem.'],
    ['Czy mogę śledzić status naprawy?', 'Tak – mail/SMS z etapami.'],
    ['Czy odzyskujecie dane z RAID?', 'Tak – logiczne i częściowo fizyczne.'],
    ['Czy instalujecie system od zera?', 'Tak, z aktualizacjami sterowników i optymalizacją.'],
    ['Czy naprawa anuluje gwarancję producenta?', 'Zależy od zakresu.'],
    ['Czy odzyskanie danych jest zawsze możliwe?', 'Nie – uszkodzenia mechaniczne mogą to uniemożliwić.'],
    ['Czy pomagacie dobrać części do modernizacji?', 'Tak – kompletna lista kompatybilnych komponentów.']
  ];
  return `
    <section>
  <h2 class="text-4xl md:text-5xl font-display font-bold fade-in" data-aos="fade-up">FAQ</h2>
      <div class="mt-6 grid md:grid-cols-2 gap-6">
        ${qa.map((q,i) => `
        <details class="glass rounded-2xl p-6 fade-in" data-aos="fade-up" data-aos-delay="${i*70}">
          <summary class="cursor-pointer font-display font-bold text-lg">${q[0]}</summary>
          <p class="mt-3 text-base text-slate-300">${q[1]}</p>
        </details>`).join('')}
      </div>
    </section>
  `;
}
export function renderContact(){
  return `
    <section class="space-y-8">
      <h2 class="text-4xl md:text-5xl font-display font-bold fade-in" data-aos="fade-up">Kontakt – Szybki i Efektywny</h2>
      <p class="text-lg text-slate-300 fade-in" data-aos="fade-up" data-aos-delay="40">Napisz, zadzwoń lub użyj formularza. Odpowiadamy w &lt;1h. Dodaliśmy walidację i efekty.</p>
      <div class="grid md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="80">
        <form id="contactForm" action="https://formspree.io/f/mldlqknp" method="POST" class="glass rounded-2xl p-6 slide-left">
          <input type="text" name="name" autocomplete="name" required minlength="3" placeholder="Imię i nazwisko" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
          <input type="email" name="email" autocomplete="email" required placeholder="Email" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
          <input type="tel" name="phone" autocomplete="tel" pattern="[0-9]{9,}" placeholder="Telefon" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
          <textarea name="message" autocomplete="on" required minlength="10" placeholder="Opisz problem szczegółowo" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base h-40 focus:border-accent transition-colors"></textarea>
          <input type="text" name="company" class="hidden" tabindex="-1" autocomplete="off">
          <button class="btn-submit-primary font-display font-bold" type="submit" aria-label="Wyślij formularz kontaktowy">
            Wyślij zapytanie
          </button>
          <p class="text-sm text-slate-400 mt-3">Akceptujesz politykę prywatności. Porada: Dodaj zdjęcia problemu dla szybszej diagnozy.</p>
        </form>
        <div class="space-y-4 slide-right">
  <div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="100"><i data-lucide="map-pin" class="inline w-5 h-5 text-accent"></i> 59-900 Zgorzelec</div>
          <div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="140"><i data-lucide="phone" class="inline w-5 h-5 text-accent"></i> <a href="tel:+48724316523" class="hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent">+48 724 316 523</a></div>
          <div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="180"><i data-lucide="mail" class="inline w-5 h-5 text-accent"></i> <a href="mailto:acidsecurity@proton.me" class="hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent">acidsecurity@proton.me</a></div>
        </div>
      </div>
    </section>
  `;
}

// (1) Flaga dla lightbox, by nie dublować handlera
let _lightboxBound = false;

// (lightbox) zmiana: używamy klasy .open zamiast display
export function setupLightbox() {
  if (_lightboxBound) return;
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button[data-full]');
    if (btn) {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox) return;
      const img = lightbox.querySelector('img');
      img.src = btn.getAttribute('data-full');
      img.alt = btn.querySelector('img').alt;
      lightbox.classList.add('open');          // <--- zamiast style.display
    }
    if (e.target.closest('.close') || (e.target.id === 'lightbox')) {
      const lb = document.getElementById('lightbox');
      if (lb) lb.classList.remove('open');     // <--- zamiast style.display
    }
  });
  _lightboxBound = true;
}

// Dodaj obsługę filtrowania cennika
export function setupPricingFilter() {
  const input = document.getElementById('priceFilter');
  const table = document.getElementById('priceTable');
  if (!input || !table) return;
  input.addEventListener('input', function() {
    const val = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(tr => {
      const txt = tr.textContent.toLowerCase();
      tr.style.display = txt.includes(val) ? '' : 'none';
    });
  });
}

// Dodaj przykładowe porady do sekcji Porady
export function renderTipsGrid() {
  /* DEPRECATED: Pozostawione wyłącznie jako referencja statycznych porad.
     Aktualnie sekcja Porady korzysta z dynamicznego generatora loadTips() w app.js
     który losuje zestaw details przy każdym wejściu na trasę #porady. */
  const tips = [
    {
      title: 'Backup 3-2-1',
      lead: '3 kopie, 2 różne nośniki, 1 poza lokalizacją.',
      body: 'Najprostsze wdrożenie: dysk zewnętrzny + chmura (np. OneDrive) + kopia offline raz w miesiącu. Sprawdzaj możliwość odtworzenia – test restore min. raz na kwartał.',
      list: ['Automatyzuj kopie nocą', 'Szyfruj dane poufne (VeraCrypt)', 'Używaj wersjonowania plików'],
      img: 'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?q=80&w=600'
    },
    {
      title: 'Czyszczenie laptopa',
      lead: 'Kurz = wyższe temperatury i throttling.',
      body: 'Rozkręcenie obudowy co 6–12 miesięcy (sprężone powietrze + izopropanol do radiatora) potrafi obniżyć temperatury CPU/GPU o 8–15°C.',
      list: ['Wymień pastę co 12–18 mies.', 'Nie używaj odkurzacza na pełnej mocy', 'Sprawdź profile zasilania po czyszczeniu'],
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600'
    },
    {
      title: 'Silne hasła i 2FA',
      lead: 'Hasła unikalne + MFA = podstawa.',
      body: 'Menedżer haseł eliminuję powtórki. 2FA aplikacyjne (TOTP) bezpieczniejsze od SMS. Dodatkowo rozważ klucze sprzętowe (FIDO2) do krytycznych kont.',
      list: ['Min. 14 znaków', 'Frazy typu passphrase', 'Nie powtarzaj haseł'],
      img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600'
    },
    {
      title: 'Optymalizacja Windows',
      lead: 'Mniej autostartu = szybszy boot.',
      body: 'Wyłącz zbędne aplikacje w Menedżerze zadań > Uruchamianie. Ustaw plan zasilania na Zrównoważony / Wysoka wydajność przy pracy stacjonarnej.',
      list: ['Aktualizuj sterowniki chipsetu', 'Usuń bloatware OEM', 'Włącz TRIM dla SSD'],
      img: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Monitoring SMART dysków',
      lead: 'SMART ostrzega przed awarią.',
      body: 'Regularnie sprawdzaj atrybuty Reallocated Sectors, Pending Sectors oraz temperatura. Wzrost wartości niestabilnych = natychmiastowy backup.',
      list: ['CrystalDiskInfo / smartctl', 'Temp <55°C', 'Alerty mailowe w NAS'],
      img: 'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Chłodzenie PC',
      lead: 'Przepływ powietrza: front in, top/rear out.',
      body: 'Dobra konfiguracja: więcej powietrza wpada niż wychodzi (lekko dodatnie ciśnienie) + filtry przeciwkurzowe. Porządkuj okablowanie dla lepszego airflow.',
      list: ['Sprawdź curvę wentylatorów', 'Wymień pastę co 2 lata', 'Nie blokuj frontu obudowy'],
      img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Zasilacz dobór',
      lead: 'Margines mocy = stabilność.',
      body: 'Celuj w 20–30% zapasu nad realnym poborem. Certyfikat 80+ Gold dla pracy 24/7. Jedna linia 12V z odpowiednim amperażem dla GPU.',
      list: ['Sprawdź testy ripple', 'Modularne okablowanie', 'Zabezpieczenia OVP/UVP/OPP'],
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Sieć Wi-Fi 6/6E',
      lead: 'Kanały, szerokość pasma, QoS.',
      body: 'Ustaw szerokość 80 MHz dla większości domów; przeanalizuj zakłócenia aplikacją Wi-Fi Analyzer. Odrębna sieć gościnna izoluje urządzenia.',
      list: ['Aktualny firmware routera', 'Wyłącz WPS', 'Silne hasło WPA3'],
      img: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'VPN bezpieczeństwo',
      lead: 'WireGuard = wydajność + prostota.',
      body: 'Unikaj darmowych, komercyjnych VPN do prywatności jeśli brak transparentności. Do zdalnych zasobów firmowych ustaw MFA oraz ograniczenia adresów.',
      list: ['Aktualizuj klucze', 'Logi tylko diagnostyczne', 'Segmentacja sieci'],
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Phishing awareness',
      lead: 'Adres, domena, ton wiadomości.',
      body: 'Sprawdzaj literówki domen, nie klikaj przycisków logowania – wejdź ręcznie na stronę. Zgłaszaj podejrzane maile jako spam/phishing.',
      list: ['Używaj 2FA', 'Menedżer haseł ujawnia fałszywe domeny', 'Nie wysyłaj kodów autoryzacyjnych'],
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600'
    },
    {
      title: 'Szyfrowanie dysków',
      lead: 'BitLocker / VeraCrypt chroni przy kradzieży.',
      body: 'Włącz pełne szyfrowanie systemu i nośników zewnętrznych. Zachowaj klucz odzyskiwania offline w bezpiecznym miejscu.',
      list: ['Nie przechowuj kluczy w mailu', 'Używaj TPM gdy dostępne', 'Test odczytu po zaszyfrowaniu'],
      img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Aktualizacje firmware',
      lead: 'BIOS, router, NAS – nie pomijaj.',
      body: 'Firmware łata podatności (np. UEFI, exploity w routerach). Zawsze wykonuj kopię konfiguracji przed update.',
      list: ['Changelog producenta', 'Zasilanie awaryjne przy flashu', 'Waliduj sumy kontrolne'],
      img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Segmentacja IoT',
      lead: 'Oddziel IoT od sieci głównej.',
      body: 'Urządzenia IoT często mają słabe wsparcie aktualizacji. VLAN lub osobny SSID zmniejsza ryzyko lateral movement.',
      list: ['Wyłącz UPnP', 'Zmieniaj domyślne hasła', 'Aktualizuj firmware kamer'],
      img: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Odzysk danych – pierwsze kroki',
      lead: 'Minimalizuj dalsze zapisy.',
      body: 'Przestań używać nośnika, wykonaj kopię sektorową (ddrescue) i pracuj na obrazie. Nie instaluj nowych aplikacji na dysku źródłowym.',
      list: ['Nie uruchamiaj chkdsk na uszkodzonym', 'Zapisuj log działań', 'Chłodź dysk przy klikaćaniu'],
      img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Bezpieczne usuwanie danych',
      lead: 'SSD ≠ nadpisywanie wielokrotne.',
      body: 'Użyj polecenia Secure Erase / sanitize firmware dysku lub szyfruj od początku i porzuć klucz (crypto erase).',
      list: ['Nie nadpisuj SSD 35x', 'Dla HDD wystarczy 1–3 przejścia', 'Potwierdź brak montowania'],
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Praca na baterii',
      lead: 'Optymalizuj zużycie energii.',
      body: 'Zredukuj jasność, wyłącz zbędne moduły (BT gdy nieużywany), ustaw plan zasilania na oszczędny – wydłużysz czas pracy nawet o 20%.',
      list: ['Aktualny BIOS pomaga w zarządzaniu energią', 'Kalibruj baterię sporadycznie', 'Unikaj permanentnych 100% / 0%'],
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=600'
    },
    {
      title: 'Termopady / VRM',
      lead: 'Sekcja zasilania też się grzeje.',
      body: 'Przy modernizacji GPU/OC pamiętaj o kondycji termopadów na VRM i pamięciach. Wymiana może obniżyć temperatury o kilka stopni.',
      list: ['Używaj właściwej grubości', 'Mierz przed demontażem', 'Nie ściskaj nadmiernie'],
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600'
    },
    {
      title: 'Kontrola logów systemowych',
      lead: 'Wczesne wykrycie błędów.',
      body: 'Przeglądaj Podgląd zdarzeń (Windows) / journalctl (Linux) pod kątem ostrzeżeń dysków, sterowników i bezpieczeństwa.',
      list: ['Automatyczne alerty (np. Wazuh)', 'Kategoryzuj wg źródła', 'Archiwizuj logi krytyczne'],
      img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=60&w=600'
    }
  ];

  const grid = document.getElementById('tipsGrid');
  if (!grid) return;
  grid.innerHTML = tips.map((t,i) => `
    <details class="glass rounded-2xl p-6 fade-in group" data-aos="fade-up" data-aos-delay="${i*50}">
      <summary class="cursor-pointer list-none flex flex-col focus:outline-none focus:ring-2 focus:ring-accent/60">
        <h3 class="font-display font-bold text-lg flex-1">${t.title}</h3>
        <p class="text-sm text-slate-400 mt-1">${t.lead}</p>
      </summary>
      <div class="mt-4 text-base text-slate-300">
        <p>${t.body}</p>
        ${t.list && t.list.length ? `<ul class="mt-3 list-disc list-inside text-sm space-y-1">${t.list.map(li=>`<li>${li}</li>`).join('')}</ul>` : ''}
        ${t.img ? `<img class="rounded-xl mt-4" src="${t.img}" alt="Ilustracja: ${t.title}" loading="lazy">` : ''}
      </div>
    </details>
  `).join('');

  // Opcjonalnie: rozwijaj pierwszy dla użytkowników klawiatury / demonstracji
  const first = grid.querySelector('details');
  if (first) first.open = true;
}

// (ensureMain -> ensureApp) dopasowanie do <main id="app">
function ensureApp() {
  let app = document.getElementById('app');
  if (!app) {
    app = document.createElement('main');
    app.id = 'app';
    document.body.appendChild(app);
  }
  return app;
}

// (3) Aktywna nawigacja
function setActiveNav(route) {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const r = a.getAttribute('href').replace('#','') || 'home';
    a.classList.toggle('active', r === (route || 'home'));
  });
}

// (4) Lista dozwolonych tras
const ROUTES = new Set(['home','uslugi','realizacje','porady','cennik','onas','faq','kontakt']);

// (5) Render strony
export function renderPage(route) {
  if (!ROUTES.has(route) && route !== '' && route != null) route = 'home';
  if (!route) route = 'home';
  let html;
  switch (route) {
    case 'home': html = renderHome(); break;
    case 'uslugi': html = renderServices(); break;
    case 'realizacje': html = renderWork(); break;
    case 'porady': html = renderTips(); break;
    case 'cennik': html = renderPricing(); break;
    case 'onas': html = renderAbout(); break;
    case 'faq': html = renderFAQ(); break;
    case 'kontakt': html = renderContact(); break;
    default: html = renderHome();
  }
  const app = ensureApp();
  app.innerHTML = html;
  if (route === 'realizacje' || route === 'uslugi') setupLightbox();
  if (route === 'cennik') setupPricingFilter();
  // Usunięto renderTipsGrid() – porady są teraz generowane dynamicznie w loadTips() (app.js)
  setActiveNav(route);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// (TEST HELPER) – przywrócone, wymagane przez runPageTests
let _testsRan = false;
function _assert(cond, msg, results){
  results.push({msg, ok: !!cond});
  if(!cond) console.error('[TEST FAIL]', msg);
  else console.debug('[TEST OK]', msg);
}

// (runPageTests) aktualizacja selektorów z #main -> #app i test lightbox klasy .open
export function runPageTests() {
  if (_testsRan) { console.warn('runPageTests: już wykonane.'); return; }
  _testsRan = true;
  const results = [];
  const routes = ['home','uslugi','realizacje','porady','cennik','onas','faq','kontakt'];

  _assert(!!document.getElementById('app'), 'Istnieje #app (kontener główny).', results);

  routes.forEach(r => {
    renderPage(r);
    const html = document.getElementById('app')?.innerHTML || '';
    _assert(html.length > 50, `Route ${r}: wyrenderowano treść.`, results);
    switch(r){
      case 'home':
        _assert(/Serwis IT/i.test(html), 'Home zawiera nagłówek "Serwis IT".', results);
        break;
      case 'uslugi':
        _assert((html.match(/article class=/g)||[]).length>=6, 'Usługi zawierają >=6 kart.', results);
        break;
      case 'realizacje':
        _assert(/lightbox/.test(html), 'Realizacje zawierają lightbox markup.', results);
        break;
      case 'porady':
  const tipElems = document.querySelectorAll('#tipsGrid > div, #tipsGrid > details').length;
  _assert(tipElems>=10, 'Porady: załadowane >=10 porad.', results);
        break;
      case 'cennik':
        _assert(/priceTable/.test(html), 'Cennik: tabela obecna.', results);
        break;
      case 'onas':
        _assert(/Nasza misja/i.test(html), 'O nas: sekcja misji obecna.', results);
        break;
      case 'faq':
        _assert((html.match(/<details /g)||[]).length>=5, 'FAQ: >=5 pozycji.', results);
        break;
      case 'kontakt':
        _assert(/contactForm/.test(html), 'Kontakt: formularz obecny.', results);
        break;
    }
  });

  // Test: nieznana trasa fallback
  renderPage('nieistniejaca');
  _assert(/Serwis IT/i.test(document.getElementById('app')?.innerHTML||''), 'Nieznana trasa fallback do home.', results);

  // Test: lightbox interakcja
  renderPage('realizacje');
  const firstBtn = document.querySelector('button[data-full]');
  if (firstBtn) {
    firstBtn.click();
    const lb = document.getElementById('lightbox');
    _assert(lb && lb.classList.contains('open'), 'Lightbox otwarty (klasa .open).', results);
    lb.querySelector('.close')?.click();
    _assert(lb && !lb.classList.contains('open'), 'Lightbox zamknięty (usunięto .open).', results);
  } else {
    _assert(false, 'Brak miniatury do testu lightbox.', results);
  }

  // Test: filtr cen
  renderPage('cennik');
  const filter = document.getElementById('priceFilter');
  const rowsAll = Array.from(document.querySelectorAll('#priceTable tbody tr'));
  if (filter && rowsAll.length) {
    filter.value = 'backup';
    filter.dispatchEvent(new Event('input'));
    const visible = rowsAll.filter(r => r.style.display !== 'none').length;
    _assert(visible < rowsAll.length && visible >= 1, 'Filtr cen zawęża wyniki.', results);
    filter.value = '';
    filter.dispatchEvent(new Event('input'));
    _assert(rowsAll.every(r => r.style.display !== 'none'), 'Filtr czyszczony – wszystkie wiersze widoczne.', results);
  } else {
    _assert(false, 'Filtr cen – brak elementów.', results);
  }

  const htmlBefore = document.getElementById('app').innerHTML;
  renderPage('cennik');
  const htmlAfter = document.getElementById('app').innerHTML;
  _assert(htmlBefore === htmlAfter, 'Rerender stabilny dla tej samej trasy.', results);

  // Raport końcowy
  const summary = {
    passed: results.filter(r => r.ok).length,
    failed: results.filter(r => !r.ok).length,
    details: results
  };
  console.groupCollapsed('%cWynik testów pages.js','color:#0af');
  console.table(summary.details);
  console.log('Podsumowanie:', summary);
  console.groupEnd();
  return summary;
}

// Opcjonalnie automatyczne testy w trybie deweloperskim:
if (typeof window !== 'undefined' && /[?&]test=1/.test(location.search)) {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(runPageTests, 100); // lekka zwłoka na initRouter
  });
}