import React, { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { Send, X, Globe, ExternalLink, Key, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { BIO_STAGES, ACHIEVEMENTS, DISCOGRAPHY, TOP_SONGS, BOOK_HIGHLIGHTS } from '../../constants';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: { uri: string; title: string }[];
  isError?: boolean;
}

// Prepare Context Data
const CONTEXT_DATA = `
INFORMACIÓN OFICIAL DEL SITIO WEB:

BIOGRAFÍA (BIO_STAGES):
${BIO_STAGES.map(s => `- ${s.year}: ${s.title}. ${s.description} (${s.longText})`).join('\n')}

LOGROS (ACHIEVEMENTS):
${ACHIEVEMENTS.map(a => `- ${a.year}: ${a.title}`).join('\n')}

DISCOGRAFÍA (DISCOGRAPHY):
${DISCOGRAPHY.map(d => `- ${d.year}: Álbum "${d.title}" verificado en ${d.label}. Hits: ${d.hits.join(', ')}`).join('\n')}

CANCIONES DESTACADAS (TOP_SONGS):
${TOP_SONGS.map(s => `- "${s.title}" del álbum ${s.album}`).join('\n')}

LIBRO OFICIAL (BOOK_HIGHLIGHTS):
${BOOK_HIGHLIGHTS.map(b => `- ${b.title}: ${b.description}`).join('\n')}
`;

const SYSTEM_INSTRUCTION = `Eres "El Bravo Bot", el historiador oficial de Johnny El Bravo López. 
Tu tono es de un boricua veterano, respetuoso, con sabor y mucha clase. 
Johnny nació el 4 de mayo de 1944. Es una leyenda de la salsa brava, famoso por su orquesta de potentes metales y su transformación espiritual.

TIENES ACCESO EXCLUSIVO A LA SIGUIENTE INFORMACIÓN DEL ARCHIVO HISTÓRICO:
${CONTEXT_DATA}

INSTRUCCIONES CLAVE:
1. Usa la información provista arriba para responder preguntas específicas sobre fechas, álbumes y premios.
2. Si te preguntan sobre el "Congo de Oro", confirma que lo ganó en 2016 en Barranquilla.
3. Si hablas de algo que está en el libro "Una leyenda viva de la salsa y miles de historias", cítalo con orgullo.
4. Tus respuestas deben ser concisas pero precisas, basadas en estos datos.`;

const BOT_AVATAR_URL = "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/ChatGPT-Image-18-ene-2026-18_42_38.png";

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: '¡Epa! Saludos, familia. Aquí El Bravo Bot. Tengo acceso directo a los archivos oficiales: discografía, premios y la historia no contada. ¿Qué quieres saber de la leyenda?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = { role: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const history = messages.map(m => ({
        role: m.role,
        content: m.text
      }));

      // Add current user message
      history.push({ role: 'user', content: userText });

      // Prepend system message
      const fullMessages = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...history
      ];

      const completion = await groq.chat.completions.create({
        messages: fullMessages as any[],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 1024,
      });

      const modelText = completion.choices[0]?.message?.content || 'Oye, parece que se rompió un cuero en la conga. Intenta de nuevo, chévere.';

      setMessages(prev => [...prev, { role: 'assistant', text: modelText }]);
    } catch (error: any) {
      console.error('Chat API Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        isError: true,
        text: 'Perdóname, familia, la señal en el estudio está fallando. Verifica tu conexión o intenta más tarde.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[200]">
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2.5 bg-black border border-[#c5a059]/50 pl-1.5 pr-4 py-1.5 rounded-full shadow-[0_0_50px_rgba(197,160,89,0.3)] transition-all active:scale-95 hover:bg-zinc-900 group",
          isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"
        )}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5a059]/30">
          <img src={BOT_AVATAR_URL} alt="El Bravo Avatar Historiador" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[#c5a059] text-[7px] font-black uppercase tracking-[0.4em] mb-1 group-hover:animate-pulse">Hablemos del Bravo</span>
          <span className="text-white text-[10px] font-bold uppercase tracking-tight">El Bravo Bot</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-0 right-0 w-[92vw] max-w-[420px] h-[650px] bg-[#080808] border border-[#c5a059]/30 rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,1)]"
          >
            {/* Header */}
            <div className="p-6 bg-zinc-900/90 border-b border-[#c5a059]/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#c5a059]/20 overflow-hidden bg-black shadow-inner">
                  <img src={BOT_AVATAR_URL} alt="Avatar Bot Historiador" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#c5a059]">Historiador Bravo</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-white/50 uppercase font-bold tracking-widest">En Línea</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 transition-colors"
                aria-label="Cerrar chat de Johnny El Bravo"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] bg-fixed"
            >
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col w-full", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[88%] p-5 text-[14px] leading-relaxed shadow-2xl relative",
                    msg.role === 'user'
                      ? "bg-[#c5a059] text-black font-bold rounded-3xl rounded-tr-none"
                      : msg.isError ? "bg-red-900/20 text-red-200 border border-red-500/30 rounded-3xl rounded-tl-none" : "bg-zinc-900/90 text-gray-200 rounded-3xl rounded-tl-none border border-white/5"
                  )}>
                    {msg.text}

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] text-[#c5a059] font-black uppercase tracking-widest opacity-60">
                          <Globe size={10} /> Fuentes verificadas:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-[#c5a059]/20 rounded-lg text-[9px] text-white/60 hover:text-white hover:border-[#c5a059] transition-all group/link"
                            >
                              <span className="truncate max-w-[120px] font-bold">{src.title}</span>
                              <ExternalLink size={8} className="group-hover/link:translate-x-0.5 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 p-3 items-center opacity-40">
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white ml-2">Consultando Archivos...</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-6 bg-black border-t border-white/5"
            >
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntale al historiador..."
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#c5a059]/50 transition-all placeholder:text-white/20 shadow-inner"
                  aria-label="Escribe tu pregunta para Johnny El Bravo"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 bg-[#c5a059] text-black rounded-2xl flex items-center justify-center hover:bg-white active:scale-90 transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:opacity-10 disabled:grayscale"
                  aria-label="Enviar pregunta"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};