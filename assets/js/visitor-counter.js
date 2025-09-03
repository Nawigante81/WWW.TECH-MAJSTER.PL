// Simple flip counter using CountAPI for persistence with fallback to localStorage
(function(){
  const namespace = 'my-site-visitor-counter';
  const key = 'visitors';
  const startValue = 341;

  // Fetch or create count from CountAPI (https://countapi.xyz)
  async function readCount(){
    try{
      const res = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
      if(!res.ok) throw new Error('no remote');
      const data = await res.json();
      if(typeof data.value === 'number') return data.value;
    }catch(e){
      console.warn('CountAPI read failed, using local fallback',e);
    }
    const local = parseInt(localStorage.getItem('vcount'),10);
    return isNaN(local) ? startValue : local;
  }

  async function incrementRemote(){
    try{
      const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`,{method:'GET'});
      if(!res.ok) throw new Error('increment failed');
      const data = await res.json();
      if(typeof data.value==='number'){
        localStorage.setItem('vcount', String(data.value));
        return data.value;
      }
    }catch(e){
      console.warn('CountAPI increment failed, using local fallback',e);
      const local = (parseInt(localStorage.getItem('vcount'),10) || startValue) + 1;
      localStorage.setItem('vcount', String(local));
      return local;
    }
  }

  function buildDigits(n){
    return String(n).padStart(3,'0').split('');
  }

  function renderInitial(container, digits){
    container.innerHTML = '';
    digits.forEach(d=>{
      const el = document.createElement('div'); el.className='flip-digit';
      el.innerHTML = `
        <div class="card">
          <div class="upper"><span class="num">${d}</span></div>
          <div class="lower"><span class="num">${d}</span></div>
          <div class="flip-top"><span class="num">${d}</span></div>
          <div class="flip-bottom"><span class="num">${d}</span></div>
        </div>`;
      container.appendChild(el);
    });
  }

  function animateTo(container, newDigits){
    const nodes = Array.from(container.children);
    nodes.forEach((node, i)=>{
      const top = node.querySelector('.flip-top .num');
      const bottom = node.querySelector('.flip-bottom .num');
      const upper = node.querySelector('.upper .num');
      const lower = node.querySelector('.lower .num');
      const next = newDigits[i];
      if(upper.textContent === next) return;
      top.textContent = upper.textContent; // start from current
      bottom.textContent = next;
      // trigger animation
      node.classList.remove('animate');
      // force reflow
      void node.offsetWidth;
      node.classList.add('animate');
      // after animation swap visible numbers
      setTimeout(()=>{
        upper.textContent = next;
        lower.textContent = next;
        node.classList.remove('animate');
      }, 800);
    });
  }

  // Public init
  window.VisitorCounter = {
    attach: async function(containerSelector){
      const container = document.querySelector(containerSelector);
      if(!container) return;
      const current = await readCount();
      const digits = buildDigits(current);
      renderInitial(container, digits);
      // increment for this visit
      const next = await incrementRemote();
      const nextDigits = buildDigits(next);
      // animate after a short delay so visitor sees initial state then flip
      setTimeout(()=> animateTo(container, nextDigits), 400);
    }
  };

})();
