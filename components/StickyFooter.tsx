"use client";

import { ReactNode } from "react";

interface StickyFooterProps {
  children: ReactNode;
}

/**
 * StickyFooter — Fixed bottom action bar used across all checkout steps.
 * Provides a consistent Back + Next button layout at the bottom of the viewport.
 */
export default function StickyFooter({ children }: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200/60 bg-white/80 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {children}
      </div>
    </div>
  );
}
