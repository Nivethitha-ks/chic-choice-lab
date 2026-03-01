import React, { useState, useCallback, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) {
        onTranscript(transcript.trim());
      }
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, onTranscript]);

  if (!isSupported) return null;

  return (
    <motion.button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
        isListening
          ? 'bg-destructive text-destructive-foreground animate-pulse'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
      whileTap={{ scale: 0.9 }}
      title={isListening ? 'Stop listening' : 'Voice input'}
    >
      {isListening ? <MicOff size={16} /> : <Mic size={16} />}
    </motion.button>
  );
};

export default VoiceInputButton;
