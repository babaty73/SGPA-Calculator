export interface Course {
  id: string;
  name: string;
  percentage: string; // raw input, validated in grading.ts
  credits: string;    // raw input, validated in grading.ts
}

export interface GradeBand {
  min: number;
  max: number;
  letter: string;
  point: number;
}

export interface GradedCourse {
  id: string;
  name: string;
  percentage: number;
  credits: number;
  letter: string;
  point: number;
}

export interface SGPAResult {
  sgpa: number | null; // null when there are no valid courses
  totalCourses: number;
  totalCredits: number;
  totalWeightedPoints: number;
  courses: GradedCourse[];
}

export interface Semester {
  id: string;
  name: string;
  sgpa: string;    // raw input, validated in cgpa.ts
  credits: string; // raw input, validated in cgpa.ts
}

export interface ValidSemester {
  id: string;
  name: string;
  sgpa: number;
  credits: number;
}

export interface CGPAResult {
  cgpa: number | null; // null when there are no valid semesters
  totalSemesters: number;
  totalCredits: number;
  totalWeightedPoints: number;
  semesters: ValidSemester[];
}
