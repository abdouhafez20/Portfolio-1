import { useEffect, useRef, useState } from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

const typedWords = {
  en: ['Designer', 'Typesetter', 'Educator', 'Specialist'],
  ar: ['مصمم', 'مفضّل', 'معلّم', 'متخصص'],
};

const sliderImages = [
  '/images/slide-1.jpg',
  '/images/slide-2.jpg',
  '/images/slide-3.jpg',
  '/images/slide-4.jpg',
];

function StackSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-start justify-center w-[300px] xl:w-[340px] mt-6 reveal reveal-delay-2">
      {/* نزلناها تحت + fade */}
      <div className="relative w-full aspect-[3/4] rotate-[5deg]">

        {sliderImages.map((img, i) => {
          const position = (i - index + sliderImages.length) % sliderImages.length;

          return (
            <img
              key={i}
              src={img}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-lift transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{
                zIndex: sliderImages.length - position,
                transform: `
                  translateX(${position * 12}px)
                  translateY(${position * 9}px)
                  scale(${1 - position * 0.06})
                  rotate(${position * 1.2}deg)
                `,
                opacity: position > 3 ? 0 : 1,
              }}
            />
          );
        })}

      </div>
    </div>
  );
}

export default function HeroSection({ lang }: Props) {
  const { t, isAr } = lang;
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useIntersectionReveal();
  const words = typedWords[isAr ? 'ar' : 'en'];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentWord(words[0]);
      return;
    }
    const timeout = setTimeout(() => {
      const word = words[wordIndex];
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }
      if (isDeleting) {
        if (currentWord.length > 0) {
          setCurrentWord(word.substring(0, currentWord.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        if (currentWord.length < word.length) {
          setCurrentWord(word.substring(0, currentWord.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? 1600 : isDeleting ? 55 : 95);
    return () => clearTimeout(timeout);
  }, [currentWord, wordIndex, isDeleting, isPaused, words]);

  const stats = [
    { value: 40, label: t('stat1.label'), color: 'text-forest dark:text-dark-forest' },
    { value: 120, label: t('stat2.label'), color: 'text-forest dark:text-dark-forest' },
    { value: 6, label: t('stat3.label'), color: 'text-medical dark:text-dark-med' },
    { value: 4, label: t('stat4.label'), color: 'text-gold dark:text-dark-gold' },
  ];

  const hashtags = ['#MedicalContent', '#BookLayout', '#PDFDesign', '#QuestionBanks', '#Summaries'];

  return (
    <section ref={sectionRef} className="pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-10">

      <div className="flex justify-between gap-10">

        <div className="max-w-[896px]">
          <div className="flex flex-wrap gap-3 mb-6 reveal">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-forest/30 dark:border-dark-forest/40 bg-forest/8 dark:bg-dark-forest/10 text-[10px] uppercase tracking-[0.28em] font-medium text-forest dark:text-dark-forest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-forest dark:bg-dark-forest animate-ping-slow" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forest dark:bg-dark-forest" />
              </span>
              {t('hero.available')}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-medical/25 dark:border-dark-med/35 bg-medical/10 dark:bg-dark-med/12 text-[10px] uppercase tracking-[0.28em] font-medium text-medical dark:text-dark-med">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {t('hero.specialist')}
            </span>
          </div>

          <h1 className="reveal reveal-delay-1">
            <span className="block font-display font-semibold text-[clamp(2.6rem,8vw,6rem)] leading-[0.96] tracking-[-0.01em] text-ink dark:text-dark-text">
              Dr Abdurrahman
            </span>
            <span className="block font-display-italic font-normal text-[clamp(2.6rem,8vw,6rem)] leading-[0.96] tracking-[-0.01em] text-forest dark:text-dark-forest">
              M. Hafez
            </span>
          </h1>

          <div className="mt-6 reveal reveal-delay-2">
            <span className="font-display text-2xl md:text-3xl font-light text-mist">
              Medical & Editorial{' '}
            </span>
            <span className="font-display text-2xl md:text-3xl font-semibold text-ink dark:text-dark-text">
              {currentWord}
            </span>
            <span className="inline-block w-[2px] h-7 bg-forest dark:bg-dark-forest ml-1 animate-blink align-middle" />
          </div>

          <p className="mt-6 text-sm md:text-[15px] font-light leading-7 text-mist max-w-[576px] reveal reveal-delay-2">
            {t('hero.bio')}
          </p>
          <p className="mt-3 text-sm font-arabic font-normal leading-8 text-mist max-w-[576px] reveal reveal-delay-2" dir="rtl">
            {t('hero.bioAr')}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 reveal reveal-delay-3">
            {hashtags.map((tag, i) => (
              <span
                key={tag}
                className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.28em] font-medium transition-colors ${
                  i === 0
                    ? 'border border-forest/30 dark:border-dark-forest/40 bg-forest/8 dark:bg-dark-forest/10 text-forest dark:text-dark-forest'
                    : 'border border-ink/12 dark:border-white/10 text-mist dark:text-dark-muted'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
            <a href="#work" className="btn-shimmer inline-flex items-center gap-2 text-sm md:text-base">
              <Eye size={18} />
              {t('hero.cta1')}
            </a>
            <a href="#contact" className="btn-outline inline-flex items-center gap-2 text-sm md:text-base">
              <MessageCircle size={18} />
              {t('hero.cta2')} / {t('hero.cta2Ar')}
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i} />
            ))}
          </div>
        </div>

        <StackSlider />

      </div>
    </section>
  );
}

function StatCard({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const duration = 1600;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 2);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={`card-surface reveal reveal-delay-${delay + 1} p-5 md:p-6`}>
      <div className={`font-display text-5xl md:text-6xl font-semibold leading-tight ${color}`}>
        {display.toLocaleString()}
        <span className="text-3xl ml-1">+</span>
      </div>
      <div className="mt-3 text-[9px] uppercase tracking-[0.28em] font-medium text-mist dark:text-dark-muted">
        {label}
      </div>
    </div>
  );
}