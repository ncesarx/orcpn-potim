import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  Search,
  FileCheck,
  Menu,
  X,
  Moon,
  Sun,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { Logo } from './Logo';
import { CARTORIO_INFO } from '../data/cartorioData';
import { getCartorioOpenStatus, OpenStatus } from '../utils/dateHelpers';

interface HeaderProps {
  onOpenAppointment: (serviceId?: string) => void;
  onNavigate: (sectionId: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAppointment,
  onNavigate,
  darkMode,
  onToggleDarkMode,
}) => {
  const [openStatus, setOpenStatus] = useState<OpenStatus>(getCartorioOpenStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateStatus = () => setOpenStatus(getCartorioOpenStatus());
    const interval = setInterval(updateStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', target: 'hero' },
    { label: 'Agendamento Online', target: 'agendamento' },
    { label: 'Consultar Protocolo', target: 'consultas' },
    { label: '2ª Via de Certidão', target: 'certidoes' },
    { label: 'Serviços & Prazos', target: 'servicos' },
    { label: 'CNJ 213 & LGPD', target: 'conformidade' },
    { label: 'Dúvidas / FAQ', target: 'faq' },
    { label: 'Contato', target: 'contato' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target === 'agendamento') {
      onOpenAppointment();
    } else {
      onNavigate(target);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Institutional Announcement Bar */}
      <div className="bg-[#0b1d31] text-slate-200 text-xs border-b border-slate-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          {/* Official Entity & Tabeliã */}
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-white">Cartório de Potim</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">Tabeliã Oficial: {CARTORIO_INFO.tabelia}</span>
          </div>

          {/* Quick Info & Real-Time Open Status */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Real-time status */}
            <div className="flex items-center gap-1.5" title={openStatus.subMessage}>
              <span
                className={`w-2 h-2 rounded-full ${
                  openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className={`font-semibold ${openStatus.isOpen ? 'text-emerald-300' : 'text-amber-200'}`}>
                {openStatus.statusMessage}
              </span>
              <span className="hidden sm:inline text-slate-400 text-[11px]">
                ({CARTORIO_INFO.hours.schedule})
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 border-l border-slate-700 pl-3">
              <a
                href={`tel:${CARTORIO_INFO.phoneClean}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{CARTORIO_INFO.phone}</span>
              </a>
              <span className="text-slate-500">|</span>
              <a
                href={CARTORIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Ir para a página inicial do Cartório de Potim"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
              <Logo variant="crest-only" size="sm" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-brand-cinzel font-bold text-lg sm:text-xl text-[#0f2942] dark:text-slate-100 tracking-tight leading-tight group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                Cartório de Potim
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wider uppercase">
                Tabelionato e Registro Civil
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="hover:text-[#0f2942] dark:hover:text-white transition-colors cursor-pointer py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Online Booking Button */}
            <button
              onClick={() => onOpenAppointment()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-600 dark:hover:bg-amber-500 rounded-md shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 text-amber-300 dark:text-white" />
              <span>Agendar Horário</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Menu principal"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            {/* Open status pill for mobile */}
            <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="font-semibold text-slate-900 dark:text-white">{openStatus.statusMessage}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{openStatus.subMessage}</p>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleNavClick(link.target)}
                  className="w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#0f2942] dark:bg-amber-600 rounded-md shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Atendimento Online</span>
              </button>

              <a
                href={CARTORIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atendimento via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
