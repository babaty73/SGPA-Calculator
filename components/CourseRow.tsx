import { Trash2 } from "lucide-react";
import { gradeCourse, parseCredits, parsePercentage } from "@/lib/grading";
import type { Course } from "@/lib/types";

interface Props {
  course: Course;
  index: number;
  onChange: (id: string, field: "name" | "percentage" | "credits", value: string) => void;
  onRemove: (id: string) => void;
}

const inputCls =
  "w-full rounded-lg border border-line bg-[var(--color-input)] px-3 py-2 text-base text-ink placeholder:text-muted/70 focus:border-brand-500";

export default function CourseRow({ course, index, onChange, onRemove }: Props) {
  const n = index + 1;
  const graded = gradeCourse(course);

  const pctBad = course.percentage.trim() !== "" && parsePercentage(course.percentage) === null;
  const crBad = course.credits.trim() !== "" && parseCredits(course.credits) === null;

  return (
    <li className="row-in rounded-xl border border-line bg-[var(--color-surface)] p-3 md:grid md:grid-cols-[minmax(0,1fr)_7rem_7rem_4.5rem_4.5rem_2.5rem] md:items-start md:gap-3 md:rounded-none md:border-0 md:border-b md:bg-transparent md:px-0 md:py-2">
      <div className="mb-3 md:mb-0">
        <label htmlFor={`name-${course.id}`} className="mb-1 block text-sm font-medium text-muted md:sr-only">
          Course name
        </label>
        <input
          id={`name-${course.id}`}
          className={inputCls}
          type="text"
          placeholder={`Course ${n}`}
          value={course.name}
          onChange={(e) => onChange(course.id, "name", e.target.value)}
        />
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 md:contents">
        <div>
          <label htmlFor={`pct-${course.id}`} className="mb-1 block text-sm font-medium text-muted md:sr-only">
            Percentage
          </label>
          <input
            id={`pct-${course.id}`}
            className={`${inputCls} ${pctBad ? "border-red-500" : ""}`}
            type="text"
            inputMode="decimal"
            placeholder="0–100"
            value={course.percentage}
            aria-invalid={pctBad}
            aria-describedby={pctBad ? `pct-err-${course.id}` : undefined}
            onChange={(e) => onChange(course.id, "percentage", e.target.value)}
          />
          {pctBad && (
            <p id={`pct-err-${course.id}`} className="mt-1 text-xs text-red-600">
              Enter a number from 0 to 100.
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`cr-${course.id}`} className="mb-1 block text-sm font-medium text-muted md:sr-only">
            Credit hours
          </label>
          <input
            id={`cr-${course.id}`}
            className={`${inputCls} ${crBad ? "border-red-500" : ""}`}
            type="text"
            inputMode="decimal"
            placeholder="e.g. 3"
            value={course.credits}
            aria-invalid={crBad}
            aria-describedby={crBad ? `cr-err-${course.id}` : undefined}
            onChange={(e) => onChange(course.id, "credits", e.target.value)}
          />
          {crBad && (
            <p id={`cr-err-${course.id}`} className="mt-1 text-xs text-red-600">
              Must be greater than 0.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:contents">
        <div className="flex items-center gap-4 md:contents" aria-live="polite">
          <p className="text-sm md:flex md:h-10 md:items-center md:justify-center">
            <span className="text-muted md:sr-only">Grade </span>
            <span className={`inline-block min-w-10 rounded-md px-2 py-0.5 text-center font-semibold ${graded ? "bg-brand-100 text-brand-700" : "text-muted"}`}>
              {graded ? graded.letter : "—"}
            </span>
          </p>
          <p className="text-sm md:flex md:h-10 md:items-center md:justify-center">
            <span className="text-muted md:sr-only">Points </span>
            <span className="font-semibold tabular-nums">{graded ? graded.point.toFixed(2) : "—"}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(course.id)}
          aria-label={`Remove course ${course.name.trim() || n}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
