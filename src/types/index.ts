export type ServiceCategory = 'registro_civil' | 'tabelionato_notas' | 'apostilamento';

export interface CartorioService {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDesc: string;
  fullDesc: string;
  durationMinutes: number;
  requirements: string[];
  estimatedDays: string;
  isOnlineAvailable: boolean;
  iconName: string;
}

export interface Appointment {
  protocol: string;
  serviceId: string;
  serviceTitle: string;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes?: string;
  createdAt: string;
  status: 'confirmado' | 'em_atendimento' | 'concluido' | 'cancelado';
}

export interface ProtocolRecord {
  protocol: string;
  cpfMasked: string;
  serviceTitle: string;
  applicantName: string;
  dateSubmitted: string;
  estimatedCompletion: string;
  currentStep: number;
  statusText: string;
  steps: {
    title: string;
    description: string;
    timestamp?: string;
    completed: boolean;
  }[];
  digitalSeal?: string;
  observacoes?: string;
}

export interface CertificateRequest {
  protocol: string;
  type: 'nascimento' | 'casamento' | 'obito';
  format: 'digital' | 'papel';
  deliveryMethod: 'balcao' | 'correios';
  fullNameRegistered: string;
  bookNumber?: string;
  pageNumber?: string;
  termNumber?: string;
  dateOfEvent: string;
  applicantName: string;
  applicantCpf: string;
  applicantPhone: string;
  applicantEmail: string;
  shippingAddress?: string;
  estimatedFee: number;
  status: 'recebido' | 'localizado' | 'em_emissao' | 'pronto';
  createdAt: string;
}

export interface FaqItem {
  id: string;
  category: 'geral' | 'registro_civil' | 'notas' | 'certidoes' | 'lgpd';
  question: string;
  answer: string;
}
