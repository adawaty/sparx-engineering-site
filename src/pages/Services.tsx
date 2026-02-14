import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from "@/components/ui/button";
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Wrench, PenTool, HardHat } from 'lucide-react';

// Images
import servicesHeaderImg from '../assets/engineer-site-visit.jpeg';
import servicesDesignImg from '../assets/services-design.jpg';
import servicesSupplyImg from '../assets/services-supply.jpg';
import servicesInstallationImg from '../assets/services-installation.jpg';
import servicesMaintenanceImg from '../assets/services-maintenance.jpg';

export default function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      id: 'design',
      title: { ar: 'التصميم الهندسي', en: 'Engineering Design' },
      desc: { ar: 'تصميمات معتمدة من الدفاع المدني ومطابقة للكود المصري NFPA. نستخدم أحدث برامج المحاكاة الهيدروليكية لضمان كفاءة النظام.', en: 'Civil Defense approved designs compliant with NFPA & Egyptian Code. We use advanced hydraulic simulation software to ensure system efficiency.' },
      icon: <PenTool className="w-12 h-12 text-secondary" />,
      image: servicesDesignImg,
      features: [
        { ar: 'رسومات Shop Drawings تفصيلية', en: 'Detailed Shop Drawings' },
        { ar: 'حسابات هيدروليكية دقيقة', en: 'Accurate Hydraulic Calculations' },
        { ar: 'اعتماد المخططات من الاستشاريين', en: 'Consultant Approval Support' }
      ]
    },
    {
      id: 'supply',
      title: { ar: 'التوريد', en: 'Supply' },
      desc: { ar: 'توفير كافة معدات الإطفاء والإنذار من وكلاء عالميين (Meteory, Apollo, SRI) بأسعار تنافسية وضمان الوكيل.', en: 'Supply of all firefighting and alarm equipment from global agents (Meteory, Apollo, SRI) at competitive prices with distributor warranty.' },
      icon: <Shield className="w-12 h-12 text-secondary" />,
      image: servicesSupplyImg,
      features: [
        { ar: 'منتجات أصلية 100%', en: '100% Genuine Products' },
        { ar: 'شهادات المنشأ والضمان', en: 'Origin & Warranty Certificates' },
        { ar: 'توصيل للموقع في الوقت المحدد', en: 'On-time Site Delivery' }
      ]
    },
    {
      id: 'install',
      title: { ar: 'التركيب والتشغيل', en: 'Installation & Commissioning' },
      desc: { ar: 'فريق فني محترف لتركيب الأنظمة واختبارها وتشغيلها وتسليمها للدفاع المدني.', en: 'Professional technical team for system installation, testing, commissioning, and handover to Civil Defense.' },
      icon: <HardHat className="w-12 h-12 text-secondary" />,
      image: servicesInstallationImg,
      features: [
        { ar: 'التزام بالجداول الزمنية', en: 'Commitment to Schedules' },
        { ar: 'اختبارات ضغط وتشغيل', en: 'Pressure & Operation Tests' },
        { ar: 'تدريب العميل على الاستخدام', en: 'Client Usage Training' }
      ]
    },
    {
      id: 'maintenance',
      title: { ar: 'الصيانة', en: 'Maintenance' },
      desc: { ar: 'عقود صيانة سنوية ودورية لضمان جاهزية الأنظمة. زيارات طارئة وقطع غيار أصلية.', en: 'Annual and periodic maintenance contracts to ensure system readiness. Emergency visits and genuine spare parts.' },
      icon: <Wrench className="w-12 h-12 text-secondary" />,
      image: servicesMaintenanceImg,
      features: [
        { ar: 'صيانة وقائية دورية', en: 'Periodic Preventive Maintenance' },
        { ar: 'استجابة للطوارئ 24/7', en: '24/7 Emergency Response' },
        { ar: 'تقارير فنية معتمدة', en: 'Approved Technical Reports' }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('nav_services')} 
        subtitle={language === 'ar' ? 'حلول هندسية متكاملة من الألف إلى الياء' : 'End-to-End Integrated Engineering Solutions'}
        backgroundImage={servicesHeaderImg}
      />

      <div className="container mx-auto px-4 py-24 max-w-7xl space-y-32">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-zinc-50 p-4 border border-zinc-200 rounded-none shadow-sm">
                    {service.icon}
                 </div>
                 <div className="h-px bg-zinc-200 flex-1"></div>
                 <span className="text-6xl font-display font-bold text-gray-100 select-none">0{index + 1}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary uppercase">
                {language === 'ar' ? service.title.ar : service.title.en}
              </h2>
              
              <p className="text-lg text-gray-500 leading-relaxed">
                {language === 'ar' ? service.desc.ar : service.desc.en}
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-zinc-100">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{language === 'ar' ? feature.ar : feature.en}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-8 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-wider font-bold h-12 px-8 shadow-lg" asChild>
                <Link href="/contact">{t('contact_us')}</Link>
              </Button>
            </div>
            
            <div className="flex-1 w-full">
               <div className="relative h-[400px] bg-zinc-100 w-full overflow-hidden group border border-zinc-200 nb-shadow">
                  <img
                    src={service.image}
                    alt={language === 'ar' ? service.title.ar : service.title.en}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/65 via-primary/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                  <div className="absolute bottom-0 right-0 bg-secondary text-white p-4 z-20 border-l border-t border-white/10">
                     <span className="font-display font-bold text-xl">SPARX</span>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CTA Banner */}
      <div className="bg-zinc-900 py-24 text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-white uppercase mb-8">
               {language === 'ar' ? 'هل لديك مشروع يحتاج لخبرتنا؟' : 'Have a project that needs our expertise?'}
            </h2>
            <Button size="lg" className="bg-secondary text-white hover:bg-red-700 rounded-none uppercase tracking-widest font-bold h-16 px-12 text-lg shadow-2xl hover:shadow-red-900/50 transition-all" asChild>
               <Link href="/contact">{t('get_quote') || (language === 'ar' ? 'اطلب عرض سعر' : 'Get a Quote')}</Link>
            </Button>
         </div>
      </div>
    </div>
  );
}
