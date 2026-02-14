import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

// Images
import productsHeaderImg from '../assets/fire-extinguisher-product.jpeg';
import fireExtImg from '../assets/fire-extinguisher-product.jpeg';
import alarmPanelImg from '../assets/fire-alarm-panel.jpeg';

export default function Products() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Extinguishers', 'Alarms', 'Suppression', 'Accessories'];

  const products = [
    {
      id: 1,
      category: 'Extinguishers',
      brand: 'Meteory',
      name: { ar: 'طفاية بودرة كيميائية جافة', en: 'Dry Chemical Powder Extinguisher' },
      model: 'PD-6',
      specs: { ar: 'سعة 6 كجم - ضغط مخزن - مناسب للحرائق A, B, C', en: '6kg Capacity - Stored Pressure - Suitable for A, B, C Class Fires' },
      image: fireExtImg
    },
    {
      id: 2,
      category: 'Extinguishers',
      brand: 'Meteory',
      name: { ar: 'طفاية ثاني أكسيد الكربون', en: 'CO2 Fire Extinguisher' },
      model: 'CD-5',
      specs: { ar: 'سعة 5 كجم - مناسب للحرائق الكهربائية B, C', en: '5kg Capacity - Suitable for Electrical Fires B, C' },
      image: fireExtImg
    },
    {
      id: 3,
      category: 'Alarms',
      brand: 'Apollo',
      name: { ar: 'كاشف دخان ضوئي', en: 'Optical Smoke Detector' },
      model: 'Series 65',
      specs: { ar: 'كشف سريع للدخان - تقنية التشتت الضوئي', en: 'Fast Smoke Detection - Light Scattering Technology' },
      image: alarmPanelImg
    },
    {
      id: 4,
      category: 'Alarms',
      brand: 'Apollo',
      name: { ar: 'كاشف حراري', en: 'Heat Detector' },
      model: 'Orbis',
      specs: { ar: 'استجابة سريعة للارتفاع المفاجئ في الحرارة', en: 'Rapid Response to Sudden Heat Rise' },
      image: alarmPanelImg
    },
    {
      id: 5,
      category: 'Suppression',
      brand: 'SRI',
      name: { ar: 'نظام إطفاء FM-200', en: 'FM-200 Suppression System' },
      model: 'Engineered',
      specs: { ar: 'نظام غمر كلي لغرف السيرفرات - صديق للبيئة', en: 'Total Flooding for Server Rooms - Eco-friendly' },
      image: productsHeaderImg
    },
    {
      id: 6,
      category: 'Suppression',
      brand: 'Meteory',
      name: { ar: 'نظام إطفاء مطابخ', en: 'Kitchen Hood System' },
      model: 'Wet Chemical',
      specs: { ar: 'حماية فعالة للزيوت والشحوم - معتمد UL', en: 'Effective Oil & Grease Protection - UL Listed' },
      image: productsHeaderImg
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = language === 'ar' 
      ? product.name.ar.toLowerCase().includes(searchQuery.toLowerCase())
      : product.name.en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('nav_products')} 
        subtitle={language === 'ar' ? 'أحدث معدات الإطفاء والإنذار من وكلاء عالميين' : 'Latest Firefighting & Alarm Equipment from Global Agents'}
        backgroundImage={productsHeaderImg}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-zinc-50 p-6 border border-zinc-200 rounded-none shadow-sm sticky top-24 z-30">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-500 border-zinc-300 hover:border-primary hover:text-primary'
                }`}
              >
                {cat === 'All' && language === 'ar' ? 'الكل' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <Input 
               placeholder={language === 'ar' ? 'بحث عن منتج...' : 'Search products...'} 
               className="pl-10 bg-white border-zinc-300 focus:ring-primary rounded-none"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <AnimatedCard className="h-full flex flex-col group">
                  <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                     <div className="absolute top-4 left-4 z-10">
                        <Badge variant="secondary" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
                           {product.brand}
                        </Badge>
                     </div>
                     <img 
                       src={product.image} 
                       alt={language === 'ar' ? product.name.ar : product.name.en} 
                       className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                     />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col border-t border-zinc-100">
                     <div className="mb-4 flex-1">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">{product.model}</span>
                        <h3 className="text-lg font-bold text-primary leading-tight mb-2">
                           {language === 'ar' ? product.name.ar : product.name.en}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                           {language === 'ar' ? product.specs.ar : product.specs.en}
                        </p>
                     </div>
                     
                     <Button variant="outline" className="w-full rounded-none border-zinc-300 hover:bg-primary hover:text-white uppercase tracking-wider font-bold text-xs h-10 transition-colors">
                        {language === 'ar' ? 'المواصفات الفنية' : 'View Specs'}
                     </Button>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
             <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p>{language === 'ar' ? 'لا توجد منتجات تطابق بحثك' : 'No products match your search'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
