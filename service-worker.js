/**
 * Root Service Worker shim
 * Scope: "/"
 * Delegates all logic to the existing SW at /assets/js/sw.js
 * This ensures the PWA controls the whole site and fixes 404 on /service-worker.js requests.
 * If you update sw.js internals, bump its CACHE_VERSION to trigger updates.
 */
try {
  // Import core SW implementation (install/activate/fetch handlers live there)
  importScripts('/assets/js/sw.js');
} catch (err) {
  // In case of unexpected import issues, fail gracefully
  console.error('[SW shim] importScripts failed:', err);
}