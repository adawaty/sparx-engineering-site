import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Warehouse, Home, Factory, X, ArrowRight } from 'lucide-react';

// Images
import projectsHeaderImg from '../assets/project-textile-factory.jpeg';
import textileImg from '../assets/project-textile-factory.jpeg';
import dataCenterImg from '../assets/project-data-center.jpeg';

export default function Projects() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<any>(null);

  const categories = [
    { id: 'All', label: { ar: 'الكل', en: 'All' } },
    { id: 'Industrial', label: { ar: 'صناعي', en: 'Industrial' } },
    { id: 'Commercial', label: { ar: 'تجاري', en: 'Commercial' } },
    { id: 'Residential', label: { ar: 'سكتي', en: 'Residential' } },
  ];

  const projects = [
    // Note: Case studies below describe typical engineering scope & deliverables.
    // They avoid unverifiable performance claims and can be updated once project evidence is provided.

    {
      id: 1,
      title: { ar: 'مصنع المنسوجات الحديثة', en: 'Modern Textile Factory' },
      category: 'Industrial',
      location: { ar: 'مدينة العاشر من رمضان', en: '10th of Ramadan City' },
      system: { ar: 'نظام رشاشات تلقائي + إنذار', en: 'Automatic Sprinkler + Alarm' },
      image: textileImg,
      icon: <Factory className="w-6 h-6" />,
      caseStudy: {
        challenge: {
          ar: 'بيئة صناعية عالية المخاطر تتطلب تغطية رشاشات دقيقة وتقسيم مناطق واضح دون إيقاف التشغيل قدر الإمكان.',
          en: 'High-risk industrial environment requiring accurate sprinkler coverage, clear zoning, and minimal disruption to operations.'
        },
        solution: {
          ar: 'تصميم شبكة رشاشات معتمدة + ربط إنذار بالحريق، إعداد رسومات تنفيذية، وتنسيق الموقع لأعمال التركيب والاختبارات.',
          en: 'Approved sprinkler network design + fire alarm integration, shop drawings, site coordination for installation and testing.'
        },
        outcome: {
          ar: 'تسليم حزمة اختبار وتشغيل (FAT/SAT) ومحاضر استلام، مع تدريب مختصر لفريق الموقع على التشغيل الأساسي والصيانة الدورية.',
          en: 'Delivered commissioning package (FAT/SAT), handover documentation, and basic operator training for routine checks.'
        },
        highlights: [
          { ar: 'تخطيط مناطق الرشاشات حسب المخاطر', en: 'Risk-based sprinkler zoning' },
          { ar: 'اختبارات ضغط وتشغيل موقعي', en: 'On-site pressure and functional testing' },
          { ar: 'تسليم مستندات الاعتماد والتشغيل', en: 'Approval + commissioning documentation' }
        ]
      }
    },
    {
      id: 2,
      title: { ar: 'مركز بيانات البنك الأهلي', en: 'National Bank Data Center' },
      category: 'Commercial',
      location: { ar: 'التجمع الخامس', en: 'New Cairo' },
      system: { ar: 'نظام إطفاء غازي FM-200', en: 'FM-200 Suppression System' },
      image: dataCenterImg,
      icon: <Building2 className="w-6 h-6" />,
      caseStudy: {
        challenge: {
          ar: 'غرف حساسة (مركز بيانات) تتطلب إطفاء نظيف دون أضرار للمعدات مع متطلبات إنذار وإطلاق دقيقة.',
          en: 'Critical rooms (data center) requiring clean-agent protection without equipment damage, with precise detection and release logic.'
        },
        solution: {
          ar: 'تحديد حجم الغرف والتقسيم، اختيار توزيع فوهات مناسب، ربط التحكم بلوحة الإنذار، وضبط منطق الإطلاق والتحذير.',
          en: 'Room volume verification, nozzle layout selection, integration with fire alarm panel, and release/warning logic configuration.'
        },
        outcome: {
          ar: 'تسليم نظام FM-200 جاهز للتشغيل بعد اختبار التكامل (إنذار/تحكم/إطلاق) وتوثيق إعدادات اللوحات والملحقات.',
          en: 'Delivered an FM-200 system ready for operation after integration testing (alarm/control/release) with documented panel settings.'
        },
        highlights: [
          { ar: 'تقدير كميات الغاز وفق NFPA 2001 (استرشادي)', en: 'NFPA 2001-based agent estimation (indicative)' },
          { ar: 'تكامل كامل مع الإنذار والتحكم', en: 'Full alarm + control integration' },
          { ar: 'اختبارات إطلاق ومحاكاة سيناريوهات', en: 'Release testing and scenario simulation' }
        ]
      }
    },
    {
      id: 3,
      title: { ar: 'مستودعات شركة الأدوية', en: 'Pharma Warehouses' },
      category: 'Industrial',
      location: { ar: 'المنطقة الصناعية - أكتوبر', en: '6th of October Industrial Zone' },
      system: { ar: 'صناديق حريق + كواشف دخان', en: 'Fire Cabinets + Smoke Detectors' },
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
      icon: <Warehouse className="w-6 h-6" />,
      caseStudy: {
        challenge: {
          ar: 'مستودعات تخزين تتطلب إنذار مبكر وتوزيع نقاط مكافحة بالحريق مع سهولة الوصول لفرق التشغيل.',
          en: 'Storage warehouses requiring early detection and well-placed firefighting points with easy access for operators.'
        },
        solution: {
          ar: 'توريد وتركيب صناديق حريق، تمديدات مناسبة، وتركيب كواشف دخان وتحديد مناطق الإنذار وربطها بلوحة التحكم.',
          en: 'Supply and install fire cabinets, suitable piping, smoke detection with zoning and control panel integration.'
        },
        outcome: {
          ar: 'تسليم مخطط مناطق الإنذار، قائمة المعدات، وتقارير اختبارات التشغيل الأساسية وصيانة دورية مقترحة.',
          en: 'Delivered alarm zoning plan, equipment list, basic functional test reports, and recommended periodic maintenance schedule.'
        },
        highlights: [
          { ar: 'تحديد مسارات الوصول والمخارج', en: 'Access and egress-aware placement' },
          { ar: 'اختبارات كواشف ومجسات الإنذار', en: 'Detector and panel functional tests' },
          { ar: 'تجهيز نقاط مكافحة للحريق داخل المخزن', en: 'Warehouse-ready firefighting points' }
        ]
      }
    },
    {
      id: 4,
      title: { ar: 'كمبوند الياسمين', en: 'Al-Yasmeen Compound' },
      category: 'Residential',
      location: { ar: 'العاصمة الإدارية', en: 'New Administrative Capital' },
      system: { ar: 'شبكة حريق خارجية + أعمدة', en: 'External Hydrant Network' },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
      icon: <Home className="w-6 h-6" />,
      caseStudy: {
        challenge: {
          ar: 'مساحات سكنية كبيرة تتطلب شبكة خارجية موثوقة (Hydrants) وتوزيع نقاط تغذية لخدمات الطوارئ.',
          en: 'Large residential compound requiring a reliable external hydrant network and clear feed points for emergency response.'
        },
        solution: {
          ar: 'تصميم شبكة حريق خارجية وأعمدة حريق، تحديد الأقطار ومسارات الدفن، وتنسيق نقاط الربط واختبارات الضغط.',
          en: 'Design of external hydrant network, pipe sizing and routing, connection point coordination, and pressure testing.'
        },
        outcome: {
          ar: 'تسليم رسومات تنفيذية للشبكة الخارجية مع نتائج اختبارات الضغط وتوصيات تشغيل وصيانة.',
          en: 'Delivered external network shop drawings with pressure test results and OM recommendations.'
        },
        highlights: [
          { ar: 'تخطيط تغذية خارجية حسب مراحل المشروع', en: 'Phase-aware external supply planning' },
          { ar: 'اختبارات ضغط للشبكة والأعمدة', en: 'Network and hydrant pressure testing' },
          { ar: 'تسليم دليل تشغيل وصيانة مبسط', en: 'Simplified operations  maintenance guide' }
        ]
      }
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
        {/* Case Study Modal */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="mx-auto mt-16 w-[min(960px,92vw)] nb-card bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-6 p-6 border-b-3 border-[var(--nb-stroke)]">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      {language === 'ar' ? 'دراسة حالة' : 'Case Study'}
                    </div>
                    <div className="mt-2 text-2xl md:text-3xl font-display font-bold text-primary uppercase">
                      {language === 'ar' ? active.title.ar : active.title.en}
                    </div>
                    <div className="mt-2 text-sm text-zinc-600">
                      {language === 'ar' ? active.location.ar : active.location.en} 
                      <span className="mx-2">•</span>
                      {language === 'ar' ? active.system.ar : active.system.en}
                    </div>
                  </div>
                  <button
                    className="border-3 border-[var(--nb-stroke)] bg-white px-3 py-2 nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                    onClick={() => setActive(null)}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative min-h-[260px] md:min-h-[420px]">
                    <img
                      src={active.image}
                      alt={language === 'ar' ? active.title.ar : active.title.en}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy={typeof active.image === 'string' && active.image.startsWith('http') ? 'no-referrer' : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="inline-flex items-center gap-2 bg-secondary text-white px-3 py-2 border-3 border-white/10 nb-shadow-sm">
                        {active.icon}
                        <span className="text-xs font-bold uppercase tracking-widest">{active.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-6">
                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'التحدي' : 'Challenge'}
                      </div>
                      <p className="mt-2 text-zinc-700 leading-relaxed">
                        {language === 'ar' ? active.caseStudy.challenge.ar : active.caseStudy.challenge.en}
                      </p>
                    </div>

                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'الحل' : 'Solution'}
                      </div>
                      <p className="mt-2 text-zinc-700 leading-relaxed">
                        {language === 'ar' ? active.caseStudy.solution.ar : active.caseStudy.solution.en}
                      </p>
                    </div>

                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'النتيجة' : 'Outcome'}
                      </div>
                      <p className="mt-2 text-zinc-700 leading-relaxed">
                        {language === 'ar' ? active.caseStudy.outcome.ar : active.caseStudy.outcome.en}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'نقاط سريعة' : 'Key Highlights'}
                      </div>
                      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
                        {active.caseStudy.highlights.map((h: any, i: number) => (
                          <li key={i} className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-3 text-sm text-zinc-700">
                            {language === 'ar' ? h.ar : h.en}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-secondary text-white px-5 py-3 font-bold uppercase tracking-widest nb-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                      >
                        {language === 'ar' ? 'اطلب عرض سعر' : 'Request a Quote'}
                      </a>
                      <a
                        href="/services"
                        className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-white text-primary px-5 py-3 font-bold uppercase tracking-widest nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                      >
                        {language === 'ar' ? 'استعرض الخدمات' : 'View Services'}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t-3 border-[var(--nb-stroke)] text-[11px] text-muted-foreground">
                  {language === 'ar'
                    ? 'ملاحظة: المحتوى هنا يوضح نطاق العمل ومخرجات التنفيذ بشكل عام ويمكن تخصيصه بمستندات المشروع عند توفرها.'
                    : 'Note: This narrative describes scope and deliverables. It can be customized with project documents when available.'}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
                             loading="lazy"
                             decoding="async"
                             referrerPolicy={typeof project.image === 'string' && project.image.startsWith('http') ? 'no-referrer' : undefined}
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

                          <button
                            onClick={() => setActive(project)}
                            className="mt-6 inline-flex items-center gap-2 border-2 border-[var(--nb-stroke)] bg-white px-4 py-3 font-bold uppercase tracking-widest text-xs text-primary nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                          >
                            {language === 'ar' ? 'دراسة حالة' : 'Case Study'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
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
