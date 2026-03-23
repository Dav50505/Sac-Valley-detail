"use client";

import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  clientName: string;
  vehicleType: string;
  rating: 5;
  source: "Facebook" | "Google";
  sourceUrl?: string;
  isFallback?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Paint looked dramatically cleaner and the finish had that fresh, deep gloss again. Exactly the kind of detail work you want when you care about how your car presents.",
    clientName: "Marcus",
    vehicleType: "Black sedan",
    rating: 5,
    source: "Facebook",
    isFallback: true,
  },
  {
    quote:
      "Interior cleanup made the cabin feel reset. Seats, mats, and the hard-to-reach spots all came back looking sharp without that rushed mobile-detail look.",
    clientName: "Elena",
    vehicleType: "Family SUV",
    rating: 5,
    source: "Google",
    isFallback: true,
  },
  {
    quote:
      "Communication was easy, timing was flexible, and the end result looked premium. Great fit if you want specialty work and detailing from one shop.",
    clientName: "Jordan",
    vehicleType: "Work truck",
    rating: 5,
    source: "Facebook",
    isFallback: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function SourcePill({
  source,
  sourceUrl,
}: Pick<Testimonial, "source" | "sourceUrl">) {
  const content = (
    <span className="inline-flex items-center rounded-full border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/76">
      {source}
    </span>
  );

  if (!sourceUrl) {
    return content;
  }

  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${source} review source`}
      className="transition-transform duration-200 hover:-translate-y-0.5"
    >
      {content}
    </a>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[var(--color-accent)]">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
        >
          <path d="M12 2.75l2.86 5.8 6.4.94-4.63 4.5 1.09 6.36L12 17.35l-5.72 3 1.1-6.36-4.64-4.5 6.4-.94L12 2.75Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(8,8,8,0.96))] shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_38%)]" />

      <div className="relative px-4 py-10 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
            Client Proof
          </div>
          <div className="space-y-5">
            <h2 className="font-[family:var(--font-heading)] text-[clamp(2.8rem,15vw,4.2rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(4.1rem,10vw,5.2rem)]">
              What Our Clients Say
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
              The section is structured for approved Facebook and Google reviews,
              with fallback cards in place now so the landing page still carries
              social proof and visual weight.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.article
              key={`${testimonial.clientName}-${testimonial.vehicleType}`}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(10,10,10,0.96))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(255,107,0,0.3)] hover:shadow-[0_18px_60px_rgba(255,107,0,0.08)] sm:rounded-[1.75rem] sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),rgba(255,107,0,0.15),transparent)]" />
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 min-[420px]:flex-nowrap min-[420px]:gap-4">
                  <StarRow />
                  <SourcePill
                    source={testimonial.source}
                    sourceUrl={testimonial.sourceUrl}
                  />
                </div>

                <p className="text-base leading-8 text-white/78">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-[family:var(--font-heading)] text-[1.5rem] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] min-[360px]:text-[1.65rem] sm:text-[1.75rem]">
                    {testimonial.clientName}
                  </p>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/52 sm:tracking-[0.24em]">
                    {testimonial.vehicleType}
                  </p>
                  {testimonial.isFallback ? (
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                      Temporary review placeholder
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
