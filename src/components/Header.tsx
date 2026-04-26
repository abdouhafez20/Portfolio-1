import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useDarkMode } from '@/hooks/useDarkMode';

interface HeaderProps {
  lang: ReturnType<typeof useLanguage>;
  dark: ReturnType<typeof useDarkMode>;
}

const navItems = [
  { key: 'nav.work', href: '#work' },
  { key: 'nav.beforeAfter', href: '#before-after' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Header({ lang, dark }: HeaderProps) {
  const { t, isAr, toggle: toggleLang } = lang;
  const { isDark, toggle: toggleDark } = dark;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // 🔥 optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // section observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-md transition-shadow duration-300 will-change-transform ${
          scrolled
            ? 'shadow-md dark:shadow-lg'
            : ''
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <span className="font-display text-xl text-forest">
              Hafez
            </span>

            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-ink dark:text-dark-text">
                Abdurrahman M. Hafez
              </div>
              <div className="text-[9px] uppercase tracking-widest text-mist">
                {t('header.subtitle')}
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-forest/50 ${
                  activeSection === item.href
                    ? 'text-forest dark:text-dark-forest'
                    : 'text-mist hover:text-ink dark:hover:text-dark-text'
                }`}
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* WhatsApp */}
            <a
              href="https://wa.me/201123281688"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-wa-green hover:bg-wa-green/90 text-white text-[10px] px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-wa-green/50 font-medium"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>

            {/* Hire */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 bg-forest hover:bg-forest-hover dark:bg-dark-forest dark:hover:bg-dark-forest/90 text-white text-[10px] px-5 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-forest/50 font-medium"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Hire Me
            </a>

            {/* Language */}
            <button
              onClick={toggleLang}
              className="w-9 h-9 rounded-full border border-ink/20 dark:border-white/15 flex items-center justify-center text-xs font-medium transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-forest/50"
              aria-label={isAr ? 'Switch to English' : 'Switch to Arabic'}
              title={isAr ? 'English' : 'العربية'}
            >
              {isAr ? 'EN' : 'ع'}
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-full border border-ink/20 dark:border-white/15 flex items-center justify-center transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-forest/50 text-ink dark:text-dark-text"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full border border-ink/20 dark:border-white/15 flex items-center justify-center transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-forest/50"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-cream/98 dark:bg-dark-bg/98 backdrop-blur-lg flex flex-col animate-fadeIn">

          <div className="flex justify-between items-center p-5 border-b border-card-border dark:border-dark-border">
            <span className="font-display text-lg font-semibold text-ink dark:text-dark-text">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-ink/20 dark:border-white/15 flex items-center justify-center transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-forest/50"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-3xl font-display text-ink dark:text-dark-text hover:text-forest dark:hover:text-dark-forest transition-colors duration-200 focus:outline-none px-4 py-2 rounded-lg ring-forest/50 focus:ring-2"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="p-6 border-t border-card-border dark:border-dark-border flex flex-col gap-3">
            <a
              href="https://wa.me/201123281688"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wa-green hover:bg-wa-green/90 text-white px-5 py-3 rounded-full text-sm font-medium transition-colors duration-200 text-center"
            >
              WhatsApp
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-shimmer text-sm text-center w-full"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}