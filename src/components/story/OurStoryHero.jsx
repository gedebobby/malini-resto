'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryHero() {
  const heroSectionRef = useRef(null);
  const imageCardRef = useRef(null);
  const imageInnerRef = useRef(null);
  const scrimRef = useRef(null);
  const textWrapRef = useRef(null);

  useEffect(() => {
    const sectionEl = heroSectionRef.current;
    const imageCardEl = imageCardRef.current;
    const imageInnerEl = imageInnerRef.current;
    const scrimEl = scrimRef.current;
    const textWrapEl = textWrapRef.current;

    if (!sectionEl || !imageCardEl || !imageInnerEl) return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;
        // Ukuran awal persegi yang proporsional dan jelas terlihat
        const initialSize = isDesktop ? 320 : 220;

        // Calculate exact centered square inset based on current card dimensions
        const getInitialClipPath = () => {
          const w = imageCardEl.offsetWidth;
          const h = imageCardEl.offsetHeight;
          if (!w || !h) {
            return isDesktop
              ? 'inset(25% 36% 25% 36% round 20px)'
              : 'inset(27% 20% 27% 20% round 16px)';
          }
          const insetX = Math.max(0, Math.round((w - initialSize) / 2));
          const insetY = Math.max(0, Math.round((h - initialSize) / 2));
          return `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round 20px)`;
        };

        // Timeline for Scroll Scrub: Expands from Square to Full Width
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 73px',
            end: isDesktop ? '+=100%' : '+=80%',
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 10,
          },
        });

        // 1. Image Container Scrub: Centered square -> Full Width Card
        tl.fromTo(
          imageCardEl,
          {
            clipPath: getInitialClipPath,
          },
          {
            clipPath: 'inset(0px 0px 0px 0px round 20px)',
            ease: 'power1.inOut',
          },
          0
        );

        // 2. Subtle Inner Image Parallax Zoom-out as it expands
        tl.fromTo(
          imageInnerEl,
          { scale: 1.2 },
          { scale: 1, ease: 'none' },
          0
        );

        // 3. Dark Overlay Scrim deepens as the card expands
        if (scrimEl) {
          tl.fromTo(
            scrimEl,
            { opacity: 0 },
            { opacity: 1, ease: 'power2.out' },
            0.22
          );
        }

        // 4. Centered Heading fades in smoothly as the card expands
        if (textWrapEl) {
          tl.fromTo(
            textWrapEl,
            { autoAlpha: 0, y: isDesktop ? 26 : 16, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, ease: 'power2.out' },
            0.3
          );
        }
      },
      sectionEl
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-[calc(100vh-73px)] sm:min-h-[calc(100svh-73px)] w-full items-center justify-center overflow-hidden bg-[#f4f3e7] pt-0 pb-2 sm:pb-4 lg:pb-4"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 sm:px-6">
        {/* Expanding Hero Card Container */}
        <div
          ref={imageCardRef}
          className="relative mx-auto h-[480px] sm:h-[560px] md:h-[620px] lg:h-[660px] max-h-[calc(100vh-90px)] sm:max-h-[calc(100svh-90px)] w-full overflow-hidden shadow-2xl will-change-[clip-path]"
          style={{
            clipPath: 'inset(25% 36% 25% 36% round 20px)',
          }}
        >
          {/* Background Image with subtle parallax */}
          <div
            ref={imageInnerRef}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src="/assets/img/hero.webp"
              alt="Iconic sunset over the Indian Ocean horizon and limestone cliffs at Malini Uluwatu, Bali"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>

          {/* Dark Overlay Scrim (Centered contrast overlay) */}
          <div
            ref={scrimRef}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e150e]/70 via-[#0e150e]/40 to-[#0e150e]/30 opacity-0 will-change-[opacity]"
          />

          {/* SEO-Optimized Heading Inside Image (Centered Vertically & Horizontally) */}
          <div
            ref={textWrapRef}
            className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-10 md:p-14 text-center opacity-0 will-change-[opacity,transform]"
          >
            <div className="max-w-4xl px-4">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[0.95] tracking-normal text-[#f4f3e7] drop-shadow-md">
                Clifftop Seafood &amp; Indonesian Dining with Sunset Views
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
