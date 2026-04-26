const items = [
  'Medical Content Design',
  'Book Layout',
  'PDF Typesetting',
  'Question Banks',
  'PowerPoint Presentations',
  'Mind Maps',
  'Summaries',
  'Arabic Typography',
  'Before & After',
  'University Publishing',
  'Cairo University',
  'Assiut University',
];

const content = items.join(' \u00B7 ') + ' \u00B7 ';

export default function MarqueeSection() {
  return (
    <section className="py-4 md:py-5 bg-white/20 dark:bg-white/[0.02] border-y border-card-border dark:border-dark-border overflow-hidden" aria-hidden="true">
      <div className="animate-marquee whitespace-nowrap flex will-change-transform">
        <span className="text-[9px] uppercase tracking-[0.32em] font-medium text-mist dark:text-dark-muted px-4 md:px-6 flex-shrink-0">
          {content}
        </span>
        <span className="text-[9px] uppercase tracking-[0.32em] font-medium text-mist dark:text-dark-muted px-4 md:px-6 flex-shrink-0">
          {content}
        </span>
      </div>
    </section>
  );
}
