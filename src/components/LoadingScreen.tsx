"use client";
import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading?: boolean;
  contentLoaded?: boolean;
}

export default function LoadingScreen({
  isLoading = true,
  contentLoaded = false,
}: LoadingScreenProps) {
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    if (contentLoaded && !isLoading) {
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, contentLoaded]);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center">
        {/* Ultra-thin spinner */}
        <div className="w-6 h-6 md:w-8 md:h-8 border border-slate-300 dark:border-slate-600 rounded-full mx-auto mb-3 animate-spin">
          <div className="w-full h-full border-2 border-transparent border-t-vtech-cyan-500 rounded-full animate-spin" />
        </div>

        {/* Minimal text */}
        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
          VTech
        </div>
      </div>
    </div>
  );
}




