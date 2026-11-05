export default function CgpaNote() {
  return (
    <section aria-labelledby="cgpa-note-heading" className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 id="cgpa-note-heading" className="text-lg font-semibold">About this result</h2>
      <p className="mt-3 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-text">
        CGPA = Σ (SGPA × semester credit hours) ÷ Σ semester credit hours
      </p>
      <p className="mt-3 text-sm text-muted">
        This is a calculated CGPA based only on the semester SGPAs and credit hours you enter. It is not an official
        transcript CGPA. It does not apply any ASTU rules for repeated, replaced, withdrawn, or incomplete courses, so
        check your official grade report or ask the registrar if any of those apply to you.
      </p>
      <p className="mt-2 text-sm text-muted">
        Semesters with a missing name, an SGPA outside 0–4, or credit hours of 0 or less are left out.
      </p>
    </section>
  );
}
