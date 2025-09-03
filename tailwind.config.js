/** Tailwind CSS config for local builds
 * Build:
 *   npm install
 *   npm run build:css
 */
module.exports = {
  content: [
    "./**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  corePlugins: {
    // keep defaults
  },
  plugins: []
};