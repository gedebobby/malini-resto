'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_HEIGHT = 73;
const WHATSAPP_NUMBER = '6281234567890';

const EXPERIENCES = [
  {
    id: 'romantic-dining',
    title: 'Romantic Cliffside Dining.',
    description:
      'Watch the horizon turn gold together over a candlelit table on the cliff edge, paired with wood-fired ocean catch, authentic Indonesian delicacies, and sunset cocktails.',
    image: '/assets/img/1.webp',
    alt: 'Intimate candlelit romantic dinner table overlooking the Uluwatu ocean cliff at sunset',
    whatsappMessage:
      'Hello Malini Uluwatu! I would like to reserve a Romantic Cliffside Dining table.',
  },
  {
    id: 'birthday-celebrations',
    title: 'Birthday Celebrations.',
    description:
      'Toast another year at our Sunset Cliff Bar with shared Jimbaran-style seafood platters, royal Indonesian feast menus, and handcrafted tropical cocktails.',
    image: '/assets/img/2.webp',
    alt: 'Warm outdoor birthday celebration dinner table with fresh food and drinks at Malini Uluwatu',
    whatsappMessage:
      'Hello Malini Uluwatu! I would like to inquire about a Birthday Celebration at the Sunset Cliff Bar.',
  },
  {
    id: 'group-events',
    title: 'Private & Group Events.',
    description:
      'Bring your favorite people to the cliff—host an unforgettable sunset bar session, Indonesian seafood banquet, or private celebration under the Uluwatu stars.',
    image: '/assets/img/3.webp',
    alt: 'Spacious clifftop venue setup for group events and gatherings at Malini Uluwatu',
    whatsappMessage:
      'Hello Malini Uluwatu! I would like to inquire about hosting a Private / Group Event.',
  },
];

export default function EventsSection() {
  const sectionRef = useRef(null);
  const progressFillRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const textTlRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Discrete State-Driven GSAP Transition (Triggered cleanly per step, never stuck mid-scrub)
  const animateToSlide = useCallback((nextIndex) => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prevIndex = activeIndexRef.current;
    if (nextIndex === prevIndex || nextIndex < 0 || nextIndex >= EXPERIENCES.length) return;

    const direction = nextIndex > prevIndex ? 1 : -1;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    const textSlides = gsap.utils.toArray('[data-event-text]', sectionEl);
    const imageLayers = gsap.utils.toArray('[data-event-image-layer]', sectionEl);
    const imageInners = gsap.utils.toArray('[data-event-image-inner]', sectionEl);
    const navDots = gsap.utils.toArray('[data-event-dot]', sectionEl);

    // 1. Sequential Text Transition (Zero overlap)
    if (textTlRef.current) textTlRef.current.kill();
    textSlides.forEach((slide, idx) => {
      gsap.killTweensOf(slide);
      if (idx !== prevIndex && idx !== nextIndex) {
        gsap.set(slide, { autoAlpha: 0, pointerEvents: 'none' });
      }
    });

    const textTl = gsap.timeline();
    textTlRef.current = textTl;
    textTl
      .to(textSlides[prevIndex], {
        autoAlpha: 0,
        y: direction > 0 ? -24 : 24,
        pointerEvents: 'none',
        duration: 0.22,
        ease: 'power2.in',
      })
      .fromTo(
        textSlides[nextIndex],
        { autoAlpha: 0, y: direction > 0 ? 24 : -24, pointerEvents: 'none' },
        {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.42,
          ease: 'power3.out',
        },
        '+=0.02'
      );

    // 2. Image Layer Reveal (Clip-Path Wipe + Subtle Scale)
    EXPERIENCES.forEach((_, idx) => {
      gsap.to(imageLayers[idx], {
        clipPath: idx <= nextIndex ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
        duration: 0.65,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
    });

    gsap.fromTo(
      imageInners[nextIndex],
      { scale: 1.12 },
      {
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    );

    // 3. Progress Bar & Active Dot
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, {
        scaleY: (nextIndex + 1) / EXPERIENCES.length,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    navDots.forEach((dot, idx) => {
      gsap.to(dot, {
        scale: idx === nextIndex ? 1.5 : 1,
        opacity: idx === nextIndex ? 1 : 0.3,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, []);

  // Click handler for step indicator dots
  const handleDotClick = useCallback(
    (targetIdx) => {
      const st = scrollTriggerRef.current;
      if (st) {
        const targetScroll =
          st.start + (st.end - st.start) * ((targetIdx + 0.1) / EXPERIENCES.length);
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.scrollTo(targetScroll, { duration: 1.4 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
      animateToSlide(targetIdx);
    },
    [animateToSlide]
  );

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // GSAP Best Practice: Ignore mobile URL bar resize jitter
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      () => {
        const textSlides = gsap.utils.toArray('[data-event-text]', sectionEl);
        const imageLayers = gsap.utils.toArray('[data-event-image-layer]', sectionEl);
        const imageInners = gsap.utils.toArray('[data-event-image-inner]', sectionEl);
        const navDots = gsap.utils.toArray('[data-event-dot]', sectionEl);

        // Set initial state based on current active index
        const currentIdx = activeIndexRef.current;
        textSlides.forEach((slide, idx) => {
          gsap.set(slide, {
            autoAlpha: idx === currentIdx ? 1 : 0,
            y: idx === currentIdx ? 0 : 28,
            pointerEvents: idx === currentIdx ? 'auto' : 'none',
          });
        });

        imageLayers.forEach((layer, idx) => {
          gsap.set(layer, {
            clipPath: idx <= currentIdx ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          });
        });

        gsap.set(imageInners, { scale: 1 });

        navDots.forEach((dot, idx) => {
          gsap.set(dot, {
            scale: idx === currentIdx ? 1.5 : 1,
            opacity: idx === currentIdx ? 1 : 0.3,
          });
        });

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, {
            scaleY: (currentIdx + 1) / EXPERIENCES.length,
          });
        }

        // GSAP + Lenis Best Practice: Single ScrollTrigger with equal 1/3 zones per slide
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: sectionEl,
          start: `top ${NAVBAR_HEIGHT}px`,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          refreshPriority: 5,
          onUpdate: (self) => {
            const nextIdx = Math.min(
              EXPERIENCES.length - 1,
              Math.max(0, Math.floor(self.progress * EXPERIENCES.length))
            );
            if (nextIdx !== activeIndexRef.current) {
              animateToSlide(nextIdx);
            }
          },
        });
      },
      sectionEl
    );

    return () => {
      if (textTlRef.current) textTlRef.current.kill();
      mm.revert();
    };
  }, [animateToSlide]);

  return (
    <section
      id="agro-experience"
      ref={sectionRef}
      className="relative h-[280svh] lg:h-[300vh] w-full scroll-mt-[73px] bg-[#d8e5d6]"
    >
      {/* Sticky Stage positioned right below Navbar (Uses 100svh so mobile address bar never resizes stage) */}
      <div className="sticky top-[73px] z-10 flex h-[calc(100svh-73px)] w-full items-stretch lg:items-center overflow-hidden py-9 sm:py-11 lg:py-14">
        <div className="mx-auto flex h-full lg:h-auto w-full max-w-[1200px] flex-col px-6">
          <div className="flex h-full flex-col justify-between gap-5 sm:gap-7 lg:grid lg:h-auto lg:grid-cols-12 lg:items-stretch lg:gap-16">
            {/* Top on Mobile / Left on Desktop: Editorial Text Stage + Step Indicator Rail */}
            <div className="relative flex shrink-0 items-stretch gap-4 sm:gap-6 lg:col-span-6 lg:h-[460px]">
              {/* Vertical Progress Rail & Clickable Step Dots */}
              <div className="flex flex-col items-center justify-between py-0.5">
                <div className="relative w-[2px] flex-1 overflow-hidden rounded-full bg-[#0e150e]/15">
                  <div
                    ref={progressFillRef}
                    className="h-full w-full origin-top bg-[#00473c]"
                  />
                </div>
                <div className="mt-3 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
                  {EXPERIENCES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleDotClick(idx)}
                      aria-label={`View ${item.title}`}
                      aria-current={activeIndex === idx ? 'step' : undefined}
                      data-event-dot
                      className="h-2 w-2 sm:h-2.5 sm:w-2.5 cursor-pointer rounded-full bg-[#00473c]"
                    />
                  ))}
                </div>
              </div>

              {/* Layered Editorial Text Slides */}
              <div className="relative min-h-[195px] sm:min-h-[225px] lg:h-full flex-1">
                {EXPERIENCES.map((item, idx) => {
                  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    item.whatsappMessage
                  )}`;

                  return (
                    <div
                      key={item.id}
                      data-event-text
                      className={`${idx === 0 ? 'relative' : 'absolute inset-0'
                        } flex h-full flex-col items-start justify-between`}
                    >
                      <div>
                        {/* Display Headline */}
                        <h2 className="font-heading text-[34px] sm:text-5xl md:text-6xl font-extrabold leading-[0.92] lg:leading-[0.88] tracking-normal text-[#0e150e]">
                          {item.title}
                        </h2>

                        {/* Inviting Copy */}
                        <p className="mt-2.5 sm:mt-4 max-w-md text-[15px] sm:text-base md:text-[18px] font-light leading-[1.4] lg:leading-[1.33] tracking-[0.017em] text-[#0e150e]/85">
                          {item.description}
                        </p>
                      </div>

                      {/* Unified WhatsApp CTA Link */}
                      <div className="mt-4 sm:mt-5 lg:mt-0">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-bold tracking-[0.017em] text-[#0e150e] hover:underline hover:underline-offset-4"
                        >
                          <span>Reserve via WhatsApp</span>
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom on Mobile / Right on Desktop: Photograph Stage */}
            <div className="min-h-0 flex-1 lg:col-span-6">
              <div className="relative h-full lg:h-[460px] w-full overflow-hidden rounded-[20px]">
                {EXPERIENCES.map((item, idx) => (
                  <div
                    key={item.id}
                    data-event-image-layer
                    style={{ zIndex: idx + 1 }}
                    className="absolute inset-0 overflow-hidden rounded-[20px] will-change-[clip-path]"
                  >
                    <div
                      data-event-image-inner
                      className="relative h-full w-full will-change-transform"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
