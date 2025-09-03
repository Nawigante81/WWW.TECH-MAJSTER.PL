# Jak przetestować Open Graph meta tagi

## ✅ WAŻNA AKTUALIZACJA - NOWA DOMENA!
Domena została zmieniona z `https://getacid.uk/` na `https://www.tech-majster.pl/`
Wszystkie meta tagi zostały zaktualizowane do nowej domeny.

## Narzędzia online do testowania

### 1. Facebook Open Graph Debugger
- URL: https://developers.facebook.com/tools/debug/
- Wklej URL swojej strony (np. `https://www.tech-majster.pl/`) i kliknij "Debug"
- Pokaże jak strona będzie wyglądać na Facebooku
- Jeśli wprowadzisz zmiany, użyj "Scrape Again" żeby odświeżyć cache

### 2. Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Wymaga logowania na konto Twitter
- Testuje jak strona będzie wyglądać na Twitterze

### 3. LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- Testuje jak strona będzie wyglądać na LinkedIn

### 4. WhatsApp Link Preview
- Wyślij link do siebie na WhatsApp
- WhatsApp automatycznie wygeneruje podgląd

### 5. Uniwersalne narzędzia
- **Open Graph Preview**: https://www.opengraph.xyz/
- **Meta Tags**: https://metatags.io/
- **Socialify**: https://socialify.git.ci/

## Co sprawdzać

✅ **Tytuł** - czy jest widoczny i nie jest ucięty  
✅ **Opis** - czy jest czytelny i zachęcający  
✅ **Obraz** - czy się ładuje i jest dobrej jakości  
✅ **URL** - czy jest poprawny (www.tech-majster.pl)  
✅ **Typ treści** - czy jest ustawiony na "website"  

## Typowe problemy

❌ **Relatywne ścieżki obrazów** - używaj pełnych URL (https://...)  
❌ **Brak cache refresh** - po zmianach użyj narzędzi do odświeżenia  
❌ **Zły rozmiar obrazu** - rekomendowany to 1200x630px  
❌ **Za długie teksty** - tytuł max 60 znaków, opis max 160 znaków  

## Status aktualnych zmian

✅ Strona główna (index.html) - ZAKTUALIZOWANA do www.tech-majster.pl  
✅ Polska wersja (pl/index.html) - ZAKTUALIZOWANA do www.tech-majster.pl  
✅ Usługi (uslugi.html) - ZAKTUALIZOWANA do www.tech-majster.pl  
✅ Kontakt (kontakt.html) - ZAKTUALIZOWANA do www.tech-majster.pl  
✅ Cennik (cennik.html) - ZAKTUALIZOWANA do www.tech-majster.pl  
✅ Szablon meta tagów - ZAKTUALIZOWANY do www.tech-majster.pl

## Pozostała praca

⚠️ **Pozostałe strony do zaktualizowania:**
- faq.html - trzeba poprawić canonical URL
- o-nas.html - jeśli istnieje
- realizacje.html - jeśli istnieje  
- porady.html - jeśli istnieje
- Pozostałe pliki porada-*.html

## Następne kroki

1. Przetestuj główne strony na Facebook Debugger z nową domeną
2. Sprawdź czy obrazy się ładują poprawnie z www.tech-majster.pl
3. Opcjonalnie: stwórz dedykowane obrazy dla różnych stron
4. Dokończ aktualizację pozostałych stron HTML
