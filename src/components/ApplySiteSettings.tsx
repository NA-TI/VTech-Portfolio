"use client";
import { useEffect } from "react";
import { useSettings } from "@/hooks/useData";

export default function ApplySiteSettings() {
  const { data } = useSettings();
  const settings = data?.data;

  useEffect(() => {
    if (!settings) return;

    // Theme colors as CSS variables
    const root = document.documentElement;
    if (settings.primaryColor)
      root.style.setProperty("--brand-primary", settings.primaryColor);
    if (settings.secondaryColor)
      root.style.setProperty("--brand-secondary", settings.secondaryColor);

    // Meta tags (title/description/og)
    if (settings.metaTitle) document.title = settings.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (settings.metaDescription) {
      if (desc) desc.setAttribute("content", settings.metaDescription);
      else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = settings.metaDescription;
        document.head.appendChild(m);
      }
    }
    if (settings.ogImage) {
      const og = document.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement | null;
      if (og) og.setAttribute("content", settings.ogImage);
      else {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:image");
        m.content = settings.ogImage;
        document.head.appendChild(m);
      }
    }

    // Update brand name in DOM if used as data attribute
    const brandEl = document.querySelector("[data-brand-name]");
    if (brandEl && settings.siteName)
      brandEl.setAttribute("data-brand-name", settings.siteName);
  }, [settings]);

  return null;
}
