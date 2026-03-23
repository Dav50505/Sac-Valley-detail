# Sac Valley Detail — Services

> All services verified by business. Mobile service available throughout the Sacramento Valley.

---

## 🚗 Detailing & Cleaning

- Auto detailing work
- Exterior detailing
- Interior detailing
- Car wash
- Handwashing
- Upholstery and carpet cleaning
- Car window cleaning
- Engine cleaning
- Wheel and rim detailing

---

## 🎨 Paint & Exterior

- Auto paint correction
- Auto paint restoration
- Paint and exterior protection
- Scratch removal
- Auto bug and sap removal
- Headlight restoration

---

## 🛡️ Protection & Coating

- Protection
- Full-service packages

---

## 🪟 Window Tinting

- Window tinting
- Tint application
- Tint removal

---

## 🎬 Wraps

- Vehicle wrapping application
- Vehicle wrapping design
- Vehicle wrap removal

---

## Implementation Notes for Codex

### Services Section Component (`components/Services.tsx`)

Organize the service cards into the **6 categories above**. Each category gets its own labeled group within the grid.

**Suggested card layout per category:**
```
Category Heading (orange, uppercase, small caps)
└── Service item 1
└── Service item 2
└── ...
```

**Data structure to use:**
```ts
const services = [
  {
    category: "Detailing & Cleaning",
    icon: "🚗", // replace with SVG icon
    items: [
      "Auto detailing work",
      "Exterior detailing",
      "Interior detailing",
      "Car wash",
      "Handwashing",
      "Upholstery and carpet cleaning",
      "Car window cleaning",
      "Engine cleaning",
      "Wheel and rim detailing",
    ],
  },
  {
    category: "Paint & Exterior",
    icon: "🎨",
    items: [
      "Auto paint correction",
      "Auto paint restoration",
      "Paint and exterior protection",
      "Scratch removal",
      "Auto bug and sap removal",
      "Headlight restoration",
    ],
  },
  {
    category: "Protection & Coating",
    icon: "🛡️",
    items: [
      "Protection",
      "Full-service packages",
    ],
  },
  {
    category: "Window Tinting",
    icon: "🪟",
    items: [
      "Window tinting",
      "Tint application",
      "Tint removal",
    ],
  },
  {
    category: "Wraps",
    icon: "🎬",
    items: [
      "Vehicle wrapping application",
      "Vehicle wrapping design",
      "Vehicle wrap removal",
    ],
  },
]
```

**Component tasks:**
- [ ] Map over `services` array to render one card per category
- [ ] Each card: dark surface `#111`, orange top border accent, category heading, list of service items
- [ ] Use a 2-col grid on desktop, 1-col on mobile
- [ ] Add hover lift effect (`translateY(-4px)` + subtle orange glow) on each card
- [ ] Stagger cards into view with `framer-motion` `whileInView` + `staggerChildren: 0.1`
- [ ] Below the grid, add the pricing callout line:
  > *"Ask about our flexible pricing — because every vehicle and every client is unique."*
- [ ] Pricing callout links/scrolls down to the Contact section

**Also update the Contact form dropdown** (`Service Interested In`) to include all 25 services as options, grouped by category using `<optgroup>` labels.