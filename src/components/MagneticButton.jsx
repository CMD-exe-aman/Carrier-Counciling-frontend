import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function MagneticButton({
  children,
  className = "",
  onClick = () => {},
  radius = 120, // 👈 Magnetic distance control
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);

    // Magnetic radius logic
    if (Math.sqrt(mx * mx + my * my) < radius) {
      setPos({ x: mx / 4, y: my / 4 });
    } else {
      setPos({ x: 0, y: 0 });
    }
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{
        x: pos.x,
        y: pos.y,
        // Floating animation
        transition: { type: "spring", stiffness: 150, damping: 12 },
      }}
      whileHover={{
        scale: 1.07,
        boxShadow: "0px 0px 35px rgba(0, 120, 255, 0.55)", // ✨ Glow
      }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block px-6 py-3 rounded-xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}
