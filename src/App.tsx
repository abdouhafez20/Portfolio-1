import { useLanguage } from '@/hooks/useLanguage';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useEffect } from 'react';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import CursorGlow from '@/components/CursorGlow';
import Header from '@/components/Header';
import HeroSection from '@/sections/HeroSection';
import MarqueeSection from '@/sections/MarqueeSection';
import WorkSection from '@/sections/WorkSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import BeforeAfterSection from '@/sections/BeforeAfterSection';
import ServicesSection from '@/sections/ServicesSection';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';

function App() {
  const lang = useLanguage();
  const dark = useDarkMode();

  // Update HTML dir attribute for RTL support
  useEffect(() => {
    const html = document.documentElement;
    html.dir = lang.isAr ? 'rtl' : 'ltr';
    html.lang = lang.isAr ? 'ar' : 'en';
  }, [lang.isAr]);

  return (
    <div id="main" className="min-h-screen">
      <ScrollProgressBar />
      <Header lang={lang} dark={dark} />
      <main>
        <HeroSection lang={lang} />
        <MarqueeSection />
        <WorkSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <BeforeAfterSection lang={lang} />
        <ServicesSection lang={lang} />
        <AboutSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <BackToTop />
      <WhatsAppFAB />
      <CursorGlow />
    </div>
  );
}

export default App;
