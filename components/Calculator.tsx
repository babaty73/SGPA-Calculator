"use client";

import { useMemo, useState } from "react";
import CourseTable from "./CourseTable";
import ResultCard from "./ResultCard";
import { calculateSGPA } from "@/lib/grading";
import type { Course } from "@/lib/types";

const blank = (id: string): Course => ({ id, name: "", percentage: "", credits: "" });
const initialCourses = (): Course[] => [blank("c1"), blank("c2"), blank("c3")];

export default function Calculator() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const result = useMemo(() => calculateSGPA(courses), [courses]);

  return (
    <div className="space-y-6">
      <CourseTable
        courses={courses}
        onUpdate={(id, field, value) =>
          setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
        }
        onAdd={() => setCourses((cs) => [...cs, blank(crypto.randomUUID())])}
        onRemove={(id) => setCourses((cs) => cs.filter((c) => c.id !== id))}
        onReset={() => setCourses(initialCourses())}
      />
      <ResultCard result={result} />
    </div>
  );
}
