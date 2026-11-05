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
  "w-full min-w-0 rounded-lg border border-line bg-surface px-2 py-2 text-base text-ink placeholder:text-muted/60 focus:border-brand-500 sm:px-3";

export default function CourseRow({ course, index, onChange, onRemove }: Props) {
  const n = index + 1;
  const graded = gradeCourse(course);

  const pctBad = course.percentage.trim() !== "" && parsePercentage(course.percentage) === null;
  const crBad = course.credits.trim() !== "" && parseCredits(course.credits) === null;

  
return (
  <li className="row-in rounded-xl border border-line bg-surface p-3">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* First row: Course name, percentage, credits */}
      <div className="grid grid-cols-[minmax(0,1fr)_76px_76px] gap-2 sm:flex sm:flex-1">
        <input
          aria-label={`Course ${n} name`}
          className={`${inputCls} sm:flex-1`}
          type="text"
          placeholder={`Course ${n}`}
          value={course.name}
          onChange={(e) => onChange(course.id, "name", e.target.value)}
        />

        <input
          aria-label={`Course ${n} percentage`}
          className={`${inputCls} ${pctBad ? "border-red-500" : ""} sm:w-28`}
          type="text"
          inputMode="decimal"
          placeholder="%"
          value={course.percentage}
          aria-invalid={pctBad}
          onChange={(e) => onChange(course.id, "percentage", e.target.value)}
        />

        <input
          aria-label={`Course ${n} credit hours`}
          className={`${inputCls} ${crBad ? "border-red-500" : ""} sm:w-28`}
          type="text"
          inputMode="decimal"
          placeholder="Credits"
          value={course.credits}
          aria-invalid={crBad}
          onChange={(e) => onChange(course.id, "credits", e.target.value)}
        />
      </div>

      {/* Second row on mobile: Grade, points, delete */}
      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <p className="flex items-center gap-4 text-sm" aria-live="polite">
          <span>
            <span className="text-muted">Grade: </span>
            <span className={`inline-block min-w-8 rounded-md px-2 py-0.5 text-center font-semibold ${graded ? "bg-brand-100 text-brand-text" : "text-muted"}`}>
              {graded ? graded.letter : "—"}
            </span>
          </span>

          <span>
            <span className="text-muted">Points: </span>
            <span className="font-semibold tabular-nums">
              {graded ? graded.point.toFixed(2) : "—"}
            </span>
          </span>
        </p>

        <button
          type="button"
          onClick={() => onRemove(course.id)}
          aria-label={`Remove course ${course.name.trim() || n}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-red-500/10 hover:text-danger"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </div>

    {(pctBad || crBad) && (
      <p className="mt-2 text-xs text-danger" role="alert">
        {pctBad && "Percentage must be a number from 0 to 100. "}
        {crBad && "Credit hours must be greater than 0."}
      </p>
    )}
  </li>
);
}
