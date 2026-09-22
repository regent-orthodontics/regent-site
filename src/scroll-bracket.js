// ═══════════════════════════════════════════════════════════════════════
//  El bracket que gira con el scroll.
//
//  No es un <video>. Es una secuencia de imágenes dibujada en canvas, que
//  es lo que hace Apple: un vídeo con scrubbing va a tirones en iOS porque
//  el navegador tiene que buscar el fotograma cada vez que mueves el dedo.
//  Con imágenes ya decodificadas, cada cuadro es un dibujo inmediato.
//
//  Coste real: hay que precargar. Por eso el primer fotograma se muestra
//  como imagen normal desde el principio y el canvas sólo toma el relevo
//  cuando hay suficientes cargados. Quien pase de largo no espera a nada.
// ═══════════════════════════════════════════════════════════════════════

export function scrollBracket({ canvas, frames, pin, onReady }) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const imgs = new Array(frames.length);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let loaded = 0, current = -1, raf = 0;

  const dpr = Math.min(devicePixelRatio || 1, 2);
  function size() {
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    current = -1;
    draw(progress());
  }

  // Cuánto del bloque fijado se ha recorrido: 0 al entrar, 1 al salir.
  function progress() {
    const r = pin.getBoundingClientRect();
    const total = pin.offsetHeight - innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -r.top / total));
  }

  function draw(p) {
    const i = Math.min(frames.length - 1, Math.round(p * (frames.length - 1)));
    if (i === current) return;
    const img = imgs[i];
    if (!img || !img.complete) return;
    current = i;
    // cover: llena el lienzo sin deformar la imagen
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(progress()); }); };

  // El primero se carga solo y con prioridad; el resto detrás.
  function load(i, priority) {
    const img = new Image();
    img.decoding = 'async';
    if (priority) img.fetchPriority = 'high';
    img.onload = () => {
      loaded++;
      if (i === 0) { size(); onReady?.(); }
      if (loaded === frames.length && !still) {
        addEventListener('scroll', onScroll, { passive: true });
        addEventListener('resize', size);
      }
    };
    img.src = frames[i];
    imgs[i] = img;
  }

  load(0, true);
  if (still) return { frames: 1 };            // sin movimiento: sólo el primero
  frames.forEach((_, i) => { if (i) load(i, false); });
  return { frames: frames.length };
}
