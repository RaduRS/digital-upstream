"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore } from "react";

type ConsentValue = "granted" | "denied";
type CookieConsentProps = { initialConsent?: ConsentValue | null };

const ANALYTICS_ID = "G-YW8E57E2BS";
const STORAGE_KEY = "du_cookie_consent";
const COOKIE_NAME = "du_cookie_consent";

const isValidConsent = (value: string | null): value is ConsentValue =>
  value === "granted" || value === "denied";

const getCookieValue = (cookieName: string) => {
  const cookieString = typeof document === "undefined" ? "" : document.cookie;
  const cookies = cookieString.split(";").map((c) => c.trim());
  const match = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!match) {
    return null;
  }
  return decodeURIComponent(match.slice(cookieName.length + 1));
};

const setConsentCookie = (value: ConsentValue) => {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "Max-Age=31536000",
    "SameSite=Lax",
  ];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    parts.push("Secure");
  }
  document.cookie = parts.join("; ");
};

const subscribe = (callback: () => void) => {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("du-cookie-consent", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("du-cookie-consent", handler);
  };
};

const getSnapshot = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isValidConsent(stored)) {
    return stored;
  }
  const cookieValue = getCookieValue(COOKIE_NAME);
  return isValidConsent(cookieValue) ? cookieValue : null;
};

export default function CookieConsent({
  initialConsent = null,
}: CookieConsentProps) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialConsent,
  );

  const updateConsent = useCallback((value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsentCookie(value);
    window.dispatchEvent(new Event("du-cookie-consent"));
  }, []);

  const isCookiesPolicyPage = pathname === "/cookies";
  const shouldBlock = consent === null && !isCookiesPolicyPage;

  useEffect(() => {
    if (consent === null) {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== consent) {
      window.localStorage.setItem(STORAGE_KEY, consent);
    }

    const cookieValue = getCookieValue(COOKIE_NAME);
    if (cookieValue !== consent) {
      setConsentCookie(consent);
    }
  }, [consent]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (shouldBlock) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldBlock]);

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ANALYTICS_ID}');`}
          </Script>
        </>
      ) : null}
      {consent === null ? (
        isCookiesPolicyPage ? (
          <div className="fixed bottom-4 left-1/2 z-[100] w-[min(56rem,calc(100%-2rem))] -translate-x-1/2">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-consent-title"
              className="rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2
                    id="cookie-consent-title"
                    className="text-xl font-semibold"
                  >
                    Choose your cookie preference
                  </h2>
                  <p className="text-sm text-foreground/80">
                    We use Google Analytics to measure traffic and improve the
                    website. Choose yes or no to continue.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:pt-6">
                  <button
                    type="button"
                    onClick={() => updateConsent("granted")}
                    className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => updateConsent("denied")}
                    className="cursor-pointer rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-consent-title"
              className="w-full max-w-2xl mx-4 rounded-2xl border border-border bg-card/95 p-6 shadow-2xl sm:p-8"
            >
              <div className="space-y-4">
                <h2
                  id="cookie-consent-title"
                  className="text-2xl font-semibold sm:text-3xl"
                >
                  Choose your cookie preference
                </h2>
                <p className="text-sm text-foreground/80 sm:text-base">
                  We use Google Analytics to measure traffic and improve the
                  website. Choose yes or no to continue.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => updateConsent("granted")}
                  className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => updateConsent("denied")}
                  className="cursor-pointer rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
                >
                  Decline
                </button>
                <Link
                  href="/cookies"
                  className="text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground link-underline-rtl"
                >
                  Read cookie policy
                </Link>
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}
