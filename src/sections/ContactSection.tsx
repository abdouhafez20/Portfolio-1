import { useState, useRef, useCallback } from 'react';
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import Toast from '@/components/Toast';

interface Props {
  lang: ReturnType<typeof useLanguage>;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export default function ContactSection({ lang }: Props) {
  const { t } = lang;
  const sectionRef = useIntersectionReveal();
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    if (!nameRef.current?.value.trim()) newErrors.name = t('contact.nameError');
    const email = emailRef.current?.value.trim() || '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t('contact.emailError');
    if (!serviceRef.current?.value) newErrors.service = t('contact.serviceError');
    if (!messageRef.current?.value.trim()) newErrors.message = t('contact.messageError');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [t]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstInvalid = Object.keys(errors)[0] as keyof FormErrors;
      const refMap = { name: nameRef, email: emailRef, service: serviceRef, message: messageRef };
      refMap[firstInvalid as keyof typeof refMap]?.current?.focus();
      return;
    }

    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const service = serviceRef.current?.value || '';
    const message = messageRef.current?.value || '';

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`
    );
    window.location.href = `mailto:hello@hafez.design?subject=${subject}&body=${body}`;

    // Clear form
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (serviceRef.current) serviceRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';
    setErrors({});

    setToastVisible(true);
  }, [validate, errors]);

  return (
    <>
      <section id="contact" ref={sectionRef} className="py-16 md:py-24 px-5 md:px-10 border-t border-card-border dark:border-dark-border">
        <div className="max-w-screen-xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 reveal">
            <span className="eyebrow">{t('contact.title')}</span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-ink dark:text-dark-text">
              {t('contact.heading')}{' '}
              <em className="text-forest dark:text-dark-forest">{t('contact.headingHighlight')}</em>
            </h2>
            <p className="mt-3 font-arabic text-base text-mist" dir="rtl">
              {t('contact.tagline')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left - Contact Methods */}
            <div className="space-y-5 reveal">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/201123281688"
                target="_blank"
                rel="noopener noreferrer"
                className="block card-surface border-2 border-wa-green/50 bg-wa-green/10 dark:bg-wa-green/8 hover:border-wa-green/80 dark:hover:border-wa-green/60 hover:bg-wa-green/15 dark:hover:bg-wa-green/12 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-wa-green/20 dark:bg-wa-green/15 flex items-center justify-center text-wa-green flex-shrink-0 group-hover:bg-wa-green/30 transition-colors">
                    <MessageCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-wa-green/80 font-medium">
                      {t('contact.waLabel')}
                    </div>
                    <div className="text-lg font-semibold text-ink dark:text-dark-text group-hover:text-wa-green transition-colors mt-1">
                      {t('contact.waTitle')}
                    </div>
                    <p className="font-arabic text-xs text-mist dark:text-dark-muted mt-1" dir="rtl">
                      {t('contact.waHint')}
                    </p>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:hello@hafez.design"
                className="block card-surface group hover:border-forest/40 dark:hover:border-dark-forest/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest/12 dark:bg-dark-forest/12 flex items-center justify-center text-forest dark:text-dark-forest flex-shrink-0 group-hover:bg-forest/20 dark:group-hover:bg-dark-forest/20 transition-colors">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium">
                      {t('contact.emailLabel')}
                    </div>
                    <div className="text-lg font-light text-ink dark:text-dark-text group-hover:text-forest dark:group-hover:text-dark-forest transition-colors mt-1">
                      {t('contact.emailTitle')}
                    </div>
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="card-surface">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/12 dark:bg-gold/10 flex items-center justify-center text-gold dark:text-dark-gold flex-shrink-0">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium">
                      {t('contact.locationLabel')}
                    </div>
                    <div className="text-lg font-light text-ink dark:text-dark-text mt-1">
                      {t('contact.locationTitle')}
                    </div>
                    <p className="font-arabic text-sm text-mist dark:text-dark-muted mt-1" dir="rtl">
                      {t('contact.locationAr')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {['Behance', 'LinkedIn', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex-1 py-3 rounded-2xl border border-ink/[0.08] dark:border-white/[0.08] text-center text-[10px] uppercase tracking-[0.25em] font-medium text-ink dark:text-dark-text hover:border-forest dark:hover:border-dark-forest hover:text-forest dark:hover:text-dark-forest transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="card-surface bg-white/60 dark:bg-white/[0.04] reveal reveal-delay-1">
              <h3 className="font-display text-2xl font-semibold text-ink dark:text-dark-text">
                {t('contact.formTitle')}
              </h3>
              <p className="font-arabic text-sm text-mist dark:text-dark-muted mt-1 mb-6" dir="rtl">
                {t('contact.formHint')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium block mb-2">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder={t('contact.namePlaceholder')}
                    className={`w-full bg-white dark:bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-ink dark:text-dark-text placeholder:text-mist/40 dark:placeholder:text-dark-muted/40 focus:outline-none transition-all will-change-transform ${
                      errors.name 
                        ? 'border-amber-500 dark:border-amber-600 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]'
                        : 'border-ink/12 dark:border-white/8 hover:border-ink/20 dark:hover:border-white/12 focus:border-forest dark:focus:border-dark-forest focus:shadow-[0_0_0_3px_rgba(42,88,64,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,158,114,0.1)]'
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5" id="name-error">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium block mb-2">
                    {t('contact.emailLabel2')}
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    className={`w-full bg-white dark:bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-ink dark:text-dark-text placeholder:text-mist/40 dark:placeholder:text-dark-muted/40 focus:outline-none transition-all will-change-transform ${
                      errors.email
                        ? 'border-amber-500 dark:border-amber-600 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]'
                        : 'border-ink/12 dark:border-white/8 hover:border-ink/20 dark:hover:border-white/12 focus:border-forest dark:focus:border-dark-forest focus:shadow-[0_0_0_3px_rgba(42,88,64,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,158,114,0.1)]'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5" id="email-error">{errors.email}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium block mb-2">
                    {t('contact.serviceLabel')}
                  </label>
                  <select
                    ref={serviceRef}
                    className={`w-full bg-white dark:bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-ink dark:text-dark-text focus:outline-none transition-all will-change-transform appearance-none cursor-pointer ${
                      errors.service
                        ? 'border-amber-500 dark:border-amber-600 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]'
                        : 'border-ink/12 dark:border-white/8 hover:border-ink/20 dark:hover:border-white/12 focus:border-forest dark:focus:border-dark-forest focus:shadow-[0_0_0_3px_rgba(42,88,64,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,158,114,0.1)]'
                    }`}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                    defaultValue=""
                  >
                    <option value="" disabled className="text-mist">{t('contact.servicePlaceholder')}</option>
                    <option value="medical-book">Medical Book / Textbook</option>
                    <option value="books-pdf">Books & PDF Typesetting</option>
                    <option value="presentation">PowerPoint Presentation</option>
                    <option value="mindmaps">Mind Maps</option>
                    <option value="summaries">Summaries & Study Sheets</option>
                    <option value="question-bank">Question Bank Writing</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5" id="service-error">{errors.service}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted font-medium block mb-2">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    className={`w-full bg-white dark:bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-ink dark:text-dark-text placeholder:text-mist/40 dark:placeholder:text-dark-muted/40 focus:outline-none transition-all will-change-transform resize-none ${
                      errors.message
                        ? 'border-amber-500 dark:border-amber-600 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]'
                        : 'border-ink/12 dark:border-white/8 hover:border-ink/20 dark:hover:border-white/12 focus:border-forest dark:focus:border-dark-forest focus:shadow-[0_0_0_3px_rgba(42,88,64,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,158,114,0.1)]'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5" id="message-error">{errors.message}</p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button type="submit" className="btn-shimmer inline-flex items-center justify-center gap-2 flex-1 sm:flex-none">
                    <Send size={14} />
                    {t('contact.submitBtn')}
                  </button>
                  <a
                    href="https://wa.me/201123281688"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-wa-green hover:bg-wa-green/90 text-white text-[11px] uppercase tracking-[0.28em] font-semibold px-8 py-4 rounded-full transition-all duration-200 will-change-transform focus:outline-none focus:ring-2 focus:ring-wa-green/50"
                  >
                    <MessageCircle size={14} />
                    {t('contact.waBtn')}
                  </a>
                </div>

                {/* Direct email note */}
                <p className="text-[10px] text-mist/60 dark:text-dark-muted/50 pt-1">
                  {t('contact.directEmail')}
                </p>
              </form>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-20 pt-8 border-t border-card-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="font-display text-base text-forest/50 dark:text-dark-forest/50 hidden sm:inline">
                Hafez
              </span>
              <span className="text-mist dark:text-dark-muted text-[10px]">&middot;</span>
              <span className="font-display text-base font-semibold text-ink dark:text-dark-text">
                Dr Abdurrahman M. <em className="text-forest dark:text-dark-forest">Hafez</em>
              </span>
              <span className="text-mist dark:text-dark-muted text-[10px]">&middot;</span>
              <span className="text-[9px] uppercase tracking-wider text-mist/60 dark:text-dark-muted/50">
                &copy; {new Date().getFullYear()} · Cairo
              </span>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[10px] uppercase tracking-wider text-mist dark:text-dark-muted hover:text-forest dark:hover:text-dark-forest transition-colors duration-200 font-medium"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </section>

      <Toast
        message={t('toast.message')}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </>
  );
}
