"use client";

import { CupSoda } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFF9EE] border-b border-[#FDF0D5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CupSoda className="h-7 w-7 text-[#FF3669]" />
          <span className="font-serif text-2xl font-bold text-[#003049] tracking-tight">
            BreakTime
          </span>
        </div>
      </div>
    </header>
  );
}
