import Calculator from "@/components/Calculator";
import GradeScale from "@/components/GradeScale";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-4xl items-start justify-between gap-4 px-4 py-6 sm:py-8">
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
        </div>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted">
          Developed by{" "}
          <a
            href="https://imran-endris.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-text underline underline-offset-2 hover:no-underline"
          >
            Imran Endris
          </a>
        </p>
      </footer>
    </>
  );
}
