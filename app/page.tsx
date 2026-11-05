import CourseTable from "@/components/CourseTable";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">ASTU SGPA Calculator</h1>
      <CourseTable />
    </main>
  );
}
