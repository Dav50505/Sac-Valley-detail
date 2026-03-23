"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/lib/contact-form-config";

function ServiceIcon({
  children,
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(255,107,0,0.2)] bg-[rgba(255,107,0,0.08)] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <svg
        aria-hidden="true"
        viewBox={viewBox}
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

const SERVICE_CATEGORY_ICONS: Record<ServiceCategory["category"], ReactNode> = {
  "Detailing & Cleaning": (
    <ServiceIcon>
      <path d="M3 14.5h18" />
      <path d="M5 14.5l1.7-4.2A2 2 0 0 1 8.55 9h6.9a2 2 0 0 1 1.85 1.3L19 14.5" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <path d="M9 6.5c0 1-.7 1.5-1.2 2" />
      <path d="M13 5c0 1-.7 1.5-1.2 2" />
      <path d="M17 6.5c0 1-.7 1.5-1.2 2" />
    </ServiceIcon>
  ),
  "Paint & Exterior": (
    <ServiceIcon>
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
    </ServiceIcon>
  ),
  "Protection & Coating": (
    <ServiceIcon>
      <path d="M12 3s5 5 5 9a5 5 0 0 1-10 0c0-4 5-9 5-9Z" />
      <path d="M10 13.5c.5 1 1.3 1.5 2 1.5 1 0 2-.8 2.5-2" />
    </ServiceIcon>
  ),
  "Window Tinting": (
    <ServiceIcon>
      <path d="M5 8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5z" />
      <path d="M8 8v8" />
      <path d="M12 8v8" />
      <path d="M16 8v8" />
    </ServiceIcon>
  ),
  Wraps: (
    <ServiceIcon>
      <path d="M6 6h12v12H6z" />
      <path d="M9 6v12" />
      <path d="M6 9h12" />
      <path d="M18 6l-9 9" />
    </ServiceIcon>
  ),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-28 border-t border-white/8 bg-[linear-gradient(180deg,#050505_0%,#090909_24%,#070707_100%)]"
    >
      <div className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_38%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
            What We Do
          </div>
          <div className="space-y-5">
            <h2 className="font-[family:var(--font-heading)] text-[clamp(2.8rem,15vw,4.2rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(4.2rem,10vw,5.4rem)] lg:text-[6.3rem]">
              Our Services
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
              High-end mobile detailing and specialty upgrades, built around the
              way your vehicle looks, feels, and drives when it leaves the
              driveway.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICE_CATEGORIES.map((serviceCategory) => (
            <motion.article
              key={serviceCategory.category}
              variants={cardVariants}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(10,10,10,0.96))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(255,107,0,0.3)] hover:shadow-[0_18px_60px_rgba(255,107,0,0.1)] sm:rounded-[1.75rem] sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),rgba(255,107,0,0.15),transparent)]" />
              <div className="flex items-start gap-4">
                {SERVICE_CATEGORY_ICONS[serviceCategory.category]}
                <div className="space-y-1">
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    {serviceCategory.category}
                  </p>
                  <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)] transition-all duration-300 group-hover:w-24" />
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-white/72 sm:text-[0.95rem]">
                {serviceCategory.items.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                    />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex max-w-full items-center gap-3 rounded-[1.45rem] border border-[rgba(255,107,0,0.2)] bg-[linear-gradient(180deg,rgba(255,107,0,0.12),rgba(255,107,0,0.03))] px-4 py-4 text-left text-sm leading-7 text-white/82 shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-[border-color,transform,color] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,107,0,0.38)] hover:text-white sm:rounded-[1.6rem] sm:px-6"
          >
            Ask about our flexible pricing — because every vehicle and every
            client is unique.
          </a>
        </div>
      </div>
    </section>
  );
}
