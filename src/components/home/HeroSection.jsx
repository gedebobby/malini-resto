'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroSectionRef = useRef(null);
  const clipWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const scrimRef = useRef(null);
  const textWrapRef = useRef(null);
  const initialInfoRef = useRef(null);

  useEffect(() => {
    const sectionEl = heroSectionRef.current;
    const clipWrapEl = clipWrapRef.current;
    const imageInnerEl = imageInnerRef.current;
    const scrimEl = scrimRef.current;
    const textWrapEl = textWrapRef.current;
    const initialInfoEl = initialInfoRef.current;

    if (!sectionEl || !clipWrapEl || !imageInnerEl) return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;

        // Hitung clipPath awal berupa persegi 1:1 presisi di tengah layar
        const getInitialClipPath = () => {
          const w = clipWrapEl.offsetWidth;
          const h = clipWrapEl.offsetHeight;
          if (!w || !h) {
            return isDesktop
              ? 'inset(25% 36% 25% 36% round 20px)'
              : 'inset(27% 20% 27% 20% round 16px)';
          }

          // Rasio 1:1 proporsional
          const squareSize = isDesktop
            ? Math.min(380, Math.round(h * 0.58), Math.round(w * 0.45))
            : Math.min(260, Math.round(w * 0.72), Math.round(h * 0.45));

          const insetX = Math.max(0, Math.round((w - squareSize) / 2));
          const insetY = Math.max(0, Math.round((h - squareSize) / 2));
          return `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round 20px)`;
        };

        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 72;

        // Timeline Scroll Scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: `top ${headerHeight}px`,
            end: isDesktop ? '+=125%' : '+=130%',
            pin: true,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 10,
          },
        });

        // 1. Informasi jam buka & alamat di sekitar gambar memudar keluar saat scroll scrub dimulai
        if (initialInfoEl) {
          tl.fromTo(
            initialInfoEl,
            { autoAlpha: 1, scale: 1 },
            { autoAlpha: 0, scale: 0.95, duration: 0.22, ease: 'power1.out' },
            0
          );
        }

        // 2. Clip path scrub: Persegi 1:1 (round 20px) -> Layar Penuh (round 0px)
        tl.fromTo(
          clipWrapEl,
          {
            clipPath: getInitialClipPath,
          },
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            duration: 1.0,
            ease: 'power1.inOut',
          },
          0
        );

        // 3. Kamera subtle zoom-out saat melebar
        tl.fromTo(
          imageInnerEl,
          { scale: 1.15 },
          { scale: 1, duration: 1.0, ease: 'none' },
          0
        );

        // 4. Overlay Forest Shadow #0e150e/45 muncul menjelang akhir saat ekspansi hampir selesai
        if (scrimEl) {
          tl.fromTo(
            scrimEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: 'power2.out' },
            0.8
          );
        }

        // 5. Headline & CTA baru muncul ketika timeline sudah mencapai 85%
        if (textWrapEl) {
          tl.fromTo(
            textWrapEl,
            { autoAlpha: 0, y: isDesktop ? 18 : 12 },
            { autoAlpha: 1, y: 0, duration: 0.15, ease: 'power2.out' },
            0.85
          );
        }

        // 6. Jeda/Hold phase seperti di awal tadi setelah kondisi akhir tercapai sebelum unpin
        tl.to({}, { duration: 0.5 });
      },
      sectionEl
    );

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative z-20 flex h-[calc(100dvh-72px)] sm:h-[calc(100vh-72px)] min-h-[520px] sm:min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#f4f3e7]"
    >
      {/* Teks Ringkas & Rapat Mengapit Gambar Sebelum Timeline Start */}
      <div
        ref={initialInfoRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-[opacity,transform]"
      >
        {/* Desktop Layout: Rapat mengapit sisi kiri & kanan foto */}
        <div className="hidden lg:flex w-full max-w-[760px] items-center justify-between px-4">
          {/* Sisi Kiri: Jam Buka (Rapat ke tepi kiri foto) */}
          <div className="w-[170px] flex flex-col items-end text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00473c]">
              OPEN DAILY
            </p>
            <p className="mt-0.5 text-xs font-bold text-[#0e150e] whitespace-nowrap">
              10:00 &ndash; 22:00 WITA
            </p>
            <p className="text-[11px] font-medium text-[#00473c] whitespace-nowrap">
              Sunset 17:00 &ndash; 18:30
            </p>
          </div>

          {/* Spacer transparan selebar foto persegi di tengah */}
          <div className="w-[380px] h-[380px] shrink-0" aria-hidden="true" />

          {/* Sisi Kanan: Elevasi & Sudut Pandang Tebing (Opsi 2) */}
          <div className="w-[170px] flex flex-col items-start text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00473c]">
              ELEVATION
            </p>
            <p className="mt-0.5 text-xs font-bold text-[#0e150e] whitespace-nowrap">
              100m Above Ocean
            </p>
            <p className="text-[11px] font-medium text-[#00473c] whitespace-nowrap">
              180&deg; Sunset Horizon
            </p>
          </div>
        </div>

        {/* Mobile & Tablet Layout: Rapat tepat di atas & bawah foto */}
        <div className="flex lg:hidden flex-col items-center justify-between h-[360px] sm:h-[400px] px-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00473c]">
              OPEN DAILY &bull; 10:00 &ndash; 22:00 WITA
            </span>
            <span className="text-[11px] font-medium text-[#00473c]">
              Sunset 17:00 &ndash; 18:30
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00473c]">
              ELEVATION
            </span>
            <span className="text-[11px] font-medium text-[#00473c]">
              100m Above Ocean &bull; 180&deg; Sunset Horizon
            </span>
          </div>
        </div>
      </div>

      {/* Clipped Full-Bleed Container */}
      <div
        ref={clipWrapRef}
        className="relative h-full w-full overflow-hidden will-change-[clip-path]"
        style={{
          clipPath: 'inset(25% 36% 25% 36% round 20px)',
        }}
      >
        {/* Full-bleed Background Photograph */}
        <div
          ref={imageInnerRef}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/assets/img/hero.webp"
            alt="Dramatic ocean cliffs and golden hour coastal view at Malini Uluwatu, Bali"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Contrast Overlay (Forest Shadow #0e150e tint) - Persis Hero Saat Ini */}
        <div
          ref={scrimRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0e150e]/45 opacity-0 will-change-[opacity]"
        />

        {/* Pure Headline & CTA (Pojok Kiri Bawah - Persis Hero Saat Ini) */}
        <div
          ref={textWrapRef}
          className="pointer-events-none absolute inset-0 z-10 mx-auto flex max-w-[1200px] flex-col justify-end px-6 pb-7 sm:pb-12 md:pb-20 opacity-0 will-change-[opacity,transform]"
        >
          <div className="pointer-events-auto max-w-xl">
            {/* Display Headline */}
            <h1 className="font-heading text-[38px] sm:text-5xl md:text-[76px] font-extrabold leading-[0.92] sm:leading-[0.88] tracking-normal text-[#f4f3e7]">
              Dine above the Indian Ocean sunset.
            </h1>

            {/* Primary Action: Pill CTA (Lime Glow #e6ff55) */}
            <div className="mt-5 sm:mt-8 md:mt-10">
              <Link
                href="#reserve"
                className="inline-flex items-center justify-center rounded-full bg-[#e6ff55] px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold tracking-[0.017em] text-[#0e150e] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
              >
                Book Sunset Table
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
