import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0.1 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        mass: 1, 
        delay: delay 
      }}
      className={cn("group bg-white border border-zinc-200 hover:border-secondary transition-all duration-300 hover:shadow-xl relative overflow-hidden h-full rounded-none", className)}
    >
      {/* Accent on hover */}
      <div className="absolute top-0 right-0 w-full h-1 bg-secondary transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
      
      {children}
    </motion.div>
  );
}
