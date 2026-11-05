import assert from "node:assert/strict";
import { calculateCGPA, parseSGPA } from "./cgpa";
import { formatSGPA } from "./grading";

const sem = (name: string, sgpa: string, credits: string, i = 0) =>
  ({ id: String(i), name, sgpa, credits });

// Test 1: three semesters -> 3.49
const t1 = calculateCGPA([
  sem("1", "3.50", "19", 1), sem("2", "3.25", "21", 2), sem("3", "3.75", "18", 3),
]);
assert.equal(t1.totalWeightedPoints, 202.25);
assert.equal(t1.totalCredits, 58);
assert.equal(t1.totalSemesters, 3);
assert.equal(formatSGPA(t1.cgpa), "3.49");

// Test 2: equal credits -> 3.50
assert.equal(formatSGPA(calculateCGPA([sem("1", "3.00", "20", 1), sem("2", "4.00", "20", 2)]).cgpa), "3.50");

// Test 3: different credits -> 2.50 (not the simple average 3.00)
assert.equal(formatSGPA(calculateCGPA([sem("1", "4.00", "10", 1), sem("2", "2.00", "30", 2)]).cgpa), "2.50");

// SGPA bounds
assert.equal(parseSGPA("0"), 0);
assert.equal(parseSGPA("4"), 4);
assert.equal(parseSGPA("4.01"), null);
assert.equal(parseSGPA("-0.1"), null);
assert.equal(parseSGPA("abc"), null);
assert.equal(parseSGPA(""), null);

// Invalid / incomplete rows are excluded, valid ones still count
const mixed = calculateCGPA([
  sem("1", "3.00", "20", 1), sem("", "4.00", "20", 2), sem("3", "5", "20", 3),
  sem("4", "3", "0", 4), sem("5", "3", "-1", 5), sem("6", "", "10", 6), sem("7", "x", "10", 7),
]);
assert.equal(mixed.totalSemesters, 1);
assert.equal(formatSGPA(mixed.cgpa), "3.00");

// Empty states: never NaN / Infinity
for (const list of [[], [sem("", "", "", 1)], [sem("1", "9", "9", 1)]]) {
  const r = calculateCGPA(list);
  assert.equal(r.cgpa, null);
  assert.equal(r.totalCredits, 0);
  assert.equal(formatSGPA(r.cgpa), "—");
}

// Decimal credits, add/remove/edit behave through the pure function
const base = [sem("1", "3.5", "2.5", 1), sem("2", "2.5", "2.5", 2)];
assert.equal(formatSGPA(calculateCGPA(base).cgpa), "3.00");
assert.equal(formatSGPA(calculateCGPA(base.slice(1)).cgpa), "2.50");                // remove
assert.equal(formatSGPA(calculateCGPA([...base, sem("3", "4", "5", 3)]).cgpa), "3.50"); // add
assert.equal(formatSGPA(calculateCGPA([{ ...base[0], sgpa: "4" }, base[1]]).cgpa), "3.25"); // edit

console.log("All CGPA tests passed ✅");
