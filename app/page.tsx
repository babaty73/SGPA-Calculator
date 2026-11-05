import Calculator from "@/components/Calculator";
import GradeScale from "@/components/GradeScale";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
          <h1 className="text-2xl font-bold sm:text-3xl">ASTU SGPA Calculator</h1>
          <p className="mt-1 text-muted">Calculate your semester GPA in seconds.</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
        <Calculator />
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <GradeScale />
        </div>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted">
          Developed by <a href="https://imran-endris.vercel.app">Imran Endris</a>
           </p>
      </footer>
    </>
  );
}
