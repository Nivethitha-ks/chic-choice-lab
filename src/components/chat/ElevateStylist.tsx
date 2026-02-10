import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWardrobeMemory } from '@/context/WardrobeMemoryContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stylist-chat`;

const quickActions = [
  { label: 'Office outfit', message: 'Suggest a stylish office outfit under ₹5000' },
  { label: 'Party look', message: 'I need a party outfit for tonight' },
  { label: 'Casual weekend', message: 'What should I wear for a casual weekend outing?' },
  { label: 'Wedding guest', message: 'Help me dress for a wedding' },
];

const ElevateStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { getStyleProfile } = useWardrobeMemory();

  // Auto-greet after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasGreeted && !isOpen) {
        setShowBubble(true);
        setHasGreeted(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasGreeted, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const streamChat = useCallback(async (allMessages: Message[]) => {
    const wardrobeContext = getStyleProfile();

    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages, wardrobeContext }),
    });

    if (!resp.ok || !resp.body) {
      const err = await resp.json().catch(() => ({ error: 'Something went wrong' }));
      throw new Error(err.error || 'Failed to connect');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantSoFar = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant') {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
              }
              return [...prev, { role: 'assistant', content: assistantSoFar }];
            });
          }
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  }, [getStyleProfile]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hey there! 👋 I'm your **Elevate Stylist**. Whether you need an outfit for a meeting, a wedding, or just a chill weekend — I've got you. What's the occasion?",
      }]);
    }
  };

  return (
    <>
      {/* Greeting bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 bg-card border border-border rounded-2xl rounded-br-sm p-4 max-w-[260px]"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
          >
            <button onClick={() => setShowBubble(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
            <p className="text-sm font-medium pr-4">Looking to upgrade your style today? ✨</p>
            <button onClick={handleOpen} className="mt-2 text-xs text-accent font-medium flex items-center gap-1 hover:underline">
              Chat with stylist <ArrowRight size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[520px] bg-card border border-border rounded-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles size={16} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Elevate Stylist</h3>
                  <p className="text-[10px] text-muted-foreground">Your personal fashion AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-secondary rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none [&>p]:m-0 [&>p+p]:mt-1.5 [&>ul]:my-1 [&>ul]:pl-4">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions (show only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickActions.map(action => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.message)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-border">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask your stylist..."
                  className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ElevateStylist;
