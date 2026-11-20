"use client";

import { useState, type ComponentProps } from "react";
import ProcessExplorer from "./ProcessExplorer";
import ProcessGame from "./ProcessGame";
import { game } from "@/lib/game";

type Lang = "en" | "pt";

export default function ProcessModes({ lang, explorer }: { lang: Lang; explorer: ComponentProps<typeof ProcessExplorer> }) {
  const [mode, setMode] = useState<"play" | "read">("play");
  return (
    <>
      <div className="g-modes" role="tablist" aria-label={game.ui.modeLabel[lang]}>
        {(["play", "read"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            className={mode === m ? "on" : ""}
            onClick={() => setMode(m)}
          >
            {game.ui[m][lang]}
          </button>
        ))}
      </div>
      {mode === "play" ? <ProcessGame lang={lang} onRead={() => setMode("read")} /> : <ProcessExplorer {...explorer} />}
    </>
  );
}
