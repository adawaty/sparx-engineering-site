import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, backgroundImage, className }: PageHeaderProps) {
  return (
    <div className={cn("relative h-[40vh] min-h-[300px] flex items-center overflow-hidden bg-zinc-900 text-white", className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <img 
            src={backgroundImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" 
            style={{ animationDuration: '20s' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 48 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="h-1 bg-secondary"
             ></motion.div>
             <span className="uppercase tracking-[0.2em] text-sm font-bold text-secondary">Sparx Engineering</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight uppercase tracking-wide">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light border-l-4 border-white/20 pl-6 mt-6">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
