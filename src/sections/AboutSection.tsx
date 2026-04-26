import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

const skills = [
  { name: 'Illustrator', width: 100 },
  { name: 'Canva', width: 100 },
  { name: 'InDesign', width: 85 },
  { name: 'PowerPoint / Keynote', width: 85 },
  { name: 'AI Tools', width: 70 },
];

const timeline = [
  { org: 'Cairo University \u2014 Faculty of Medicine', desc: 'Medical content designer \u2014 books, summaries, question banks, and presentations.', date: '2023 \u2013 2025' },
  { org: 'King Saud University \u2014 Behavior Science', desc: 'Full curriculum materials: explanations, question banks, and summaries.', date: '2024 \u2013 2025' },
  { org: 'Masaar Platform', desc: 'Content designer for medical & academic courses on the platform.', date: 'Current', highlight: true },
  { org: 'Smart Vision Center', desc: 'Full-service educational content design for courses and publications.', date: '2023 \u2013 2024' },
  { org: 'Assiut University', desc: 'Editorial designer for academic content and educational publishing.', date: '2022 \u2013 2023' },
  { org: 'Freelance \u2014 Private Medical Courses', desc: 'Books, presentations, mind maps & complete course content systems.', date: 'Current', highlight: true },
];

const expertiseTags = [
  { label: 'Medical Content', bg: 'bg-medical/12 dark:bg-medical/10', text: 'text-medical dark:text-dark-med' },
  { label: 'Book Layout', bg: 'bg-forest/12 dark:bg-forest/10', text: 'text-forest dark:text-dark-forest' },
  { label: 'Question Banks', bg: 'bg-forest/12 dark:bg-forest/10', text: 'text-forest dark:text-dark-forest' },
  { label: 'Arabic Typography', bg: 'bg-gold/12 dark:bg-gold/10', text: 'text-gold dark:text-dark-gold' },
];

export default function AboutSection({ lang }: Props) {
  const { t } = lang;
  const sectionRef = useIntersectionReveal();
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = skillsRef.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLDivElement>('.skill-fill');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars.forEach((bar) => {
            const target = bar.dataset.width;
            if (target) bar.style.width = `${target}%`;
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 px-5 md:px-10 border-t border-card-border dark:border-dark-border">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
          {/* Left Column - Photo & Skills */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* Profile Photo */}
            <div className="relative max-w-sm mx-auto lg:mx-0 group reveal">
              {/* Decorative Frames */}
              <div className="absolute inset-0 rounded-3xl border-2 border-forest/15 dark:border-dark-forest/25 rotate-2 group-hover:rotate-0 transition-transform duration-700 will-change-transform" />
              <div className="absolute inset-0 rounded-3xl border-2 border-gold/15 dark:border-dark-gold/20 -rotate-1 group-hover:rotate-0 transition-transform duration-700 will-change-transform" />
              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lift dark:shadow-dark-lift">
                <img
                  src="/images/profile-photo.jpg"
                  alt="Dr. Abdurrahman M. Hafez, Medical Content Designer"
                  className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,28,26,0.5)] dark:from-[rgba(0,0,0,0.5)] to-transparent" />
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-medical/12 dark:bg-medical/15 backdrop-blur-md rounded-2xl p-4 border border-medical/30 dark:border-medical/40">
                  <div className="text-[9px] uppercase tracking-[0.22em] text-medical dark:text-dark-med font-medium">
                    Medical Content Specialist
                  </div>
                  <div className="font-display text-lg font-semibold text-white mt-1">
                    Cairo, Egypt
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Panel */}
            <div ref={skillsRef} className="card-surface mt-10 reveal reveal-delay-2">
              <span className="eyebrow">{t('about.tools')}</span>
              <div className="mt-5 space-y-3.5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-medium text-ink dark:text-dark-text mb-1.5">
                      <span>{skill.name}</span>
                      <span className="text-mist dark:text-dark-muted"></span>
                    </div>
                    <div className="h-2 rounded-full bg-black/6 dark:bg-white/8 overflow-hidden">
                      <div
                        className="skill-fill h-full rounded-full bg-gradient-to-r from-forest to-dark-forest transition-[width] duration-1000 ease-out will-change-transform"
                        data-width={skill.width}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Timeline */}
          <div className="reveal">
            <span className="eyebrow">{t('about.title')}</span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-ink dark:text-dark-text">
              {t('about.heading')}{' '}
              <em className="text-medical dark:text-dark-med">{t('about.headingHighlight')}</em>
            </h2>

            <div className="mt-6 space-y-4 max-w-lg">
              <p className="text-sm md:text-[15px] font-light leading-7 text-mist">
                {t('about.bio1')}
              </p>
              <p className="text-sm md:text-[15px] font-light leading-7 text-mist">
                {t('about.bio2')}
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {expertiseTags.map((tag) => (
                <span
                  key={tag.label}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium ${tag.bg} ${tag.text}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="mt-12 reveal reveal-delay-2">
              <span className="eyebrow">{t('about.experience')}</span>
              <div className="mt-5 relative border-l-2 border-forest/30 dark:border-dark-forest/30 pl-6 space-y-6">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className="relative hover:bg-forest/6 dark:hover:bg-forest/8 rounded-lg -ml-3 pl-3 py-2 transition-all duration-300 cursor-default"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute -left-[19px] top-3 w-3 h-3 rounded-full border-2 border-forest dark:border-dark-forest transition-all ${
                        item.highlight 
                          ? 'bg-forest dark:bg-dark-forest shadow-[0_0_10px_rgba(42,88,64,0.4)] dark:shadow-[0_0_10px_rgba(77,158,114,0.3)]' 
                          : 'bg-cream dark:bg-dark-bg'
                      }`}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-ink dark:text-dark-text">
                          {item.org}
                        </div>
                        <p className="text-xs font-light text-mist dark:text-dark-muted mt-1 max-w-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <span className={`flex-shrink-0 text-[9px] font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap ${
                        item.highlight 
                          ? 'bg-medical/15 dark:bg-medical/12 text-medical dark:text-dark-med' 
                          : 'bg-forest/10 dark:bg-forest/12 text-forest dark:text-dark-forest'
                      }`}>
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
