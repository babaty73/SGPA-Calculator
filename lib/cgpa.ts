import { parseCredits, parseNumber } from "./grading";
import type { CGPAResult, Semester, ValidSemester } from "./types";

/** Valid SGPA: 0–4 (decimals allowed). Returns null if invalid. */
export function parseSGPA(raw: string): number | null {
  const n = parseNumber(raw);
  return n !== null && n >= 0 && n <= 4 ? n : null;
}

/** Returns a validated semester, or null if the row is incomplete/invalid. */
export function validateSemester(s: Semester): ValidSemester | null {
  const name = s.name.trim();
  const sgpa = parseSGPA(s.sgpa);
  const credits = parseCredits(s.credits);
  if (name === "" || sgpa === null || credits === null) return null;
  return { id: s.id, name, sgpa, credits };
}

/** CGPA = Sum(SGPA × credits) / Sum(credits). Credit-weighted, no intermediate rounding. */
export function calculateCGPA(semesters: Semester[]): CGPAResult {
  const valid = semesters
    .map(validateSemester)
    .filter((s): s is ValidSemester => s !== null);

  const totalCredits = valid.reduce((sum, s) => sum + s.credits, 0);
  const totalWeightedPoints = valid.reduce((sum, s) => sum + s.sgpa * s.credits, 0);

  return {
    cgpa: totalCredits > 0 ? totalWeightedPoints / totalCredits : null,
    totalSemesters: valid.length,
    totalCredits,
    totalWeightedPoints,
    semesters: valid,
  };
}
