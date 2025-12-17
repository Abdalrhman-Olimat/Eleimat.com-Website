import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export const GlitchText = ({
  text,
  className = "",
  as: Component = "span",
}: GlitchTextProps) => {
  return (
    <Component
      className={`glitch relative inline-block ${className}`}
      data-text={text}
    >
      {text}
    </Component>
  );
};

// Animated variant with more intense effects
export const AnimatedGlitchText = ({
  text,
  className = "",
}: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      {/* Glitch layers - only visible during glitch animation */}
      <motion.span
        className="absolute top-0 left-0 text-secondary"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, -3, 3, -1, 1, 0],
          opacity: [0, 0.7, 0, 0.5, 0, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 text-primary"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, 3, -3, 1, -1, 0],
          opacity: [0, 0.5, 0, 0.7, 0, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.05,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.div>
  );
};
