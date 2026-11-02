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
    { x: 5, y: 8, w: 24, h: 6, c: 1 },
    { x: 5, y: 21, w: 21, h: 3, c: 1 },
    { x: 5, y: 27, w: 24, h: 3, c: 1 },
    { x: 5, y: 33, w: 18, h: 3, c: 1 },
    { x: 5, y: 39, w: 22, h: 3, c: 1 },
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

const WORD_MS = 90;
const DUR = { wire: 1600, tokens: 1600, product: 4200 };

export default function HeroBoard({ lang }: { lang: Lang }) {
  const items = board.items;
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0); // 0 text, 1 wireframe, 2 tokens, 3 product
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const item: BoardItem = items[i];
  const line = t(item.line, lang);
  const words = line.split(" ");
  const textDur = 900 + words.length * WORD_MS + 1500;
  const durs = [textDur, DUR.wire, DUR.tokens, DUR.product];
  const wire = WIRES[item.wire === "landing" ? "landing" : "app"];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (still) {
      setPhase(3);
      return;
    }
    if (paused) return;
    timer.current = window.setTimeout(() => {
      if (phase < 3) setPhase(phase + 1);
      else {
        setPhase(0);
        setI((n) => (n + 1) % items.length);
      }
    }, durs[phase]);
    return () => window.clearTimeout(timer.current);
    // durs derives from i and lang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, paused, still, i, run, lang]);

  const pick = (k: number) => {
    setI(k);
    setPhase(still ? 3 : 0);
    setRun((r) => r + 1);
  };

  const toggle = () => {
    setPaused((p) => !p);
    setRun((r) => r + 1);
  };

  return (
    <figure className={`stagebox${paused ? " paused" : ""}`} aria-label={`${t(board.label, lang)}: ${item.name}`}>
      <div className="stage-tabs" role="group" aria-label={t(board.label, lang)}>
        {items.map((it, k) => (
          <button
            key={it.slug}
            type="button"
            className={k === i ? "tab on" : "tab"}
            aria-pressed={k === i}
            onClick={() => pick(k)}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="window-wrap">
        <span className="glow g1" style={{ backgroundColor: item.palette[2] }} aria-hidden="true" />
        <span className="glow g2" style={{ backgroundColor: item.palette[0] }} aria-hidden="true" />
        <div className="window">
          <div className="chrome">
            <span className="lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="chrome-title">
              <span className="chrome-file">{item.file}</span>
              <span className="chrome-arrow" aria-hidden="true" />
              <Link href={`/${lang}/work/${item.slug}`}>{item.name}</Link>
            </span>
            <button type="button" className="chrome-btn" onClick={toggle} hidden={still} aria-pressed={paused}>
              {paused ? t(board.play, lang) : t(board.pause, lang)}
            </button>
          </div>

          <div className={`canvas p${phase}`} aria-hidden="true" key={`${i}-${run}`}>
            <div className="c-text">
              <span className="c-file">{item.file}</span>
              <p className="c-line">
                {words.map((w, k) => (
                  <span key={k} style={{ "--k": k } as React.CSSProperties}>
                    {w}{" "}
                  </span>
                ))}
              </p>
            </div>

            <svg className="c-wire" viewBox="0 0 160 100" preserveAspectRatio="none">
              {wire.map((r, k) => (
                <rect
                  key={k}
                  x={r.x + 0.4}
                  y={r.y + 0.4}
                  width={Math.max(r.w - 0.8, 0.5)}
                  height={Math.max(r.h - 0.8, 0.5)}
                  rx={1.4}
                  pathLength={1}
                  style={{ "--fill": item.palette[r.c], "--k": k } as React.CSSProperties}
                />
              ))}
            </svg>

            <div className="c-chips">
              {item.palette.map((c, k) => (
                <span key={k} style={{ "--k": k } as React.CSSProperties}>
                  <b style={{ background: c }} />
                  {c.toUpperCase()}
                </span>
              ))}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="c-shot" src={item.shot} alt="" />
          </div>
        </div>
      </div>

      <ol className="stage-steps">
        {board.steps.map((s, k) => (
          <li key={k} className={k === phase ? "on" : k < phase ? "done" : undefined}>
            <span className="bar">
              <i key={`${i}-${phase}-${run}`} style={{ animationDuration: `${durs[k]}ms` }} />
            </span>
            <span className="step-label">
              <span className="step-k">{k + 1}</span>
              {t(s, lang)}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
