"use client";

import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { HeroShaderCopy, ShaderBackdrop, type HeroShaderProps } from "./hero-shader";

const noop = () => () => {};
/** False on the server and during hydration, true once mounted in the browser. */
const useMounted = () => React.useSyncExternalStore(noop, () => true, () => false);

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
// Slow interfering waves, masked to a soft ellipse, mixing the primary color into the page background.
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 a;uniform vec3 b;
void main(){
  vec2 q=gl_FragCoord.xy/r;
  float v=sin(q.x*3.1+t*.35)+sin(q.y*4.3-t*.27)+sin((q.x+q.y)*2.6+t*.41)+sin(length(q-.5)*7.-t*.5);
  v=v*.125+.5;
  float m=smoothstep(.75,.05,distance(q*vec2(1.,.8),vec2(.5,.45)));
  gl_FragColor=vec4(mix(b,a,m*v*.45),1.);
}`;

/** A CSS color (oklch, hex, ...) as 0-1 RGB, by painting it once on a 1x1 canvas. */
function rgb(css: string): [number, number, number] {
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return [0, 0, 0];
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

/** Starts drawing the shader into `canvas`; returns a stop function, or null if WebGL isn't available. */
function startShader(canvas: HTMLCanvasElement, section: HTMLElement): (() => void) | null {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (n: string) => gl.getUniformLocation(prog, n);

  // shortcut: theme colors are read when drawing starts, so a light/dark switch shows after the next pause or scroll-in; watch <html class> if that matters.
  const style = getComputedStyle(section);
  gl.uniform3fv(u("a"), rgb(style.getPropertyValue("--primary") || "#000"));
  gl.uniform3fv(u("b"), rgb(style.getPropertyValue("--background") || "#fff"));

  const fit = () => {
    // Capped pixel ratio: a soft gradient doesn't need retina pixels, and the GPU stays cool.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u("r"), canvas.width, canvas.height);
  };
  const resize = new ResizeObserver(fit);
  resize.observe(canvas);
  fit();

  let frame = 0;
  const t0 = performance.now();
  const draw = (now: number) => {
    gl.uniform1f(u("t"), (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
  };
}

/** HeroShader with motion: the gradient flows, painted live with WebGL. Pauses off screen, follows reduced motion, and has a pause button. */
export function HeroShaderMotion({ titleAs, eyebrow, title, description, primaryAction, secondaryAction, className, ...props }: HeroShaderProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const section = React.useRef<HTMLElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const live = mounted && !reduced && !failed;

  React.useEffect(() => {
    if (!live || !section.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(section.current);
    return () => io.disconnect();
  }, [live]);

  React.useEffect(() => {
    if (!live || paused || !visible || !canvas.current || !section.current) return;
    const stop = startShader(canvas.current, section.current);
    if (!stop) setFailed(true);
    return stop ?? undefined;
  }, [live, paused, visible]);

  return (
    <section ref={section} className={cn("relative isolate overflow-hidden px-4 py-28 text-center", className)} {...props}>
      <ShaderBackdrop />
      {live && (
        <>
          <canvas
            ref={canvas}
            aria-hidden="true"
            data-slot="shader-canvas"
            className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]"
          />
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {paused ? <Play aria-hidden className="size-3" /> : <Pause aria-hidden className="size-3" />}
            {paused ? "Play background" : "Pause background"}
          </button>
        </>
      )}
      <HeroShaderCopy {...{ titleAs, eyebrow, title, description, primaryAction, secondaryAction }} />
    </section>
  );
}
