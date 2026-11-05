import { GRADE_BANDS } from "@/lib/grading";

export default function GradeScale() {
  return (
    <section aria-labelledby="scale-heading" className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 id="scale-heading" className="text-lg font-semibold">ASTU grade scale</h2>
      <p className="mt-1 text-sm text-muted">Decimals are cut off, not rounded. 89.9% counts as 89%.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Percentage ranges with their letter grade and grade points</caption>
          <thead>
            <tr className="border-b border-line text-muted">
              <th scope="col" className="py-2 pr-4 font-medium">Percentage</th>
              <th scope="col" className="py-2 pr-4 font-medium">Grade</th>
              <th scope="col" className="py-2 font-medium">Points</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_BANDS.map((b) => (
              <tr key={b.letter} className="border-b border-line last:border-0">
                <td className="py-2 pr-4 tabular-nums">{b.min === b.max ? b.min : `${b.min} – ${b.max}`}</td>
                <th scope="row" className="py-2 pr-4 font-semibold text-brand-text">{b.letter}</th>
                <td className="py-2 tabular-nums">{b.point.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
