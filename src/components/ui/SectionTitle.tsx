import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export function SectionTitle({ title, subtitle, className, align = 'left', theme = 'light' }: SectionTitleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "space-y-4 mb-12", 
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        className
      )}
    >
      <div className={cn("inline-block", align === 'center' && 'mx-auto')}>
        <h2 className={cn(
          "text-3xl md:text-5xl font-display font-bold uppercase leading-tight tracking-wider",
          theme === 'dark' ? 'text-white' : 'text-primary'
        )}>
          {title}
        </h2>
        <div className={cn(
          "h-1 bg-secondary mt-2 w-24",
          align === 'center' && 'mx-auto'
        )}></div>
      </div>
      
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl font-light",
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
