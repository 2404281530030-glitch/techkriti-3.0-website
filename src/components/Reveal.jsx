// Lightweight drop-in replacements for react-awesome-reveal's Slide/Fade,
// built on framer-motion so they work with React 19 + SSR.
import React from 'react';
import { motion } from 'framer-motion';

function offsetFor(direction) {
  switch (direction) {
    case 'up':
      return { y: 40 };
    case 'down':
      return { y: -40 };
    case 'left':
      return { x: 40 };
    case 'right':
      return { x: -40 };
    default:
      return { y: 20 };
  }
}

function Reveal({ children, direction, delay = 0, style, className, distance = true }) {
  const offset = distance ? offsetFor(direction) : {};
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function Slide(props) {
  return <Reveal {...props} />;
}

export function Fade(props) {
  return <Reveal {...props} distance={false} />;
}

export default Reveal;
