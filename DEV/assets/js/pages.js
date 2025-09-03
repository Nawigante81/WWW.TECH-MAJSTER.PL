// (DEV bundle) Pełny kod pages.js skopiowany z /assets/js/pages.js
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
			<div class="mt-8 flex flex-wrap gap-4" data-aos="zoom-in" data-aos-delay="100">
				<a href="#kontakt" data-route="kontakt" class="bg-accent text-black font-display font-bold px-5 py-3 rounded-xl shadow-glow hover:-translate-y-1 transition hover-pulse hover:animate-pulse" aria-label="Przejdź do sekcji Kontakt">Kontakt</a>
				<a href="#uslugi" data-route="uslugi" class="glass px-5 py-3 rounded-xl hover:shadow-glow hover:animate-pulse hover-pulse" aria-label="Przejdź do podstrony Usługi">Zobacz ofertę →</a>
				<a href="#cennik" data-route="cennik" class="glass px-5 py-3 rounded-xl hover:shadow-glow hover:animate-pulse hover-pulse" aria-label="Przejdź do podstrony Cennik">Cennik →</a>
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
	<img class="rounded-2xl shadow-glow animate-floaty" src="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=60&w=1200" alt="Stanowisko diagnostyczne serwisu IT" loading="lazy" decoding="async" width="1200" height="800">
				<div class="absolute -bottom-8 -right-8 hidden sm:block glass p-4 rounded-2xl animate-floaty delay-1000" aria-label="Opis funkcji AI">
					<div class="text-accent font-display font-bold">Real-time diag + AI</div>
					<div class="text-xs text-slate-300">Logi, AI analiza, predykcja błędów.</div>
				</div>
			</div>
	<img class="mt-4 rounded-2xl shadow-glow" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=1200" alt="Elektronika w trakcie serwisu" loading="lazy" decoding="async" width="1200" height="800">
		</div>
	</section>
	<section class="mt-24 grid md:grid-cols-3 gap-8" aria-label="Skróty usług">
		${['Naprawy laptopów','Odzyskiwanie danych – krok po kroku','Usuwanie malware + hardening','Konfiguracja sieci Wi-Fi 6','Modernizacja PC dla gamerów','Serwis mobilny z dojazdem'].map((t,i)=>`
			<div class="glass rounded-2xl p-6 fade-in hover-pulse neumorph" data-aos="fade-up" data-aos-delay="${i*60}">
				<div class="flex items-center gap-4 mb-3">
					<i data-lucide="${['wrench','hard-drive','shield','wifi','cpu','smartphone'][i]}" class="w-6 h-6 text-accent" aria-hidden="true"></i>
					<h3 class="font-display font-bold text-lg">${t}</h3>
				</div>
				<p class="text-base text-slate-300 mb-4">Profesjonalnie + diagnoza gratis.</p>
	<img class="rounded-xl" src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600" alt="Ilustracja usługi: ${t}" loading="lazy" decoding="async" width="600" height="400">
			</div>
		`).join('')}
	</section>
	`;
}
export function renderServices(){
	return `
	<section class="space-y-10" aria-labelledby="servicesHeading">
		<header class="fade-in" data-aos="fade-up">
			<h2 id="servicesHeading" class="text-4xl md:text-5xl font-display font-bold">Usługi – Szczegółowe i z Poradami</h2>
			<p class="text-lg text-slate-300" data-aos="fade-up" data-aos-delay="50">Pełna oferta z opisami, zdjęciami i tipami. Wszystko responsywne i efektywne.</p>
			<p class="text-sm text-accent/80 trend-tip mt-2" data-aos="fade-up" data-aos-delay="100">Trend 2025: Energooszczędne konfiguracje + inteligentny monitoring.</p>
		</header>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			${serviceCards().join('')}
		</div>
	</section>
	`;
}
function serviceCards(){
	const items = [
	{icon:'cpu', title:'Diagnoza i naprawa', desc:'Płyty główne, zasilanie, chłodzenie, reinstalacje. Porada: Czyszcz dyski co 6 mies. Zdjęcie:', img:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=60&w=600'},
	{icon:'database', title:'Odzyskiwanie danych', desc:'Dyski, SSD, RAID. Logiczne i fizyczne. Porada: Nie formatuj sam! Zdjęcie:', img:'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?auto=format&fit=crop&q=60&w=600'},
	{icon:'wifi', title:'Sieci i Wi-Fi', desc:'Mesh, VLAN, VPN. Koniec lagów. Porada: Używaj WPA3. Zdjęcie:', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=600'},
	{icon:'bug', title:'Usuwanie malware', desc:'Rootkity, ransomware. Hardening systemu. Porada: Aktualizuj OS. Zdjęcie:', img:'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=60&w=600'},
	{icon:'battery-charging', title:'Modernizacje', desc:'SSD, RAM, GPU. +FPS, -hałas. Porada: Wybierz NVMe. Zdjęcie:', img:'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600'},
	{icon:'smartphone', title:'Mobile', desc:'Ekrany, baterie, porty. Szybko z gwarancją. Porada: Unikaj tanich zamienników. Zdjęcie:', img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=60&w=600'},
		{icon:'shield', title:'Cyberbezpieczeństwo', desc:'Audyt, firewall, szkolenie. Porada: Używaj menedżera haseł. Zdjęcie:', img:'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?auto=format&fit=crop&q=60&w=600'},
	{icon:'cloud', title:'Chmura i backup', desc:'Konfiguracja Google Drive, OneDrive. Porada: Automatyczne sync. Zdjęcie:', img:'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=60&w=600'}
	];
	return items.map((i,idx)=>`
		<article class="glass rounded-2xl p-6 slide-left hover-pulse" data-aos="fade-up" data-aos-delay="${idx*70}">
			<div class="flex items-center gap-4 mb-3">
				<i data-lucide="${i.icon}" class="w-6 h-6 text-accent"></i>
				<h3 class="font-display font-bold text-lg">${i.title}</h3>
			</div>
			<p class="text-base text-slate-300 mb-4">${i.desc}</p>
			<img class="rounded-xl" src="${i.img}" alt="Zdjęcie usługi" loading="lazy">
		</article>`);
}
export function renderWork(){
	const pics = [
	{thumb:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=60&w=600', full:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=70&w=1800', alt:'Serwis PC'},
	{thumb:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=600', full:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=70&w=1800', alt:'Mikrolutowanie'},
	{thumb:'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=60&w=600', full:'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=70&w=1800', alt:'Sieci'},
	{thumb:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=60&w=600', full:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=70&w=1800', alt:'Laptopy'},
	{thumb:'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?auto=format&fit=crop&q=60&w=600', full:'https://images.unsplash.com/photo-1555617117-08d3a7b3d86b?auto=format&fit=crop&q=70&w=1800', alt:'iPhone'},
		{thumb:'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600', full:'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1800', alt:'Odzysk danych'},
		{thumb:'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600', full:'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800', alt:'Modernizacja'},
		{thumb:'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600', full:'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1800', alt:'Cybersec'}
	];
	return `
		<section>
	<h2 class="text-4xl md:text-5xl font-display font-bold fade-in">Realizacje – Galeria</h2>
			<p class="text-lg text-slate-300 fade-in">Mnóstwo zdjęć z warsztatu. Kliknij dla powiększenia z animacją.</p>
			<div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				${pics.map(p=>`
					<button class="group relative glass p-2 rounded-2xl overflow-hidden hover:shadow-glow slide-right" data-full="${p.full}" aria-label="Otwórz zdjęcie">
						<img src="${p.thumb}" alt="${p.alt}" class="rounded-xl w-full h-64 object-cover transition group-hover:scale-105 group-hover:rotate-2" loading="lazy">
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
export function renderTips(){
	return `
		<section data-aos="fade-up">
			<h2 class="text-4xl md:text-5xl font-display font-bold fade-in">Porady – Dużo Tipów i Opisów</h2>
			<p class="text-lg text-slate-300 fade-in">Rozszerzone porady z przykładami i zdjęciami. Czytaj i stosuj!</p>
	<!-- Dynamiczne losowe porady (details) -->
	<div id="tipsGrid" class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite"></div>
	<h3 class="mt-16 text-2xl font-display font-bold">Artykuły / Dłuższe wpisy</h3>
	<div id="articlesGrid" class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
		</section>
	`;
}
export function renderPricing(){
	const rows = [ ['Diagnoza sprzętu', '0–150 zł'],['Reinstalacja OS + optymalizacja', '200 zł'],['Odzyskiwanie danych (logiczne)', 'od 300 zł'],['Odzyskiwanie danych (fizyczne)', 'wycena indywidualna'],['Naprawy płyt głównych BGA', 'od 400 zł'],['Instalacja sieci mesh Wi-Fi', 'od 400 zł'],['Usuwanie malware + hardening', '250 zł'],['Modernizacja PC (SSD + RAM)', 'od 150 zł'],['Wymiana ekranu w smartfonie', 'od 200 zł'],['Audyt cyberbezpieczeństwa', '500 zł'],['Konfiguracja VPN', '150 zł'],['Backup i chmura setup', '200 zł'],['Czyszczenie i pasta termiczna', '100 zł'] ];
	return `
		<section aria-labelledby="pricingTitle">
	<h2 id="pricingTitle" class="text-4xl md:text-5xl font-display font-bold fade-in" data-aos="fade-up">Cennik</h2>
	<p class="text-lg text-slate-300 fade-in" data-aos="fade-up" data-aos-delay="40">Rabaty dla stałych klientów.</p>
			<div class="mt-6 glass rounded-2xl p-6" data-aos="fade-up" data-aos-delay="120">
				<input id="priceFilter" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent" placeholder="Szukaj usługi..." aria-label="Filtr usług cennika">
				<div class="overflow-x-auto mt-4" role="region" aria-label="Tabela cen">
					<table id="priceTable" class="w-full text-base">
						<thead><tr class="text-left text-slate-400"><th class="py-3">Usługa</th><th class="py-3">Cena</th></tr></thead>
						<tbody>
							${rows.map((r,i)=>`<tr class="border-t border-accent/15 fade-in" data-aos="fade-up" data-aos-delay="${i*40}"><td class="py-3">${r[0]}</td><td class="py-3">${r[1]}</td></tr>`).join('')}
						</tbody>
					</table>
				</div>
				<p class="text-sm text-slate-400 mt-3">* Ceny netto + VAT. Porada: Zapytaj o pakiet usług dla zniżki.</p>
			</div>
			<div class="mt-8 glass rounded-2xl p-6 flex flex-wrap gap-4" data-aos="fade-up">
				<button data-checkout-plan="diag-basic" class="bg-accent text-black font-display font-bold px-4 py-2 rounded-xl shadow-glow hover:translate-y-[-2px] transition text-sm">Diagnoza Basic</button>
				<button data-checkout-plan="recovery-pro" class="glass px-4 py-2 rounded-xl text-sm hover:shadow-glow">Odzysk PRO</button>
				<button data-checkout-plan="security-audit" class="glass px-4 py-2 rounded-xl text-sm hover:shadow-glow">Audyt Security</button>
			</div>
			<div class="mt-8 glass rounded-2xl p-6" data-aos="fade-up">
				<h3 class="text-xl font-bold mb-4 font-display">Zapłać kartą (Stripe Elements)</h3>
				<form id="payment-form" class="space-y-4">
					<div id="card-element" class="border border-accent/40 rounded-xl p-4 bg-black/30"></div>
					<button type="submit" class="bg-accent text-black font-display font-bold px-5 py-3 rounded-xl shadow-glow hover:translate-y-[-2px] transition">Zapłać 100 zł (TEST)</button>
					<p class="text-xs text-slate-500">Dane testowe: 4242 4242 4242 4242 · 12/34 · 123</p>
				</form>
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
				${['Doświadczenie 15+ lat w IT','Zaawansowane lab z AI diag','Certyfikaty CISSP, CompTIA+'].map((t,i)=>`
					<div class="glass rounded-2xl p-6 slide-right neumorph" data-aos="fade-up" data-aos-delay="${i*80}">
						<div class="flex items-center gap-4 mb-3">
							<i data-lucide="${['trophy','microscope','badge-check'][i]}" class="w-6 h-6 text-accent" aria-hidden="true"></i>
							<h3 class="font-display font-bold text-lg">${t}</h3>
						</div>
						<p class="text-base text-slate-300 mb-4">Stawiamy na jakość i przewidywalność. Aktualizacje bezpieczeństwa to priorytet.</p>
						<img class="rounded-xl" src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600" alt="Zespół: ${t}" loading="lazy">
					</div>`).join('')}
			</div>
			<div class="mt-8" data-aos="fade-up" data-aos-delay="260">
				<h3 class="text-xl font-bold mb-4">Nasza misja</h3>
				<p class="text-base text-slate-300">Dostarczać najlepsze rozwiązania IT z efektami wizualnymi i praktycznymi poradami.</p>
			</div>
		</section>
	`;
}
export function renderFAQ(){
	const qa = [ ['Ile trwa naprawa?', 'Zazwyczaj 1–3 dni. Pilne – nawet w godziny. Porada: Opisz problem szczegółowo.'],['Czy dojeżdżacie do klienta?', 'Tak, Zgorzelec + 50 km. Zdalnie przez TeamViewer. Porada: Przygotuj sprzęt.'],['Czy odzyskacie 100% danych?', 'Staramy się o 95%+. Nikt nie gwarantuje 100%. Porada: Backup regularnie!'],['Jaka gwarancja na usługi?', '12 miesięcy na części i pracę. Porada: Używaj oryginalnych komponentów.'],['Jak chronić przed malware?', 'Antywirus + update\'y + ostrożność. Porada: Unikaj pirackiego softu.'],['Co z sieciami w dużym domu?', 'Mesh system. Porada: Testuj prędkość przed i po.'],['Ile kosztuje modernizacja?', 'Od 150 zł. Porada: Wybierz kompatybilne części.'],['Czy tracę dane przy reinstalacji?', 'Nie, jeśli wykonamy kopię lub masz backup. Porada: Zawsze potwierdź zakres działań.'],['Czy naprawiacie MacBooki?', 'Tak – diagnostyka, klawiatury, płyty, układy zasilania. Porada: Nie ignoruj wczesnych objawów zalania.'],['Co jeśli sprzęt się przegrzewa?', 'Czyszczenie + pasta termiczna często rozwiązuje problem. Porada: Wymień pastę co 12–18 mies.'],['Czy mogę śledzić status naprawy?', 'Tak – mail/SMS z etapami. Porada: Podaj aktualny numer telefonu.'],['Jak dobrać zasilacz do PC?', 'Moc z zapasem 20–30%, certyfikat 80+ Bronze lub wyższy. Porada: Sprawdź realne TDP GPU.'],['Czy odzyskujecie dane z RAID?', 'Tak – logiczne i częściowo fizyczne. Porada: Nie próbuj przebudowy bez obrazu dysków.'],['Czy instalujecie system od zera?', 'Tak, z aktualizacjami sterowników i optymalizacją. Porada: Zapisz licencje przed oddaniem.'],['Jak zabezpieczyć Wi-Fi?', 'WPA3, silne hasło, aktualny firmware routera. Porada: Wyłącz WPS.'],['Czy warto wymienić HDD na SSD?', 'Tak – duży wzrost responsywności. Porada: Wybierz NVMe jeśli płyta obsługuje.'],['Jak często robić backup?', 'Minimum raz w tygodniu lub automatycznie ciągły. Porada: Przetestuj odtworzenie kopii.'],['Czy naprawa anuluje gwarancję producenta?', 'Zależy od zakresu. Porada: Skontaktuj się przed ingerencją w plombowane elementy.'],['Czy odzyskanie danych jest zawsze możliwe?', 'Nie – uszkodzenia mechaniczne mogą to uniemożliwić. Porada: Wyłącz nośnik od razu po awarii.'],['Czy pomagacie dobrać części do modernizacji?', 'Tak – kompletna lista kompatybilnych komponentów. Porada: Ustal budżet i priorytet (wydajność / cisza).'],['Jak chronić się przed phishingiem?', 'Sprawdzaj domeny, używaj 2FA, nie klikaj nieznanych linków. Porada: Menedżer haseł wykryje fałszywe domeny.'] ];
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
			<p class="text-lg text-slate-300 fade-in" data-aos="fade-up" data-aos-delay="40">Napisz, zadzwoń lub użyj formularza. Odpowiadamy w <1h. Dodaliśmy walidację i efekty.</p>
			<div class="grid md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="80">
				<form id="contactForm" action="https://formspree.io/f/mldlqknp" method="POST" class="glass rounded-2xl p-6 slide-left">
					<input type="text" name="name" required minlength="3" placeholder="Imię i nazwisko" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
					<input type="email" name="email" required placeholder="Email" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
					<input type="tel" name="phone" pattern="[0-9]{9,}" placeholder="Telefon" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base focus:border-accent transition-colors">
					<textarea name="message" required minlength="10" placeholder="Opisz problem szczegółowo" class="w-full bg-transparent border border-accent/40 rounded-xl px-4 py-3 mb-4 text-base h-40 focus:border-accent transition-colors"></textarea>
					<input type="text" name="company" class="hidden" tabindex="-1" autocomplete="off">
					<button class="btn-submit-primary font-display font-bold" type="submit" aria-label="Wyślij formularz kontaktowy">Wyślij zapytanie</button>
					<p class="text-sm text-slate-400 mt-3">Akceptujesz politykę prywatności. Porada: Dodaj zdjęcia problemu dla szybszej diagnozy.</p>
				</form>
				<div class="space-y-4 slide-right">
					<div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="100"><i data-lucide="map-pin" class="inline w-5 h-5 text-accent"></i> Ul. Przykładowa 123, Zgorzelec</div>
					<div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="140"><i data-lucide="phone" class="inline w-5 h-5 text-accent"></i> <a href="tel:+48724316523" class="hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent">+48 724 316 523</a></div>
					<div class="glass rounded-2xl p-5" data-aos="fade-up" data-aos-delay="180"><i data-lucide="mail" class="inline w-5 h-5 text-accent"></i> <a href="mailto:acidsecurity@proton.me" class="hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent">acidsecurity@proton.me</a></div>
				</div>
			</div>
		</section>
	`;
}
export function renderTipsGrid() { /* DEPRECATED w DEV bundlu */ }
