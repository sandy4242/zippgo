import Hero from '@/components/landing/Hero';
import PortalSection from '@/components/landing/PortalSection';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Navigation */}
      <Hero />
      
      {/* Two Login Portals Section */}
      <PortalSection />
      
      {/* Features Section */}
      <Features />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Final Call to Action */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
