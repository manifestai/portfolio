"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { board, t, type Lang, type BoardItem } from "@/lib/content";

type R = { x: number; y: number; w: number; h: number; c: 0 | 1 | 2 | 3 };

/* Wireframes in a 160 x 100 box, the same 16:10 proportion as the screenshots. */
const WIRES: Record<"app" | "landing", R[]> = {
  app: [
    { x: 0, y: 0, w: 34, h: 100, c: 0 },
    { x: 34, y: 0, w: 126, h: 100, c: 1 },
    { x: 4, y: 7, w: 26, h: 7, c: 1 },
    { x: 4, y: 21, w: 22, h: 3, c: 1 },
    { x: 4, y: 27, w: 25, h: 3, c: 1 },
    { x: 4, y: 33, w: 19, h: 3, c: 1 },
    { x: 4, y: 39, w: 23, h: 3, c: 1 },
    { x: 44, y: 12, w: 72, h: 8, c: 3 },
    { x: 44, y: 25, w: 52, h: 3, c: 3 },
    { x: 44, y: 37, w: 52, h: 47, c: 2 },
    { x: 100, y: 37, w: 50, h: 21, c: 3 },
    { x: 100, y: 63, w: 50, h: 21, c: 2 },
  ],
  landing: [
    { x: 0, y: 0, w: 160, h: 100, c: 0 },
    { x: 0, y: 0, w: 160, h: 9, c: 3 },
    { x: 132, y: 2.5, w: 20, h: 4, c: 2 },
    { x: 12, y: 23, w: 70, h: 8, c: 1 },
    { x: 12, y: 34, w: 56, h: 8, c: 1 },
    { x: 12, y: 48, w: 62, h: 3, c: 3 },
    { x: 12, y: 54, w: 50, h: 3, c: 3 },
    { x: 12, y: 64, w: 34, h: 8, c: 2 },
    { x: 94, y: 19, w: 54, h: 53, c: 3 },
    { x: 100, y: 27, w: 42, h: 10, c: 0 },
    { x: 100, y: 41, w: 42, h: 10, c: 0 },
    { x: 100, y: 55, w: 30, h: 10, c: 2 },
    { x: 0, y: 82, w: 160, h: 18, c: 3 },
  ],
};

/* How long each stage holds, in ms. Typing time depends on the line. */
const HOLD = { wire: 1500, tokens: 1500, product: 3400 };

export default function HeroBoard({ lang }: { lang: Lang }) {
  const items = board.items;
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0); // 0 text, 1 wireframe, 2 tokens, 3 product
  const [typed, setTyped] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const timers = useRef<number[]>([]);

  const item: BoardItem = items[i];
  const line = t(item.line, lang);
  const wire = WIRES[item.wire === "landing" ? "landing" : "app"];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (still) {
      setPhase(3);
      setTyped(line.length);
      return;
    }
    if (paused) return;

    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    let clock = 0;

    if (phase === 0) {
      const step = Math.max(16, Math.min(34, 2400 / line.length));
      for (let k = typed + 1; k <= line.length; k++) {
        clock += step;
        at(clock, () => setTyped(k));
      }
      at(clock + 700, () => setPhase(1));
    } else if (phase === 1) {
      at(HOLD.wire, () => setPhase(2));
    } else if (phase === 2) {
      at(HOLD.tokens, () => setPhase(3));
    } else {
      at(HOLD.product, () => {
        setTyped(0);
        setPhase(0);
        setI((n) => (n + 1) % items.length);
      });
    }
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // typed is read once per phase start on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, paused, still, i, line]);

  const steps = board.steps;

  return (
    <figure className="board" aria-label={`${t(board.label, lang)}: ${item.name}`}>
      <div className="board-rail">
        <p className="board-title">{t(board.label, lang)}</p>
        <ol className="board-steps">
          {steps.map((s, k) => (
            <li key={k} className={k === phase ? "on" : k < phase ? "done" : undefined}>
              <span className="b-n" aria-hidden="true">{k + 1}</span>
              {t(s, lang)}
            </li>
          ))}
        </ol>
        <div className="board-foot">
          <Link href={`/${lang}/work/${item.slug}`} className="board-name">
            {item.name}
          </Link>
          <button
            type="button"
            className="board-toggle"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            hidden={still}
          >
            {paused ? t(board.play, lang) : t(board.pause, lang)}
          </button>
        </div>
      </div>

      <div className={`board-canvas p${phase}`} aria-hidden="true">
        <div className="b-text">
          <span className="b-file">{item.file}</span>
          <p className="b-line">
            {line.slice(0, typed)}
            <span className="b-caret" />
          </p>
        </div>

        <svg className="b-wire" viewBox="0 0 160 100" preserveAspectRatio="none" key={`w${i}`}>
          {wire.map((r, k) => (
            <rect
              key={k}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              pathLength={1}
              style={
                {
                  "--fill": item.palette[r.c],
                  "--d": `${k * 70}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>

        <div className="b-swatches">
          {item.palette.map((c, k) => (
            <span key={k} style={{ background: c, "--d": `${k * 110}ms` } as React.CSSProperties} />
          ))}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="b-shot" src={item.shot} alt="" key={`s${i}`} />
        <span className="b-scan" />
      </div>
    </figure>
  );
}
