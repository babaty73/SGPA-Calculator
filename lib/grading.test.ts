import assert from "node:assert/strict";
import { getGrade, calculateSGPA, formatSGPA } from "./grading";

const cases: [number, string, number][] = [
  [100, "A+", 4], [90, "A+", 4], [89.9, "A", 4], [85, "A", 4], [80, "A-", 3.75],
  [75, "B+", 3.5], [70, "B", 3], [65, "B-", 2.75], [60, "C+", 2.5], [50, "C", 2],
  [49.9, "C-", 1.75], [45, "C-", 1.75], [40, "D", 1], [39.9, "F", 0], [0, "F", 0],
];
for (const [p, l, pt] of cases) {
  const g = getGrade(p);
  assert.equal(g.letter, l, `${p} letter`);
  assert.equal(g.point, pt, `${p} point`);
}

const row = (name: string, percentage: string, credits: string, i = 0) =>
  ({ id: String(i), name, percentage, credits });

const six = [
  row("Mathematics", "49.5", "4", 1), row("English", "72", "3", 2),
  row("Physics", "66", "3", 3), row("Chemistry", "94", "3", 4),
  row("Logic", "87", "3", 5), row("Python", "78", "3", 6),
];
const r = calculateSGPA(six);
assert.equal(r.totalWeightedPoints, 58.75);
assert.equal(r.totalCredits, 19);
assert.equal(formatSGPA(r.sgpa), "3.09");

// invalid rows are excluded
const bad = calculateSGPA([
  row("", "80", "3", 1), row("X", "101", "3", 2), row("Y", "-5", "3", 3),
  row("Z", "abc", "3", 4), row("W", "80", "0", 5), row("V", "80", "-2", 6),
]);
assert.equal(bad.sgpa, null);
assert.equal(bad.totalCourses, 0);
assert.equal(formatSGPA(bad.sgpa), "—");

// removing a course changes the result; reset (empty list) gives null
assert.equal(calculateSGPA(six.slice(1)).totalCourses, 5);
assert.equal(calculateSGPA([]).sgpa, null);

console.log("All grading tests passed ✅");
