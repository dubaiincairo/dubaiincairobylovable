

## Mobile UI Fixes

Two issues to address: excessive vertical spacing between sections on mobile, and an uneven client badge layout.

### Issue 1: Excessive spacing on mobile

Every section uses `py-32` (128px top + 128px bottom) or `py-24` (96px each). On a 390px-wide mobile screen, this creates massive black gaps between sections. The fix is to reduce vertical padding on mobile using responsive Tailwind classes.

**Changes across all section components:**

| Current | Mobile-optimized |
|---------|-----------------|
| `py-32` | `py-16 md:py-32` |
| `py-24` | `py-12 md:py-24` |
| `mb-20` (section headers) | `mb-10 md:mb-20` |
| `mb-16` (clients header) | `mb-8 md:mb-16` |
| `mb-12` (founder header, contact subtext) | `mb-6 md:mb-12` |

**Files to update:**
- `StatsSection.tsx` -- `py-24` to `py-12 md:py-24`
- `AboutSection.tsx` -- `py-32` to `py-16 md:py-32`
- `WhyDifferentSection.tsx` -- `py-32` to `py-16 md:py-32`, `mb-20` to `mb-10 md:mb-20`
- `ValuesSection.tsx` -- same pattern
- `ServicesSection.tsx` -- same pattern
- `FounderSection.tsx` -- `py-32` to `py-16 md:py-32`, `mb-12` to `mb-6 md:mb-12`
- `ClientsSection.tsx` -- `py-32` to `py-16 md:py-32`, `mb-16` to `mb-8 md:mb-16`
- `TechStackSection.tsx` -- same pattern as WhyDifferent
- `ContactSection.tsx` -- `py-32` to `py-16 md:py-32`, `mb-12` to `mb-8 md:mb-12`
- `LegalSection.tsx` -- `py-24` to `py-12 md:py-24`, `mb-10` to `mb-6 md:mb-10`
- `Footer.tsx` -- `py-12` to `py-8 md:py-12`
- `HeroSection.tsx` -- already uses `min-h-screen`, no change needed

### Issue 2: Uneven client badges on mobile

Currently uses `flex flex-wrap justify-center gap-4` which creates ragged rows on narrow screens. Fix: switch to a uniform 2-column grid on mobile that creates a clean, symmetrical layout, then revert to the flex-wrap flow on larger screens.

**Change in `ClientsSection.tsx`:**
- Replace the outer `flex flex-wrap` container with `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3`
- Make each badge `text-center` and consistent width (fills its grid cell)
- Reduce badge padding slightly on mobile: `px-3 py-2 md:px-6 md:py-3`

This gives a clean 2-column layout on mobile with equal-width cells, scaling to 3/4/5 columns on wider screens.

### Summary of files changed
- `StatsSection.tsx`
- `AboutSection.tsx`
- `WhyDifferentSection.tsx`
- `ValuesSection.tsx`
- `ServicesSection.tsx`
- `FounderSection.tsx`
- `ClientsSection.tsx`
- `TechStackSection.tsx`
- `ContactSection.tsx`
- `LegalSection.tsx`
- `Footer.tsx`

