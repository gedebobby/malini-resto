import Image from 'next/image';
import OurStoryHero from '@/src/components/story/OurStoryHero';
import Section2ParallaxImage from '@/src/components/story/Section2ParallaxImage';

export const metadata = {
  title: 'About Us — malini uluwatu | Seafood & Indonesian Restaurant with Sunset Ocean View',
  description:
    'Profile of Malini Uluwatu: an iconic Seafood & Indonesian Restaurant and Sunset Cliff Bar perched 100 meters above the Indian Ocean on the dramatic cliffs of Karang Boma, Bali.',
};

export default function OurStoryPage() {
  return (
    <main className="w-full bg-[#f4f3e7]">
      {/* 1. Hero Intro with Expanding Portrait Scroll Scrub Animation */}
      <OurStoryHero />

      {/* 2. The Sunset & Indian Ocean Horizon (Option 2: Panoramic Horizon on Cream Canvas) */}
      <section className="w-full bg-[#f4f3e7] pt-6 pb-8 md:pt-8 md:pb-12">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Header: Centered Editorial Headline */}
          <div data-gsap="reveal-group" className="mx-auto max-w-3xl text-center">
            <p
              data-gsap="reveal-item"
              className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.1em] text-[#00473c]"
            >
              THE ICONIC ULUWATU HORIZON
            </p>
            <h2
              data-gsap="reveal-item"
              className="mt-3 font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] tracking-normal text-[#0e150e]"
            >
              Front-row seats to Bali’s most dramatic golden hour.
            </h2>
            <p
              data-gsap="reveal-item"
              className="mt-4 text-base sm:text-lg font-light leading-[1.4] text-[#0e150e]/80"
            >
              Located directly on the 100-meter limestone precipice of Karang Boma cliff, Malini Uluwatu delivers an unobstructed 180-degree panoramic vantage point where the sky transforms into vivid hues of amber, copper, and fiery rose above the endless Indian Ocean.
            </p>
          </div>

          {/* Panoramic Clean Photograph dengan efek GSAP Parallax */}
          <Section2ParallaxImage
            src="/assets/img/1.webp"
            alt="Intimate candlelit dining table overlooking the Indian Ocean sunset at Malini Uluwatu"
          />
        </div>
      </section>

      {/* 3. Dining Atmosphere & Hospitality (Option 1: Clean Split, Top-Aligned) */}
      <section className="w-full bg-[#f4f3e7] pt-6 pb-10 md:pt-8 md:pb-14">
        <div data-gsap="reveal-group" className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Photograph */}
            <div className="lg:col-span-6">
              <div
                data-gsap="reveal-item"
                className="relative h-[340px] sm:h-[400px] md:h-[440px] w-full overflow-hidden rounded-[20px] md:rounded-[24px] shadow-xl"
              >
                <Image
                  src="/assets/img/5.webp"
                  alt="Open-air clifftop dining pavilion with lush gardens overlooking the ocean at Malini Uluwatu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: Text Stack (Sejajar dengan bagian atas gambar) */}
            <div className="flex flex-col items-start lg:col-span-6">
              <p
                data-gsap="reveal-item"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.1em] text-[#00473c]"
              >
                CLIFFTOP AMBIANCE &amp; HOSPITALITY
              </p>

              <h2
                data-gsap="reveal-item"
                className="mt-2.5 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[0.94] tracking-normal text-[#0e150e]"
              >
                An unhurried sanctuary above the Uluwatu surf.
              </h2>

              <p
                data-gsap="reveal-item"
                className="mt-4 text-[15px] sm:text-base font-light leading-[1.45] text-[#0e150e]/85"
              >
                Built from hand-hewn limestone, reclaimed teak, and native flora, Malini embraces its cliffside setting with zero beach club noise.
              </p>

              <p
                data-gsap="reveal-item"
                className="mt-3 text-[15px] sm:text-base font-light leading-[1.45] text-[#0e150e]/85"
              >
                The soothing rhythm of crashing ocean waves and authentic Balinese hospitality create an intimate, unhurried dining sanctuary under the Uluwatu sky.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
