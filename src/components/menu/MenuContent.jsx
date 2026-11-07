'use client';

import { useState, useRef, useEffect } from 'react';
import { MENU_CATEGORIES, MENU_SECTIONS, CATATAN_TAMBAHAN } from '@/src/data/menuData';

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const tabsScrollRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(0.4);

  const checkOverflow = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setIsOverflowing(hasOverflow);
    if (hasOverflow) {
      setThumbRatio(Math.max(0.18, el.clientWidth / el.scrollWidth));
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    }
  };

  useEffect(() => {
    checkOverflow();
    const timer = setTimeout(checkOverflow, 200);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const handleScroll = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
    }
  };

  const handleTrackClick = (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    const el = tabsScrollRef.current;
    if (el) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
    }
  };

  const filteredSections =
    activeCategory === 'all'
      ? MENU_SECTIONS
      : MENU_SECTIONS.filter((sec) => sec.category === activeCategory);

  return (
    <div className="w-full bg-[#f4f3e7] text-[#0e150e]">
      {/* 1. HEADER */}
      <section className="w-full pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-[#0e150e]/10">
        <div data-gsap="reveal-group" className="mx-auto max-w-[1200px] px-6">
          {/* Eyebrow Label */}
          <p
            data-gsap="reveal-item"
            className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]"
          >
            FOOD &amp; DRINKS MENU
          </p>

          {/* Display Headline */}
          <h1
            data-gsap="reveal-item"
            className="mt-2 font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.9] tracking-normal text-[#0e150e]"
          >
            Malini Uluwatu Menu
          </h1>
        </div>
      </section>

      {/* 2. STICKY CATEGORY NAV FILTER (Concise & English with Custom Scrollbar) */}
      <nav
        aria-label="Menu Category Filter"
        className="sticky top-[72px] z-30 w-full bg-[#f4f3e7]/95 border-b border-[#0e150e]/10 backdrop-blur-md transition-all py-3 shadow-xs"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div
            ref={tabsScrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-2 sm:gap-3 pt-1 pb-1 sm:py-1 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-[0.03em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#00473c] text-[#f4f3e7] shadow-sm'
                      : 'bg-[#f4f3e7] text-[#00473c] border border-[#00473c]/20 hover:border-[#00473c] hover:bg-[#d8e5d6]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Custom Styled Scrollbar (Only shown when tabs do not display all of them) */}
          {isOverflowing && (
            <div
              onClick={handleTrackClick}
              role="scrollbar"
              aria-orientation="horizontal"
              aria-label="Category tabs scrollbar"
              className="relative mt-2.5 h-[3px] w-full cursor-pointer rounded-full bg-[#00473c]/15 transition-opacity duration-200"
            >
              <div
                className="absolute top-0 bottom-0 rounded-full bg-[#00473c] transition-all duration-75"
                style={{
                  width: `${thumbRatio * 100}%`,
                  left: `${scrollProgress * (100 - thumbRatio * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* 3. MENU SECTIONS LISTING */}
      <main className="mx-auto max-w-[1200px] px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {filteredSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-32"
          >
            {/* Category Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[#00473c] pb-3">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0e150e] leading-[0.95] tracking-tight">
                {section.title}
              </h2>
              {section.note && (
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.05em] text-[#00473c]">
                  {section.note}
                </span>
              )}
            </div>

            {/* Standard Items Grid */}
            {section.items && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {section.items.map((item, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col justify-between border-b border-[#0e150e]/10 pb-4 transition-colors hover:border-[#00473c]/40"
                  >
                    <div>
                      {/* Name & Price */}
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#0e150e]">
                          {item.name}
                        </h3>
                        <span className="font-heading text-base sm:text-lg font-extrabold text-[#00473c] tabular-nums whitespace-nowrap shrink-0">
                          {item.price}
                        </span>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-1.5 text-xs sm:text-sm font-light leading-[1.4] text-[#0e150e]/75">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Subsections Grid (For Wine List & Spirits) */}
            {section.subsections && (
              <div className="mt-6 space-y-8">
                {section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="pt-2">
                    {/* Subsection Heading */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#00473c] border-b border-[#00473c]/20 pb-2 mb-4">
                      {sub.subheading}
                    </h3>

                    {/* Subsection Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                      {sub.items.map((item, idx) => (
                        <article
                          key={idx}
                          className="flex items-baseline justify-between gap-4 border-b border-[#0e150e]/10 pb-3 transition-colors hover:border-[#00473c]/40"
                        >
                          <h4 className="font-heading text-base sm:text-lg font-bold text-[#0e150e]">
                            {item.name}
                          </h4>
                          <span className="font-heading text-base sm:text-lg font-extrabold text-[#00473c] tabular-nums whitespace-nowrap shrink-0">
                            {item.price}
                          </span>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* 4. ADDITIONAL NOTES */}
        <div className="rounded-[20px] bg-[#d8e5d6]/60 border border-[#00473c]/15 p-6 sm:p-8">
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0e150e]">
            Additional Notes:
          </h3>
          <ul className="mt-4 space-y-2 text-sm sm:text-base font-light text-[#0e150e]/85 leading-[1.4]">
            {CATATAN_TAMBAHAN.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-bold text-[#00473c]">&bull;</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
