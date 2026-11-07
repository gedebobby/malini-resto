const WHATSAPP_NUMBER = '6281234567890';
const WHATSAPP_MESSAGE =
  'Hello Malini Uluwatu! I would like to reserve a front-row sunset table for Seafood & Indonesian Dining / Sunset Cliff Bar.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function CtaSection() {
  return (
    <section id="sunset-sessions" className="w-full bg-[#f4f3e7] py-16 md:py-20">
      <div
        data-gsap="reveal-group"
        className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center"
      >
        <div className="max-w-xl">
          <p
            data-gsap="reveal-item"
            className="text-[14px] font-medium uppercase tracking-[0.05em] text-[#00473c]"
          >
            FRONT-ROW SUNSET RESERVATIONS
          </p>
          <h2
            data-gsap="reveal-item"
            className="mt-3 font-heading text-4xl md:text-5xl font-extrabold leading-[0.85] tracking-normal text-[#0e150e]"
          >
            Secure your front-row sunset table.
          </h2>
          <p
            data-gsap="reveal-item"
            className="mt-4 text-base font-light leading-[1.3] tracking-[0.017em] text-[#0e150e]/85"
          >
            Prime cliff-edge tables are limited each evening for golden hour (17:00 &ndash; 18:30 WITA). Reserve ahead for wood-fired ocean catch and handcrafted sunset cocktails.
          </p>
        </div>

        {/* Primary Pill CTA Button (Deep Forest #00473c) */}
        <div data-gsap="reveal-item" className="shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#00473c] px-8 py-4 text-base font-bold tracking-[0.017em] text-[#f4f3e7] transition-all duration-200 hover:bg-[#00473c]/90 hover:scale-[1.02] active:scale-[0.99] shadow-sm"
          >
            Book Table via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
