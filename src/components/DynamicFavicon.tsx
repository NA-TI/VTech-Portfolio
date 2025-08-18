"use client";

import { useEffect, useRef } from "react";
import { useNavigationContent } from "@/hooks/useContent";
import { useSettings } from "@/hooks/useData";

/**
 * Dynamically sets the document favicon (and apple-touch-icon) to the same
 * image used in the navbar logo (navigation.logoImage). Falls back to
 * existing icons if no logo image is configured.
 */
export default function DynamicFavicon() {
  const { content: navigationContent, isMounted } = useNavigationContent();
  const { data: settingsResponse } = useSettings();
  const originalFaviconHref = useRef<string | null>(null);
  const originalAppleHref = useRef<string | null>(null);

  useEffect(() => {
    if (!isMounted) return;

    const logoUrl =
      settingsResponse?.data?.favicon?.trim() ||
      settingsResponse?.data?.logo?.trim() ||
      navigationContent?.logoImage?.trim();
    if (!logoUrl) return;

    // Helper to get or create a link element in <head>
    const ensureLink = (rel: string) => {
      let link = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"]`
      );
      if (!link) {
        link = document.createElement("link");
        link.rel = rel as any;
        document.head.appendChild(link);
      }
      return link;
    };

    // Favicon
    const fav = ensureLink("icon");
    if (originalFaviconHref.current === null) {
      originalFaviconHref.current = fav.getAttribute("href");
    }
    fav.setAttribute("href", logoUrl);
    // Let the browser infer type from extension; do not force a wrong type

    // Apple touch icon
    const apple = ensureLink("apple-touch-icon");
    if (originalAppleHref.current === null) {
      originalAppleHref.current = apple.getAttribute("href");
    }
    apple.setAttribute("href", logoUrl);

    // Optional: force refresh of favicon in some browsers
    const forceRefresh = () => {
      const currentHref = fav.getAttribute("href");
      if (currentHref) {
        fav.setAttribute(
          "href",
          currentHref + (currentHref.includes("?") ? "&" : "?") + Date.now()
        );
      }
    };
    // Small delay helps after content loads
    const t = window.setTimeout(forceRefresh, 50);

    return () => {
      window.clearTimeout(t);
      // Restore originals on unmount if we saved them
      if (originalFaviconHref.current !== null) {
        fav.setAttribute("href", originalFaviconHref.current);
      }
      if (originalAppleHref.current !== null) {
        apple.setAttribute("href", originalAppleHref.current);
      }
    };
  }, [isMounted, navigationContent?.logoImage]);

  return null;
}
