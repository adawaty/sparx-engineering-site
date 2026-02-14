import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Calculator, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FM200Calculator() {
  const { t, language } = useLanguage();
  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [result, setResult] = useState<string | null>(null);

  const calculateGas = () => {
    if (typeof length !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
      return;
    }

    const volume = length * width * height;
    // Rough estimate factor for FM-200 (approx 0.5 - 0.6 kg/m3 depending on concentration/temp)
    // Using 0.55 kg/m3 as a simplified average for estimation.
    const estimatedMass = volume * 0.55; 

    setResult(estimatedMass.toFixed(2));
  };

  const resetCalc = () => {
     setLength('');
     setWidth('');
     setHeight('');
     setResult(null);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden relative font-mono text-zinc-300">
      {/* Header Bar */}
      <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center">
         <div className="flex items-center gap-2 text-secondary">
            <Calculator size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Sparx Eng. Tool v1.0</span>
         </div>
         <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
         </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
         <div className="text-center space-y-2">
            <h3 className="text-white font-bold text-xl uppercase tracking-wider">{t('calc_title')}</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">{t('calc_desc')}</p>
         </div>

         {/* Inputs Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">{t('room_length')}</label>
               <div className="relative">
                  <input 
                     type="number" 
                     className="w-full bg-zinc-950 border border-zinc-700 text-white p-3 text-center focus:border-secondary focus:outline-none transition-colors font-bold text-lg"
                     placeholder="0.0"
                     value={length} 
                     onChange={(e) => setLength(parseFloat(e.target.value))} 
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">m</span>
               </div>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">{t('room_width')}</label>
               <div className="relative">
                  <input 
                     type="number" 
                     className="w-full bg-zinc-950 border border-zinc-700 text-white p-3 text-center focus:border-secondary focus:outline-none transition-colors font-bold text-lg"
                     placeholder="0.0"
                     value={width} 
                     onChange={(e) => setWidth(parseFloat(e.target.value))} 
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">m</span>
               </div>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">{t('room_height')}</label>
               <div className="relative">
                  <input 
                     type="number" 
                     className="w-full bg-zinc-950 border border-zinc-700 text-white p-3 text-center focus:border-secondary focus:outline-none transition-colors font-bold text-lg"
                     placeholder="0.0"
                     value={height} 
                     onChange={(e) => setHeight(parseFloat(e.target.value))} 
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">m</span>
               </div>
            </div>
         </div>

         {/* Actions */}
         <div className="grid grid-cols-4 gap-4">
            <button 
               onClick={resetCalc}
               className="col-span-1 bg-zinc-800 hover:bg-zinc-700 text-white p-3 flex items-center justify-center transition-colors border border-zinc-600"
            >
               <RefreshCw size={18} />
            </button>
            <button 
               onClick={calculateGas}
               className="col-span-3 bg-secondary hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm transition-colors border border-red-900 shadow-[0_0_15px_rgba(215,38,46,0.3)]"
            >
               {t('calculate')}
            </button>
         </div>

         {/* Result Display */}
         <div className={`mt-6 transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-zinc-950 border border-secondary/30 p-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
               <p className="text-xs text-secondary font-bold uppercase tracking-widest text-center mb-2">{t('result_mass')}</p>
               <div className="text-5xl font-bold text-white text-center tracking-tighter tabular-nums">
                  {result} <span className="text-lg text-zinc-500 font-normal">KG</span>
               </div>
            </div>
            <div className="mt-4 flex gap-2 items-start text-zinc-500 text-[10px] leading-tight bg-black/20 p-2 border border-white/5">
               <Info size={12} className="flex-shrink-0 mt-0.5 text-secondary" />
               <p>{t('disclaimer')}</p>
            </div>
         </div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    </div>
  );
}
