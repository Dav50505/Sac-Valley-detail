export default function UpcomingSectionsIntro() {
  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#090909_0%,#050505_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_36%)]" />

      <div className="relative mx-auto flex min-h-[clamp(38rem,92svh,60rem)] w-full max-w-6xl items-center px-4 py-18 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-7">
            <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
              Current build state
            </div>

            <div className="space-y-4">
              <h2 className="max-w-3xl font-[family:var(--font-heading)] text-[clamp(2.3rem,10vw,3.2rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(3.2rem,7vw,4.2rem)] lg:text-[4.75rem]">
                The showroom intro, services, and client proof are now shaping
                the one-page experience.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
                Hero, navigation, services, and the new testimonials block now
                anchor the flow. FAQ is now in place, and the remaining staged
                sections below keep the full landing page structure mapped and
                navigable.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.88),rgba(8,8,8,0.92))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:rounded-[2rem] sm:p-7">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)] sm:tracking-[0.28em]">
              Next phases
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/78">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                <p>
                  Hero scroll sequence, fixed navigation, and service offerings
                  are live.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                <p>
                  Testimonials and FAQ are now in place, while About and
                  Contact remain staged as the next content builds.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                <p>
                  Booking CTA and section anchors still route users cleanly
                  through the one-page layout.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
