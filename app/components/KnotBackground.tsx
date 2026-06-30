"use client";

import { useEffect, useRef } from "react";

// Props baked from the original Claude Design component defaults.
const PROPS = {
  accent: "#2f6bff",
  scrollForce: 1,
  idleSpin: 1,
  trails: false,
};

// Ported verbatim from the original single-page site's inline <script>. The class
// manipulates the canvas imperatively, so it lives inside a client-side effect.
class KnotScene {
  props: typeof PROPS;
  // runtime fields are assigned in mount(); typed loosely to keep the port faithful
  [key: string]: any;

  constructor(props: typeof PROPS) {
    this.props = props;
  }

  rotU(p: number[], rx: number, ry: number) {
    let x = p[0],
      y = p[1],
      z = p[2];
    const cx = Math.cos(rx),
      sx = Math.sin(rx);
    let y1 = y * cx - z * sx,
      z1 = y * sx + z * cx;
    y = y1;
    z = z1;
    const cy = Math.cos(ry),
      sy = Math.sin(ry);
    let x1 = x * cy + z * sy,
      z2 = -x * sy + z * cy;
    x = x1;
    z = z2;
    return [x, y, z];
  }
  gauss(mu: number, s: number) {
    let u = Math.random() || 1e-9,
      v = Math.random();
    return mu + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  hexToRgb(h: string) {
    h = (h || "#2f6bff").replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    return [
      parseInt(h.slice(0, 2), 16) || 47,
      parseInt(h.slice(2, 4), 16) || 107,
      parseInt(h.slice(4, 6), 16) || 255,
    ];
  }
  pickGlyph(s: number) {
    const B = ["⠿", "⣿", "⠾", "⡿", "⢾", "⠷", "⣷", "⠟"];
    const A = ["#", "%", "@", "*", "+", "=", "&", "$"];
    const set = s === 2 ? B : A;
    return set[(Math.random() * set.length) | 0];
  }
  col(dn: number, a: number) {
    const m = Math.min(1, dn * 0.6);
    const r = Math.round(this.ar + (235 - this.ar) * m),
      g = Math.round(this.ag + (242 - this.ag) * m),
      b = Math.round(this.ab + (255 - this.ab) * m);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  colL(L: number, a: number) {
    // Light theme: blend accent (low L) toward a deep navy (high L) so the higher
    // ASCII/braille states stay dark and legible on a white background.
    const r = Math.round(this.ar + (10 - this.ar) * L),
      g = Math.round(this.ag + (16 - this.ag) * L),
      b = Math.round(this.ab + (42 - this.ab) * L);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  mount() {
    // geometry: (2,3) torus knot
    const N = 240;
    this.N = N;
    const pts: number[][] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * 2 * Math.PI;
      const rr = 2 + Math.cos(3 * t);
      pts.push([rr * Math.cos(2 * t), rr * Math.sin(2 * t), -Math.sin(3 * t)]);
    }
    let mx = 0;
    for (const v of pts) mx = Math.max(mx, Math.hypot(v[0], v[1], v[2]));
    this.knot = pts.map((v) => [v[0] / mx, v[1] / mx, v[2] / mx]);
    this.style = new Array(N).fill(0);
    this.glyph = new Array(N).fill("#");
    this.lastChange = new Array(N).fill(0);
    this.light = new Array(N).fill(0);

    this.spin = 0.006;
    this.energy = 0.006;
    this.rx = 0.5;
    this.ry = 0.4;
    this.idleBase = 0.006;
    this.scrollGear = 0.0032;
    this.scrollAngleSmooth =
      (window.scrollY || window.pageYOffset || 0) * this.scrollGear;
    this.dragging = false;
    this.px = 0;
    this.py = 0;
    this.dragV = 0;
    this.canvas = document.getElementById("knotCanvas") as HTMLCanvasElement;
    this.panel = document.getElementById("knotPanel") as HTMLElement;
    if (!this.canvas || !this.panel) return;
    this.ctx = this.canvas.getContext("2d");

    this.lastScroll = window.scrollY || window.pageYOffset || 0;
    this._onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const dy = y - this.lastScroll;
      this.lastScroll = y;
      const force = this.props.scrollForce ?? 1;
      const add =
        (dy > 0 ? Math.abs(dy) * 0.0013 : Math.abs(dy) * 0.0007) * force;
      this.energy = Math.min(0.3, this.energy + add);
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });

    // The knot sits behind the content layer, so listen on window (not the panel) and
    // hint that the page is draggable. Mouse/pen only — touch is left for scrolling.
    const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';
    document.body.style.cursor = "grab";
    this._onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // disabled on mobile, intentionally
      // let clicks on links/buttons/cards work instead of starting a drag
      const target = e.target as Element | null;
      if (target && target.closest && target.closest(INTERACTIVE)) return;
      this.dragging = true;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      this.px = e.clientX;
      this.py = e.clientY;
      this.dragV = 0;
    };
    this._onPointerMove = (e: PointerEvent) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.px,
        dy = e.clientY - this.py;
      this.px = e.clientX;
      this.py = e.clientY;
      this.ry += dx * 0.01;
      this.rx += dy * 0.01;
      const m = Math.hypot(dx, dy) * 0.01;
      this.dragV = this.dragV * 0.6 + m * 0.4;
      this.energy = Math.min(0.3, this.energy + m * 0.9);
    };
    this._release = () => {
      if (this.dragging) {
        this.dragging = false;
        document.body.style.cursor = "grab";
        document.body.style.userSelect = "";
        this.spin = Math.min(0.34, this.dragV / 3);
      }
    };
    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._release);

    this.resize();
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      this.idleBase = 0;
      this.frame();
    } else {
      // Cap the background to ~60fps.
      const minInterval = 1000 / 60;
      this._lastFrame = 0;
      this._loop = (ts: number) => {
        this._raf = requestAnimationFrame(this._loop);
        if (ts - this._lastFrame < minInterval) return;
        this._lastFrame = ts;
        this.frame();
      };
      this._raf = requestAnimationFrame(this._loop);
    }
  }

  destroy() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._onScroll) window.removeEventListener("scroll", this._onScroll);
    if (this._onPointerDown)
      window.removeEventListener("pointerdown", this._onPointerDown);
    if (this._onPointerMove)
      window.removeEventListener("pointermove", this._onPointerMove);
    if (this._release) window.removeEventListener("pointerup", this._release);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }

  resize() {
    const w = this.panel.clientWidth,
      h = this.panel.clientHeight,
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
    if (
      this.canvas.width !== Math.round(w * dpr) ||
      this.canvas.height !== Math.round(h * dpr)
    ) {
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    this.cw = w;
    this.ch = h;
  }

  frame() {
    this.resize();
    const ctx = this.ctx,
      w = this.cw,
      h = this.ch,
      N = this.N;
    [this.ar, this.ag, this.ab] = this.hexToRgb(this.props.accent ?? "#2f6bff");
    const idle = this.idleBase * (this.props.idleSpin ?? 1);
    const trails = this.props.trails ?? true;

    this.energy = idle + (this.energy - idle) * 0.945;
    if (this.energy < idle) this.energy = idle;
    this.spin = idle + (this.spin - idle) * 0.945;
    if (this.spin < idle) this.spin = idle;
    const scrollTarget =
      (window.scrollY || window.pageYOffset || 0) * this.scrollGear;
    const prevScroll = this.scrollAngleSmooth;
    this.scrollAngleSmooth += (scrollTarget - this.scrollAngleSmooth) * 0.18;
    const scrollDelta = this.scrollAngleSmooth - prevScroll;
    if (!this.dragging) {
      this.ry += this.spin + scrollDelta;
      this.rx += (this.spin + scrollDelta) * 0.12;
    }

    const t = Math.max(0, Math.min(1, (this.energy - idle) / (0.14 - idle)));
    const mu = t * 3;

    const rate = Math.min(0.6, 0.05 + 5 * this.energy);
    const now = performance.now();
    for (let i = 0; i < N; i++) {
      if (now - this.lastChange[i] < 1000) continue;
      const cur = this.style[i];
      let target = Math.round(this.gauss(mu, 0.7));
      if (target < 0) target = 0;
      if (target > 3) target = 3;
      let ns = cur;
      if (target > cur) {
        if (Math.random() < rate) ns = target;
      } else if (target < cur) {
        ns = cur - 1;
      }
      if (ns !== cur) {
        this.style[i] = ns;
        this.lastChange[i] = now;
        this.light[i] = Math.max(
          0,
          Math.min(1, (ns / 3) * 0.85 + Math.random() * 0.3 - 0.05)
        );
        if (ns >= 2) this.glyph[i] = this.pickGlyph(ns);
      }
    }

    if (trails) {
      // fade previous frames toward the white page background
      ctx.fillStyle = "rgba(255,255,255," + (0.6 + (1 - t) * 0.4).toFixed(3) + ")";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    const S = Math.min(w, h) * 0.4,
      rx = this.rx,
      ry = this.ry;
    const P = new Array(N);
    for (let i = 0; i < N; i++) {
      const r = this.rotU(this.knot[i], rx, ry);
      const f = 5 / (5 - r[2]);
      P[i] = [w / 2 + r[0] * f * S, h / 2 + r[1] * f * S, r[2]];
    }

    const items: any[] = [];
    for (let i = 0; i < N; i++) {
      const st = this.style[i];
      if (st === 0) {
        const j = (i + 1) % N;
        items.push({ st: 0, i, j, z: (P[i][2] + P[j][2]) / 2 });
      } else items.push({ st, i, z: P[i][2] });
    }
    items.sort((a, b) => a.z - b.z);

    ctx.lineCap = "round";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const it of items) {
      const p = P[it.i],
        dn = (p[2] + 1) / 2,
        L = this.light[it.i];
      if (it.st === 0) {
        const q = P[it.j];
        ctx.strokeStyle = this.colL(L, 0.4 + 0.55 * dn);
        ctx.lineWidth = 1.2 + 5.2 * dn;
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
        ctx.stroke();
      } else if (it.st === 1) {
        ctx.fillStyle = this.colL(L, 0.34 + 0.62 * dn);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 0.8 + 2.6 * dn, 0, 6.283);
        ctx.fill();
      } else if (it.st === 2) {
        ctx.fillStyle = this.colL(L, 0.45 + 0.55 * dn);
        ctx.font = "bold " + (9 + 6 * dn).toFixed(1) + "px var(--font-mono), monospace";
        ctx.fillText(this.glyph[it.i], p[0], p[1]);
      } else {
        ctx.fillStyle = this.colL(L, 0.55 + 0.45 * dn);
        ctx.font = "700 " + (12 + 10 * dn).toFixed(1) + "px var(--font-mono), monospace";
        ctx.fillText(this.glyph[it.i], p[0], p[1]);
      }
    }
  }
}

export default function KnotBackground() {
  const sceneRef = useRef<KnotScene | null>(null);

  useEffect(() => {
    const scene = new KnotScene(PROPS);
    sceneRef.current = scene;
    scene.mount();
    return () => scene.destroy();
  }, []);

  return (
    <div
      id="knotPanel"
      className="fixed inset-0 z-0 overflow-hidden"
      // own compositor layer + paint containment, so the canvas repaint stays
      // isolated from the scrolling content above it
      style={{
        background: "#ffffff",
        contain: "strict",
        transform: "translateZ(0)",
      }}
      aria-hidden="true"
    >
      <canvas
        id="knotCanvas"
        className="absolute inset-0 block h-full w-full"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />
    </div>
  );
}
