import React from 'react';
import {
  Shield,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';
import { Logo } from './Logo';
import { CARTORIO_INFO } from '../data/cartorioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAppointment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1b2d] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Crest Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center shrink-0">
                <Logo variant="crest-only" size="sm" />
              </div>
              <div>
                <h3 className="font-brand-cinzel font-bold text-xl text-white tracking-wide">
                  Cartório de Potim
                </h3>
                <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  Tabelionato e Registro Civil
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Oficial de Registro Civil das Pessoas Naturais e Tabelião de Notas da Comarca de Aparecida/Potim - SP.
              Garantindo fé pública, autenticidade e segurança jurídica aos atos da vida civil desde sua instalação.
            </p>

            <div className="text-xs text-slate-300 space-y-1 pt-1">
              <div>
                <span className="text-slate-400 font-medium">Tabeliã e Oficial Titular:</span>{' '}
                <strong className="text-white">{CARTORIO_INFO.tabelia}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium">CNS (Código Nacional):</span>{' '}
                <span className="font-mono text-amber-400">{CARTORIO_INFO.cns}</span>
              </div>
            </div>

            {/* Official Motto */}
            <div className="pt-2">
              <span className="inline-block text-[11px] font-bold tracking-widest text-slate-400 uppercase border-y border-slate-800 py-1.5 px-3">
                Fé Pública e Segurança Jurídica
              </span>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Serviços e Acesso Rápido
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenAppointment()}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Agendamento de Serviços Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('consultas')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Consulta de Documentos & Protocolos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('certidoes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Solicitação de 2ª Via de Certidão
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Tabela de Requisitos e Prazos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('conformidade')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Provimento nº 213/CNJ & LGPD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  • Dúvidas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Legal Contact */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Atendimento & Sede
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {CARTORIO_INFO.address.street} - Bairro {CARTORIO_INFO.address.neighborhood}
                  <br />
                  Potim - SP, CEP {CARTORIO_INFO.address.zipCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Telefone / WhatsApp: {CARTORIO_INFO.phone}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>E-mail: {CARTORIO_INFO.email}</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{CARTORIO_INFO.hours.schedule}</strong>
                  <span className="text-slate-400 text-[11px]">{CARTORIO_INFO.hours.weekend}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} Cartório de Potim - Tabelionato de Notas e Registro Civil.
              Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Conformidade Provimento nº 213/CNJ · LGPD Lei nº 13.709/2018 · Corregedoria Geral da Justiça do TJ-SP.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-xs"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao Topo</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
