type SectionPlaceholderProps = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
};

export default function SectionPlaceholder({
  id,
  eyebrow,
  title,
  copy,
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.88),rgba(8,8,8,0.94))] px-6 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:px-8"
    >
      <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
        {eyebrow}
      </p>
      <div className="mt-4 h-px w-20 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)]" />
      <h3 className="mt-5 max-w-4xl font-[family:var(--font-heading)] text-4xl uppercase leading-[0.94] tracking-[0.05em] text-[var(--color-text)] sm:text-5xl">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-white/66">{copy}</p>
    </section>
  );
}
