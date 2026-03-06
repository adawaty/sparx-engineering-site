import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BellRing, Siren, ArrowRight, ShieldCheck } from 'lucide-react';

import headerImg from '@/assets/fire-alarm-panel.jpeg';

function AlarmDemo({ label }: { label: string }) {
  return (
    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <svg viewBox="0 0 520 160" className="mt-3 w-full h-[120px]" role="img" aria-label={label}>
        <defs>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .ping { animation: ping 1200ms ease-in-out infinite; transform-origin: center; }
              .dash { stroke-dasharray: 10 10; animation: dash 900ms linear infinite; }
            }
            @keyframes ping { 0%,100%{opacity:.25; transform:scale(1)} 50%{opacity:1; transform:scale(1.08)} }
            @keyframes dash { to { stroke-dashoffset: -40; } }
          `}</style>
        </defs>
        <rect x="10" y="10" width="500" height="140" fill="none" stroke="var(--nb-stroke)" strokeWidth="3" />

        {/* Detectors */}
        <circle cx="90" cy="60" r="16" fill="oklch(0.20 0.06 265)" opacity="0.12" />
        <circle cx="90" cy="60" r="10" fill="oklch(0.53 0.23 29)" className="ping" />
        <text x="60" y="104" fontSize="12" fill="var(--nb-stroke)" fontWeight="700">DETECT</text>

        <circle cx="180" cy="60" r="16" fill="oklch(0.20 0.06 265)" opacity="0.12" />
        <circle cx="180" cy="60" r="10" fill="oklch(0.53 0.23 29)" className="ping" style={{ animationDelay: '200ms' }} />

        {/* Panel */}
        <rect x="240" y="40" width="120" height="80" fill="white" stroke="var(--nb-stroke)" strokeWidth="3" />
        <rect x="254" y="54" width="92" height="18" fill="oklch(0.53 0.23 29)" opacity="0.18" />
        <path d="M254 86 H346" stroke="var(--nb-stroke)" strokeWidth="2" />
        <text x="260" y="35" fontSize="12" fill="var(--nb-stroke)" fontWeight="700">FACP</text>

        {/* Output to siren */}
        <path d="M200 60 H240" stroke="oklch(0.53 0.23 29)" strokeWidth="6" className="dash" />
        <path d="M360 80 H440" stroke="oklch(0.20 0.06 265)" strokeWidth="6" className="dash" />

        {/* Siren */}
        <circle cx="470" cy="80" r="22" fill="oklch(0.20 0.06 265)" opacity="0.12" />
        <circle cx="470" cy="80" r="14" fill="oklch(0.53 0.23 29)" className="ping" style={{ animationDelay: '400ms' }} />
        <text x="448" y="120" fontSize="12" fill="var(--nb-stroke)" fontWeight="700">ALARM</text>
      </svg>
    </div>
  );
}

export default function FireAlarmSystems() {
  const { language } = useLanguage();

  const bullets = [
    {
      ar: 'تصميم وتوزيع الكواشف (Smoke/Heat) حسب تقسيم المناطق.',
      en: 'Detector layout (Smoke/Heat) with proper zoning.'
    },
    { ar: 'ربط اللوحات، وحدات الإدخال/الإخراج، وصفارات الإنذار.', en: 'Panels, I/O modules, sounders and beacons integration.' },
    { ar: 'اختبارات تشغيل وتكامل وربط مع أنظمة الإطفاء.', en: 'Functional/integration tests and tie-in with suppression systems.' },
    { ar: 'تسليم مخططات المناطق وإعدادات النظام الأساسية.', en: 'Zoning drawings and documented baseline settings.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={language === 'ar' ? 'أنظمة إنذار الحريق' : 'Fire Alarm Systems'}
        subtitle={
          language === 'ar'
            ? 'كشف مبكر + منطق تشغيل واضح + تكامل مع الإطفاء'
            : 'Early detection + clear control logic + suppression integration'
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
                <BellRing className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-bold">
                  {language === 'ar' ? 'خدمة أساسية' : 'Core Service'}
                </div>
                <div className="text-2xl font-display font-bold text-primary uppercase">
                  {language === 'ar' ? 'رؤية مبكرة — تحكم دقيق' : 'Early visibility — precise control'}
                </div>
              </div>
            </div>

            <p className="mt-6 text-zinc-700 leading-relaxed">
              {language === 'ar'
                ? 'نصمم وننفّذ أنظمة الإنذار لتوفير كشف مبكر وتوجيه واضح للإخلاء وربط الأنظمة المساندة وفق تقسيم مناطق مناسب للموقع.'
                : 'We design and deliver fire alarm systems for early detection, clear evacuation signaling, and integration with supporting systems through proper zoning.'}
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
            className="lg:col-span-5 space-y-4"
          >
            <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow p-6">
              <div className="flex items-center gap-3">
                <Siren className="w-6 h-6 text-primary" />
                <div className="text-sm font-bold uppercase tracking-widest text-primary">
                  {language === 'ar' ? 'عرض توضيحي (محاكاة)' : 'Demo (Simulation)'}
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-700">
                {language === 'ar'
                  ? 'محاكاة مبسطة لمسار الإشارة: كاشف → لوحة إنذار → صفارة/لمبة.'
                  : 'A simplified signal path simulation: detector → panel → alarm output.'}
              </p>
            </div>

            <AlarmDemo label={language === 'ar' ? 'محاكاة الإشارة' : 'Signal Simulation'} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
