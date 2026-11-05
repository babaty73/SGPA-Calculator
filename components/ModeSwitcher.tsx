"use client";

import { useState } from "react";
import Calculator from "./Calculator";
import CgpaCalculator from "./CgpaCalculator";

type Mode = "sgpa" | "cgpa";

const TABS: { mode: Mode; label: string }[] = [
  { mode: "sgpa", label: "SGPA Calculator" },
  { mode: "cgpa", label: "CGPA Calculator" },
];

/** Both calculators stay mounted; the inactive one is only hidden, so entered data is kept. */
export default function ModeSwitcher({ children }: { children?: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("sgpa");

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const next: Mode = mode === "sgpa" ? "cgpa" : "sgpa";
      setMode(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Calculator mode"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface p-1"
      >
        {TABS.map((t) => {
          const active = mode === t.mode;
          return (
            <button
              key={t.mode}
              id={`tab-${t.mode}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`panel-${t.mode}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setMode(t.mode)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold sm:text-base ${
                active ? "bg-brand-600 text-white" : "text-muted hover:bg-brand-50 hover:text-brand-text"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="panel-sgpa" role="tabpanel" aria-labelledby="tab-sgpa" hidden={mode !== "sgpa"} className="space-y-6">
        <Calculator />
        {children}
      </div>
      <div id="panel-cgpa" role="tabpanel" aria-labelledby="tab-cgpa" hidden={mode !== "cgpa"} className="space-y-6">
        <CgpaCalculator />
      </div>
    </div>
  );
}
