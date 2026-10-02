import React from 'react';
import {
  Calendar,
  Search,
  FileText,
  ShieldCheck,
  Clock,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from './Logo';
import { CARTORIO_INFO } from '../data/cartorioData';
import { getCartorioOpenStatus } from '../utils/dateHelpers';

interface HeroProps {
  onOpenAppointment: (serviceId?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onNavigate }) => {
  const openStatus = getCartorioOpenStatus();

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#0a192a] via-[#0f2942] to-[#122438] text-white pt-10 pb-20 sm:pb-24 border-b border-slate-800">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 0 80 L 40 40 L 80 80 Z M 40 40 L 40 0" stroke="#ffffff" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-pattern)" />
        </svg>
      </div>

      {/* Decorative Gold & Navy Radial Highlights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Institutional Badge and Compliance Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-medium tracking-wide">Comarca de Aparecida · Foro de Potim - SP</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">CNS {CARTORIO_INFO.cns}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Provimento nº 213/CNJ & LGPD Compliance</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-amber-400 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2">
                Fé Pública · Autenticidade · Segurança Jurídica
              </p>
              <h1 className="font-brand-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Tabelionato de Notas e Registro Civil de Potim
              </h1>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Garantindo segurança jurídica para todos os momentos da sua vida: registros de nascimento,
              casamento, escrituras públicas, procurações e certidões com agilidade digital e atendimento humanizado.
            </p>

            {/* Official Officer & Hours Card */}
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/70 pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">Tabeliã e Oficial Registradora</span>
                  <span className="font-serif font-bold text-white text-base sm:text-lg">{CARTORIO_INFO.tabelia}</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">Expediente Oficial</span>
                  <span className="text-sm font-semibold text-amber-300 flex items-center gap-1.5 sm:justify-end">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {CARTORIO_INFO.hours.schedule}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {CARTORIO_INFO.hours.weekend}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {CARTORIO_INFO.address.street}, {CARTORIO_INFO.address.neighborhood} - Potim/SP - CEP: {CARTORIO_INFO.address.zipCode}
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAppointment()}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Agendar Atendimento Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('consultas')}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-600 rounded-lg transition-all duration-200 cursor-pointer hover:border-slate-500"
              >
                <Search className="w-4 h-4 text-slate-300" />
                <span>Consultar Protocolo</span>
              </button>

              <button
                onClick={() => onNavigate('certidoes')}
                className="flex items-center gap-2 px-5 py-3.5 bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Pedir 2ª Via de Certidão</span>
              </button>
            </div>
          </div>

          {/* Right Visual Crest & Official Seal Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md">
              <div className="text-center mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Emblema Institucional
                </span>
              </div>

              {/* Logo Presentation matching uploaded image */}
              <div className="bg-white p-6 rounded-xl shadow-inner flex items-center justify-center">
                <Logo variant="full" size="md" className="w-full h-auto drop-shadow-sm" />
              </div>

              {/* Security & Verification Callout */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-200">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ambiente Protegido e Criptografado</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Sistemas auditados em conformidade com as diretrizes do Conselho Nacional de Justiça e Lei Geral de Proteção de Dados.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Action Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Agendamento */}
          <div
            onClick={() => onOpenAppointment()}
            className="group p-5 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/50 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-amber-300 transition-colors">
              Agendamento de Serviços
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Marque seu horário oficial de segunda a sexta, das 9h às 17h, sem filas e com suporte completo.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-400">
              <span>Agendar online</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Consultas */}
          <div
            onClick={() => onNavigate('consultas')}
            className="group p-5 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/50 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-sky-300 transition-colors">
              Consulta de Protocolos
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Acompanhe a qualificação registral, andamento de escrituras e validação de selo digital em tempo real.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-sky-400">
              <span>Consultar agora</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: 2ª Via de Certidões */}
          <div
            onClick={() => onNavigate('certidoes')}
            className="group p-5 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/50 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-emerald-300 transition-colors">
              2ª Via de Certidões
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Certidão de Nascimento, Casamento e Óbito em formato digital ICP-Brasil ou papel de segurança.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <span>Solicitar 2ª via</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Normas & Transparência */}
          <div
            onClick={() => onNavigate('conformidade')}
            className="group p-5 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-amber-500/50 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-indigo-300 transition-colors">
              Provimento CNJ 213 & LGPD
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Conheça os padrões de segurança cibernética, governança notarial e proteção aos seus dados pessoais.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-indigo-400">
              <span>Ver diretrizes</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
