import Image from 'next/image';
import Link from 'next/link';

export default function PhilosophySection() {
  return (
    <section
      id="our-story"
      className="relative z-10 w-full bg-[#d8e5d6] py-12 md:py-16"
    >
      <div data-gsap="reveal-group" className="mx-auto max-w-[1200px] px-6">
        {/* Eyebrow Label */}
        <p
          data-gsap="reveal-item"
          className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]"
        >
          ULUWATU CLIFFTOP &amp; INDIAN OCEAN HORIZON
        </p>

        {/* 2-Column Split */}
        <div className="mt-4 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Stack starting with h2 */}
          <div className="flex flex-col items-start">
            {/* Display Headline */}
            <h2
              data-gsap="reveal-item"
              className="font-heading text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-normal text-[#0e150e]"
            >
              Front-row seats to the Indian Ocean sunset.
            </h2>

            {/* Concise Main Description */}
            <p
              data-gsap="reveal-item"
              className="mt-5 max-w-md text-base font-light leading-[1.35] tracking-[0.017em] text-[#0e150e]/85"
            >
              Perched high on the dramatic limestone cliffs of Uluwatu, watch the golden sun melt into the endless Indian Ocean while savoring wood-fired seafood and sunset cocktails.
            </p>

            {/* Ghost Text Link */}
            <div data-gsap="reveal-item" className="mt-8">
              <Link
                href="/our-story"
                className="group inline-flex items-center gap-1.5 text-base font-bold tracking-[0.017em] text-[#0e150e] hover:underline hover:underline-offset-4"
              >
                <span>About our restaurant</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Standalone Tall Photograph */}
          <div
            data-gsap="philosophy-image-wrap"
            className="relative h-[480px] md:h-[560px] w-full overflow-hidden rounded-[20px] shadow-xl"
          >
            <Image
              data-gsap="philosophy-image"
              src="/assets/img/5.webp"
              alt="Scenic Uluwatu sunset over the Indian Ocean horizon at Malini Uluwatu"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-center will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
