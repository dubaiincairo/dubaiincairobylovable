export const COOKIE_CONSENT_STORAGE_KEY = "dic_cookie_consent";
export const COOKIE_CONSENT_EVENT = "dic-consent-change";

export type CookieConsent = "accepted" | "declined" | null;

export const persistCookieConsent = (value: Exclude<CookieConsent, null>) => {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
};
