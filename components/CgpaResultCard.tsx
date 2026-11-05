
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { formatSGPA } from "@/lib/grading";
import type { CGPAResult } from "@/lib/types";

const fmt = (n: number) => String(Number(n.toFixed(2)));

export default function CgpaResultCard({ result }: { result: CGPAResult }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const hasResult = result.cgpa !== null;

  const summary = hasResult
    ? `My CGPA is ${formatSGPA(result.cgpa)} (${result.totalSemesters} ${result.totalSemesters === 1 ? "semester" : "semesters"}, ${fmt(result.totalCredits)} credit hours). Calculated with the ASTU SGPA Calculator.`
    : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <section
      aria-labelledby="cgpa-result-heading"
      className="rounded-2xl bg-brand-700 p-4 text-white shadow-sm sm:p-8"
    >
      <h2
        id="cgpa-result-heading"
        className="text-sm font-medium text-brand-200"
      >
        Your CGPA
      </h2>

      <p
        className="mt-1 text-5xl font-bold tabular-nums sm:text-7xl"
        aria-live="polite"
      >
        {formatSGPA(result.cgpa)}
      </p>

      {hasResult ? (
        <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 sm:gap-4">
          <div className="min-w-0">
            <dt className="text-xs leading-tight text-brand-200 sm:text-sm">
              Semesters
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">
              {result.totalSemesters}
            </dd>
          </div>

          <div className="min-w-0">
            <dt className="text-xs leading-tight text-brand-200 sm:text-sm">
              Credit hours
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">
              {fmt(result.totalCredits)}
            </dd>
          </div>

          <div className="min-w-0">
            <dt className="text-xs leading-tight text-brand-200 sm:text-sm">
              Weighted points
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">
              {fmt(result.totalWeightedPoints)}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-brand-200 sm:text-base">
          Fill in a semester name, SGPA, and credit hours to see your CGPA.
        </p>
      )}

      {hasResult && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-medium text-[#4a24a8] hover:bg-[#f5f2ff]"
          >
            {status === "copied" ? (
              <Check size={18} aria-hidden="true" />
            ) : (
              <Copy size={18} aria-hidden="true" />
            )}
            Copy result
          </button>

          <span className="min-w-0 text-sm text-brand-100" role="status">
            {status === "copied" && "Copied to clipboard"}
            {status === "failed" &&
              "Couldn't copy. Select the text and copy it manually."}
          </span>
        </div>
      )}
    </section>
  );
}
