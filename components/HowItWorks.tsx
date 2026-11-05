export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 id="how-heading" className="text-lg font-semibold">How it works</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink">
        <li>Enter each course with its percentage and credit hours.</li>
        <li>Each percentage is matched to a grade and grade points using the scale.</li>
        <li>The points for each course are multiplied by its credit hours, then the total is divided by all credit hours.</li>
      </ol>
      <p className="mt-4 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-text">
        SGPA = Σ (grade points × credit hours) ÷ Σ credit hours
      </p>
      <p className="mt-3 text-sm text-muted">
        Courses with a missing name, a percentage outside 0–100, or credit hours of 0 or less are left out.
      </p>
    </section>
  );
}
