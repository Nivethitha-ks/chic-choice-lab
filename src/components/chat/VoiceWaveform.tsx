import React from 'react';
import { motion } from 'framer-motion';

const VoiceWaveform: React.FC = () => {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center gap-[3px] h-4 px-1" role="status" aria-label="Speaking">
      {bars.map(i => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-accent"
          animate={{
            height: ['6px', '14px', '6px'],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
