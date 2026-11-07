'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section2ParallaxImage({
  src = '/assets/img/1.webp',
  alt = 'Intimate candlelit dining table overlooking the Indian Ocean sunset at Malini Uluwatu',
  className = '',
}) {
  const wrapRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapEl = wrapRef.current;
    const imageEl = imageRef.current;
    if (!wrapEl || !imageEl) return;

    const ctx = gsap.context(() => {
      // 1. Entrance reveal animation
      gsap.fromTo(
        wrapEl,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Continuous Parallax Scrub Effect
      // The inner image gently glides through the container as you scroll
      gsap.fromTo(
        imageEl,
        {
          yPercent: -10,
          scale: 1.12,
        },
        {
          yPercent: 10,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, wrapEl);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative mt-6 md:mt-8 w-full overflow-hidden rounded-[20px] md:rounded-[24px] shadow-xl ${className}`}
    >
      <div className="relative h-[340px] sm:h-[440px] md:h-[500px] lg:h-[560px] w-full overflow-hidden rounded-[20px] md:rounded-[24px]">
        <div
          ref={imageRef}
          className="absolute -top-[10%] -bottom-[10%] left-0 right-0 h-[120%] w-full will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
