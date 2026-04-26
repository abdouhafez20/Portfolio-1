import { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  defaultValue: number;
  caseNum: string;
  title: string;
  hintAr: string;
  ariaLabel: string;
}

function ComparisonSlider({
  beforeSrc,
  afterSrc,
  defaultValue,
  caseNum,
  title,
  hintAr,
  ariaLabel,
}: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const raf = useRef<number | null>(null);

  const update = (clientX: number) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      setValue(pct);
    });
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      update(e.clientX);
    };

    const up = () => {
      dragging.current = false;
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div className="space-y-3">
      {/* SLIDER */}
      <div
        ref={ref}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-ew-resize group shadow-sm will-change-transform"
        onPointerDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
      >
        {/* Before */}
        <img
          src={beforeSrc}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          alt="Before"
        />

        {/* After */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <img
            src={afterSrc}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
            alt="After"
          />
        </div>

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80"
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        />

        {/* handle (smaller) */}
        <div
          className="absolute top-1/2 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110"
          style={{ left: `${value}%` }}
        >
          <ArrowLeftRight size={12} />
        </div>

        {/* hint */}
        <div className="absolute inset-0 flex items-center justify-center text-[9px] text-white/60 opacity-0 group-hover:opacity-100 transition">
          Drag to compare
        </div>

        {/* labels */}
        <span className="absolute top-2 left-2 text-[8px] bg-black/60 text-white px-2 py-0.5 rounded-full">
          Before
        </span>

        <span className="absolute top-2 right-2 text-[8px] bg-forest text-white px-2 py-0.5 rounded-full">
          After
        </span>
      </div>

      {/* meta */}
      <div className="mt-3 flex justify-between items-start">
        <div>
          <div className="text-[8px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium">
            {caseNum}
          </div>
          <div className="text-sm font-semibold text-ink dark:text-dark-text mt-1">
            {title}
          </div>
        </div>

        <p
          className="text-[11px] text-mist dark:text-dark-muted font-arabic text-right max-w-[140px]"
          dir="rtl"
        >
          {hintAr}
        </p>
      </div>
    </div>
  );
}

export default function BeforeAfterSection({ lang }: Props) {
  const { t } = lang;
  const sectionRef = useIntersectionReveal();

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="py-10 md:py-14 px-4 md:px-8 border-t border-card-border dark:border-dark-border"
    >
      <div className="max-w-3xl mx-auto">

        {/* header */}
        <div className="mb-8 reveal">
          <span className="eyebrow">{t('ba.title')}</span>

          <h2 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            {t('ba.title')}{' '}
            <em className="text-forest dark:text-dark-forest">
              {t('ba.titleHighlight')}
            </em>
          </h2>

          <p className="text-sm text-mist dark:text-dark-muted mt-3 max-w-md">
            {t('ba.subtitle')}
          </p>
        </div>

        {/* sliders */}
        <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto reveal">
          <ComparisonSlider
            beforeSrc="/images/before-1.jpg"
            afterSrc="/images/after-1.jpg"
            defaultValue={54}
            caseNum="Case 01"
            title={t('ba.case1')}
            hintAr={t('ba.case1Hint')}
            ariaLabel="Compare case 1"
          />

          <ComparisonSlider
            beforeSrc="/images/before-2.jpg"
            afterSrc="/images/after-2.jpg"
            defaultValue={48}
            caseNum="Case 02"
            title={t('ba.case2')}
            hintAr={t('ba.case2Hint')}
            ariaLabel="Compare case 2"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 reveal">
          <div className="border border-forest/20 dark:border-dark-forest/20 bg-forest/8 dark:bg-dark-forest/8 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="font-semibold text-ink dark:text-dark-text text-base">
                {t('ba.ctaTitle')}
              </p>
              <p className="text-sm text-mist dark:text-dark-muted font-arabic mt-1" dir="rtl">
                {t('ba.ctaBtnAr')}
              </p>
            </div>

            <a
              href="https://wa.me/201123281688"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wa-green hover:bg-wa-green/90 text-white text-[10px] uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-wa-green/50"
            >
              {t('ba.ctaBtn')}
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}