'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.6,
      lerp: 0.065,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.75,
      syncTouch: false,
    });

    window.__lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Animations with ScrollTrigger
    const ctx = gsap.context(() => {
      // Reveal Groups (Headers, Text Stacks, Eyebrows)
      const revealGroups = gsap.utils.toArray('[data-gsap="reveal-group"]');
      revealGroups.forEach((group) => {
        const items = group.querySelectorAll('[data-gsap="reveal-item"]');
        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Tall Image Reveal & Parallax in Philosophy Section
      const philosophyImageWrap = document.querySelector('[data-gsap="philosophy-image-wrap"]');
      const philosophyImage = document.querySelector('[data-gsap="philosophy-image"]');
      if (philosophyImageWrap) {
        gsap.fromTo(
          philosophyImageWrap,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosophyImageWrap,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
      if (philosophyImage && philosophyImageWrap) {
        gsap.fromTo(
          philosophyImage,
          { scale: 1.12, yPercent: -5 },
          {
            scale: 1.12,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: philosophyImageWrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Staggered Card Grids (Menu items, product cards)
      const cardGrids = gsap.utils.toArray('[data-gsap="card-grid"]');
      cardGrids.forEach((grid) => {
        const cards = grid.querySelectorAll('[data-gsap="card-item"]');
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    // 3. Ensure ScrollTriggers are properly sorted and calculated taking pinned sections into account
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const t1 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 150);

    const t2 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    const handleLoad = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(handleLoad);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', handleLoad);
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [pathname]);

  return children;
}
