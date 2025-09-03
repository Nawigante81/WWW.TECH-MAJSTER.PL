// Minimal fallback metrics collector (CLS/LCP/FID poly)
// Avoids CORS issues with remote web-vitals ESM.
(function(){
  if (window.__wvFallbackLoaded) return; window.__wvFallbackLoaded = true;
  const debug = !!window.DEBUG;
  let lcp = 0; let cls = 0; let fid = null; let finalized = false; let firstLcpLogged = false;
  function dlog(...args){ if (debug) try { console.log('[WV-Fallback]', ...args); } catch(_){} }
  function summary(){
    if(finalized) return; finalized = true;
    const payload = { LCP: lcp||null, CLS: +cls.toFixed(4), FID: fid };
    try { console.log('[WV-Fallback] Summary', payload); } catch(_) {}
    window.__webVitals = payload;
  }
  if('PerformanceObserver' in window){
    try {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        const last = entries[entries.length-1];
        if(last){
          lcp = (last.renderTime||last.loadTime||last.startTime);
          if(!firstLcpLogged){ dlog('LCP (first)', lcp); firstLcpLogged = true; }
        }
      }).observe({type:'largest-contentful-paint', buffered:true});
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) {
          if (e.hadRecentInput) continue; // ignore shifts after input
          cls += e.value;
        }
      }).observe({type:'layout-shift', buffered:true});
    } catch(_){}
  }
  function onFID(e){
    // FID ≈ delay between event start and handler run
    fid = performance.now() - e.timeStamp;
    dlog('FID (captured)', fid);
    removeEventListener('pointerdown', onFID, true);
  }
  addEventListener('pointerdown', onFID, true);
  // Finalize on page hide or after load + 5s
  document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'hidden') summary(); });
  window.addEventListener('pagehide', summary);
  window.addEventListener('load', () => setTimeout(summary, 5000));
  // Safety timeout (10s) if load never fires (edge cases)
  setTimeout(summary, 10000);
})();