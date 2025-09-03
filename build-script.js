const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

// Konfiguracja HTML minifier
const htmlMinifyOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
  preserveLineBreaks: false
};

// Pliki HTML do zbudowania
const htmlFiles = [
  'index.html',
  'pl/index.html',
  'uslugi.html',
  'kontakt.html',
  'cennik.html',
  'faq.html',
  'o-nas.html',
  'realizacje.html',
  'porady.html'
];

// Dodatkowe pliki porada-*.html
for (let i = 1; i <= 12; i++) {
  htmlFiles.push(`porada-${i}.html`);
}

async function buildSite() {
  console.log('🚀 Rozpoczynam budowanie strony...');
  
  // Tworzenie katalogu dist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Kopiowanie struktury katalogów
  copyDirectory('assets', 'dist/assets');
  
  if (fs.existsSync('pl')) {
    copyDirectory('pl', 'dist/pl');
  }
  
  // Kopiowanie innych plików
  const otherFiles = [
    'manifest.webmanifest',
    'robots.txt',
    'sitemap.xml'
  ];
  
  otherFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, `dist/${file}`);
      console.log(`📄 Skopiowano: ${file}`);
    }
  });
  
  // Minifikacja plików HTML
  let processedCount = 0;
  
  for (const htmlFile of htmlFiles) {
    if (fs.existsSync(htmlFile)) {
      try {
        const htmlContent = fs.readFileSync(htmlFile, 'utf8');
        
        // Dodatkowe optymalizacje przed minifikacją
        let optimizedHtml = htmlContent
          // Usuń komentarze HTML (ale zostaw te ważne)
          .replace(/<!--(?!\s*google|!\s*facebook|!\s*twitter)[\s\S]*?-->/g, '')
          // Optymalizuj ładowanie Tailwind CSS
          .replace(
            /<script defer src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
            '<!-- Tailwind CSS loaded from local build -->'
          )
          // Usuń console.log z produkcji
          .replace(/console\.(log|debug|info)\([^)]*\);?/g, '');
        
        const minifiedHtml = await minify(optimizedHtml, htmlMinifyOptions);
        
        // Upewnij się, że katalog istnieje
        const distFile = `dist/${htmlFile}`;
        const distDir = path.dirname(distFile);
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }
        
        fs.writeFileSync(distFile, minifiedHtml);
        
        const originalSize = Buffer.byteLength(htmlContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedHtml, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ ${htmlFile} - oszczędność: ${savings}% (${originalSize} → ${minifiedSize} bajtów)`);
        processedCount++;
        
      } catch (error) {
        console.error(`❌ Błąd przy ${htmlFile}:`, error.message);
      }
    } else {
      console.log(`⚠️  Plik nie istnieje: ${htmlFile}`);
    }
  }
  
  console.log(`\n🎉 Budowanie zakończone!`);
  console.log(`📊 Przetworzono ${processedCount} plików HTML`);
  console.log(`📁 Wersja produkcyjna w katalogu: ./dist/`);
  console.log(`\n📋 Następne kroki:`);
  console.log(`   1. Przetestuj stronę z katalogu dist/`);
  console.log(`   2. Wyślij zawartość dist/ na serwer`);
  console.log(`   3. Sprawdź czy wszystko działa poprawnie`);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
  
  console.log(`📁 Skopiowano katalog: ${src} → ${dest}`);
}

// Uruchom budowanie
buildSite().catch(console.error);
