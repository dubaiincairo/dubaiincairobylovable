import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Locale = "en" | "ar";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** Path that takes the user to the *other* locale of the current page. */
  otherLocaleHref: string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  dir: "ltr",
  otherLocaleHref: "/ar",
});

const isArabicPath = (pathname: string) =>
  pathname === "/ar" || pathname.startsWith("/ar/");

const computeOtherHref = (pathname: string): string => {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) {
    const rest = pathname.slice(3);
    return rest || "/";
  }
  if (pathname === "/") return "/ar";
  // For English-only pages we currently route the AR pill to the Arabic
  // homepage. Once those pages are translated we'll mirror their path here.
  return "/ar";
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const locale: Locale = isArabicPath(pathname) ? "ar" : "en";
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";
  const otherLocaleHref = computeOtherHref(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <LocaleContext.Provider value={{ locale, dir, otherLocaleHref }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
