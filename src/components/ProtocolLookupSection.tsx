import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Printer,
  Calendar,
  Lock,
} from 'lucide-react';
import { INITIAL_PROTOCOLS, CARTORIO_INFO } from '../data/cartorioData';
import { ProtocolRecord } from '../types';

export const ProtocolLookupSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentResult, setCurrentResult] = useState<ProtocolRecord | null>(INITIAL_PROTOCOLS[0]);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (queryToUse?: string) => {
    const term = (queryToUse !== undefined ? queryToUse : searchQuery).trim().toUpperCase();
    if (!term) return;

    setSearched(true);

    // First check mock protocols
    const match = INITIAL_PROTOCOLS.find(
      (p) => p.protocol.toUpperCase() === term || p.cpfMasked.includes(term.replace(/\D/g, ''))
    );

    if (match) {
      setCurrentResult(match);
      setNotFound(false);
      return;
    }

    // Check user appointments in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('cartorio_appointments') || '[]');
      const storedMatch = stored.find(
        (a: any) =>
          a.protocol.toUpperCase() === term ||
          a.cpf.replace(/\D/g, '') === term.replace(/\D/g, '')
      );

      if (storedMatch) {
        const dynamicRecord: ProtocolRecord = {
          protocol: storedMatch.protocol,
          cpfMasked: storedMatch.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.$2.$3-**'),
          serviceTitle: storedMatch.serviceTitle,
          applicantName: storedMatch.fullName,
          dateSubmitted: storedMatch.date.split('-').reverse().join('/'),
          estimatedCompletion: 'Conforme agendamento',
          currentStep: 1,
          statusText: 'Agendamento Confirmado - Aguardando Atendimento Presencial',
          digitalSeal: `SP-SELO-${new Date().getFullYear()}-${storedMatch.protocol.slice(-4)}-RC`,
          observacoes: `Atendimento agendado para ${storedMatch.date.split('-').reverse().join('/')} às ${storedMatch.time}h no Cartório de Potim.`,
          steps: [
            {
              title: 'Agendamento Registrado',
              description: 'Reserva confirmada no sistema oficial',
              timestamp: `${storedMatch.date.split('-').reverse().join('/')} ${storedMatch.time}`,
              completed: true,
            },
            {
              title: 'Atendimento no Balcão',
              description: 'Apresentação de documentos originais',
              completed: false,
            },
            {
              title: 'Qualificação Notarial / Registral',
              description: 'Lavratura pelo oficial competente',
              completed: false,
            },
            {
              title: 'Finalização e Entrega',
              description: 'Emissão de certidão ou escritura com fé pública',
              completed: false,
            },
          ],
        };
        setCurrentResult(dynamicRecord);
        setNotFound(false);
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    // Not found
    setCurrentResult(null);
    setNotFound(true);
  };

  const handleQuickLoad = (protocol: string) => {
    setSearchQuery(protocol);
    handleSearch(protocol);
  };

  return (
    <section id="consultas" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <Search className="w-4 h-4" />
            <span>Transparência e Rastreabilidade Notarial</span>
          </div>
          <h2 className="font-brand-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Consulta de Documentos e Protocolos
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-light">
            Acompanhe em tempo real cada etapa do seu processo de registro civil, certidão ou ato notarial
            com segurança e integridade garantidas pelo Provimento nº 213/CNJ.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Digite o número do protocolo (Ex: POT-2026-8941) ou CPF"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              className="px-6 py-2.5 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Examples */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Testar protocolo:</span>
            <button
              onClick={() => handleQuickLoad('POT-2026-8941')}
              className="text-xs px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Certidão Pronta (POT-2026-8941)
            </button>
            <button
              onClick={() => handleQuickLoad('POT-2026-9024')}
              className="text-xs px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Escritura em Análise (POT-2026-9024)
            </button>
            <button
              onClick={() => handleQuickLoad('POT-2026-9118')}
              className="text-xs px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Casamento / Proclamas (POT-2026-9118)
            </button>
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-semibold mb-0.5">Protocolo não localizado</strong>
              Verifique se os dígitos foram digitados corretamente ou se o requerimento foi protocolado recentemente. Se preferir, entre em contato direto pelo telefone <strong>{CARTORIO_INFO.phone}</strong> ou WhatsApp oficial.
            </div>
          </div>
        )}

        {/* Result Card */}
        {currentResult && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mt-6 animate-fadeIn">
            {/* Result Header */}
            <div className="bg-[#0f2942] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Protocolo Oficial Registrado</span>
                </div>
                <h3 className="font-brand-cinzel font-bold text-xl sm:text-2xl text-white">
                  {currentResult.protocol}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Requerente: {currentResult.applicantName} ({currentResult.cpfMasked})
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Status Atual</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                  <Clock className="w-3.5 h-3.5" />
                  {currentResult.statusText}
                </span>
              </div>
            </div>

            {/* Details Meta Grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Ato Notarial / Registral</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {currentResult.serviceTitle}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Data do Requerimento</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {currentResult.dateSubmitted}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Previsão Legal de Conclusão</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {currentResult.estimatedCompletion}
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
                Linha do Tempo do Atendimento Notarial
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {currentResult.steps.map((st, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Step Icon */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        st.completed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {st.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h5
                          className={`text-sm font-semibold ${
                            st.completed
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {st.title}
                        </h5>
                        {st.timestamp && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {st.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {st.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remarks / Observações */}
              {currentResult.observacoes && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Despacho / Observação da Serventia:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {currentResult.observacoes}
                  </p>
                </div>
              )}

              {/* Digital Seal & Cryptography Proof Box */}
              {currentResult.digitalSeal && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-emerald-950 dark:text-emerald-200">
                        Selo Digital de Autenticidade Registral
                      </div>
                      <div className="font-mono text-emerald-800 dark:text-emerald-300 text-xs mt-0.5">
                        {currentResult.digitalSeal}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                    Certificação ICP-Brasil · Provimento 213/CNJ
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Contact Action */}
            <div className="bg-slate-50 dark:bg-slate-900/80 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                Dúvidas sobre este andamento? Contate a equipe do cartório pelo telefone (12) 3112-1773.
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Espelho do Protocolo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
