import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, ArrowRight, ClipboardCheck } from 'lucide-react';

import headerImg from '@/assets/services-installation.jpg';

export default function FirefightingSystems() {
  const { language } = useLanguage();

  const bullets = [
    {
      ar: 'أنظمة رشاشات تلقائية (Wet / Dry / Pre-action حسب الحاجة).',
      en: 'Automatic sprinkler systems (Wet / Dry / Pre-action as required).'
    },
    { ar: 'شبكات صناديق الحريق وخراطيم الحريق.', en: 'Fire cabinet and hose reel networks.' },
    { ar: 'شبكات خارجية Hydrants وغرف مضخات الحريق.', en: 'External hydrant networks and fire pump rooms.' },
    { ar: 'اختبارات الضغط والتشغيل والتسليم.', en: 'Pressure testing, commissioning, and handover.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={language === 'ar' ? 'أنظمة مكافحة الحريق' : 'Firefighting Systems'}
        subtitle={
          language === 'ar'
            ? 'تصميم، توريد، تركيب وتشغيل — حلول ميدانية جاهزة للتسليم'
            : 'Design, supply, installation & commissioning — field-ready solutions'
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
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-bold">
                  {language === 'ar' ? 'خدمة أساسية' : 'Core Service'}
                </div>
                <div className="text-2xl font-display font-bold text-primary uppercase">
                  {language === 'ar' ? 'حماية فعّالة للمنشآت' : 'Effective Facility Protection'}
                </div>
              </div>
            </div>

            <p className="mt-6 text-zinc-700 leading-relaxed">
              {language === 'ar'
                ? 'ننفّذ أنظمة مكافحة الحريق للمصانع والمخازن والمنشآت الصناعية وفق نطاق واضح: التصميم، التوريد، التركيب، الاختبار والتسليم.'
                : 'We deliver firefighting systems for factories, warehouses, and industrial facilities with clear scope: design, supply, installation, testing, and handover.'}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
                  <ShieldCheck className="w-5 h-5 text-secondary mt-0.5" />
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
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <div className="text-sm font-bold uppercase tracking-widest text-primary">
                {language === 'ar' ? 'ما الذي ستحصل عليه' : 'What you get'}
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-zinc-700">
              <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
                {language === 'ar' ? 'رسومات تنفيذية + قائمة مواد (BoM) عند الحاجة.' : 'Shop drawings + bill of materials (when required).'}
              </div>
              <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
                {language === 'ar' ? 'اختبارات ضغط وتشغيل موثّقة.' : 'Documented pressure and functional tests.'}
              </div>
              <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
                {language === 'ar' ? 'تسليم نهائي وتوصيات تشغيل وصيانة.' : 'Final handover and O&M recommendations.'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
