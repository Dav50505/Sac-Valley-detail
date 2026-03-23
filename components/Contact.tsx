"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/contact/actions";
import {
  initialContactFormState,
  SERVICE_CATEGORIES,
  VEHICLE_TYPES,
} from "@/lib/contact-form-config";

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p className="mt-2 text-sm leading-6 text-[#ff9a47]" aria-live="polite">
      {error}
    </p>
  );
}

function InputShell({
  children,
  hasError = false,
}: {
  children: React.ReactNode;
  hasError?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.35rem] border bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(8,8,8,0.96))] shadow-[0_12px_34px_rgba(0,0,0,0.24)] transition-colors duration-200 ${
        hasError
          ? "border-[rgba(255,154,71,0.55)]"
          : "border-white/10 focus-within:border-[rgba(255,107,0,0.38)]"
      }`}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const fieldErrors = state?.fieldErrors ?? {};
  const status = state?.status ?? "idle";
  const message = state?.message ?? "";

  const statusTone =
    status === "success"
      ? "border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.1)] text-white/82"
      : "border-[rgba(255,154,71,0.35)] bg-[rgba(255,154,71,0.08)] text-white/78";

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(8,8,8,0.96))] shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_38%)]" />

      <div className="relative px-4 py-10 sm:px-6 md:px-8 lg:px-10 lg:py-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:px-4 min-[360px]:text-[0.7rem] sm:tracking-[0.34em]">
            Book Your Detail
          </div>
          <div className="space-y-5">
            <h2 className="font-[family:var(--font-heading)] text-[clamp(2.8rem,15vw,4.2rem)] uppercase leading-[0.94] tracking-[0.03em] text-[var(--color-text)] sm:text-[clamp(4.1rem,10vw,5.2rem)]">
              Get In Touch
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68 min-[360px]:text-base sm:text-lg sm:leading-8">
              Tell us about the vehicle, the service, and the finish you want.
              Sac Valley Detail brings premium mobile service across the
              Sacramento Valley.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(10,10,10,0.96))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-6">
            <form action={formAction} className="space-y-5">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                  >
                    Name
                  </label>
                  <InputShell hasError={Boolean(fieldErrors.name)}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none placeholder:text-white/28"
                      placeholder="Name"
                    />
                  </InputShell>
                  <FieldError error={fieldErrors.name} />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                  >
                    Phone Number
                  </label>
                  <InputShell hasError={Boolean(fieldErrors.phone)}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="w-full rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none placeholder:text-white/28"
                      placeholder="Phone Number"
                    />
                  </InputShell>
                  <FieldError error={fieldErrors.phone} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                >
                  Email
                </label>
                <InputShell hasError={Boolean(fieldErrors.email)}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none placeholder:text-white/28"
                    placeholder="Email"
                  />
                </InputShell>
                <FieldError error={fieldErrors.email} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="vehicleType"
                    className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                  >
                    Vehicle Type
                  </label>
                  <InputShell hasError={Boolean(fieldErrors.vehicleType)}>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      required
                      defaultValue=""
                      className="w-full rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none"
                    >
                      <option value="" disabled className="bg-[#090909] text-white/50">
                        Vehicle Type
                      </option>
                      {VEHICLE_TYPES.map((vehicleType) => (
                        <option
                          key={vehicleType}
                          value={vehicleType}
                          className="bg-[#090909]"
                        >
                          {vehicleType}
                        </option>
                      ))}
                    </select>
                  </InputShell>
                  <FieldError error={fieldErrors.vehicleType} />
                </div>

                <div>
                  <label
                    htmlFor="serviceInterestedIn"
                    className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                  >
                    Service Interested In
                  </label>
                  <InputShell hasError={Boolean(fieldErrors.serviceInterestedIn)}>
                    <select
                      id="serviceInterestedIn"
                      name="serviceInterestedIn"
                      required
                      defaultValue=""
                      className="w-full rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none"
                    >
                      <option value="" disabled className="bg-[#090909] text-white/50">
                        Service Interested In
                      </option>
                      {SERVICE_CATEGORIES.map((serviceCategory) => (
                        <optgroup
                          key={serviceCategory.category}
                          label={serviceCategory.category}
                          className="bg-[#090909] text-white"
                        >
                          {serviceCategory.items.map((service) => (
                            <option
                              key={service}
                              value={service}
                              className="bg-[#090909]"
                            >
                              {service}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </InputShell>
                  <FieldError error={fieldErrors.serviceInterestedIn} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.24em] text-white/58"
                >
                  Message / Additional Notes
                </label>
                <InputShell hasError={Boolean(fieldErrors.message)}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full resize-y rounded-[1.35rem] bg-transparent px-4 py-4 text-base text-white outline-none placeholder:text-white/28"
                    placeholder="Message / Additional Notes"
                  />
                </InputShell>
                <FieldError error={fieldErrors.message} />
              </div>

              {status !== "idle" ? (
                <div
                  className={`rounded-[1.35rem] border px-4 py-4 text-sm leading-7 ${statusTone}`}
                  aria-live="polite"
                >
                  {message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-black transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 min-[360px]:text-[0.78rem] min-[360px]:tracking-[0.26em]"
              >
                {pending ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(10,10,10,0.96))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Direct Contact
              </p>
              <div className="mt-4 h-px w-20 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)]" />
              <div className="mt-6 space-y-5 text-sm leading-7 text-white/72 sm:text-base">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/45">
                    Phone
                  </p>
                  <a
                    href="tel:+19167490339"
                    className="mt-2 inline-flex max-w-full break-words font-[family:var(--font-heading)] text-[2rem] uppercase leading-none tracking-[0.03em] text-white transition-colors duration-200 hover:text-[var(--color-accent)] min-[360px]:text-3xl min-[360px]:tracking-[0.05em]"
                  >
                    (916) 749-0339
                  </a>
                </div>

                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/45">
                    Social
                  </p>
                  {/* Replace with the real Sac Valley Detail Facebook profile URL. */}
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-white/78 transition-colors duration-200 hover:border-[rgba(255,107,0,0.38)] hover:text-white min-[360px]:text-[0.72rem] min-[360px]:tracking-[0.24em]"
                  >
                    Facebook
                  </a>
                </div>

                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/45">
                    Coverage
                  </p>
                  <p className="mt-2 text-white/78">
                    Serving Sacramento Valley — Mobile Service
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[rgba(255,107,0,0.2)] bg-[linear-gradient(180deg,rgba(255,107,0,0.12),rgba(255,107,0,0.04))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Mobile First
              </p>
              <h3 className="mt-4 font-[family:var(--font-heading)] text-[2.2rem] uppercase leading-[0.94] tracking-[0.04em] text-white min-[360px]:text-4xl min-[360px]:tracking-[0.05em]">
                We Come To You
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">
                Home, office, or fleet location. The booking request gives Sac
                Valley Detail the details needed to shape the right mobile
                service plan before arrival.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
