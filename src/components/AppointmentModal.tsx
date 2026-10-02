import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Share2,
  FileText,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CARTORIO_INFO, CARTORIO_SERVICES } from '../data/cartorioData';
import {
  getAvailableTimeSlots,
  isValidAppointmentDate,
  formatCPF,
  formatPhone,
  generateProtocol,
} from '../utils/dateHelpers';
import { Appointment, CartorioService } from '../types';
import { Logo } from './Logo';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onAppointmentCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedService, setSelectedService] = useState<CartorioService | null>(null);

  // Form states
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [lgpdConsent, setLgpdConsent] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Initialize service if preselected
  useEffect(() => {
    if (preselectedServiceId) {
      const match = CARTORIO_SERVICES.find((s) => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
        setStep(2);
      }
    }
  }, [preselectedServiceId]);

  // Set default date to next weekday
  useEffect(() => {
    const today = new Date();
    // Default to tomorrow or next monday if weekend
    const target = new Date(today);
    target.setDate(today.getDate() + 1);
    while (target.getDay() === 0 || target.getDay() === 6) {
      target.setDate(target.getDate() + 1);
    }
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
    setTime('09:30');
  }, []);

  if (!isOpen) return null;

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    const check = isValidAppointmentDate(newDate);
    if (!check.isValid) {
      setDateError(check.error || 'Data inválida para atendimento.');
    } else {
      setDateError('');
    }
  };

  const validateStep3 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().split(' ').length < 2) {
      errors.fullName = 'Informe seu nome e sobrenome completos.';
    }
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      errors.cpf = 'Informe um CPF válido com 11 dígitos.';
    }
    if (!email.trim() || !email.includes('@')) {
      errors.email = 'Informe um endereço de e-mail válido.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Informe seu telefone/WhatsApp com DDD.';
    }
    if (!lgpdConsent) {
      errors.lgpd = 'É necessário concordar com o termo de proteção de dados.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    if (!selectedService) return;

    const protocol = generateProtocol('POT');
    const newAppointment: Appointment = {
      protocol,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      fullName: fullName.trim(),
      cpf,
      email: email.trim(),
      phone,
      date,
      time,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmado',
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('cartorio_appointments') || '[]');
      existing.unshift(newAppointment);
      localStorage.setItem('cartorio_appointments', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setCreatedAppointment(newAppointment);
    if (onAppointmentCreated) {
      onAppointmentCreated(newAppointment);
    }
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredServices = CARTORIO_SERVICES.filter((s) => {
    if (selectedCategory === 'todos') return true;
    return s.category === selectedCategory;
  });

  const availableSlots = getAvailableTimeSlots();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0f2942] text-white p-5 sm:p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-brand-cinzel font-bold text-lg sm:text-xl text-white">
                Agendamento de Atendimento
              </h2>
              <p className="text-xs text-slate-300">
                Cartório de Potim · {CARTORIO_INFO.hours.schedule}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        {step < 4 && (
          <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/80 px-6 py-3">
            <div className="flex items-center justify-between max-w-lg mx-auto text-xs font-medium">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= 1
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  1
                </span>
                <span className={step === 1 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}>
                  Serviço
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= 2
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  2
                </span>
                <span className={step === 2 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}>
                  Data & Horário
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= 3
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  3
                </span>
                <span className={step === 3 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}>
                  Identificação
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto max-h-[75vh]">
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Qual serviço você deseja realizar no Cartório de Potim?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Selecione o ato notarial ou registral para visualizar os requisitos e reservar o tempo adequado.
                </p>
              </div>

              {/* Service Categories Filter */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'todos'
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Todos os Serviços
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('registro_civil')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'registro_civil'
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Registro Civil
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('tabelionato_notas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'tabelionato_notas'
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Tabelionato de Notas
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('apostilamento')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'apostilamento'
                      ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Apostila de Haia
                </button>
              </div>

              {/* Service Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {filteredServices.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md ring-2 ring-amber-500/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                          {service.title}
                        </h4>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {service.shortDesc}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          {service.durationMinutes} min
                        </span>
                        <span className="text-slate-400">
                          {service.category === 'registro_civil' ? 'Registro Civil' : 'Notas'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-semibold text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Continuar para Data e Horário</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME (Strict Mon-Fri 9h-17h enforcement) */}
          {step === 2 && selectedService && (
            <div className="space-y-6">
              {/* Selected Service Recap */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold">
                    Serviço Selecionado
                  </span>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedService.title}
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-medium"
                >
                  Trocar serviço
                </button>
              </div>

              {/* Strict Hours Notice */}
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Horário Oficial de Atendimento:</strong> {CARTORIO_INFO.hours.schedule}.
                  <br />
                  <span className="font-semibold text-amber-800 dark:text-amber-300">
                    Fechado aos sábados e domingos.
                  </span>{' '}
                  Agendamentos disponíveis apenas para dias úteis.
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1.5">
                  1. Selecione a data desejada (segunda a sexta)
                </label>
                <div className="relative max-w-sm">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      dateError
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500'
                    }`}
                  />
                </div>

                {dateError && (
                  <div className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{dateError}</span>
                  </div>
                )}
              </div>

              {/* Time Slots Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                  2. Selecione o horário de atendimento (vagas de 30 min)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2">
                  {availableSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 shadow-md ring-2 ring-amber-500/50 scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirements & Documents Checklist Preview */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  Documentos necessários para este serviço:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedService.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  disabled={!date || Boolean(dateError) || !time}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-semibold text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Continuar para Identificação</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CITIZEN DATA & LGPD CONSENT */}
          {step === 3 && selectedService && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Identificação do Solicitante
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Dados necessários para formalizar o protocolo de agendamento presencial.
                </p>
              </div>

              {/* Summary Pill */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-2 border border-slate-200 dark:border-slate-700">
                <div>
                  <strong>Serviço:</strong> {selectedService.title}
                </div>
                <div>
                  <strong>Data & Horário:</strong> {date.split('-').reverse().join('/')} às {time}h
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João Carlos da Silva"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-500">{formErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    maxLength={14}
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {formErrors.cpf && (
                    <span className="text-[11px] text-red-500">{formErrors.cpf}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp / Telefone para Contato *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(12) 99999-9999"
                    maxLength={15}
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-500">{formErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    E-mail para Confirmação *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-500">{formErrors.email}</span>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Observações adicionais (opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Informe detalhes caso haja urgência, procuração específica ou dúvidas prévias..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* LGPD Consent Checkbox & Provimento 213/CNJ */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="lgpdConsent"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 dark:border-slate-700 cursor-pointer"
                  />
                  <label htmlFor="lgpdConsent" className="text-xs text-slate-700 dark:text-slate-300 leading-normal cursor-pointer">
                    <strong>Termo de Consentimento LGPD & Provimento nº 213/CNJ:</strong> Autorizo o Cartório de Potim a tratar os dados pessoais fornecidos única e exclusivamente para a finalidade notarial/registral deste agendamento, ciente dos padrões de segurança da informação, criptografia e guarda funcional garantidos por lei.
                  </label>
                </div>
                {formErrors.lgpd && (
                  <span className="text-[11px] text-red-500 block pl-6">{formErrors.lgpd}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmar Agendamento</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION & OFFICIAL PROTOCOL VOUCHER */}
          {step === 4 && createdAppointment && (
            <div className="space-y-6 text-center">
              {/* Success Badge */}
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-brand-cinzel font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  Agendamento Confirmado com Sucesso!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Seu horário foi reservado no sistema do Cartório de Potim. Guarde seu protocolo.
                </p>
              </div>

              {/* Official Voucher Card */}
              <div
                id="appointment-voucher"
                className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-left shadow-lg relative overflow-hidden"
              >
                {/* Watermark seal */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-10 translate-y-10">
                  <Logo variant="crest-only" size="lg" />
                </div>

                {/* Voucher Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Logo variant="crest-only" size="sm" />
                    </div>
                    <div>
                      <div className="font-brand-cinzel font-bold text-sm text-[#0f2942] dark:text-amber-400">
                        Cartório de Potim
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Comprovante de Agendamento Oficial
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Protocolo</div>
                    <div className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                      {createdAppointment.protocol}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Cidadão(ã)</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {createdAppointment.fullName}
                    </span>
                    <span className="text-slate-500 block text-[11px]">CPF: {createdAppointment.cpf}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Serviço</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {createdAppointment.serviceTitle}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Data e Horário</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {createdAppointment.date.split('-').reverse().join('/')} às {createdAppointment.time}h
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Local de Atendimento</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-xs flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      {CARTORIO_INFO.address.street} - {CARTORIO_INFO.address.neighborhood}, Potim/SP
                    </span>
                  </div>
                </div>

                {/* Important Instructions Box */}
                <div className="mt-5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">Orientações para o dia:</div>
                  <p>• Chegue com 10 minutos de antecedência portando documento original com foto e CPF.</p>
                  <p>• Traga os documentos originais solicitados para a lavratura do ato.</p>
                  <p>• Em caso de impossibilidade de comparecimento, entre em contato pelo telefone {CARTORIO_INFO.phone}.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Comprovante</span>
                </button>

                <a
                  href={`https://wa.me/${CARTORIO_INFO.phoneClean}?text=Ol%C3%A1%2C%20acabei%20de%20agendar%20um%20atendimento%20no%20Cart%C3%B3rio%20de%20Potim.%20Protocolo%3A%20${createdAppointment.protocol}%20para%20o%20dia%20${createdAppointment.date.split('-').reverse().join('/')}%20%C3%A0s%20${createdAppointment.time}h.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Salvar no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Concluir</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
