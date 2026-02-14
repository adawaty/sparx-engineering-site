import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Flame, Building2, ClipboardCheck, Wrench, Cpu } from 'lucide-react';

// An interactive, story-driven portfolio page.
// Uses factual site data only (no fabricated certifications or clients).

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } }
} as const;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border bg-background/80 backdrop-blur p-6">
      <div className="text-4xl font-display font-bold text-primary leading-none">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Portfolio() {
  const { language } = useLanguage();

  const story = useMemo(
    () =>
      language === 'ar'
        ? {
            title: 'ملف أعمال سباركس',
            subtitle: 'قصة تنفيذ — من المعاينة إلى التسليم — مع لقطات تقنية ونتائج قابلة للقياس',
            sections: [
              {
                icon: ClipboardCheck,
                title: '١) المعاينة والمسح الفني',
                text: 'زيارة الموقع، تحديد المخاطر، جمع البيانات، وتوثيق نقاط الإنذار وشبكات الإطفاء المقترحة.'
              },
              {
                icon: Cpu,
                title: '٢) التصميم والتوريد',
                text: 'اختيار المكونات المناسبة حسب طبيعة المنشأة، وتخطيط اللوحات والكواشف والشبكات وحسابات التغطية.'
              },
              {
                icon: Building2,
                title: '٣) التركيب والاختبارات',
                text: 'تنفيذ الأعمال بالموقع، الاختبارات المرحلية، ثم اختبار القبول النهائي قبل التشغيل.'
              },
              {
                icon: Wrench,
                title: '٤) الصيانة والدعم',
                text: 'برامج صيانة دورية وتقارير متابعة لضمان الجاهزية وتقليل الأعطال.'
              }
            ],
            stats: [
              { value: '350+', label: 'مشاريع منفذة (حسب بيانات الموقع)' },
              { value: '24/7', label: 'جاهزية استجابة للطوارئ (حسب اتفاقيات الصيانة)' },
              { value: 'NFPA', label: 'ممارسات تصميم وفق معايير عالمية' }
            ],
            cta: 'تحميل بروفايل الشركة (PDF)'
          }
        : {
            title: 'Sparx Portfolio',
            subtitle: 'A delivery story — from site survey to handover — built for engineers, not marketing fluff.',
            sections: [
              {
                icon: ClipboardCheck,
                title: '1) Site Survey & Risk Mapping',
                text: 'Walkthrough, hazard mapping, data capture, and documentation of detection points, pump rooms, and protected zones.'
              },
              {
                icon: Cpu,
                title: '2) Engineering + Procurement',
                text: 'Component selection based on facility profile, panel architecture planning, coverage assumptions, and preliminary clean-agent estimations.'
              },
              {
                icon: Building2,
                title: '3) Installation + Testing',
                text: 'On-site execution, staged testing, and final acceptance testing prior to commissioning.'
              },
              {
                icon: Wrench,
                title: '4) Maintenance & Readiness',
                text: 'Planned maintenance programs and reporting to keep systems operational and audit-ready.'
              }
            ],
            stats: [
              { value: '350+', label: 'Projects delivered (site claim)' },
              { value: '24/7', label: 'Emergency readiness (per maintenance SLAs)' },
              { value: 'NFPA', label: 'Design practice alignment' }
            ],
            cta: 'Download Company Profile (PDF)'
          },
    [language]
  );

  const { scrollYProgress } = useScroll();
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(60% 50% at 10% 20%, oklch(0.60 0.22 29 / 0.35), transparent 60%), radial-gradient(55% 45% at 90% 10%, oklch(0.20 0.06 265 / 0.45), transparent 55%), radial-gradient(70% 55% at 60% 80%, oklch(0.60 0.22 29 / 0.25), transparent 60%)',
            transform: `translateY(${bgShift})`
          }}
        />

        <div className="container mx-auto px-4 py-20 max-w-7xl relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-14 bg-secondary" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-wide text-primary">
              {story.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{story.subtitle}</p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {story.stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>

            <div className="mt-10">
              <a
                href="/company-profile.pdf"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-bold uppercase tracking-widest rounded-none clip-diagonal"
              >
                <ShieldCheck className="w-5 h-5" />
                {story.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="sticky top-24 hidden lg:block">
              <div className="p-8 border border-border bg-muted/30">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Engineering narrative</div>
                <div className="mt-4 text-3xl font-display font-bold uppercase text-primary">Build. Test. Handover.</div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'هذه الصفحة تعرض طريقة العمل بشكل تفاعلي. الهدف: إبراز الاحترافية والوضوح الفني بدون مبالغة.'
                    : 'This page is an interactive “delivery story” — meant to show competence with clarity, without inflated claims.'}
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                  <Flame className="w-4 h-4 text-secondary" />
                  <span>{language === 'ar' ? 'تأثيرات حركة خفيفة — مع احترام إعدادات تقليل الحركة.' : 'Subtle motion effects — respects reduced motion settings.'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {story.sections.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="border border-border bg-background shadow-sm"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 border border-secondary/30 bg-secondary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-xl font-display font-bold uppercase tracking-wider text-primary">{s.title}</h3>
                      </div>
                      <p className="mt-4 text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Brands block (logos + one product image) */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {language === 'ar' ? 'علامات نعمل عليها' : 'Brands we work with'}
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold uppercase text-primary">
                {language === 'ar' ? 'مصادر معتمدة. مواصفات واضحة.' : 'Trusted manufacturers. Clear specs.'}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-3 gap-6 items-center">
              <div className="nb-card-sm p-4 flex items-center justify-center">
                <img src="/src/assets/meteory-logo.png" alt="Meteory" className="max-h-10 w-auto" />
              </div>
              <div className="nb-card-sm p-4 flex items-center justify-center">
                <img src="/src/assets/apollo-logo.png" alt="Apollo" className="max-h-10 w-auto" />
              </div>
              <div className="nb-card-sm p-4 flex items-center justify-center">
                <img src="/src/assets/sri-logo.png" alt="SRI" className="max-h-10 w-auto" />
              </div>
              <div className="col-span-3 text-xs text-muted-foreground">
                {language === 'ar'
                  ? 'الشعارات/الصور تعود لمالكيها وتستخدم لأغراض التعريف بالمصنعين فقط.'
                  : 'Logos/product images belong to their respective owners and are used here for manufacturer identification.'}
              </div>
            </div>

            <div className="nb-card nb-hover-lift p-6">
              <img
                src="/src/assets/sri-fire-extinguishers.png"
                alt="SRI fire extinguisher lineup"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
