import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import Features from '../sections/Features';
import HowItWorks from '../sections/HowItWorks';
import EmergencySOS from '../sections/EmergencySOS';
import Security from '../sections/Security';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <EmergencySOS />
        <Security />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default LandingPage;
