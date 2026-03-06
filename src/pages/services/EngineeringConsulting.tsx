import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { PenTool, ArrowRight, FileCheck2, Calculator } from 'lucide-react';

import headerImg from '@/assets/services-design.jpg';

export default function EngineeringConsulting() {
  const { language } = useLanguage();

  const bullets = [
    {
      ar: 'تصميم هندسي واعتمادات (Shop Drawings + مراجعات).',
      en: 'Engineering design and approvals (shop drawings + reviews).'
    },
    { ar: 'حسابات هيدروليكية وتنسيق مسارات التنفيذ.', en: 'Hydraulic calculations and execution routing coordination.' },
    { ar: 'مراجعة تكامل الأنظمة (إنذار + إطفاء) قبل التسليم.', en: 'System integration review (alarm + suppression) before handover.' },
    { ar: 'تقديرات أولية (مثل FM-200) لدعم قرار التصميم.', en: 'Early-stage estimations (e.g., FM-200) to support design decisions.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={language === 'ar' ? 'استشارات هندسية' : 'Engineering Consulting'}
        subtitle={
          language === 'ar'
            ? 'وضوح في نطاق العمل — مستندات جاهزة للتنفيذ — تسليم منظم'
            : 'Clear scope — execution-ready documents — structured handover'
        }
        backgroundImage={headerImg}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 nb-card p-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-3 border-[var(--nb-stroke)] bg-secondary/10 flex items-center justify-center nb-shadow-sm">
                <PenTool className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-bold">
                  {language === 'ar' ? 'خدمة تخصصية' : 'Specialized Service'}
                </div>
                <div className="text-2xl font-display font-bold text-primary uppercase">
                  {language === 'ar' ? 'من الفكرة إلى ملف التسليم' : 'From concept to handover pack'}
                </div>
              </div>
            </div>

            <p className="mt-6 text-zinc-700 leading-relaxed">
              {language === 'ar'
                ? 'نساعد فرق الاستشارات والمقاولات على الوصول لتصميم قابل للتنفيذ وتسليم منظم، مع مراجعات وتنسيق يحدّ من التعارضات أثناء التنفيذ.'
                : 'We help consultants and contractors arrive at an execution-ready design and structured handover, with reviews and coordination that reduce site clashes.'}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
                  <FileCheck2 className="w-5 h-5 text-secondary mt-0.5" />
                  <span className="text-sm text-zinc-700">{language === 'ar' ? b.ar : b.en}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-secondary text-white px-5 py-3 font-bold uppercase tracking-widest nb-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
              >
                {language === 'ar' ? 'اطلب عرض سعر' : 'Request a Quote'}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-white text-primary px-5 py-3 font-bold uppercase tracking-widest nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
              >
                {language === 'ar' ? 'كل الخدمات' : 'All Services'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-5 border-3 border-[var(--nb-stroke)] bg-white nb-shadow p-8"
          >
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" />
              <div className="text-sm font-bold uppercase tracking-widest text-primary">
                {language === 'ar' ? 'أداة سريعة' : 'Quick Tool'}
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-700">
              {language === 'ar'
                ? 'يمكنك استخدام حاسبة FM-200 للتقدير المبدئي قبل اعتماد التصميم النهائي.'
                : 'Use the FM-200 calculator for early estimation before final design approval.'}
            </p>
            <Link
              href="/calculator"
              className="mt-6 inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-primary text-white px-5 py-3 font-bold uppercase tracking-widest nb-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {language === 'ar' ? 'افتح الحاسبة' : 'Open Calculator'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
