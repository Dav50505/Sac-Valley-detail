"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "mobile-detailing",
    question: "How does mobile detailing work?",
    answer:
      "Sac Valley Detail brings the products, tools, and detailing setup directly to your home or workplace, so your vehicle can be serviced without making a shop trip. It is designed for Sacramento Valley drivers who want professional results with less downtime.",
  },
  {
    id: "service-areas",
    question: "What areas do you serve?",
    answer:
      "Service is centered around the Sacramento Valley and nearby surrounding areas for mobile detailing appointments. If you are outside the usual route, reach out first and availability can be confirmed before anything is scheduled.",
  },
  {
    id: "pricing",
    question: "How is pricing determined?",
    answer:
      "Pricing is based on vehicle size, current condition, and the level of work requested, from maintenance washes to paint correction, ceramic coating, tint, or wrap-related services. Flexible pricing helps keep the quote aligned with the vehicle and the finish you want.",
  },
  {
    id: "timing",
    question: "How long does a detail take?",
    answer:
      "Smaller appointments like a wash or interior refresh can often be completed in a few hours, while heavier correction or ceramic coating prep can take much longer. Timing depends on the selected service and the condition of the vehicle when service begins.",
  },
  {
    id: "home-during-service",
    question: "Do I need to be home during the service?",
    answer:
      "Usually no, as long as the vehicle is accessible and any key handoff or arrival details are handled ahead of time. Clear communication before and after the appointment helps keep the mobile detailing visit smooth and predictable.",
  },
  {
    id: "ceramic-coating",
    question: "What’s included in ceramic coating?",
    answer:
      "Ceramic coating usually starts with surface prep and paint cleansing so the coating can bond cleanly, followed by the protective application itself. The result is deeper gloss, added surface protection, and easier maintenance moving forward.",
  },
] as const;

const accordionTransition = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-28 border-t border-white/8 bg-[linear-gradient(180deg,#070707_0%,#090909_30%,#060606_100%)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_38%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
            Frequently Asked Questions
          </div>
          <div className="space-y-5">
            <h2 className="font-[family:var(--font-heading)] text-[clamp(2.8rem,15vw,4.2rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(4.2rem,10vw,5.4rem)] lg:text-[6.3rem]">
              Answers Before We Arrive
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
              What to expect from mobile detailing across the Sacramento
              Valley, from scheduling and pricing to ceramic coating prep.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openItem === item.id;
            const triggerId = `${item.id}-trigger`;
            const panelId = `${item.id}-panel`;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(8,8,8,0.96))] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-[border-color,box-shadow] duration-300 ${
                  isOpen
                    ? "border-[rgba(255,107,0,0.34)] shadow-[0_18px_60px_rgba(255,107,0,0.08)]"
                    : "border-white/10 hover:border-[rgba(255,107,0,0.22)]"
                }`}
              >
                <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,107,0,0.95),rgba(255,107,0,0.2),transparent)]" />
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,107,0,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] min-[360px]:gap-4 min-[360px]:px-5 min-[360px]:py-5 sm:items-center sm:gap-6 sm:px-7 sm:py-6"
                >
                  <span className="flex-1 font-[family:var(--font-heading)] text-[1.35rem] uppercase leading-[0.98] tracking-[0.03em] text-[var(--color-text)] min-[360px]:text-[1.55rem] sm:text-[2rem]">
                    {item.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={accordionTransition}
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(255,107,0,0.24)] bg-[rgba(255,107,0,0.08)] text-[var(--color-accent)] min-[360px]:h-11 min-[360px]:w-11 sm:mt-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={accordionTransition}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-6 min-[360px]:px-5 sm:px-7 sm:pb-7">
                        <div className="mb-5 h-px w-20 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)]" />
                        <p className="max-w-3xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
