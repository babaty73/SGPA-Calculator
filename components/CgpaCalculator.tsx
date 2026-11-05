"use client";

import { useMemo, useState } from "react";
import SemesterTable from "./SemesterTable";
import CgpaResultCard from "./CgpaResultCard";
import CgpaNote from "./CgpaNote";
import { calculateCGPA } from "@/lib/cgpa";
import type { Semester } from "@/lib/types";

const blank = (id: string, n: number): Semester => ({ id, name: `Semester ${n}`, sgpa: "", credits: "" });
const initialSemesters = (): Semester[] => [blank("s1", 1), blank("s2", 2), blank("s3", 3)];

export default function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const result = useMemo(() => calculateCGPA(semesters), [semesters]);

  return (
    <div className="space-y-6">
      <SemesterTable
        semesters={semesters}
        onUpdate={(id, field, value) =>
          setSemesters((ss) => ss.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
        }
        onAdd={() => setSemesters((ss) => [...ss, blank(crypto.randomUUID(), ss.length + 1)])}
        onRemove={(id) => setSemesters((ss) => ss.filter((s) => s.id !== id))}
        onReset={() => setSemesters(initialSemesters())}
      />
      <CgpaResultCard result={result} />
      <CgpaNote />
    </div>
  );
}
