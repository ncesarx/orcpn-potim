import React from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  FileKey,
  EyeOff,
  UserCheck,
  AlertTriangle,
  ExternalLink,
  Mail,
  Scale,
} from 'lucide-react';
import { CARTORIO_INFO } from '../data/cartorioData';

export const ComplianceSection: React.FC = () => {
  return (
    <section id="conformidade" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Segurança Jurídica & Integridade de Dados</span>
          </div>
          <h2 className="font-brand-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Conformidade com o Provimento 213/CNJ e LGPD
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-light">
            O Cartório de Potim opera com os mais altos padrões de segurança cibernética e governança notarial,
            assegurando a inviolabilidade do acervo público e a confidencialidade dos seus dados pessoais.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Provimento 213/CNJ */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0f2942] dark:text-blue-400 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-brand-cinzel font-bold text-lg text-slate-900 dark:text-white">
                Provimento nº 213/CNJ
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Regulamenta os requisitos de infraestrutura tecnológica, segurança da informação, continuidade de negócios e redundância de servidores para todos os cartórios do Brasil.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Cópias de segurança (backup) diárias em nuvem de alta disponibilidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Interoperabilidade com centrais de serviços eletrônicos compartilhados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Trilha de auditoria e monitoramento de vulnerabilidades 24/7</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
              Corregedoria Nacional de Justiça
            </div>
          </div>

          {/* Pillar 2: LGPD Notarial */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-brand-cinzel font-bold text-lg text-slate-900 dark:text-white">
                LGPD (Lei nº 13.709/2018)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tratamento legítimo de dados pessoais fundamentado no art. 23 da LGPD: cumprimento de obrigação legal e execução das atribuições públicas da serventia delegada.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Princípios da finalidade, necessidade e adequação em todos os atos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Canal direto com o Encarregado de Dados (DPO) para solicitações</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Guarda segura e descarte estritamente segundo a tabela do CNJ</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Contato DPO:</span>
              <a href={`mailto:${CARTORIO_INFO.dpoEmail}`} className="text-emerald-600 hover:underline">
                {CARTORIO_INFO.dpoEmail}
              </a>
            </div>
          </div>

          {/* Pillar 3: Segurança Cibernética Avançada */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-brand-cinzel font-bold text-lg text-slate-900 dark:text-white">
                Cibersegurança & ICP-Brasil
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Assinatura digital padrão ICP-Brasil e e-Notariado garantindo que qualquer documento expedido contenha prova matemática de autoria e integridade.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Comunicação criptografada com certificado SSL de 256 bits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Selo digital de autenticidade consultável publicamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Proteção contra clonagem e adulteração de certidões</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
              Certificação Digital Qualificada
            </div>
          </div>
        </div>

        {/* Fraud Prevention & Citizen Security Alert */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                Alerta de Segurança ao Cidadão contra Golpes na Internet
              </h4>
              <p className="text-xs text-amber-900/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                O Cartório de Potim jamais solicita transferências para contas de pessoas físicas ou exige pagamento prévio sem a respectiva guia ou protocolo oficial. Dúvidas? Ligue para <strong>{CARTORIO_INFO.phone}</strong>.
              </p>
            </div>
          </div>

          <a
            href={CARTORIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Verificar Autenticidade
          </a>
        </div>
      </div>
    </section>
  );
};
