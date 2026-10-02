import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  Download,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Send,
  Building,
  CreditCard,
} from 'lucide-react';
import { formatCPF, formatPhone, generateProtocol } from '../utils/dateHelpers';
import { CARTORIO_INFO } from '../data/cartorioData';
import { CertificateRequest } from '../types';

export const CertificateRequestSection: React.FC<{ onNavigateToProtocol?: (prot: string) => void }> = ({
  onNavigateToProtocol,
}) => {
  const [certType, setCertType] = useState<'nascimento' | 'casamento' | 'obito'>('nascimento');
  const [certNature, setCertNature] = useState<'breve_relato' | 'inteiro_teor'>('breve_relato');
  const [format, setFormat] = useState<'digital' | 'papel'>('digital');
  const [delivery, setDelivery] = useState<'balcao' | 'correios'>('balcao');

  // Form inputs
  const [registeredName, setRegisteredName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [parentsNames, setParentsNames] = useState('');
  const [bookDetails, setBookDetails] = useState('');

  const [applicantName, setApplicantName] = useState('');
  const [applicantCpf, setApplicantCpf] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const [submittedRequest, setSubmittedRequest] = useState<CertificateRequest | null>(null);

  // Fee calculation (SP official table standard)
  const basePrice = certNature === 'breve_relato' ? 42.90 : 68.50;
  const shippingPrice = delivery === 'correios' ? 25.00 : 0.00;
  const totalFee = basePrice + shippingPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeredName || !applicantName || !applicantCpf || !applicantPhone) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    const protocol = generateProtocol('CRT');
    const newReq: CertificateRequest = {
      protocol,
      type: certType,
      format,
      deliveryMethod: delivery,
      fullNameRegistered: registeredName,
      dateOfEvent: eventDate,
      applicantName,
      applicantCpf,
      applicantPhone,
      applicantEmail,
      shippingAddress: delivery === 'correios' ? shippingAddress : undefined,
      estimatedFee: totalFee,
      status: 'recebido',
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for tracking
    try {
      const existing = JSON.parse(localStorage.getItem('cartorio_appointments') || '[]');
      existing.unshift({
        protocol,
        serviceId: 'segunda-via-certidoes',
        serviceTitle: `2ª Via de Certidão de ${certType.toUpperCase()} (${certNature === 'breve_relato' ? 'Breve Relato' : 'Inteiro Teor'})`,
        fullName: applicantName,
        cpf: applicantCpf,
        email: applicantEmail,
        phone: applicantPhone,
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmado',
      });
      localStorage.setItem('cartorio_appointments', JSON.stringify(existing));
    } catch (err) {
      console.warn(err);
    }

    setSubmittedRequest(newReq);
  };

  return (
    <section id="certidoes" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <FileText className="w-4 h-4" />
            <span>CRC Nacional & Central de Registros</span>
          </div>
          <h2 className="font-brand-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Solicitação Rápida de 2ª Via de Certidões
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-light">
            Solicite certidões de <strong>Nascimento, Casamento ou Óbito</strong> registradas em Potim ou
            em qualquer outro município do Brasil com entrega digital via PDF assinado ICP-Brasil ou certidão física.
          </p>
        </div>

        {submittedRequest ? (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-brand-cinzel text-xl sm:text-2xl font-bold text-emerald-950 dark:text-white">
              Pedido de Certidão Registrado!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              Sua solicitação de certidão de <strong>{submittedRequest.type.toUpperCase()}</strong> foi protocolada no Cartório de Potim.
            </p>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-emerald-300 dark:border-emerald-700 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Protocolo de Acompanhamento:</span>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                  {submittedRequest.protocol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Nome do Registrado:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedRequest.fullNameRegistered}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Formato / Entrega:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {submittedRequest.format === 'digital' ? 'Certidão Digital (PDF)' : 'Papel de Segurança'} ({submittedRequest.deliveryMethod === 'balcao' ? 'Balcão Potim' : 'Correios'})
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Valor Estimado (Tabela TJ-SP):</span>
                <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                  R$ {submittedRequest.estimatedFee.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nossa equipe iniciará as buscas no acervo físico e nos sistemas eletrônicos do Provimento nº 213/CNJ.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSubmittedRequest(null)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Fazer outro pedido
              </button>
              <a
                href={CARTORIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Confirmar no WhatsApp do Cartório
              </a>
            </div>
          </div>
        ) : (
          /* Request Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Left Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              {/* 1. Escolha o Tipo de Certidão */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  1. Selecione o tipo de Certidão
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'nascimento', label: 'Nascimento' },
                    { id: 'casamento', label: 'Casamento' },
                    { id: 'obito', label: 'Óbito' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCertType(item.id as any)}
                      className={`py-3 px-2 text-center rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        certType === item.id
                          ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 shadow-md ring-2 ring-amber-500/40'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Certidão de {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Formato e Modelo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    2. Formato da Certidão
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormat('digital');
                        setDelivery('balcao');
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        format === 'digital'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-[#0f2942] dark:text-white font-bold ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <Download className="w-3.5 h-3.5 text-amber-500" />
                        <span>Digital (PDF)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">ICP-Brasil c/ fé pública legal imediata</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormat('papel')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        format === 'papel'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-[#0f2942] dark:text-white font-bold ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <Building className="w-3.5 h-3.5 text-amber-500" />
                        <span>Papel Moeda</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Física em papel oficial de segurança</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    3. Modelo da Certidão
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCertNature('breve_relato')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        certNature === 'breve_relato'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-[#0f2942] dark:text-white font-bold ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">Breve Relato</div>
                      <p className="text-[11px] text-slate-500 mt-1">Modelo comum padrão para o dia a dia</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCertNature('inteiro_teor')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        certNature === 'inteiro_teor'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-[#0f2942] dark:text-white font-bold ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">Inteiro Teor</div>
                      <p className="text-[11px] text-slate-500 mt-1">Reprodução integral para cidadania/inventários</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery mode if Papel */}
              {format === 'papel' && (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Forma de Entrega da Certidão Física
                  </label>
                  <div className="flex gap-4 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === 'balcao'}
                        onChange={() => setDelivery('balcao')}
                        className="text-amber-600"
                      />
                      <span>Retirada no Cartório de Potim (Sem taxa de frete)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === 'correios'}
                        onChange={() => setDelivery('correios')}
                        className="text-amber-600"
                      />
                      <span>Envio pelos Correios com AR (+ R$ 25,00)</span>
                    </label>
                  </div>

                  {delivery === 'correios' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Endereço completo de entrega com CEP, Rua, Bairro e Cidade"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Dados do Registrado */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  4. Dados do Registro a ser Localizado
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">
                      Nome da Pessoa Registrada *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo constante na certidão"
                      value={registeredName}
                      onChange={(e) => setRegisteredName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">
                      Data do Fato (Nascimento, Casamento ou Óbito)
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">
                      Nome dos Pais ou Cônjuges
                    </label>
                    <input
                      type="text"
                      placeholder="Filiação constante no assento"
                      value={parentsNames}
                      onChange={(e) => setParentsNames(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">
                      Livro, Folha e Termo (se souber)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Livro A-12, Fls 144, Termo 890"
                      value={bookDetails}
                      onChange={(e) => setBookDetails(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Requerente */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  5. Seus Dados de Contato (Requerente)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Seu Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Seu CPF *</label>
                    <input
                      type="text"
                      required
                      maxLength={14}
                      placeholder="000.000.000-00"
                      value={applicantCpf}
                      onChange={(e) => setApplicantCpf(formatCPF(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Seu WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(12) 99999-9999"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(formatPhone(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Seu E-mail para Recebimento *</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-sm rounded-lg shadow transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação de Certidão</span>
                </button>
              </div>
            </form>

            {/* Right Summary & Regulatory Panel */}
            <div className="lg:col-span-4 space-y-4">
              {/* Fee Calculator Box */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>Simulador de Emolumentos Oficiais</span>
                </div>

                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Certidão ({certNature === 'breve_relato' ? 'Breve Relato' : 'Inteiro Teor'}):</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      R$ {basePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {shippingPrice > 0 && (
                    <div className="flex justify-between text-amber-700 dark:text-amber-400">
                      <span>Envio Correios (AR registrado):</span>
                      <span className="font-semibold">R$ {shippingPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white">
                    <span>Total Estimado:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">
                      R$ {totalFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pt-1">
                  Valores regidos pela Tabela de Custas e Emolumentos do Estado de São Paulo (TJ-SP / Lei Estadual nº 11.331/02). Pagamento no balcão via PIX, débito ou boleto bancário após confirmação de localização do livro.
                </p>
              </div>

              {/* Free Certificate Legal Notice */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Gratuidade por Lei (Lei Federal 9.534/97)
                </span>
                <p className="text-[11px] leading-relaxed">
                  Cidadãos que se declarem em situação de hipossuficiência financeira possuem direito à gratuidade de certidões do Registro Civil mediante assinatura de declaração de pobreza no atendimento presencial.
                </p>
              </div>

              {/* Provimento 213 Notice */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Segurança e Validade Nacional</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Todas as certidões emitidas eletronicamente pelo Cartório de Potim contam com selo digital de fiscalização da Corregedoria Geral da Justiça e assinatura qualificada ICP-Brasil, aceitas em todos os bancos, cartórios e repartições públicas do país.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
