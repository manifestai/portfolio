"use client";

import { useEffect, useRef, useState } from "react";
import { game as G } from "@/lib/game";

type Lang = "en" | "pt";
type T = { en: string; pt: string };

const PHASES: T[] = [
  { en: "Discover", pt: "Descobrir" },
  { en: "Frame", pt: "Enquadrar" },
  { en: "Write", pt: "Escrever" },
  { en: "Prototype", pt: "Prototipar" },
  { en: "Build", pt: "Construir" },
  { en: "Ship and learn", pt: "Entregar e aprender" },
];

/* Fictional numbers for the case */
const NOSHOW = { before: 22, after: 7 };
const FUNNEL = [100, 64, 38];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function ProcessGame({ lang, onRead }: { lang: Lang; onRead: () => void }) {
  const tr = (x: T) => x[lang];
  const [step, setStep] = useState(-1);
  const [biz, setBiz] = useState(0);
  const [use, setUse] = useState(0);
  const [rework, setRework] = useState(0);
  const [deferred, setDeferred] = useState(false);
  const [notebook, setNotebook] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState<string>("");

  // per-phase selections
  const [picks, setPicks] = useState<string[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]);
  const [ideas, setIdeas] = useState<number[]>([]);
  const [proto, setProto] = useState<number | null>(null);
  const [miss, setMiss] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [found, setFound] = useState(false);
  const [question, setQuestion] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step < 0) return;
    const el = stageRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const top = el.closest(".game")?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top: top - 90, behavior: "smooth" });
  }, [step]);

  const score = (b: number, u: number) => {
    setBiz((v) => clamp(v + b));
    setUse((v) => clamp(v + u));
  };
  const finish = (text: string) => {
    setNote(text);
    setDone(true);
  };
  const next = () => {
    setDone(false);
    setNote("");
    setStep((s) => s + 1);
  };
  const reset = () => {
    setStep(0);
    setBiz(0);
    setUse(0);
    setRework(0);
    setDeferred(false);
    setNotebook([]);
    setDone(false);
    setNote("");
    setPicks([]);
    setSlots([null, null, null, null]);
    setIdeas([]);
    setProto(null);
    setMiss(null);
    setTries(0);
    setFound(false);
    setQuestion(null);
  };

  /* Phase actions */
  const confirmDiscover = () => {
    const chosen = G.discover.picks.filter((p) => picks.includes(p.id));
    const b = chosen.reduce((a, p) => a + p.biz, 0);
    const u = chosen.reduce((a, p) => a + p.use, 0);
    score(b, u);
    setNotebook(chosen.map((p) => tr(p.says)));
    finish(tr(b === 0 || b < 15 ? G.discover.noteUse : u < 15 ? G.discover.noteBiz : G.discover.noteBalanced));
  };
  const confirmFrame = () => {
    let u = 0;
    let b = 0;
    G.frame.slots.forEach((s, i) => {
      if (slots[i] === s.correct) {
        if (i < 3) u += 7;
        else b += 20;
      }
    });
    score(b, u);
    finish(tr(G.frame.note));
  };
  const confirmWrite = () => {
    const good = ideas.filter((i) => G.write.ideas[i].core).length;
    score(good * 5, good * 5);
    finish(tr(G.write.note));
  };
  const choosePrototype = (i: number) => {
    const o = G.prototype.options[i];
    setProto(i);
    score(o.biz, o.use);
    if (o.rework) setDeferred(true);
    finish(tr(G.prototype.notes[i]));
  };
  const tapLine = (i: number) => {
    if (found) return;
    if (G.build.diff[i].bad) {
      setFound(true);
      setMiss(null);
      score(tries === 0 ? 10 : 5, tries === 0 ? 10 : 5);
      finish(tr(G.build.note));
    } else {
      setMiss(i);
      setTries((n) => n + 1);
    }
  };
  const chooseQuestion = (i: number) => {
    setQuestion(i);
    if (i === G.ship.correct) score(10, 10);
    if (deferred) setRework(8);
    finish(tr(G.ship.note));
  };

  const verdict = () => {
    if (biz < 45 && use < 45) return G.end.low;
    if (biz - use > 25) return G.end.bizHeavy;
    if (use - biz > 25) return G.end.useHeavy;
    return G.end.balanced;
  };

  const phaseIdx = Math.min(Math.max(step, 0), 5);
  const cost = G.cost[phaseIdx];

  return (
    <div className="game">
      <div className="window game-window">
        <div className="chrome">
          <div className="lights" aria-hidden="true"><i /><i /><i /></div>
          <div className="chrome-title">
            <span className="chrome-file">{tr(G.ui.file)}</span>
          </div>
          {step >= 0 && (
            <button type="button" className="chrome-btn" onClick={reset}>
              {lang === "pt" ? "Recomeçar" : "Restart"}
            </button>
          )}
        </div>

        {/* Phase track with the cost of change */}
        <ol className="g-track" aria-label={lang === "pt" ? "Etapas" : "Phases"}>
          {PHASES.map((p, i) => (
            <li
              key={i}
              className={`${step > i || step === 6 ? "done" : ""} ${step === i ? "on" : ""}`}
              aria-current={step === i ? "step" : undefined}
            >
              <span className="g-dot">{i + 1}</span>
              <span className="g-name">{tr(p)}</span>
              <span className="g-cost">{G.cost[i]}×</span>
            </li>
          ))}
        </ol>

        <div className="g-body">
          <div className="g-stage" ref={stageRef} tabIndex={-1} key={step}>
            {step === -1 && (
              <div className="g-intro">
                <h3>{tr(G.intro.title)}</h3>
                <p>{tr(G.intro.body)}</p>
                <p className="g-fine">{tr(G.intro.rule)}</p>
                <button type="button" className="btn btn-primary" onClick={() => setStep(0)}>
                  {tr(G.ui.start)}
                </button>
              </div>
            )}

            {step >= 0 && step <= 5 && (
              <p className="g-kicker">
                {tr(G.ui.phase)} {step + 1} {tr(G.ui.of)} 6 <span aria-hidden="true">·</span> {tr(PHASES[step])}
              </p>
            )}

            {step === 0 && (
              <>
                <h3>{tr(G.discover.title)}</h3>
                <p className="g-hint">{tr(G.discover.choose)} ({picks.length}/3)</p>
                <div className="g-cards">
                  {G.discover.picks.map((p) => {
                    const on = picks.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        className={`g-card${on ? " on" : ""}`}
                        aria-pressed={on}
                        disabled={done || (!on && picks.length >= 3)}
                        onClick={() => setPicks(on ? picks.filter((x) => x !== p.id) : [...picks, p.id])}
                      >
                        <span className="g-who">{tr(p.who)}</span>
                        <span className="g-tags">
                          {p.biz > 0 && <i className="t-biz">{tr(G.ui.biz)}</i>}
                          {p.use > 0 && <i className="t-use">{tr(G.ui.use)}</i>}
                        </span>
                        {done && on && <span className="g-says">{tr(p.says)}</span>}
                      </button>
                    );
                  })}
                </div>
                {!done && (
                  <button type="button" className="btn btn-primary g-go" disabled={picks.length < 3} onClick={confirmDiscover}>
                    {tr(G.ui.confirm)}
                  </button>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <h3>{tr(G.frame.title)}</h3>
                <div className="g-slots">
                  {G.frame.slots.map((s, i) => (
                    <div key={i} className={`g-slot${i === 3 ? " metric" : ""}`}>
                      <p className="g-slot-label">{tr(s.label)}</p>
                      <div className="g-chips" role="radiogroup" aria-label={tr(s.label)}>
                        {s.options.map((o, j) => {
                          const on = slots[i] === j;
                          const state = done ? (j === s.correct ? " right" : on ? " wrong" : "") : "";
                          return (
                            <button
                              key={j}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              disabled={done}
                              className={`g-chip${on ? " on" : ""}${state}`}
                              onClick={() => setSlots(slots.map((v, k) => (k === i ? j : v)))}
                            >
                              {tr(o)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {!done && (
                  <button type="button" className="btn btn-primary g-go" disabled={slots.some((v) => v === null)} onClick={confirmFrame}>
                    {tr(G.ui.confirm)}
                  </button>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h3>{tr(G.write.title)}</h3>
                <p className="g-hint">{tr(G.write.choose)} ({ideas.length}/3)</p>
                <div className="g-ideas">
                  {G.write.ideas.map((idea, i) => {
                    const on = ideas.includes(i);
                    const state = done ? (idea.core ? " right" : on ? " wrong" : " out") : "";
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={on}
                        disabled={done || (!on && ideas.length >= 3)}
                        className={`g-idea${on ? " on" : ""}${state}`}
                        onClick={() => setIdeas(on ? ideas.filter((x) => x !== i) : [...ideas, i])}
                      >
                        <span className="g-box" aria-hidden="true" />
                        {tr(idea)}
                      </button>
                    );
                  })}
                </div>
                {!done && (
                  <button type="button" className="btn btn-primary g-go" disabled={ideas.length < 3} onClick={confirmWrite}>
                    {tr(G.ui.confirm)}
                  </button>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h3>{tr(G.prototype.title)}</h3>
                <ul className="g-quotes">
                  {G.prototype.quotes.map((q, i) => (
                    <li key={i} className={i === 2 ? "alert" : ""}>{tr(q)}</li>
                  ))}
                </ul>
                <div className="g-options">
                  {G.prototype.options.map((o, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={done}
                      className={`g-option${proto === i ? " on" : ""}`}
                      onClick={() => choosePrototype(i)}
                    >
                      {tr(o)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3>{tr(G.build.title)}</h3>
                <div className="g-review">
                  <div className="g-criteria">
                    <p className="g-slot-label">{tr(G.build.criteriaLabel)}</p>
                    <ol>
                      {G.build.criteria.map((c, i) => (
                        <li key={i}>{tr(c)}</li>
                      ))}
                    </ol>
                  </div>
                  <figure className="excerpt g-diff">
                    <figcaption className="file">{G.build.file}</figcaption>
                    <div>
                      {G.build.diff.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          disabled={found}
                          className={`g-line${miss === i ? " miss" : ""}${found && d.bad ? " bad" : ""}`}
                          onClick={() => tapLine(i)}
                        >
                          <span className="g-ln">{i + 12}</span>
                          <code>{d.code}</code>
                        </button>
                      ))}
                    </div>
                    {miss !== null && !found && <p className="note">{tr(G.build.wrong)}</p>}
                  </figure>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h3>{tr(G.ship.title)}</h3>
                <div className="g-ship">
                  <div className="g-metric">
                    <p className="g-slot-label">{tr(G.ship.metricLabel)}</p>
                    <p className="g-big">
                      <s>{NOSHOW.before}%</s> <span aria-hidden="true">&#8594;</span> {NOSHOW.after}%
                    </p>
                    <p className="g-fine">
                      {tr(G.ship.before)} / {tr(G.ship.after)}
                    </p>
                  </div>
                  <div className="g-funnel">
                    <p className="g-slot-label">{tr(G.ship.funnelLabel)}</p>
                    {FUNNEL.map((v, i) => (
                      <div key={i} className="g-frow">
                        <span>{tr(G.ship.funnel[i])}</span>
                        <span className="g-fbar"><i style={{ width: `${v}%` }} /></span>
                        <b>{v}</b>
                      </div>
                    ))}
                  </div>
                </div>
                {deferred && done && <p className="g-alert">{tr(G.ship.reworkHit)}</p>}
                <p className="g-hint">{tr(G.ship.question)}</p>
                <div className="g-options">
                  {G.ship.options.map((o, i) => {
                    const state = done ? (i === G.ship.correct ? " right" : question === i ? " wrong" : "") : "";
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={done}
                        className={`g-option${question === i ? " on" : ""}${state}`}
                        onClick={() => chooseQuestion(i)}
                      >
                        {tr(o)}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 6 && (
              <div className="g-end">
                <h3>{tr(G.end.title)}</h3>
                <p className="equation">{tr(verdict())}</p>
                <div className="g-score">
                  <div><span>{tr(G.ui.biz)}</span><b>{biz}</b></div>
                  <div><span>{tr(G.ui.use)}</span><b>{use}</b></div>
                  <div><span>{tr(G.end.reworkLine)}</span><b>{rework} {tr(G.ui.days)}</b></div>
                </div>
                <div className="g-end-ctas">
                  <button type="button" className="btn btn-primary" onClick={reset}>{tr(G.ui.again)}</button>
                  <a className="btn btn-ghost" href="#work">{tr(G.ui.seeWork)}</a>
                  <button type="button" className="btn btn-ghost" onClick={onRead}>{tr(G.ui.readMode)}</button>
                </div>
              </div>
            )}

            {done && step <= 5 && (
              <div className="g-note" role="status">
                <p className="g-slot-label">{tr(G.ui.pmNote)}</p>
                <p>{note}</p>
                <button type="button" className="btn btn-primary" onClick={next}>
                  {step === 5 ? (lang === "pt" ? "Ver o resultado" : "See the result") : tr(G.ui.next)}
                </button>
              </div>
            )}
          </div>

          {/* HUD */}
          <aside className="g-hud" aria-label="HUD">
            <div className="g-meter biz">
              <p><span>{tr(G.ui.biz)}</span><b>{biz}</b></p>
              <span className="g-bar"><i style={{ width: `${biz}%` }} /></span>
            </div>
            <div className="g-meter use">
              <p><span>{tr(G.ui.use)}</span><b>{use}</b></p>
              <span className="g-bar"><i style={{ width: `${use}%` }} /></span>
            </div>
            <p className="g-eq" aria-hidden="true">
              {tr(G.ui.biz)} <span>+</span> {tr(G.ui.use).toLowerCase()} <span>=</span> <b>{lang === "pt" ? "produto" : "product"}</b>
            </p>
            <div className="g-costbox">
              <p className="g-slot-label">{tr(G.ui.costLabel)}</p>
              <p className="g-costv">{step === 6 ? "16×" : `${cost}×`}</p>
              {rework > 0 && (
                <p className="g-fine">
                  {tr(G.ui.rework)}: {rework} {tr(G.ui.days)}
                </p>
              )}
            </div>
            <div className="g-notebook">
              <p className="g-slot-label">{tr(G.ui.notebook)}</p>
              {notebook.length === 0 ? (
                <p className="g-fine">{tr(G.ui.notebookEmpty)}</p>
              ) : (
                <ul>
                  {notebook.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
