import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProtocolLookupSection } from './components/ProtocolLookupSection';
import { CertificateRequestSection } from './components/CertificateRequestSection';
import { ServicesSection } from './components/ServicesSection';
import { ComplianceSection } from './components/ComplianceSection';
import { FaqSection } from './components/FaqSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { ChatSupportWidget } from './components/ChatSupportWidget';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cartorio_dark_mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem('cartorio_dark_mode', JSON.stringify(darkMode));
    } catch (e) {
      console.warn(e);
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenAppointment = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setAppointmentModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-200">
      {/* Institutional Top Header */}
      <Header
        onOpenAppointment={handleOpenAppointment}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenAppointment={handleOpenAppointment}
          onNavigate={handleNavigate}
        />

        {/* Protocol Lookup Section */}
        <ProtocolLookupSection />

        {/* Certificate 2nd copy Request Section */}
        <CertificateRequestSection
          onNavigateToProtocol={(prot) => {
            handleNavigate('consultas');
          }}
        />

        {/* Notary & Civil Registry Services & Requirements Catalog */}
        <ServicesSection
          onSelectServiceToBook={(serviceId) => handleOpenAppointment(serviceId)}
        />

        {/* Regulatory Compliance: Provimento 213/CNJ, LGPD & Cybersecurity */}
        <ComplianceSection />

        {/* Frequently Asked Questions FAQ Accordion */}
        <FaqSection />

        {/* Physical Office Location & Multi-Channel Contact */}
        <LocationContactSection
          onOpenAppointment={() => handleOpenAppointment()}
        />
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Automated Booking Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />

      {/* Interactive Support Chat Widget */}
      <ChatSupportWidget
        onOpenAppointment={handleOpenAppointment}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
