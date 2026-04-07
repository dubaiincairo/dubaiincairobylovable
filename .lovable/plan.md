

## Professional Animation Overhaul

The current animations are basic -- every element uses the same simple `opacity + translateY` fade-up pattern with identical easing. This creates a monotonous, flat feel. The plan upgrades to a polished, varied animation system.

### Current problems
- Every section uses identical `opacity: 0, y: 30` fade-up with `duration: 0.6`
- No easing curves -- defaults to linear-ish Framer Motion defaults
- Grid cards all animate individually with small staggered delays, creating a "popcorn" effect rather than a smooth cascade
- No scroll-linked parallax or scale effects
- Hero background glow is static
- Navbar has no entrance animation
- Client badges animate one-by-one (25+ items) which feels tedious
- No hover micro-interactions beyond basic color transitions

### Animation strategy

**Guiding principle**: Use 2-3 distinct animation patterns (not the same fade-up everywhere), professional cubic-bezier easing, and stagger containers for grouped elements.

### Changes by component

**1. Shared animation variants (new file: `src/lib/animations.ts`)**
- Define reusable Framer Motion variant objects: `fadeUp`, `fadeIn`, `scaleIn`, `slideInLeft`, `slideInRight`
- Define a `staggerContainer` variant that orchestrates children with `staggerChildren: 0.08`
- Use professional easing: `[0.25, 0.46, 0.45, 0.94]` (ease-out-quad)

**2. HeroSection**
- Add a slow pulsing scale animation to the background glow circle (CSS keyframe, `animate-pulse-glow`)
- Increase hero element delays slightly for a more cinematic cascade
- Add a subtle `scale: 0.97 -> 1` to the headline for depth
- Animate the grid background opacity from 0 to 0.03

**3. Navbar**
- Add `motion.nav` with a `y: -100% -> 0` slide-down on mount with spring physics

**4. StatsSection**
- Use `staggerContainer` on the grid, each stat as a child with `scaleIn` variant (scale 0.8 -> 1 + fade)
- Counter-style number reveal would be too complex; keep it clean with scale-in

**5. AboutSection**
- Headline: `fadeUp` with slightly longer duration (0.7s)
- Body paragraphs: staggered `fadeIn` (no Y movement, just opacity) for a calm read

**6. WhyDifferentSection & ValuesSection & ServicesSection**
- Section header: `fadeUp`
- Card grid: wrap in `staggerContainer`, each card uses `fadeUp` child variant
- Cards get a subtle `hover:translateY(-4px)` lift + shadow on hover via Tailwind

**7. FounderSection**
- Quote blockquote: `scaleIn` (scale 0.95 -> 1 + fade) for a dramatic reveal
- Body text: simple `fadeIn`

**8. ClientsSection**
- Instead of animating each badge individually, animate the entire grid as one `fadeIn` block
- Add a subtle CSS shimmer/marquee-like effect (optional, can be a simple opacity transition)

**9. ContactSection**
- Form slides in from bottom with spring physics
- Success state: `scaleIn` with a bounce spring

**10. LegalSection**
- Cards use `staggerContainer` + `fadeUp` children
- Address line: `fadeIn`

**11. Footer**
- Simple `fadeIn` on scroll

**12. Global CSS additions in `index.css`**
- Add `animate-pulse-glow` keyframe for the hero background
- Add `.hover-lift` utility: `transition: transform 0.3s ease; &:hover { transform: translateY(-4px); }`

### Files to create
- `src/lib/animations.ts` -- shared motion variants

### Files to edit
- `src/index.css` -- add pulse-glow keyframe and hover-lift utility
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/StatsSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/WhyDifferentSection.tsx`
- `src/components/ValuesSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/FounderSection.tsx`
- `src/components/ClientsSection.tsx`
- `src/components/TechStackSection.tsx`
- `src/components/ContactSection.tsx`
- `src/components/LegalSection.tsx`
- `src/components/Footer.tsx`

