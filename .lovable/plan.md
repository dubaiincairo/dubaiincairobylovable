

## Professional Visual & Animation Upgrade

The site currently has flat, uniform backgrounds (plain dark or `bg-card/50`) and repetitive fade-up animations. This plan adds visual depth through layered backgrounds, gradient accents, and more dynamic motion patterns.

### What changes

**1. Hero Section -- Immersive background**
- Add animated gradient orbs (2-3 floating blurred circles at different positions with slow drift animations)
- Add a subtle radial gradient vignette overlay from edges
- Animate the tagline badge with a shimmer/glow pulse effect
- Add a soft particle-like dot grid that slowly drifts

**2. Section backgrounds -- Visual variety and depth**
- `WhyDifferentSection`: Add a subtle radial gradient glow (gold, centered, very low opacity) behind the cards
- `ServicesSection`: Add diagonal line pattern background at ultra-low opacity + a floating accent orb
- `AboutSection`: Add a large blurred gradient circle offset to the right
- `FounderSection`: Add a cinematic dark gradient with subtle gold accent lines
- `ClientsSection`: Add a subtle mesh gradient background
- `ContactSection`: Add a radial glow behind the form area
- `StatsSection`: Add a horizontal gradient line/glow connecting the stats

**3. Card styling -- Glassmorphism and glow**
- Cards in WhyDifferent, Values, Services, TechStack: add `backdrop-blur-sm`, subtle gradient border on hover (gold shimmer), and a faint inner glow
- Add a gradient top-border accent (2px gold gradient line) on hover

**4. Animations -- More variety and polish**
- Add `slideInLeft` and `slideInRight` variants to `animations.ts` for asymmetric reveals
- `AboutSection`: headline slides from left, body text slides from right
- `FounderSection`: quote block scales in with a spring bounce
- Add a subtle parallax scroll effect on section background elements using Framer Motion's `useScroll` + `useTransform`
- Hero CTA buttons: add a subtle glow pulse animation on the primary button
- Navbar: add a glass-morphism effect that intensifies on scroll

**5. Micro-interactions**
- Card icons: rotate slightly on hover (15deg)
- CTA buttons: add a shimmer sweep animation on hover
- Stats numbers: add a subtle counting animation on scroll into view using `useInView`

**6. Global CSS additions**
- `.glass` utility for glassmorphism (backdrop-blur + semi-transparent bg)
- `.shimmer` animation keyframe for button/badge hover effects
- `.gradient-border` utility for animated gradient borders
- Smooth scroll behavior on `html`

### Files to create
None (all changes in existing files)

### Files to edit
- `src/lib/animations.ts` -- add `slideInLeft`, `slideInRight`, parallax helpers
- `src/index.css` -- add shimmer keyframe, glass utility, gradient-border, smooth scroll
- `src/components/HeroSection.tsx` -- multiple floating orbs, vignette, shimmer badge
- `src/components/StatsSection.tsx` -- counting animation, connecting glow line
- `src/components/AboutSection.tsx` -- asymmetric slide animations, background orb
- `src/components/WhyDifferentSection.tsx` -- radial glow background, enhanced cards
- `src/components/ValuesSection.tsx` -- enhanced card styling, icon hover rotation
- `src/components/ServicesSection.tsx` -- diagonal pattern bg, enhanced cards
- `src/components/FounderSection.tsx` -- cinematic gradient bg, spring bounce quote
- `src/components/ClientsSection.tsx` -- mesh gradient bg, enhanced badge styling
- `src/components/TechStackSection.tsx` -- enhanced card styling
- `src/components/ContactSection.tsx` -- radial glow bg, shimmer CTA button
- `src/components/Navbar.tsx` -- scroll-responsive glassmorphism
- `src/components/LegalSection.tsx` -- subtle background treatment
- `src/components/Footer.tsx` -- gradient accent line above

