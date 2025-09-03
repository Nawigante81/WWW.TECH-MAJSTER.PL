// Toggle visibility for the visitor counter (desktop only)
(function(){
  const key = 'vc-visible';
  function setVisible(visible){
    const counter = document.getElementById('visitor-counter');
    const btn = document.getElementById('vcToggleBtn');
    if(!counter || !btn) return;
    if(visible){
      counter.style.display = '';
      btn.setAttribute('aria-pressed','true');
      btn.classList.remove('opacity-50');
    } else {
      counter.style.display = 'none';
      btn.setAttribute('aria-pressed','false');
      btn.classList.add('opacity-50');
    }
    try{ localStorage.setItem(key, visible? '1':'0'); }catch(e){}
  }
  function init(){
    // If mobile (below md breakpoint) remove counter and matrix toggle from DOM to prevent
    // any network calls or bindings. We consider md breakpoint at 768px.
    const isDesktop = window.matchMedia('(min-width:768px)').matches;
    const counter = document.getElementById('visitor-counter');
    const btn = document.getElementById('vcToggleBtn');
    // Remove Matrix toggle input if present on mobile
    const matrixInput = document.getElementById('toggleMatrix');
    if(!isDesktop){
      if(counter && counter.parentNode) counter.parentNode.removeChild(counter);
      if(btn && btn.parentNode) btn.parentNode.removeChild(btn);
      if(matrixInput && matrixInput.parentNode) matrixInput.parentNode.removeChild(matrixInput);
      return; // nothing more to do on mobile
    }
    // Desktop: initialize toggle state (visible by default)
    if(!btn || !counter) return;
    let stored = null;
    try{ stored = localStorage.getItem(key); }catch(e){}
    const visible = stored === null ? true : stored === '1';
    setVisible(visible);
    btn.addEventListener('click',()=> setVisible(!(btn.getAttribute('aria-pressed') === 'true')));
  }
  document.addEventListener('DOMContentLoaded', init);
})();
