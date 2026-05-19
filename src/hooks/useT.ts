import { useLocale } from "@/contexts/LocaleContext";

/**
 * Inline-translation helper for the handful of strings that are hardcoded
 * inside components (i.e. not flowing through useSiteContent / contentRegistry).
 *
 * Usage:
 *   const t = useT();
 *   <h2>{t("Real Clients.", "عملاء حقيقيون.")}</h2>
 *
 * Most strings should live in `src/lib/translations.ts` and be consumed via
 * `useSiteContent().get(key, en)`. This hook is the escape hatch for inline
 * literals where adding a registry key would be overkill.
 */
export const useT = () => {
  const { locale } = useLocale();
  return (en: string, ar: string) => (locale === "ar" ? ar : en);
};
