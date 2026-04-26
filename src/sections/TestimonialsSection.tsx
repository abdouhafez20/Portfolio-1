import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

const slides = [
  {
    type: 'WhatsApp',
    bubbles: [
      { text: 'الملف اتسلم وبدأنا المراجعة', incoming: true },
      { text: 'Done — PDF ready for print.', incoming: false },
      { text: 'ممتاز، هنبعته للمطبعة بكرة.', incoming: true },
    ],
  },
  {
    type: 'Review',
    bubbles: [
      { text: 'The layout looks really clean now.', incoming: true },
      { text: 'تسلم، شكرًا على ثقتك.', incoming: false },
      { text: 'Can we do the next chapter same style?', incoming: true },
    ],
  },
  {
    type: 'Feedback',
    bubbles: [
      { text: 'الطلاب بيقولوا المذاكرة أسهل.', incoming: true },
      { text: "That's the goal.", incoming: false },
      { text: 'جاهز للباتش الجاي متى ما حضر.', incoming: true },
    ],
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({
  text,
  name,
  role,
  initial,
  color,
  arabic,
}: any) {
  return (
    <div className="card-surface p-5">
      <Stars />
      <p
        className={`text-sm leading-relaxed text-ink dark:text-dark-text ${
          arabic ? 'font-arabic' : 'font-body'
        }`}
        dir={arabic ? 'rtl' : 'ltr'}
      >
        {text}
      </p>

      <div className="mt-4 pt-4 border-t border-ink/10 dark:border-white/10 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color}`}>
          {initial}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-ink dark:text-dark-text truncate">{name}</div>
          <div className="text-[11px] text-mist dark:text-dark-muted truncate">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ lang }: Props) {
  const { t } = lang;
  const sectionRef = useIntersectionReveal();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 3000);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 px-5 md:px-10 border-t border-card-border dark:border-dark-border"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="mb-10 reveal">
          <span className="eyebrow">{t('testimonials.title')}</span>
          <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold">
            {t('testimonials.title')}{' '}
            <em className="text-forest dark:text-dark-forest">
              {t('testimonials.titleHighlight')}
            </em>
          </h2>
          <p className="text-sm text-mist dark:text-dark-muted mt-3 max-w-lg">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5 reveal">

          <TestimonialCard
            text="جربت أكثر من مصمم... الطلاب بيرجعوا يقرأوا نفس الملف أكتر من مرة."
            name={t('testimonial1.name')}
            role={t('testimonial1.role')}
            initial="م"
            color="bg-forest/12 dark:bg-dark-forest/12 text-forest dark:text-dark-forest"
            arabic
          />

          <TestimonialCard
            text="After the redesign, review time dropped noticeably — everything became easier to navigate."
            name={t('testimonial2.name')}
            role={t('testimonial2.role')}
            initial="S"
            color="bg-medical/12 dark:bg-medical/10 text-medical dark:text-dark-med"
          />

          {/* Carousel */}
          <div
            className="card-surface p-5 cursor-default"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Header */}
            <div className="flex justify-between text-[10px] text-mist dark:text-dark-muted mb-3 font-medium uppercase tracking-wide">
              <span>{slides[active].type}</span>
              <span className="font-semibold">{active + 1}/{slides.length}</span>
            </div>

            {/* Bubbles */}
            <div className="min-h-[150px] space-y-2">
              {slides[active].bubbles.map((b, i) => (
                <div
                  key={i}
                  className={`flex mb-2 transition-all ${b.incoming ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`px-3.5 py-2 rounded-lg text-sm max-w-[80%] leading-relaxed ${
                      b.incoming
                        ? 'bg-ink/5 dark:bg-white/8 text-ink dark:text-dark-text'
                        : 'bg-forest text-white'
                    }`}
                  >
                    {b.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active 
                      ? 'w-3 h-2 bg-forest dark:bg-dark-forest' 
                      : 'w-2 h-2 bg-forest/30 dark:bg-dark-forest/30 hover:bg-forest/50 dark:hover:bg-dark-forest/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}