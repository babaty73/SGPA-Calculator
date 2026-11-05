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
