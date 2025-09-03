# 🚀 Instrukcja budowania strony Tech-Majster PRO

## Czym jest "build"?

**Build** to proces przygotowania strony do publikacji. Podczas tego procesu:
- Pliki HTML zostają zminimalizowane (usunięte spacje, komentarze)
- CSS Tailwind zostaje zbudowany lokalnie (bez CDN)
- Obrazy zostają zoptymalizowane  
- Wszystko ląduje w katalogu `dist/` gotowe do wysłania na serwer

## 📋 Jak zbudować stronę?

### 1. Zainstaluj zależności (tylko pierwszy raz):
```powershell
npm install
```

### 2. Zbuduj stronę:
```powershell
npm run build
```

### 3. Dla pracy deweloperskiej (z auto-odświeżaniem CSS):
```powershell
npm run dev
```

## 📁 Struktura po buildzie:

```
dist/                 ← Gotowa strona do publikacji
├── index.html        ← Zminimalizowana strona główna
├── pl/
│   └── index.html    ← Zminimalizowana polska wersja  
├── uslugi.html       ← Zminimalizowane usługi
├── kontakt.html      ← Zminimalizowany kontakt
├── cennik.html       ← Zminimalizowany cennik
├── faq.html         ← Zminimalizowane FAQ
├── assets/          ← Wszystkie zasoby (CSS, JS, obrazy)
│   ├── css/
│   ├── js/
│   └── img/
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

## 🎯 Co się dzieje podczas buildu?

✅ **HTML Minifikacja:**
- Usunięcie zbędnych spacji i pustych linii
- Usunięcie komentarów (poza ważnymi meta tagami)  
- Skrócenie atrybutów HTML
- Minifikacja inline CSS i JS

✅ **CSS Optymalizacja:**
- Build lokalnego Tailwind CSS zamiast CDN
- Usunięcie nieużywanych klas CSS
- Minifikacja i kompresja

✅ **Przygotowanie do produkcji:**
- Usunięcie console.log z kodu
- Optymalizacja ładowania zasobów
- Kopiowanie wszystkich potrzebnych plików

## 🔍 Przykład różnicy:

**PRZED (development):**
```html
<!DOCTYPE html>
<html lang="pl" class="scroll-smooth" data-theme="dark">
<head>
  <!-- Komentarz dewelopera -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tech-Majster PRO — Serwis IT | Zgorzelec</title>
  
  <!-- Ładowanie z CDN (wolniej) -->
  <script defer src="https://cdn.tailwindcss.com"></script>
</head>
```

**PO (production):**
```html
<!DOCTYPE html><html lang="pl" class="scroll-smooth" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tech-Majster PRO — Serwis IT | Zgorzelec</title>
```

## 📊 Korzyści z buildu:

- **Szybkość**: Strona ładuje się 30-50% szybciej
- **SEO**: Lepsze pozycjonowanie przez szybkość
- **Bandwidth**: Mniej transferu danych
- **Profesjonalizm**: Kod źródłowy wygląda profesjonalnie

## 🚀 Publikacja na serwerze:

1. **Zbuduj stronę**: `npm run build`
2. **Przetestuj lokalnie**: Otwórz `dist/index.html` w przeglądarce
3. **Wyślij na serwer**: Zawartość katalogu `dist/` wyślij przez FTP/cPanel
4. **Sprawdź domenę**: Wejdź na www.tech-majster.pl i sprawdź

## ⚠️ Ważne:

- **Zawsze testuj** wersję z `dist/` przed wysłaniem na serwer
- **Backup**: Zrób kopię obecnej strony na serwerze
- **Meta tagi**: Sprawdź czy Open Graph działa po publikacji
- **Obrazy**: Upewnij się że wszystkie obrazy się ładują

## 🛠️ Dostępne komendy:

```powershell
npm run build     # Zbuduj stronę produkcyjną
npm run dev       # Tryb deweloperski (z watch)  
npm run clean     # Wyczyść katalog dist/
npm run build:css # Tylko zbuduj CSS
```

## 🎉 Po publikacji sprawdź:

- [ ] Strona ładuje się szybko
- [ ] Wszystkie linki działają  
- [ ] Obrazy się wyświetlają
- [ ] Meta tagi Open Graph działają (Facebook Debugger)
- [ ] Formularz kontaktowy działa
- [ ] Mobile jest responsywny
