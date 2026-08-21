/** Fit game content to the fullscreen stage without scrolling */

export function observeResize(el, fn) {
  const ro = new ResizeObserver(() => fn());
  ro.observe(el);
  fn();
  return () => ro.disconnect();
}

/** Scale canvas visually to fit container (keeps internal resolution — safe for existing game logic) */
export function fitCanvasDisplay(canvas, container) {
  return observeResize(container, () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw < 20 || ch < 20) return;

    const aspect = canvas.width / canvas.height;
    let w = cw;
    let h = w / aspect;
    if (h > ch) {
      h = ch;
      w = h * aspect;
    }
    canvas.style.width = `${Math.floor(w)}px`;
    canvas.style.height = `${Math.floor(h)}px`;
  });
}

/** Fit a square canvas inside a container; calls onResize after each size change */
export function fitSquareCanvas(canvas, container, onResize) {
  return observeResize(container, () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 20 || h < 20) return;

    const size = Math.floor(Math.min(w, h));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    onResize?.(size);
  });
}

/** Fit a rectangular canvas (fixed aspect ratio) inside container */
export function fitRectCanvas(canvas, container, aspect, onResize) {
  return observeResize(container, () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw < 20 || ch < 20) return;

    let w = cw;
    let h = w / aspect;
    if (h > ch) {
      h = ch;
      w = h * aspect;
    }

    w = Math.floor(w);
    h = Math.floor(h);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    onResize?.(w, h);
  });
}

/** Size a CSS grid of square cells to fill a container */
export function fitGrid(gridEl, container, cols, rows, maxCell = 88) {
  const apply = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 20 || h < 20) return;

    const gap = w < 360 ? 6 : 8;
    const cellW = (w - gap * (cols - 1)) / cols;
    const cellH = (h - gap * (rows - 1)) / rows;
    const cell = Math.floor(Math.min(cellW, cellH, maxCell));

    gridEl.style.gridTemplateColumns = `repeat(${cols}, ${cell}px)`;
    gridEl.style.gridTemplateRows = `repeat(${rows}, ${cell}px)`;
    gridEl.style.gap = `${gap}px`;
    gridEl.style.justifyContent = 'center';
    gridEl.style.alignContent = 'center';
  };

  return observeResize(container, apply);
}

/** Scale a block element (e.g. 4096 grid) to fit container width */
export function fitBlock(el, container, maxWidth = 380) {
  return observeResize(container, () => {
    const w = container.clientWidth;
    el.style.width = `${Math.min(w, maxWidth)}px`;
    el.style.maxWidth = '100%';
  });
}

export function canvasPointer(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;
  const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
  return {
    x: (clientX - rect.left) * scale,
    y: (clientY - rect.top) * scale,
    scale,
  };
}
