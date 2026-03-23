# Sac Valley Detail — Landing Page Tasks

## Brand Reference
- **Primary Color:** Orange `#FF6B00`
- **Background:** Near-black `#0A0A0A`
- **Surface:** Dark gray `#111111`
- **Text Primary:** White `#FFFFFF`
- **Text Muted:** Gray `#888888`
- **Accent Border:** Orange `#FF6B00`
- **Font Direction:** Bold display font (e.g. Bebas Neue or Barlow Condensed) for headings + clean sans for body (e.g. DM Sans or Outfit)
- **Aesthetic:** Luxury-dark meets gritty-street — think sleek black showroom with orange accents, not a generic auto shop

---

## Section Breakdown & Tasks

---

### 1. 🔧 Project Setup
- [ ] Initialize Next.js 14+ project with App Router (`npx create-next-app@latest`)
- [ ] Install Tailwind CSS and configure `tailwind.config.js` with brand colors
- [ ] Install `framer-motion` for animations
- [ ] Set up global CSS variables for brand colors, fonts, spacing
- [ ] Import Google Fonts: display font (Bebas Neue) + body font (DM Sans)
- [ ] Set up `app/layout.tsx` with font, metadata (title, description, favicon)
- [ ] Create `/public/frames/` folder — place all 140 car rotation images here, named sequentially (e.g. `frame_001.png` → `frame_140.png`)
- [ ] Create shared `components/` directory for reusable UI

---

### 2. 🚗 Hero Section — Scroll-Locked Car Rotation (`components/Hero.tsx`)

> The user scrolls through all 140 frames before the page unlocks and continues. The car rotates as they scroll.

- [ ] Create a scroll-jacked container with `position: fixed` and `height: 100vh` that occupies a tall scroll track (e.g. `height: 14000px` wrapper so 140 frames × 100px scroll per frame)
- [ ] Preload all 140 frames on mount using `new Image()` to prevent flicker during scroll
- [ ] Use a `useEffect` + `window.scroll` listener to calculate current frame index:
  ```ts
  const frameIndex = Math.min(
    TOTAL_FRAMES - 1,
    Math.floor((scrollY / scrollTrackHeight) * TOTAL_FRAMES)
  )
  ```
- [ ] Render a single `<canvas>` or `<img>` element — swap source based on `frameIndex`
- [ ] Lock page scroll until frame 140 is reached (use `overflow: hidden` on body until sequence completes, or use IntersectionObserver to trigger unlock)
- [ ] Overlay hero text on top of car canvas:
  - Tagline: **"Get the Look You and Your Car Deserve"**
  - Subtext: Mobile detailing • Sacramento Valley
  - Scroll indicator (animated chevron or line)
- [ ] Add a subtle dark gradient behind text for legibility
- [ ] Fade out the overlay text as the user begins scrolling (opacity tied to scroll progress, 0→30% of scroll track)
- [ ] After frame 140 is reached, smoothly transition (fade/slide) into the rest of the page
- [ ] Test on mobile: ensure touch-scroll works and frames swap smoothly (use passive scroll listeners)

---

### 3. 🧭 Navigation (`components/Navbar.tsx`)
- [ ] Fixed top navbar, transparent on hero, solid dark on scroll past hero
- [ ] Logo: "SAC VALLEY DETAIL" in display font with orange accent mark or icon
- [ ] Nav links: Services · About · Testimonials · FAQ · Contact
- [ ] CTA button top-right: **"Book Now"** — orange filled, links to Contact section
- [ ] Mobile hamburger menu with slide-down or slide-in drawer
- [ ] Smooth scroll to anchor sections on nav link click
- [ ] Add `transition` on background so transparent → dark is smooth

---

### 4. 🛠️ Services Section (`components/Services.tsx`)
- [ ] Section heading: **"What We Do"** or **"Our Services"**
- [ ] Display all 8 services as cards in a responsive grid (2 col mobile, 4 col desktop):
  - Vehicle Wash
  - Interior Vacuum
  - Extractions
  - Paint Correction
  - Window Tinting
  - Car Audio
  - Ceramic Coating
  - Vinyl Wraps & Fleet Wraps
- [ ] Each card: icon or minimal line illustration, service name, 1-line description
- [ ] Cards have dark surface background `#111`, orange left border or top accent line
- [ ] Hover state: subtle orange glow or border highlight with `transition`
- [ ] Section includes a callout line: **"Every vehicle and every client is unique — ask about flexible pricing"**
- [ ] Animate cards into view with `framer-motion` `whileInView` stagger

---

### 5. 👤 About Section (`components/About.tsx`)
- [ ] Two-column layout: text left, visual right (can be a still of the car or brand logo large)
- [ ] Heading: **"Sacramento's Mobile Detail Specialists"** (or similar)
- [ ] Body copy: 2–3 short paragraphs about the business — mobile service, flexible pricing, serving the Sacramento Valley
- [ ] Highlight stat row: e.g. ⭐ 5-Star Rated · 📍 Mobile Service · 🚗 All Vehicle Types
- [ ] Subtle orange divider line or bracket accent on the section
- [ ] Animate text in from left, image from right on scroll

---

### 6. 💬 Testimonials Section (`components/Testimonials.tsx`)
- [ ] Section heading: **"What Our Clients Say"**
- [ ] Display 3–5 testimonial cards (get real reviews from Facebook/Google or use placeholders)
- [ ] Each card: star rating (5 stars in orange), quote text, client name/vehicle type
- [ ] Auto-scrolling carousel or static grid (3 columns desktop, 1 mobile)
- [ ] Card style: dark surface, subtle top orange accent, slightly elevated shadow
- [ ] Optional: Facebook logo icon referencing their FB page as review source

---

### 7. ❓ FAQ Section (`components/FAQ.tsx`)
- [ ] Section heading: **"Frequently Asked Questions"**
- [ ] Accordion-style: click to expand answer
- [ ] Suggested questions to populate:
  - How does mobile detailing work?
  - What areas do you serve?
  - How is pricing determined?
  - How long does a detail take?
  - Do I need to be home during the service?
  - What's included in ceramic coating?
- [ ] Orange chevron icon toggles on open/close
- [ ] Smooth height animation on open/close using `framer-motion` `AnimatePresence`

---

### 8. 📞 Contact / Book Now Section (`components/Contact.tsx`)
- [ ] Section heading: **"Get in Touch"** or **"Book Your Detail"**
- [ ] Simple contact form fields:
  - Name
  - Phone Number
  - Email
  - Vehicle Type (text input or dropdown: Car / Truck / SUV / Van / Fleet)
  - Service Interested In (dropdown from services list)
  - Message / Additional Notes
  - Submit button: **"Send Request"** — orange, full width on mobile
- [ ] Form submission: wire up to Resend, EmailJS, or Formspree (note which in code comments)
- [ ] Success state: inline confirmation message after submit
- [ ] Alongside form, show contact info block:
  - 📞 (916) 749-0339 — clickable `tel:` link
  - 📘 Facebook link
  - 📍 Serving Sacramento Valley — Mobile Service
- [ ] Optional: embed Google Maps or just a styled "We come to you" callout

---

### 9. 🦶 Footer (`components/Footer.tsx`)
- [ ] Dark background, minimal
- [ ] Logo left, nav links center, phone + social icons right
- [ ] Bottom bar: `© 2025 Sac Valley Detail. All rights reserved.`
- [ ] Facebook icon link
- [ ] Phone number as `tel:` link

---

### 10. ✨ Global Polish & Performance
- [ ] Add `next/image` for all images with proper `width`, `height`, and `priority` on hero frames
- [ ] Ensure all sections have `id` anchors for smooth scroll nav (e.g. `id="services"`)
- [ ] Add `loading="eager"` and preload hints for first ~10 hero frames
- [ ] Meta tags in `layout.tsx`: title, description, OG image for social sharing
- [ ] Confirm mobile responsiveness at 375px, 768px, 1280px breakpoints
- [ ] Test scroll-lock hero on iOS Safari (requires `-webkit-overflow-scrolling` consideration)
- [ ] Lighthouse audit — target 90+ performance score
- [ ] Add `robots.txt` and `sitemap.xml` for basic SEO
- [ ] Favicon using Sac Valley Detail logo mark

---

## File Structure
```
/app
  layout.tsx          ← fonts, metadata, global styles
  page.tsx            ← assembles all sections
/components
  Navbar.tsx
  Hero.tsx            ← scroll-locked car rotation
  Services.tsx
  About.tsx
  Testimonials.tsx
  FAQ.tsx
  Contact.tsx
  Footer.tsx
/public
  /frames             ← frame_001.png → frame_140.png
  logo.png
  favicon.ico
/styles
  globals.css         ← CSS variables, base resets
```

---

## Notes for Developer
- The scroll-lock car animation is the centerpiece — invest time here first. Get frames loading and swapping smoothly before building other sections.
- Use `canvas` rendering (draw image to canvas) instead of swapping `<img src>` for better performance on the frame animation.
- All 140 frames should be optimized/compressed (WebP preferred) before placing in `/public/frames/`.
- Keep all orange usage intentional — it should feel like a precision accent, not overused.