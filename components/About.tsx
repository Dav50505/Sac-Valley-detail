"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STAT_ITEMS = [
  "5-Star Rated",
  "Mobile Service",
  "All Vehicle Types",
] as const;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const visualVariants = {
  hidden: {
    opacity: 0,
    x: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 border-t border-white/8 bg-[linear-gradient(180deg,#070707_0%,#090909_28%,#050505_100%)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-7"
          >
            <div className="space-y-5">
              <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
                About Sac Valley Detail
              </div>
              <div className="h-px w-24 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)]" />
              <h2 className="max-w-4xl font-[family:var(--font-heading)] text-[clamp(2.8rem,15vw,4.3rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(4.2rem,10vw,5.4rem)] lg:text-[6.3rem]">
                Sacramento&apos;s Mobile Detail Specialists
              </h2>
            </div>

            <div className="max-w-2xl space-y-5 text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
              <p>
                Sac Valley Detail delivers premium mobile detailing across the
                Sacramento Valley, bringing showroom-level care straight to your
                driveway, office, or fleet location.
              </p>
              <p>
                Every service is shaped around the vehicle in front of us, with
                flexible pricing, tailored service plans, and the same elevated
                attention to detail across washes, corrections, coatings,
                tinting, wraps, and specialty upgrades.
              </p>
              <p>
                The goal is simple: make every vehicle leave sharper, cleaner,
                and better protected with a process that feels convenient,
                consistent, and built around your schedule.
              </p>
            </div>

            <div className="grid gap-3 min-[500px]:grid-cols-2 lg:grid-cols-3">
              {STAT_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.92),rgba(8,8,8,0.94))] px-4 py-4 text-sm uppercase tracking-[0.16em] text-white/82 shadow-[0_14px_40px_rgba(0,0,0,0.24)] sm:tracking-[0.2em]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(255,107,0,0.55)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={visualVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(8,8,8,0.96))] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
              <div className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.95),transparent)]" />
              <div className="absolute inset-y-10 left-0 z-10 w-px bg-[linear-gradient(180deg,transparent,rgba(255,107,0,0.62),transparent)]" />
              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.1),rgba(5,5,5,0.28)_60%,rgba(5,5,5,0.5)_100%)]" />
              <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(255,107,0,0.12),transparent_28%)]" />

              <Image
                src="/frames/frame_0070.png"
                alt="Detailed performance coupe showcased in Sac Valley Detail's premium service aesthetic"
                width={2244}
                height={920}
                className="h-auto w-full object-contain"
              />

              <div className="absolute bottom-4 left-4 right-4 z-20 min-[480px]:right-auto sm:bottom-5 sm:left-5">
                <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(255,107,0,0.22)] bg-[rgba(10,10,10,0.72)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/72 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md min-[360px]:text-[0.68rem] sm:tracking-[0.3em]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Mobile service across Sacramento Valley
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
