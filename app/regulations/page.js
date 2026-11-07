export const metadata = {
  title: 'Clifftop Safety & Regulations — malini uluwatu',
  description:
    'Visitor safety guidelines and clifftop regulations at Malini Uluwatu. Please observe all rules to preserve your safety 100 meters above the Indian Ocean.',
};

const RULES = [
  'DO NOT play by the edge of the cliff.',
  'DO NOT sit nor stand on the tables by the cliff.',
  'Parents must accompany and take fully responsibility for their children.',
  'Beware of the Monkeys. Do not feed nor play with them.',
  'Malini is not responsible or liable for any accident which may occur.',
];

export default function RegulationsPage() {
  return (
    <main className="w-full bg-[#f4f3e7]">
      {/* SECTION REGULATION (Simple, Card-Free & Ringkas) */}
      <section className="w-full pt-10 pb-16 md:pt-14 md:pb-24">
        <div data-gsap="reveal-group" className="mx-auto max-w-[1200px] px-6">
          {/* Eyebrow Label */}
          <p
            data-gsap="reveal-item"
            className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]"
          >
            SAFETY REGULATIONS
          </p>

          {/* Display Headline */}
          <h1
            data-gsap="reveal-item"
            className="mt-3 font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.9] tracking-normal text-[#0e150e]"
          >
            Preserve your safety above the cliff.
          </h1>

          {/* Simple Card-Free Editorial Rules List */}
          <div className="mt-10 sm:mt-14 divide-y divide-[#0e150e]/10 border-t border-b border-[#0e150e]/10">
            {RULES.map((rule, idx) => (
              <div
                key={idx}
                data-gsap="reveal-item"
                className="flex items-baseline gap-4 sm:gap-8 py-5 sm:py-6"
              >
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#00473c] tabular-nums shrink-0">
                  {`0${idx + 1}`}
                </span>
                <p className="text-base sm:text-xl font-bold leading-[1.3] tracking-[0.017em] text-[#0e150e]">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Concluding Statement (Simple & Direct) */}
          <div data-gsap="reveal-item" className="mt-10 sm:mt-12">
            <p className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#00473c] leading-[1.25]">
              Kindly follow Malini rules with full responsibility to preserve{' '}
              <span className="underline decoration-[#00473c]/30 underline-offset-4">
                YOUR SAFETY
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
