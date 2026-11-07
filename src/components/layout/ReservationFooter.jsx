import Link from 'next/link';
import CtaSection from '@/src/components/home/CtaSection';

export default function ReservationFooter() {
  return (
    <footer id="reserve" className="w-full">
      {/* 1. CTA Section: Plan Your Golden Hour */}
      <CtaSection />

      {/* 2. Main Footer (Surface: Deep Forest #00473c, Text: Cream Canvas #f4f3e7) */}
      <div className="w-full bg-[#00473c] py-12 md:py-16 text-[#f4f3e7]">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 px-6 md:flex-row md:items-start">
          {/* Brand & Tagline */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-[28px] font-bold lowercase leading-none tracking-tight text-[#f4f3e7]"
            >
              malini uluwatu
            </Link>
            <p className="mt-3 text-sm font-light leading-[1.35] tracking-[0.017em] text-[#f4f3e7]/80">
              Seafood &amp; Indonesian Restaurant and Sunset Cliff Bar overlooking the Indian Ocean.
            </p>
          </div>

          {/* Operating Hours & Address */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.05em] text-[#e6ff55]">
                Opening Hours
              </h3>
              <p className="mt-2 text-sm font-light tracking-[0.017em] text-[#f4f3e7]">
                Daily: 10:00 &ndash; 22:00 WITA
              </p>
              <p className="mt-1 text-xs font-light text-[#f4f3e7]/75">
                All-Day Seafood Dining &amp; Sunset Cliff Bar
              </p>
            </div>

            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.05em] text-[#e6ff55]">
                Location
              </h3>
              <p className="mt-2 text-sm font-light leading-[1.35] tracking-[0.017em] text-[#f4f3e7]">
                Jalan Raya Malini No. 151, Karang Boma Cliff, Pecatu, Kuta Selatan, Bali 80361
              </p>
            </div>

            {/* External Links */}
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.05em] text-[#e6ff55]">
                Connect
              </h3>
              <div className="mt-2 flex flex-col space-y-2">
                <a
                  href="https://www.instagram.com/maliniagro.uluwatu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.017em] text-[#f4f3e7] hover:underline hover:underline-offset-4"
                >
                  <span>Instagram</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="https://maps.google.com/?q=Malini+Agro+Park+Uluwatu+Karang+Boma+Pecatu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.017em] text-[#f4f3e7] hover:underline hover:underline-offset-4"
                >
                  <span>Google Maps</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Safety Rules Link */}
        <div className="mx-auto mt-10 max-w-[1200px] px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#f4f3e7]/15 pt-6 text-xs tracking-[0.017em] text-[#f4f3e7]/65">
            <div>&copy; 2026 malini uluwatu. All rights reserved.</div>
            <Link
              href="/regulations"
              className="text-[#f4f3e7]/80 hover:text-[#e6ff55] hover:underline hover:underline-offset-4 transition-colors"
            >
              Clifftop Safety &amp; Regulations &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
