
import { Trash2 } from "lucide-react";
import { parseSGPA, validateSemester } from "@/lib/cgpa";
import { parseCredits } from "@/lib/grading";
import type { Semester } from "@/lib/types";

interface Props {
  semester: Semester;
  index: number;
  onChange: (
    id: string,
    field: "name" | "sgpa" | "credits",
    value: string
  ) => void;
  onRemove: (id: string) => void;
}

const inputCls =
  "w-full min-w-0 rounded-lg border border-line bg-surface px-2 py-2 text-base text-ink placeholder:text-muted/60 focus:border-brand-500 sm:px-3";

export default function SemesterRow({
  semester,
  index,
  onChange,
  onRemove,
}: Props) {
  const n = index + 1;

  const sgpaBad =
    semester.sgpa.trim() !== "" &&
    parseSGPA(semester.sgpa) === null;

  const crBad =
    semester.credits.trim() !== "" &&
    parseCredits(semester.credits) === null;

  const counted = validateSemester(semester) !== null;

  return (
    <li className="row-in rounded-xl border border-line bg-surface p-3">
      {/* First row: SGPA, Credits, Delete */}
      <div className="flex items-center gap-2">
        <input
          aria-label={`Semester ${n} SGPA`}
          className={`${inputCls} flex-1 ${sgpaBad ? "border-red-500" : ""}`}
          type="text"
          inputMode="decimal"
          placeholder="SGPA"
          value={semester.sgpa}
          aria-invalid={sgpaBad}
          onChange={(e) =>
            onChange(semester.id, "sgpa", e.target.value)
          }
        />

        <input
          aria-label={`Semester ${n} credit hours`}
          className={`${inputCls} flex-1 ${crBad ? "border-red-500" : ""}`}
          type="text"
          inputMode="decimal"
          placeholder="Credits"
          value={semester.credits}
          aria-invalid={crBad}
          onChange={(e) =>
            onChange(semester.id, "credits", e.target.value)
          }
        />

        <button
          type="button"
          onClick={() => onRemove(semester.id)}
          aria-label={`Remove ${semester.name.trim() || `semester ${n}`}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-red-500/10 hover:text-danger"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Validation messages */}
      {(sgpaBad || crBad) && (
        <p className="mt-2 text-xs text-danger" role="alert">
          {sgpaBad && "SGPA must be a number from 0 to 4. "}
          {crBad && "Credit hours must be greater than 0."}
        </p>
      )}

      {/* Second row: Inclusion status */}
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {counted
          ? "Included in your CGPA"
          : "Not counted yet. Fill in all three fields."}
      </p>
    </li>
  );
}
