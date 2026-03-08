import { useState, useCallback, useRef, useEffect } from 'react';

type VoiceMode = 'voice-text' | 'text-only';

const VOICE_MODE_KEY = 'elevate-stylist-voice-mode';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>(() => {
    try {
      return (localStorage.getItem(VOICE_MODE_KEY) as VoiceMode) || 'voice-text';
    } catch {
      return 'voice-text';
    }
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    try {
      localStorage.setItem(VOICE_MODE_KEY, voiceMode);
    } catch {}
  }, [voiceMode]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\[\[product:\d+\]\]/g, '')
      .replace(/[*_~`#>]+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ' ')
      .trim();
  };

  const speak = useCallback((text: string) => {
    if (!isSupported || voiceMode === 'text-only') return;
    window.speechSynthesis.cancel();

    const clean = stripMarkdown(text);
    if (!clean) return;

    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate = 1.0;
    utt.pitch = 1.0;
    utt.volume = 1.0;

    // Try to pick a natural-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utt.voice = preferred;

    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [isSupported, voiceMode]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const replay = useCallback((text: string) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    const clean = stripMarkdown(text);
    if (!clean) return;

    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate = 1.0;
    utt.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utt.voice = preferred;

    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utt);
  }, [isSupported]);

  const toggleMode = useCallback(() => {
    setVoiceMode(prev => {
      const next = prev === 'voice-text' ? 'text-only' : 'voice-text';
      if (next === 'text-only') {
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      }
      return next;
    });
  }, []);

  return { speak, stop, replay, isSpeaking, voiceMode, toggleMode, isSupported };
}
