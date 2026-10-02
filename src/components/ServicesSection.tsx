import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Search,
  BookOpen,
  ArrowRight,
  Shield,
  Home,
  Users,
  Stamp,
  Scale,
  Globe,
  Baby,
  HeartHandshake,
} from 'lucide-react';
import { CARTORIO_SERVICES } from '../data/cartorioData';
import { CartorioService, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Stamp':
        return <Stamp className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const filtered = CARTORIO_SERVICES.filter((svc) => {
    const matchesCategory = selectedCategory === 'todos' || svc.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      svc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      svc.shortDesc.toLowerCase().includes(searchFilter.toLowerCase()) ||
      svc.requirements.some((r) => r.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="servicos" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Competências e Atos Notariais e Registrais</span>
          </div>
          <h2 className="font-brand-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Serviços, Requisitos e Prazos
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-light">
            Consulte a lista completa de documentos obrigatórios para cada ato civil e notarial antes de
            comparecer ao cartório, economizando tempo e evitando retrabalho.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'todos', label: 'Todos os Serviços' },
              { id: 'registro_civil', label: 'Registro Civil' },
              { id: 'tabelionato_notas', label: 'Tabelionato de Notas' },
              { id: 'apostilamento', label: 'Apostila de Haia' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f2942] text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar serviço ou documento..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Category and Estimated Time */}
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {service.category === 'registro_civil' ? 'Registro Civil' : service.category === 'tabelionato_notas' ? 'Tabelionato de Notas' : 'Legalização Internacional'}
                    </span>
                    <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.estimatedDays}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-[#0f2942] dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 group-hover:text-amber-600 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Checklist of Requirements */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Documentos e Requisitos:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.requirements.slice(0, isExpanded ? undefined : 3).map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{req}</span>
                        </li>
                      ))}
                    </ul>

                    {service.requirements.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer pt-1"
                      >
                        {isExpanded ? 'Ver menos requisitos' : `+ Ver mais ${service.requirements.length - 3} requisitos`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Atendimento de ~{service.durationMinutes} min
                  </span>

                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Agendar Atendimento</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
