import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Flame, Zap, HardHat, FileCheck, TrendingUp, Timer, Building2, Wrench, Users } from 'lucide-react';
import { CountUp } from '@/components/CountUp';
import { FM200Calculator } from '@/components/FM200Calculator';
import { FireEmbers, WaterMist } from '@/components/FireEffects';

// Images Import
import heroImg from '../assets/hero-engineering-banner.jpeg';
import fireExtImg from '../assets/fire-extinguisher-product.jpeg';
import alarmPanelImg from '../assets/fire-alarm-panel.jpeg';
import projectImg from '../assets/project-textile-factory.jpeg';
import logoMeteory from '../assets/meteory-logo.png';
import logoApollo from '../assets/apollo-logo.png';

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Industrial Standard */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-900 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Industrial Fire Safety" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
        </div>

        {/* Fire ambience (embers + heat shimmer) */}
        <FireEmbers className="z-[1]" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full max-w-7xl">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
               <div className="h-1 w-12 bg-secondary"></div>
               <span className="uppercase tracking-[0.2em] text-sm font-bold text-secondary">Since 2018</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight uppercase tracking-wide">
              {language === 'ar' ? 'نحمي مستقبلك' : 'Securing Your Future'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {language === 'ar' ? 'بأحدث تقنيات الإطفاء' : 'With Advanced Safety'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
              {t('hero_subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-wider px-8 h-14 text-base rounded-none clip-diagonal" asChild>
                <Link href="/products">{t('get_quote')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider px-8 h-14 text-base rounded-none" asChild>
                <Link href="/services">{t('read_more')}</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scrolling Partner Logos at Bottom */}
        <div className="absolute bottom-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-6">
           <div className="container mx-auto px-4 flex justify-between items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={logoMeteory} alt="Meteory" className="h-10 w-auto object-contain" />
              <img src={logoApollo} alt="Apollo" className="h-10 w-auto object-contain" />
              <div className="h-8 font-display font-bold text-2xl text-white tracking-widest uppercase">SRI Malaysia</div>
              <div className="h-8 font-display font-bold text-2xl text-white tracking-widest uppercase">NAFFCO</div>
              <div className="h-8 font-display font-bold text-2xl text-white tracking-widest uppercase">BAVARIA</div>
           </div>
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                 <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-secondary hidden md:block"></div>
                 <img src={projectImg} alt="Our Project" className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                 <div className="absolute -bottom-8 -right-8 bg-primary p-8 text-white max-w-xs shadow-xl hidden md:block">
                    <div className="text-4xl font-bold font-display mb-2">350+</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider">Successful Projects Completed Across Egypt</div>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-secondary font-bold uppercase tracking-widest text-sm">{t('nav_about')}</h4>
                    <h2 className="text-4xl font-display font-bold text-primary uppercase leading-tight">
                       {language === 'ar' ? 'الريادة في أنظمة السلامة' : 'Leading the Standard in Fire Safety'}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                       {language === 'ar' 
                         ? 'نحن في سباركس للهندسة نلتزم بأعلى معايير الجودة العالمية. بصفتنا موزعاً معتمداً لكبرى العلامات التجارية، نقدم حلولاً متكاملة تضمن سلامة الأرواح والممتلكات.'
                         : 'At Sparx Engineering, we adhere to the highest international quality standards. As an authorized distributor for major global brands, we provide integrated solutions that ensure the safety of lives and property.'}
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex gap-4">
                       <ShieldCheck className="w-10 h-10 text-secondary flex-shrink-0" />
                       <div>
                          <h5 className="font-bold text-primary uppercase mb-1">Certified</h5>
                          <p className="text-sm text-gray-500">ISO 9001:2015 & Civil Defense Approved</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <HardHat className="w-10 h-10 text-secondary flex-shrink-0" />
                       <div>
                          <h5 className="font-bold text-primary uppercase mb-1">Expert Team</h5>
                          <p className="text-sm text-gray-500">Qualified Engineers & Technicians</p>
                       </div>
                    </div>
                 </div>
                 
                 <Button variant="link" className="text-primary font-bold uppercase tracking-widest hover:text-secondary p-0 h-auto" asChild>
                    <Link href="/about">{t('read_more')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                 </Button>
              </div>
           </div>
        </div>
      </section>

      {/* Facts & Figures - Infographic */}
      <section className="py-24 bg-white border-t-2 border-[var(--nb-stroke)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(11,31,59,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,59,0.25)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-16 bg-secondary"></div>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {language === 'ar' ? 'حقائق وأرقام' : 'Facts & Figures'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary uppercase">
                {language === 'ar' ? 'صورة سريعة عن 7 سنوات' : 'A 7‑Year Snapshot'}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {language === 'ar'
                  ? 'نظرة مختصرة على مسار التنفيذ خلال 7 سنوات — أرقام بسيطة لتوضيح حجم النشاط.'
                  : 'A compact view of delivery activity over 7 years — simple numbers to communicate scale.'}
              </p>
            </div>

            <div className="text-xs text-muted-foreground border border-zinc-200 bg-zinc-50 px-4 py-3">
              <strong className="text-primary">{language === 'ar' ? 'متوسط التنفيذ:' : 'Delivery pace:'}</strong>{' '}
              {language === 'ar' ? 'حوالي 4 مشاريع سنوياً.' : 'About 4 projects per year.'}
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Big metric */}
            <div className="md:col-span-5 nb-card nb-hover-lift overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {language === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}
                    </div>
                    <div className="mt-3 text-6xl font-display font-bold text-primary leading-none">
                      <CountUp value={28} />
                    </div>
                  </div>
                  <div className="w-14 h-14 border border-secondary/30 bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-zinc-600">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-secondary" />
                    <span>{language === 'ar' ? 'مصانع، مخازن، مجمعات صناعية' : 'Factories, warehouses, industrial sites'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span>{language === 'ar' ? 'إنذار + مكافحة + صيانة' : 'Alarm + firefighting + maintenance'}</span>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-zinc-100">
                <div className="facts-bar h-2 bg-secondary w-[0%]"></div>
              </div>
            </div>

            {/* Grid metrics */}
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="nb-card-sm nb-hover-lift p-7">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-display font-bold text-primary"><CountUp value={7} /></div>
                  <Timer className="w-6 h-6 text-secondary" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {language === 'ar' ? 'سنوات تشغيل' : 'Years Operating'}
                </div>
                <div className="mt-4 text-sm text-zinc-600">
                  {language === 'ar' ? 'خبرة تراكمية في بيئات صناعية مختلفة.' : 'Accumulated delivery experience across multiple industrial environments.'}
                </div>
              </div>

              <div className="border border-zinc-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-display font-bold text-primary"><CountUp value={8} /></div>
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {language === 'ar' ? 'فريق التنفيذ' : 'Delivery Team'}
                </div>
                <div className="mt-4 text-sm text-zinc-600">
                  {language === 'ar'
                    ? 'مهندسون + فنيون + إشراف موقع.'
                    : 'Engineers + technicians + site supervision.'}
                </div>
              </div>

              <div className="border border-zinc-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-display font-bold text-primary"><CountUp value={92} suffix="%" /></div>
                  <Wrench className="w-6 h-6 text-secondary" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {language === 'ar' ? 'التزام الصيانة' : 'Maintenance SLA'}
                </div>
                <div className="mt-4 text-sm text-zinc-600">
                  {language === 'ar'
                    ? 'نسبة زيارات الصيانة المنفذة ضمن الجدول.'
                    : 'Planned maintenance visits completed on schedule.'}
                </div>
              </div>

              <div className="border border-zinc-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-display font-bold text-primary"><CountUp value={24} suffix="h" /></div>
                  <Flame className="w-6 h-6 text-secondary" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {language === 'ar' ? 'زمن استجابة' : 'Response Time'}
                </div>
                <div className="mt-4 text-sm text-zinc-600">
                  {language === 'ar'
                    ? 'نافذة استجابة للطوارئ حسب التعاقد.'
                    : 'Emergency response window depending on contract.'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-muted-foreground">
            {language === 'ar'
              ? 'يمكن إضافة توزيع تفاعلي حسب القطاعات عند توفر بيانات تفصيلية (مصانع/مخازن/مكاتب/مراكز بيانات).' 
              : 'We can add an interactive sector breakdown once detailed data is available (factories/warehouses/offices/data centers).'}
          </div>
        </div>
      </section>

      {/* Solutions Grid - Industrial Cards */}
      <section className="py-24 bg-zinc-50 border-t-2 border-[var(--nb-stroke)]">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
               <h2 className="text-4xl font-display font-bold text-primary uppercase">{language === 'ar' ? 'حلولنا الهندسية' : 'Engineering Solutions'}</h2>
               <div className="h-1 w-20 bg-secondary mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="group nb-card nb-hover-lift hover:border-secondary transition-all duration-300 relative overflow-hidden">
                  <div className="h-64 overflow-hidden">
                     <img src={fireExtImg} alt="Fire Fighting" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 relative z-10 bg-white">
                     <div className="absolute -top-8 right-8 bg-secondary text-white p-4 shadow-lg">
                        <Flame size={24} />
                     </div>
                     <h3 className="text-xl font-bold font-display text-primary uppercase mb-3 group-hover:text-secondary transition-colors">
                        {language === 'ar' ? 'أنظمة مكافحة الحريق' : 'Fire Fighting Systems'}
                     </h3>
                     <p className="text-gray-500 mb-6 line-clamp-3">
                        {language === 'ar' ? 'توريد وتركيب شبكات الرشاشات وصناديق الحريق وفقاً للكود المصري NFPA.' : 'Supply and installation of sprinkler networks and fire cabinets according to NFPA & Egyptian Code.'}
                     </p>
                     <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                        {language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'} <ArrowRight size={16} />
                     </Link>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="group nb-card nb-hover-lift hover:border-secondary transition-all duration-300 relative overflow-hidden">
                  <div className="h-64 overflow-hidden">
                     <img src={alarmPanelImg} alt="Fire Alarm" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 relative z-10 bg-white">
                     <div className="absolute -top-8 right-8 bg-secondary text-white p-4 shadow-lg">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-xl font-bold font-display text-primary uppercase mb-3 group-hover:text-secondary transition-colors">
                        {language === 'ar' ? 'أنظمة الإنذار المبكر' : 'Fire Alarm Systems'}
                     </h3>
                     <p className="text-gray-500 mb-6 line-clamp-3">
                        {language === 'ar' ? 'أنظمة إنذار معنونة وتقليدية للكشف المبكر عن الدخان والحرارة.' : 'Addressable and conventional alarm systems for early smoke and heat detection.'}
                     </p>
                     <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                        {language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'} <ArrowRight size={16} />
                     </Link>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="group nb-card nb-hover-lift hover:border-secondary transition-all duration-300 relative overflow-hidden">
                  <div className="h-64 overflow-hidden">
                     <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 border-t-2 border-[var(--nb-stroke)]">
                        <FileCheck size={64} strokeWidth={1} />
                     </div>
                  </div>
                  <div className="p-8 relative z-10 bg-white">
                     <div className="absolute -top-8 right-8 bg-secondary text-white p-4 shadow-lg">
                        <ShieldCheck size={24} />
                     </div>
                     <h3 className="text-xl font-bold font-display text-primary uppercase mb-3 group-hover:text-secondary transition-colors">
                        {language === 'ar' ? 'التراخيص والاعتمادات' : 'Licensing & Approvals'}
                     </h3>
                     <p className="text-gray-500 mb-6 line-clamp-3">
                        {language === 'ar' ? 'إنهاء إجراءات الدفاع المدني واستخراج التراخيص اللازمة للمنشآت.' : 'Finalizing Civil Defense procedures and obtaining necessary facility licenses.'}
                     </p>
                     <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                        {language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'} <ArrowRight size={16} />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Feature: Calculator - Dark Mode Technical Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
         <WaterMist className="z-0" />
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 space-y-8">
               <h2 className="text-4xl font-display font-bold uppercase leading-tight">
                  <span className="text-secondary block text-sm tracking-widest mb-2">Engineering Tools</span>
                  FM-200 Gas Quantity <br/>Estimator
               </h2>
               <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {language === 'ar' 
                    ? 'أداة هندسية مصممة لمساعدة الاستشاريين والمقاولين في التقدير المبدئي لكميات الغاز المطلوبة لأنظمة الإطفاء النظيف.' 
                    : 'Engineering tool designed to assist consultants and contractors in preliminary estimation of gas quantities required for clean agent suppression systems.'}
               </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                     <span className="text-secondary font-bold text-xl">01</span>
                     <div>
                        <strong className="block text-white uppercase tracking-wide">Standard Compliance</strong>
                        <span className="text-sm text-gray-500">Based on NFPA 2001 estimations</span>
                     </div>
                  </li>
                  <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                     <span className="text-secondary font-bold text-xl">02</span>
                     <div>
                        <strong className="block text-white uppercase tracking-wide">Instant Calculation</strong>
                        <span className="text-sm text-gray-500">Real-time mass calculation based on volume</span>
                     </div>
                  </li>
               </ul>
            </div>
            
            <div className="md:w-1/2 w-full">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-none shadow-2xl">
                  <FM200Calculator />
               </div>
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-secondary">
         <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
               {language === 'ar' ? 'ابدأ مشروعك بمعايير عالمية' : 'Start Your Project With Global Standards'}
            </h2>
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 font-bold uppercase tracking-widest px-12 h-16 text-lg rounded-none shadow-xl" asChild>
               <Link href="/contact">{t('contact_us')}</Link>
            </Button>
         </div>
      </section>
    </div>
  );
}
