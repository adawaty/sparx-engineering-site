import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { motion } from 'framer-motion';
import { Check, Shield, Award, Users, Map, Building2, Calendar, Target, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Images
import aboutHeaderImg from '../assets/hero-engineering-banner.jpeg';

export default function About() {
  const { t, language } = useLanguage();

  const milestones = [
    { year: '2018', title: { ar: 'التأسيس', en: 'Foundation' }, desc: { ar: 'انطلاق سباركس للهندسة في العاشر من رمضان برؤية طموحة.', en: 'Sparx Engineering founded in 10th of Ramadan City with an ambitious vision.' } },
    { year: '2020', title: { ar: 'شراكة Meteory', en: 'Meteory Partnership' }, desc: { ar: 'أصبحنا موزعاً معتمداً لشركة Meteory الرائدة في تصنيع معدات الإطفاء.', en: 'Became authorized distributor for Meteory, leading fire equipment manufacturer.' } },
    { year: '2022', title: { ar: 'اعتماد ISO 9001', en: 'ISO 9001 Certified' }, desc: { ar: 'الحصول على شهادة الجودة العالمية ISO 9001:2015.', en: 'Achieved ISO 9001:2015 Quality Management Certification.' } },
    { year: '2024', title: { ar: 'توسع العمليات', en: 'Expansion' }, desc: { ar: 'تجاوز عدد مشاريعنا الناجحة 350 مشروعاً في مختلف أنحاء الجمهورية.', en: 'Surpassed 350 successful projects across the republic.' } },
  ];

  const values = [
    { icon: <Shield className="w-8 h-8 text-secondary" />, title: { ar: 'الأمان أولاً', en: 'Safety First' }, desc: { ar: 'لا نتهاون أبداً في معايير السلامة، فحماية الأرواح هي أمانة.', en: 'We never compromise on safety standards; protecting lives is our trust.' } },
    { icon: <Award className="w-8 h-8 text-secondary" />, title: { ar: 'الجودة والتميز', en: 'Quality & Excellence' }, desc: { ar: 'نلتزم بأعلى معايير الجودة في كل منتج وخدمة نقدمها.', en: 'Committed to highest quality standards in every product and service.' } },
    { icon: <Users className="w-8 h-8 text-secondary" />, title: { ar: 'الشراكة الحقيقية', en: 'True Partnership' }, desc: { ar: 'نؤمن ببناء علاقات طويلة الأمد مع عملائنا مبنية على الثقة.', en: 'We believe in building long-term relationships with clients based on trust.' } },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('nav_about')} 
        subtitle={language === 'ar' ? 'شركاء في الحماية .. رواد في الهندسة' : 'Partners in Protection .. Leaders in Engineering'}
        backgroundImage={aboutHeaderImg}
      />

      <div className="container mx-auto px-4 py-24 max-w-7xl">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <SectionTitle 
              title={language === 'ar' ? 'قصتنا' : 'Our Story'} 
              subtitle={language === 'ar' ? 'رحلة من التميز والنمو المستمر' : 'A Journey of Excellence and Continuous Growth'}
            />
            <div className="prose text-gray-600 text-lg leading-relaxed text-justify max-w-none">
              <p>
                {language === 'ar'
                  ? 'تعد شركة سباركس للهندسة واحدة من الشركات الرائدة في مجال أنظمة السلامة ومكافحة الحريق في جمهورية مصر العربية. تأسست الشركة برؤية واضحة لتوفير حلول هندسية متكاملة وفقاً لأعلى المعايير العالمية.'
                  : 'Sparx Engineering is one of the leading companies in the field of safety and firefighting systems in the Arab Republic of Egypt. The company was established with a clear vision to provide integrated engineering solutions according to the highest international standards.'}
              </p>
              <p>
                {language === 'ar'
                  ? 'نحن نتميز بشراكاتنا الاستراتيجية مع كبرى الشركات العالمية مثل Meteory و Apollo و SRI، مما يتيح لنا تقديم منتجات موثوقة وخدمات عالية الجودة لعملائنا في القطاعات الصناعية والتجارية والسكنية.'
                  : 'We are distinguished by our strategic partnerships with major global companies such as Meteory, Apollo, and SRI, allowing us to offer reliable products and high-quality services to our clients in the industrial, commercial, and residential sectors.'}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary/10 transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1581094794329-cd2a1fb0e5d7?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Engineering Team" 
            />
            <div className="absolute bottom-0 left-0 bg-white p-6 shadow-lg border-t-4 border-secondary max-w-xs m-6 hidden md:block">
              <p className="font-display font-bold text-primary text-lg uppercase leading-tight">
                {language === 'ar' ? 'فريق هندسي معتمد' : 'Certified Engineering Team'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {language === 'ar' ? 'خبرات تتجاوز 15 عاماً في تصميم وتنفيذ أنظمة الحريق.' : 'Over 15 years of experience in fire system design and execution.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-24">
          <SectionTitle 
            title={language === 'ar' ? 'مسيرة النجاح' : 'Milestones'} 
            align="center"
          />
          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {milestones.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 w-full md:w-auto">
                    <AnimatedCard className={`p-8 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="text-4xl font-display font-bold text-gray-200 absolute top-4 right-4 z-0 opacity-50">{item.year}</span>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-primary mb-2">{language === 'ar' ? item.title.ar : item.title.en}</h3>
                        <p className="text-gray-500">{language === 'ar' ? item.desc.ar : item.desc.en}</p>
                      </div>
                    </AnimatedCard>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-secondary border-4 border-white shadow-lg flex items-center justify-center z-10 shrink-0">
                    <Calendar size={20} className="text-white" />
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-zinc-50 py-24 -mx-4 md:-mx-0 px-4">
           <div className="max-w-7xl mx-auto">
             <SectionTitle 
               title={language === 'ar' ? 'قيمنا الأساسية' : 'Core Values'} 
               subtitle={language === 'ar' ? 'المبادئ التي تحكم عملنا وعلاقاتنا' : 'Principles guiding our work and relationships'}
               align="center"
             />
             <div className="grid md:grid-cols-3 gap-8">
               {values.map((val, idx) => (
                 <AnimatedCard key={idx} className="p-10 text-center hover:bg-white border-transparent hover:border-zinc-200 shadow-sm hover:shadow-xl transition-all" delay={idx * 0.1}>
                   <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                     <div className="text-secondary group-hover:text-white transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8">{val.icon}</div>
                   </div>
                   <h3 className="text-xl font-bold text-primary uppercase mb-4">{language === 'ar' ? val.title.ar : val.title.en}</h3>
                   <p className="text-gray-500 leading-relaxed">
                     {language === 'ar' ? val.desc.ar : val.desc.en}
                   </p>
                 </AnimatedCard>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
