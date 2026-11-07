'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAVBAR_HEIGHT = 72;

const CATEGORIZED_MENU = {
  'Seafood Catch': [
    {
      id: 'seafood-1',
      name: 'Jimbaran Wood-Fired Catch',
      badge: 'CHEF SIGNATURE',
      price: 'IDR 245K',
      description:
        'Chargrilled line-caught red snapper and king prawns over coconut husks, glazed in spiced honey kecap with torch-ginger sambal matah.',
      image: '/assets/img/1.webp',
    },
    {
      id: 'seafood-2',
      name: 'Uluwatu Bamboo Lobster',
      badge: null,
      price: 'IDR 420K',
      description:
        'Whole local rock lobster grilled with garlic calamansi butter, fresh sea grapes, and charred Balinese lime.',
      image: '/assets/img/4.webp',
    },
  ],
  'Indonesian Heritage': [
    {
      id: 'indo-1',
      name: 'Archipelago Beef Rendang',
      badge: 'HERITAGE FAVORITE',
      price: 'IDR 175K',
      description:
        'Slow-braised caramelized coconut beef rendang infused with lemongrass and galangal, served with yellow turmeric rice and crispy emping.',
      image: '/assets/img/2.webp',
    },
    {
      id: 'indo-2',
      name: 'Crispy Bebek Timbungan',
      badge: null,
      price: 'IDR 185K',
      description:
        'Balinese spiced duck confit with lawar kacang panjang, trio of house sambals, and steamed heirloom rice.',
      image: '/assets/img/3.webp',
    },
  ],
  'Sunset Cliff Bar': [
    {
      id: 'bar-1',
      name: 'Karang Boma Sunset Cocktail',
      badge: 'GOLDEN HOUR ONLY',
      price: 'IDR 135K',
      description:
        'Handcrafted cliff bar signature blending spiced Balinese arak, charred pineapple, calamansi citrus, passionfruit, and volcanic sea salt.',
      image: '/assets/img/3.webp',
    },
    {
      id: 'bar-2',
      name: 'Smoked Pandan Old Fashioned',
      badge: null,
      price: 'IDR 150K',
      description:
        'Small-batch bourbon washed with toasted coconut oil, pandan leaf reduction, and aromatic clove bitters.',
      image: '/assets/img/2.webp',
    },
  ],
};

const CATEGORIES = Object.keys(CATEGORIZED_MENU);

export default function MenuHighlights() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const tabAnchorRef = useRef(null);
  const items = CATEGORIZED_MENU[activeCategory];

  const handleCategorySelect = (category) => {
    setActiveCategory(category);

    const anchorEl = tabAnchorRef.current;
    if (!anchorEl) return;

    const navH = NAVBAR_HEIGHT;
    const rect = anchorEl.getBoundingClientRect();
    // Reset exactly to the point where the sticky tab bar starts sticking beneath the navbar
    if (rect.top < navH - 2) {
      if (window.__lenis) {
        window.__lenis.scrollTo(anchorEl, { offset: -navH, duration: 0.6 });
      } else {
        const targetTop = window.scrollY + rect.top - navH;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="cliff-menu" className="w-full bg-[#f4f3e7] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Sentinel right at the exact position where the sticky tab bar starts activating */}
        <div ref={tabAnchorRef} aria-hidden="true" className="h-0 w-full" />

        {/* Sticky Centered Category Tabs (Wraps cleanly on small mobile screens with balanced equal top and bottom padding) */}
        <div
          role="tablist"
          aria-label="Menu Categories"
          data-gsap="reveal-group"
          className="sticky top-[72px] z-30 -mx-6 mb-6 sm:mb-8 md:mb-16 border-b border-[#0e150e]/10 md:border-b-0 bg-[#f4f3e7]/95 px-4 sm:px-6 py-2.5 md:py-4 backdrop-blur-md"
        >
          <div
            data-gsap="reveal-item"
            className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-2.5 gap-y-2.5 sm:gap-6 md:gap-12"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(category)}
                  className={`group flex cursor-pointer items-center justify-center rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 md:rounded-none md:p-0 text-center transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-[#00473c] text-[#f4f3e7] md:bg-transparent md:text-[#0e150e]'
                      : 'bg-transparent text-[#0e150e]/55 hover:text-[#0e150e] md:text-[#0e150e]/40 md:hover:opacity-75'
                  }`}
                >
                  <span className="font-heading text-[13px] sm:text-lg md:text-3xl font-extrabold leading-none whitespace-nowrap tracking-normal">
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Editorial Whitespace Staggered Gallery Grid (2 Items per Category) */}
        <div
          data-gsap="card-grid"
          className="grid grid-cols-1 items-start gap-y-16 md:grid-cols-2 md:gap-x-16 lg:gap-x-24"
        >
          {items.map((item, idx) => (
            <article
              key={item.id}
              data-gsap="card-item"
              className={`group flex flex-col ${idx % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              {/* Square Food Photograph Surface (20px radius, zero border/shadow) */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {item.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-[20px] bg-[#e6ff55] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.05em] text-[#0e150e]">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Editorial Caption Below Image (Flush with photo edges for generous whitespace) */}
              <div className="flex flex-col pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[20px] font-bold leading-[1.2] tracking-[0.03em] text-[#0e150e]">
                    {item.name}
                  </h3>
                  <span className="shrink-0 text-[14px] font-bold tracking-[0.05em] text-[#00473c]">
                    {item.price}
                  </span>
                </div>

                <p className="mt-2.5 max-w-[42ch] text-[16px] font-light leading-[1.35] tracking-[0.017em] text-[#0e150e]/85">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* View Full Menu CTA (Sleek, Compact Pill Outline Button on Mobile) */}
        <div className="mt-8 sm:mt-12 md:mt-14 flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-[1.5px] sm:border-2 border-[#00473c] px-5 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.04em] text-[#00473c] transition-all duration-200 hover:bg-[#00473c] hover:text-[#f4f3e7] active:scale-[0.98]"
          >
            <span>Explore Full Menu</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
