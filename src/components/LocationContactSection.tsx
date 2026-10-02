import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  Compass,
  Car,
  Accessibility,
  ExternalLink,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { CARTORIO_INFO } from '../data/cartorioData';
import { getCartorioOpenStatus } from '../utils/dateHelpers';

export const LocationContactSection: React.FC<{ onOpenAppointment: () => void }> = ({
  onOpenAppointment,
}) => {
  const openStatus = getCartorioOpenStatus();

  return (
    <section id="contato" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <MapPin className="w-4 h-4" />
            <span>Sede Oficial da Serventia</span>
          </div>
          <h2 className="font-brand-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Localização e Canais de Atendimento
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-light">
            Venha nos visitar em nossa sede em Potim - SP ou entre em contato pelos nossos canais oficiais de comunicação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact & Hours Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tabeliã and Address Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">
                  Titularidade
                </span>
                <h3 className="font-brand-cinzel font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {CARTORIO_INFO.tabelia}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {CARTORIO_INFO.cargo} · {CARTORIO_INFO.comarca}
                </p>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-slate-900 dark:text-white mb-0.5">
                    Endereço Oficial:
                  </strong>
                  <p>{CARTORIO_INFO.address.street}</p>
                  <p>Bairro {CARTORIO_INFO.address.neighborhood} - Potim / SP</p>
                  <p className="text-slate-500 font-mono mt-0.5">CEP: {CARTORIO_INFO.address.zipCode}</p>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={CARTORIO_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-500" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
                </a>

                <a
                  href={CARTORIO_INFO.address.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-sky-500" />
                  <span>Traçar Rota no Waze</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Hours Card (Crucial requirement from prompt) */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2942] text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Horário de Funcionamento
                    </h4>
                    <span className="text-[11px] text-slate-500">Expediente regular contínuo</span>
                  </div>
                </div>

                {/* Real-time status badge */}
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      openStatus.isOpen
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        openStatus.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
                      }`}
                    />
                    {openStatus.statusMessage}
                  </span>
                </div>
              </div>

              {/* Schedule detail */}
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-medium">Segunda a Sexta-feira:</span>
                  <span className="font-bold text-slate-900 dark:text-white">09h00 às 17h00</span>
                </div>
                <div className="flex justify-between py-1 text-slate-500 dark:text-slate-400">
                  <span>Sábados e Domingos:</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Fechado (Plantão exclusivo de óbito)
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenAppointment}
                  className="w-full py-2.5 px-4 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer text-center"
                >
                  Agendar horário para atendimento presencial
                </button>
              </div>
            </div>

            {/* Direct Contact Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${CARTORIO_INFO.phoneClean}`}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-500 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wide block">Telefone Fixo</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    {CARTORIO_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={CARTORIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wide block font-semibold">
                    WhatsApp Oficial
                  </span>
                  <span className="font-bold text-sm text-emerald-950 dark:text-white">
                    {CARTORIO_INFO.whatsapp}
                  </span>
                </div>
              </a>
            </div>

            {/* Official Email */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] text-slate-500 uppercase tracking-wide block">E-mail Institucional</span>
                <a
                  href={`mailto:${CARTORIO_INFO.email}`}
                  className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-amber-600 truncate block"
                >
                  {CARTORIO_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map & Accessibility */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Frame Container */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="p-4 bg-[#0f2942] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-xs sm:text-sm">
                    Mapa de Acesso · Frei Galvão, Potim - SP
                  </span>
                </div>
                <a
                  href={CARTORIO_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium"
                >
                  <span>Ampliar Mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map View */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {/* Embedded OpenStreetMap Iframe for interactive navigation */}
                <iframe
                  title="Localização do Cartório de Potim"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-45.265%2C-22.845%2C-45.240%2C-22.825&amp;layer=mapnik&amp;marker=-22.836%2C-45.253"
                />

                {/* Floating Location Overlay Pin */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Cartório de Potim (Tabelionato e Registro Civil)
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Av. Adriano Galvão de Castro, 255 - Frei Galvão
                    </span>
                  </div>

                  <a
                    href={CARTORIO_INFO.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-[#0f2942] dark:bg-amber-500 text-white dark:text-slate-950 font-bold rounded-lg text-xs"
                  >
                    Como Chegar
                  </a>
                </div>
              </div>
            </div>

            {/* Accessibility and Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <Accessibility className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-0.5">Acessibilidade Total</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Rampa de acesso para cadeirantes, atendimento prioritário por lei e balcões adaptados.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-0.5">Fácil Estacionamento</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Vagas disponíveis na avenida e nas proximidades do imóvel no bairro Frei Galvão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
