import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  User,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Bot,
} from 'lucide-react';
import { CARTORIO_INFO, CARTORIO_SERVICES } from '../data/cartorioData';
import { Logo } from './Logo';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    actionType: 'open_appointment' | 'open_whatsapp' | 'navigate_section';
    target?: string;
  };
}

interface ChatSupportWidgetProps {
  onOpenAppointment: (serviceId?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const ChatSupportWidget: React.FC<ChatSupportWidgetProps> = ({
  onOpenAppointment,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Olá! Bem-vindo ao canal de atendimento do Cartório de Potim. Como posso ajudar você hoje com serviços notariais ou certidões de registro civil?`,
      timestamp: 'Agora',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    { label: 'Qual o horário e endereço?', query: 'horario' },
    { label: 'Como agendar um horário?', query: 'agendar' },
    { label: 'Documentos para Casamento Civil', query: 'casamento' },
    { label: 'Pedir 2ª via de certidão', query: 'certidao' },
    { label: 'Reconhecer firma / Autenticar', query: 'firma' },
    { label: 'Falar no WhatsApp com atendente', query: 'whatsapp' },
  ];

  const generateBotReply = (text: string): { reply: string; action?: ChatMessage['action'] } => {
    const q = text.toLowerCase();

    if (q.includes('horario') || q.includes('hora') || q.includes('aberto') || q.includes('fechado') || q.includes('sabado') || q.includes('domingo')) {
      return {
        reply: `Nosso expediente oficial é de **segunda a sexta-feira, das 9h às 17h**, sem intervalo para almoço. **Fechado aos sábados e domingos** (mantendo plantão legal exclusivo de óbito). Estamos na Av. Adriano Galvão de Castro, 255 - Frei Galvão, Potim - SP.`,
        action: { label: 'Agendar um Horário', actionType: 'open_appointment' },
      };
    }

    if (q.includes('agendar') || q.includes('marcar') || q.includes('horário') || q.includes('vaga')) {
      return {
        reply: `Você pode realizar o agendamento de forma automática e rápida aqui mesmo no portal, respeitando o horário oficial de segunda a sexta, das 9h às 17h. Ao finalizar, você receberá seu número de protocolo e comprovante de atendimento.`,
        action: { label: 'Abrir Agendamento Online', actionType: 'open_appointment' },
      };
    }

    if (q.includes('casar') || q.includes('casamento') || q.includes('noivos') || q.includes('habilita')) {
      return {
        reply: `Para o Casamento Civil, o processo de habilitação deve ser aberto com 30 a 90 dias de antecedência. Documentos necessários: Certidão de Nascimento atualizada (máx. 90 dias) de ambos, RG e CPF, comprovante de residência em Potim de pelo menos um dos noivos e duas testemunhas maiores de 18 anos.`,
        action: { label: 'Agendar Habilitação de Casamento', actionType: 'open_appointment', target: 'casamento-civil' },
      };
    }

    if (q.includes('certidao') || q.includes('2ª via') || q.includes('segunda via') || q.includes('nascimento') || q.includes('obito')) {
      return {
        reply: `Você pode solicitar a 2ª via de certidões (Nascimento, Casamento ou Óbito) de Potim ou de qualquer cartório do Brasil pela CRC Nacional. Disponibilizamos formato digital (PDF ICP-Brasil) ou certidão em papel oficial de segurança com retirada ou envio via Correios.`,
        action: { label: 'Ir para Solicitação de Certidões', actionType: 'navigate_section', target: 'certidoes' },
      };
    }

    if (q.includes('firma') || q.includes('autentic') || q.includes('copia')) {
      return {
        reply: `Para reconhecimento de firma e autenticação de documentos, compareça com documento de identidade oficial original com foto (RG ou CNH) e CPF. O atendimento para firmas pode ser feito por ordem de chegada no balcão ou com hora marcada.`,
        action: { label: 'Agendar Reconhecimento de Firma', actionType: 'open_appointment', target: 'reconhecimento-firma-autenticacao' },
      };
    }

    if (q.includes('escritura') || q.includes('compra') || q.includes('venda') || q.includes('imovel') || q.includes('doacao')) {
      return {
        reply: `Lavramos Escrituras Públicas de Compra e Venda, Doação, Permuta e União Estável. São necessários: certidão de matrícula do imóvel atualizada (ônus e ações), carnê do IPTU, guias de ITBI ou ITCMD e documentos pessoais das partes. O ato pode ser feito presencialmente ou por videoconferência via e-Notariado.`,
        action: { label: 'Agendar Escritura Pública', actionType: 'open_appointment', target: 'escrituras-publicas' },
      };
    }

    if (q.includes('lgpd') || q.includes('dado') || q.includes('privacidade') || q.includes('provimento') || q.includes('213')) {
      return {
        reply: `O Cartório de Potim cumpre rigorosamente o Provimento nº 213 do CNJ e a LGPD (Lei 13.709/18). Os dados são tratados com base legal no cumprimento de dever público registral, com criptografia avançada e canal direto com nosso DPO em dpo@cartoriodepotim.com.br.`,
        action: { label: 'Ver Seção de Conformidade', actionType: 'navigate_section', target: 'conformidade' },
      };
    }

    if (q.includes('whatsapp') || q.includes('falar') || q.includes('humano') || q.includes('atendente') || q.includes('telefone')) {
      return {
        reply: `Você pode conversar diretamente com um de nossos colaboradores pelo WhatsApp oficial no número (12) 3112-1773 ou ligar para nosso telefone fixo de segunda a sexta, das 9h às 17h.`,
        action: { label: 'Abrir WhatsApp do Cartório', actionType: 'open_whatsapp' },
      };
    }

    // Default Fallback
    return {
      reply: `Compreendo sua dúvida! O Cartório de Potim (Tabeliã Maria Luzia da Fonseca) atende de segunda a sexta, das 9h às 17h. Se preferir atendimento personalizado imediato, você pode falar diretamente com nossa equipe no WhatsApp oficial ou agendar um horário no sistema.`,
      action: { label: 'Falar no WhatsApp (12) 3112-1773', actionType: 'open_whatsapp' },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural typing delay
    setTimeout(() => {
      const { reply, action } = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: 'Agora',
        action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;
    if (action.actionType === 'open_appointment') {
      onOpenAppointment(action.target);
    } else if (action.actionType === 'open_whatsapp') {
      window.open(CARTORIO_INFO.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else if (action.actionType === 'navigate_section' && action.target) {
      onNavigate(action.target);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-2xl transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Abrir chat de suporte e dúvidas"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f2942]" />
          </div>
          <span>Dúvidas & Suporte</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[540px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn">
          {/* Chat Header */}
          <div className="bg-[#0f2942] text-white p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shrink-0">
                <Logo variant="crest-only" size="sm" />
              </div>
              <div>
                <h4 className="font-brand-cinzel font-bold text-sm text-white">
                  Cartório de Potim
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Suporte e Dúvidas Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Minimizar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 border-b border-slate-200 dark:border-slate-700/80 overflow-x-auto flex gap-1.5 scrollbar-thin">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.label)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 transition-colors cursor-pointer shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0f2942] text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Interactive Embedded Action Button */}
                  {m.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleActionClick(m.action)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px] shadow-sm transition-colors cursor-pointer"
                      >
                        <span>{m.action.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-400 text-xs italic p-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">Consultando base do cartório...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Digite sua dúvida sobre certidão, horário..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#0f2942] hover:bg-[#183d5f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-xl disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
