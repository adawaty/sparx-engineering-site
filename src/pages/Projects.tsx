import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Warehouse, Home, Factory } from 'lucide-react';

// Images
import projectsHeaderImg from '../assets/project-textile-factory.jpeg';
import textileImg from '../assets/project-textile-factory.jpeg';
import dataCenterImg from '../assets/project-data-center.jpeg';

export default function Projects() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');

  const categories = [
    { id: 'All', label: { ar: 'الكل', en: 'All' } },
    { id: 'Industrial', label: { ar: 'صناعي', en: 'Industrial' } },
    { id: 'Commercial', label: { ar: 'تجاري', en: 'Commercial' } },
    { id: 'Residential', label: { ar: 'سكتي', en: 'Residential' } },
  ];

  const projects = [
    {
      id: 1,
      title: { ar: 'مصنع المنسوجات الحديثة', en: 'Modern Textile Factory' },
      category: 'Industrial',
      location: { ar: 'مدينة العاشر من رمضان', en: '10th of Ramadan City' },
      system: { ar: 'نظام رشاشات تلقائي + إنذار', en: 'Automatic Sprinkler + Alarm' },
      image: textileImg,
      icon: <Factory className="w-6 h-6" />
    },
    {
      id: 2,
      title: { ar: 'مركز بيانات البنك الأهلي', en: 'National Bank Data Center' },
      category: 'Commercial',
      location: { ar: 'التجمع الخامس', en: 'New Cairo' },
      system: { ar: 'نظام إطفاء غازي FM-200', en: 'FM-200 Suppression System' },
      image: dataCenterImg,
      icon: <Building2 className="w-6 h-6" />
    },
    {
      id: 3,
      title: { ar: 'مستودعات شركة الأدوية', en: 'Pharma Warehouses' },
      category: 'Industrial',
      location: { ar: 'المنطقة الصناعية - أكتوبر', en: '6th of October Industrial Zone' },
      system: { ar: 'صناديق حريق + كواشف دخان', en: 'Fire Cabinets + Smoke Detectors' },
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
      icon: <Warehouse className="w-6 h-6" />
    },
    {
      id: 4,
      title: { ar: 'كمبوند الياسمين', en: 'Al-Yasmeen Compound' },
      category: 'Residential',
      location: { ar: 'العاصمة الإدارية', en: 'New Administrative Capital' },
      system: { ar: 'شبكة حريق خارجية + أعمدة', en: 'External Hydrant Network' },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
      icon: <Home className="w-6 h-6" />
    },
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('nav_projects')} 
        subtitle={language === 'ar' ? 'سجل حافل بالإنجازات في مختلف القطاعات' : 'A Proven Track Record Across Various Sectors'}
        backgroundImage={projectsHeaderImg}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Filters */}
        <div className="flex justify-center mb-16 space-x-2 md:space-x-4">
           {categories.map((cat) => (
              <button
                 key={cat.id}
                 onClick={() => setFilter(cat.id)}
                 className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    filter === cat.id 
                       ? 'bg-primary text-white shadow-lg transform scale-105' 
                       : 'bg-zinc-100 text-gray-500 hover:bg-zinc-200'
                 }`}
              >
                 {language === 'ar' ? cat.label.ar : cat.label.en}
              </button>
           ))}
        </div>

        {/* Gallery */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
           <AnimatePresence>
              {filteredProjects.map((project) => (
                 <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    className="group"
                 >
                    <AnimatedCard className="h-full border-0 shadow-lg hover:shadow-2xl overflow-hidden rounded-none">
                       <div className="relative h-80 overflow-hidden">
                          <img 
                             src={project.image} 
                             alt={language === 'ar' ? project.title.ar : project.title.en} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center">
                             <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-white border border-white px-6 py-2 uppercase tracking-widest font-bold text-sm">
                                   {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                                </span>
                             </div>
                          </div>
                          <div className="absolute top-4 left-4 bg-secondary text-white p-2 z-10 shadow-md">
                             {project.icon}
                          </div>
                       </div>
                       
                       <div className="p-8 bg-zinc-50 border-t-4 border-secondary relative">
                          <Badge variant="outline" className="mb-4 border-zinc-300 text-zinc-500 uppercase tracking-widest text-[10px]">
                             {project.category}
                          </Badge>
                          <h3 className="text-2xl font-display font-bold text-primary uppercase mb-2">
                             {language === 'ar' ? project.title.ar : project.title.en}
                          </h3>
                          <p className="text-gray-500 mb-1 flex items-center gap-2 text-sm">
                             <span className="w-2 h-2 rounded-full bg-secondary"></span>
                             {language === 'ar' ? project.location.ar : project.location.en}
                          </p>
                          <p className="text-gray-500 flex items-center gap-2 text-sm">
                             <span className="w-2 h-2 rounded-full bg-primary"></span>
                             {language === 'ar' ? project.system.ar : project.system.en}
                          </p>
                       </div>
                    </AnimatedCard>
                 </motion.div>
              ))}
           </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
