"use client";

import { Plus, RotateCcw } from "lucide-react";
import CourseRow from "./CourseRow";
import type { Course } from "@/lib/types";

interface Props {
  courses: Course[];
  onUpdate: (id: string, field: "name" | "percentage" | "credits", value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onReset: () => void;
}

export default function CourseTable({ courses, onUpdate, onAdd, onRemove, onReset }: Props) {
  return (
    <section aria-labelledby="courses-heading" className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="courses-heading" className="text-lg font-semibold">Your courses</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-brand-50 hover:text-brand-700"
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </div>

      <div
        className="hidden border-b border-line pb-2 text-sm font-medium text-muted md:grid md:grid-cols-[minmax(0,1fr)_7rem_7rem_4.5rem_4.5rem_2.5rem] md:gap-3"
        aria-hidden="true"
      >
        <span>Course name</span>
        <span>Percentage</span>
        <span>Credit hours</span>
        <span className="text-center">Grade</span>
        <span className="text-center">Points</span>
        <span />
      </div>

      {courses.length === 0 ? (
        <p className="py-8 text-center text-muted">No courses yet. Add your first course to begin.</p>
      ) : (
        <ul className="space-y-3 md:space-y-0">
          {courses.map((c, i) => (
            <CourseRow key={c.id} course={c} index={i} onChange={onUpdate} onRemove={onRemove} />
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 font-medium text-white hover:bg-brand-700 sm:w-auto"
      >
        <Plus size={18} aria-hidden="true" /> Add course
      </button>
    </section>
  );
}
