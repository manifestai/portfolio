"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Phase = {
  space: "problem" | "solution";
  spaceLabel: string;
  name: string;
  body?: string;
  lanes?: { label: string; body: string }[];
  equation?: { business: string; use: string; product: string };
  job?: { label: string; parts: string[] };
  output: string;
  sheet?: { stage: string; name: string; body: string; links: { href: string; name: string }[] };
};

type Labels = { output: string; open: string; kicker: string; see: string; close: string; hint: string; loop: string };

/* Columns per breakpoint, matching .phases in globals.css */
function useCols() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const two = window.matchMedia("(max-width: 960px)");
    const one = window.matchMedia("(max-width: 720px)");
    const update = () => setCols(one.matches ? 1 : two.matches ? 2 : 3);
    update();
    two.addEventListener("change", update);
    one.addEventListener("change", update);
    return () => {
      two.removeEventListener("change", update);
      one.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

/* Index of the last item in the row that holds item `i`, so the panel opens right under that row. */
function rowEnd(i: number, count: number, cols: number) {
  const span = (k: number) => {
    if (cols === 1) return 1;
    if (k === 0 || k === count - 2) return 2;
    if (k === count - 1 && cols === 2) return 2;
    return 1;
  };
  let used = 0;
  let end = 0;
  for (let k = 0; k < count; k++) {
    const s = span(k);
    if (used + s > cols) used = 0;
    used += s;
    end = k;
    if (k >= i && (used === cols || k === count - 1)) return end;
  }
  return end;
}

export default function ProcessExplorer({ phases, labels }: { phases: Phase[]; labels: Labels }) {
  const [open, setOpen] = useState<number | null>(null);
  const cols = useCols();
  const count = phases.length + 1; // phases plus the loop card
  const after = open === null ? -1 : rowEnd(open, count, cols);
  const current = open === null ? null : phases[open];

  const panel = current?.sheet && (
    <li className="sheet-panel" id="sheet-panel" key={`panel-${open}`} aria-live="polite">
      <div className="sp-head">
        <p className="sp-kicker">
          <span className="step-n" aria-hidden="true">{(open ?? 0) + 1}</span>
          {current.name} <span aria-hidden="true">&#8594;</span> {labels.kicker}
        </p>
        <button type="button" className="chrome-btn" onClick={() => setOpen(null)}>
          {labels.close}
        </button>
      </div>
      <h3>{current.sheet.name}</h3>
      <p>{current.sheet.body}</p>
      {current.sheet.links.length > 0 && (
        <p className="sp-links">
          <span>{labels.see}</span>
          {current.sheet.links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.name}
            </Link>
          ))}
        </p>
      )}
    </li>
  );

  const items = phases.map((ph, i) => (
    <li
      key={i}
      className={`card phase ${ph.space}${i === 0 || i === phases.length - 1 ? " wide" : ""}${ph.sheet ? " has-sheet" : ""}${open === i ? " on" : ""}`}
    >
      <div className="phase-top">
        <span className="step-n" aria-hidden="true">{i + 1}</span>
        <span className={`space-tag ${ph.space}`}>{ph.spaceLabel}</span>
      </div>
      <h3>{ph.name}</h3>
      {ph.lanes ? (
        <>
          <div className="lanes">
            {ph.lanes.map((ln, j) => (
              <div key={j} className="lane">
                <p className="lane-label">{ln.label}</p>
                <p>{ln.body}</p>
              </div>
            ))}
            <span className="lane-plus" aria-hidden="true">+</span>
          </div>
          {ph.equation && (
            <p className="equation">
              {ph.equation.business} <span>+</span> {ph.equation.use} <span>=</span> <b>{ph.equation.product}</b>
            </p>
          )}
        </>
      ) : (
        ph.body && <p>{ph.body}</p>
      )}
      {ph.job && (
        <div className="jtbd">
          <p className="lane-label">{ph.job.label}</p>
          <p className="jtbd-line">
            {ph.job.parts.map((part, k) =>
              k % 2 === 0 ? <span key={k}>{part} </span> : <i key={k}>[{part}]{k < ph.job!.parts.length - 1 ? ", " : "."} </i>
            )}
          </p>
        </div>
      )}
      <p className="phase-out">
        <span>{labels.output}</span>
        {ph.output}
      </p>
      {ph.sheet && (
        <button
          type="button"
          className="phase-open"
          aria-expanded={open === i}
          aria-controls="sheet-panel"
          onClick={() => setOpen(open === i ? null : i)}
        >
          {labels.open}
          <span aria-hidden="true">{open === i ? "−" : "+"}</span>
        </button>
      )}
    </li>
  ));

  const loop = (
    <li className="loop" key="loop">
      <span className="loop-icon" aria-hidden="true">&#8634;</span>
      <p>{labels.loop}</p>
    </li>
  );

  const all = [...items, loop];
  const list = after < 0 ? all : [...all.slice(0, after + 1), panel, ...all.slice(after + 1)];

  return (
    <>
      <p className="sheet-hint">{labels.hint}</p>
      <ol className="phases">{list}</ol>
    </>
  );
}
