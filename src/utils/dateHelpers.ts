import { CARTORIO_INFO } from '../data/cartorioData';

export interface OpenStatus {
  isOpen: boolean;
  statusMessage: string;
  subMessage: string;
}

export function getCartorioOpenStatus(): OpenStatus {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeDec = hour + minutes / 60;

  // Monday to Friday is 1 to 5
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isDuringHours = currentTimeDec >= CARTORIO_INFO.hours.openHour && currentTimeDec < CARTORIO_INFO.hours.closeHour;

  if (isWeekday && isDuringHours) {
    const minutesLeft = Math.floor((CARTORIO_INFO.hours.closeHour - currentTimeDec) * 60);
    const hoursLeft = Math.floor(minutesLeft / 60);
    const remMin = minutesLeft % 60;
    const timeLeftStr = hoursLeft > 0 ? `${hoursLeft}h ${remMin}min` : `${remMin}min`;

    return {
      isOpen: true,
      statusMessage: 'Aberto agora',
      subMessage: `Atendimento presencial até às 17h00 (restam ${timeLeftStr})`,
    };
  }

  if (isWeekday && currentTimeDec < CARTORIO_INFO.hours.openHour) {
    return {
      isOpen: false,
      statusMessage: 'Fechado no momento',
      subMessage: 'Abre hoje às 09h00 (Segunda a sexta, das 9h às 17h)',
    };
  }

  if (dayOfWeek === 5 && currentTimeDec >= CARTORIO_INFO.hours.closeHour) {
    return {
      isOpen: false,
      statusMessage: 'Fechado no momento',
      subMessage: 'Expediente encerrado. Reabre segunda-feira às 09h00.',
    };
  }

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    return {
      isOpen: false,
      statusMessage: 'Fechado neste fim de semana',
      subMessage: 'Fechado aos sábados e domingos. Reabre segunda às 09h00.',
    };
  }

  return {
    isOpen: false,
    statusMessage: 'Fechado no momento',
    subMessage: 'Reabre amanhã às 09h00 (Segunda a sexta, das 9h às 17h)',
  };
}

export function getAvailableTimeSlots(): string[] {
  // Slots between 09:00 and 16:30 every 30 minutes
  return [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ];
}

export function isValidAppointmentDate(dateString: string): { isValid: boolean; error?: string } {
  if (!dateString) return { isValid: false, error: 'Data não informada.' };
  
  // Format YYYY-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { isValid: false, error: 'A data do agendamento não pode ser no passado.' };
  }

  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      isValid: false,
      error: 'O Cartório de Potim funciona exclusivamente de segunda a sexta-feira. Fechado aos sábados e domingos.',
    };
  }

  return { isValid: true };
}

export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function generateProtocol(prefix = 'POT'): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
}
