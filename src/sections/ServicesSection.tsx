import { BookOpen, Presentation, GitBranch, ClipboardList, Calendar } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

const services = [
  {
    icon: BookOpen,
    index: '01',
    titleKey: 'service1.title',
    titleArKey: 'service1.titleAr',
    descKey: 'service1.desc',
  },
  {
    icon: Presentation,
    index: '02',
    titleKey: 'service2.title',
    titleArKey: 'service2.titleAr',
    descKey: 'service2.desc',
  },
  {
    icon: GitBranch,
    index: '03',
    titleKey: 'service3.title',
    titleArKey: 'service3.titleAr',
    descKey: 'service3.desc',
  },
  {
    icon: ClipboardList,
    index: '04',
    titleKey: 'service4.title',
    titleArKey: 'service4.titleAr',
    descKey: 'service4.desc',
  },
];

export default function ServicesSection({ lang }: Props) {
  const { t } = lang;
  const sectionRef = useIntersectionReveal();

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 px-5 md:px-10 border-t border-card-border dark:border-dark-border">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left Column - Label */}
          <div className="lg:col-span-1 reveal">
            <span className="eyebrow">{t('services.title')}</span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-ink dark:text-dark-text">
              {t('services.heading')}{' '}
              <em className="text-forest dark:text-dark-forest">{t('services.headingHighlight')}</em>
            </h2>
            <p className="mt-4 font-arabic text-lg text-mist" dir="rtl">
              {t('services.tagline')}
            </p>
            <a
              href="#contact"
              className="btn-shimmer inline-flex items-center gap-2 mt-8"
            >
              <Calendar size={16} />
              {t('services.cta')} / {t('services.ctaAr')}
            </a>
          </div>

          {/* Right Column - Service Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.index}
                  className={`card-surface group hover:-translate-y-1 dark:hover:border-dark-forest/40 transition-all duration-300 will-change-transform reveal reveal-delay-${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-forest/12 dark:bg-dark-forest/12 flex items-center justify-center text-forest dark:text-dark-forest group-hover:bg-forest/20 dark:group-hover:bg-dark-forest/20 transition-colors mb-3">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.3em] text-mist dark:text-dark-muted mb-2 font-medium">
                    {service.index}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-dark-text">
                    {t(service.titleKey)}
                  </h3>
                  <p className="font-arabic text-[11px] text-forest dark:text-dark-forest mt-1" dir="rtl">
                    {t(service.titleArKey)}
                  </p>
                  <p className="text-xs font-light leading-6 text-mist dark:text-dark-muted mt-3">
                    {t(service.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
