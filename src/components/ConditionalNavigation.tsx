"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface ConditionalNavigationProps {
  children: React.ReactNode;
}

export default function ConditionalNavigation({
  children,
}: ConditionalNavigationProps) {
  const pathname = usePathname();

  // Don't show navigation for admin pages
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}


