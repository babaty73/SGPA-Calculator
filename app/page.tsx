import Calculator from "@/components/Calculator";
import GradeScale from "@/components/GradeScale";
import HowItWorks from "@/components/HowItWorks";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <header className="border-b border-line bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-6 sm:py-8">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">ASTU SGPA Calculator</h1>
            <p className="mt-1 text-muted">Calculate your semester GPA in seconds.</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
        <Calculator />
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <GradeScale />
          <HowItWorks />
        </div>
      </main>

      <footer className="border-t border-line bg-[var(--color-surface)]">
        <p className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted">
          Developed by <a href="https://imran-endris.vercel.app">Imran Endris</a>
        </p>
      </footer>
    </>
  );
}
