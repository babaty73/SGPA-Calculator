"use client";

import { Plus, RotateCcw } from "lucide-react";
import SemesterRow from "./SemesterRow";
import type { Semester } from "@/lib/types";

interface Props {
  semesters: Semester[];
  onUpdate: (id: string, field: "name" | "sgpa" | "credits", value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onReset: () => void;
}

export default function SemesterTable({ semesters, onUpdate, onAdd, onRemove, onReset }: Props) {
  return (
    <section aria-labelledby="semesters-heading" className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="semesters-heading" className="text-lg font-semibold">Your semesters</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-brand-50 hover:text-brand-text"
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </div>

      {semesters.length === 0 ? (
        <p className="py-8 text-center text-muted">No semesters yet. Add your first semester to begin.</p>
      ) : (
        <ul className="space-y-3">
          {semesters.map((s, i) => (
            <SemesterRow key={s.id} semester={s} index={i} onChange={onUpdate} onRemove={onRemove} />
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 font-medium text-white hover:bg-brand-700 sm:w-auto"
      >
        <Plus size={18} aria-hidden="true" /> Add semester
      </button>
    </section>
  );
}
