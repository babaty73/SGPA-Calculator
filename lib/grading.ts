import type { Course, GradeBand, GradedCourse, SGPAResult } from "./types";

export const GRADE_BANDS: GradeBand[] = [
  { min: 90, max: 100, letter: "A+", point: 4.0 },
  { min: 85, max: 89, letter: "A", point: 4.0 },
  { min: 80, max: 84, letter: "A-", point: 3.75 },
  { min: 75, max: 79, letter: "B+", point: 3.5 },
  { min: 70, max: 74, letter: "B", point: 3.0 },
  { min: 65, max: 69, letter: "B-", point: 2.75 },
  { min: 60, max: 64, letter: "C+", point: 2.5 },
  { min: 50, max: 59, letter: "C", point: 2.0 },
  { min: 45, max: 49, letter: "C-", point: 1.75 },
  { min: 40, max: 44, letter: "D", point: 1.0 },
  { min: 0, max: 39, letter: "F", point: 0.0 },
];

/** Parse a raw input string into a finite number, or null. */
export function parseNumber(raw: string): number | null {
  const s = raw.trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Valid percentage: 0–100. Returns null if invalid. */
export function parsePercentage(raw: string): number | null {
  const n = parseNumber(raw);
  return n !== null && n >= 0 && n <= 100 ? n : null;
}

/** Valid credit hours: > 0. Returns null if invalid. */
export function parseCredits(raw: string): number | null {
  const n = parseNumber(raw);
  return n !== null && n > 0 ? n : null;
}

/** Truncate (never round) the percentage, then find its band. */
export function getGrade(percentage: number): { letter: string; point: number } {
  const p = Math.trunc(percentage);
  const band = GRADE_BANDS.find((b) => p >= b.min && p <= b.max);
  return band
    ? { letter: band.letter, point: band.point }
    : { letter: "F", point: 0 };
}

/** Returns a graded course, or null if the row is incomplete/invalid. */
export function gradeCourse(course: Course): GradedCourse | null {
  const name = course.name.trim();
  const percentage = parsePercentage(course.percentage);
  const credits = parseCredits(course.credits);
  if (name === "" || percentage === null || credits === null) return null;
  const { letter, point } = getGrade(percentage);
  return { id: course.id, name, percentage, credits, letter, point };
}

/** SGPA = Sum(point × credits) / Sum(credits). No intermediate rounding. */
export function calculateSGPA(courses: Course[]): SGPAResult {
  const graded = courses
    .map(gradeCourse)
    .filter((c): c is GradedCourse => c !== null);

  const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
  const totalWeightedPoints = graded.reduce((s, c) => s + c.point * c.credits, 0);

  return {
    sgpa: totalCredits > 0 ? totalWeightedPoints / totalCredits : null,
    totalCourses: graded.length,
    totalCredits,
    totalWeightedPoints,
    courses: graded,
  };
}

export const formatSGPA = (v: number | null): string =>
  v === null ? "—" : v.toFixed(2);
