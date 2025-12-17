import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "SYSTEM BOOT INITIATED...",
  "[OK] Loading kernel modules",
  "[OK] Mounting filesystems",
  "[OK] Starting network services",
  "[  ] Bypassing security protocols...",
  "[OK] Security bypassed",
  "[OK] Establishing encrypted connection",
  "[OK] Loading user profile: ABDALRAHMAN",
  "[OK] Initializing DedSec protocols",
  ">>> CONNECTION ESTABLISHED <<<",
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const onCompleteRef = useRef(onComplete);
  
  // Keep ref updated
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootMessages.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGlitching(true);
            setTimeout(() => onCompleteRef.current(), 300);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 bg-background flex items-center justify-center ${
          isGlitching ? "animate-[screen-tear_0.3s_ease-in-out]" : ""
        }`}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-1 bg-primary/20 animate-scan" />
        </div>

        <div className="max-w-2xl w-full px-8">
          {/* Terminal header */}
          <div className="border border-primary/50 rounded-sm mb-2">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/30 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="ml-4 text-primary font-terminal text-sm">
                root@dedsec:~#
              </span>
            </div>
            
            {/* Boot messages */}
            <div className="p-4 font-terminal text-lg space-y-1 min-h-[300px]">
              {bootMessages.slice(0, visibleLines).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${
                    message.includes("[OK]")
                      ? "text-primary"
                      : message.includes("[  ]")
                      ? "text-secondary"
                      : message.includes(">>>")
                      ? "text-secondary neon-text-purple"
                      : "text-primary/70"
                  }`}
                >
                  {message}
                </motion.div>
              ))}
              
              {/* Blinking cursor */}
              {visibleLines < bootMessages.length && (
                <span className="inline-block w-3 h-5 bg-primary animate-pulse" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(visibleLines / bootMessages.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
