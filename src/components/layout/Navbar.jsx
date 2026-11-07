'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'ABOUT US', href: '/our-story' },
  { label: 'MENU', href: '/menu' },
  { label: 'REGULATIONS', href: '/regulations' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full bg-[#f4f3e7]/95 border-b border-[#0e150e]/10 backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        {/* Left: Desktop Navigation Items */}
        <nav aria-label="Primary Navigation Left" className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] xl:text-[14px] font-bold uppercase tracking-[0.05em] text-[#0e150e] transition-colors hover:text-[#00473c] hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Brand Logo: Left-aligned on Mobile, Centered on Desktop (lg:) */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-[24px] md:text-[28px] font-bold lowercase leading-none tracking-tight text-[#00473c] whitespace-nowrap transition-opacity hover:opacity-85 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          malini uluwatu
        </Link>

        {/* Right: Pill Outline CTA + Mobile Hamburger */}
        <div className="flex items-center justify-end gap-6">
          <div className="hidden lg:flex items-center">
            <Link
              href="/#reserve"
              className="rounded-full border-2 border-[#00473c] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.05em] text-[#00473c] transition-colors duration-200 hover:bg-[#00473c] hover:text-[#f4f3e7]"
            >
              RESERVE A TABLE
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center justify-center rounded-full p-2 text-[#0e150e] transition-colors hover:bg-[#d8e5d6]/60 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Slide-down Panel */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#0e150e]/10 bg-[#f4f3e7] px-6 py-6 lg:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#0e150e] transition-colors hover:text-[#00473c]"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3">
              <Link
                href="/#reserve"
                onClick={closeMenu}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#00473c] px-5 py-3 text-sm font-bold uppercase tracking-[0.05em] text-[#00473c] transition-colors duration-200 hover:bg-[#00473c] hover:text-[#f4f3e7]"
              >
                RESERVE A TABLE
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
