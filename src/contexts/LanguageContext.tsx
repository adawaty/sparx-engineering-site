import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  nav_home: { ar: 'الرئيسية', en: 'Home' },
  nav_about: { ar: 'عن الشركة', en: 'About' },
  nav_products: { ar: 'المنتجات', en: 'Products' },
  nav_services: { ar: 'الخدمات', en: 'Services' },
  nav_projects: { ar: 'المشاريع', en: 'Projects' },
  nav_portfolio: { ar: 'ملف الأعمال', en: 'Portfolio' },
  nav_contact: { ar: 'تواصل معنا', en: 'Contact' },
  nav_calculator: { ar: 'حاسبة FM-200', en: 'FM-200 Calc' },
  
  // General
  company_name: { ar: 'سباركس للهندسة', en: 'Sparx Engineering' },
  tagline: { ar: 'شريكك الموثوق في أنظمة مكافحة الحريق', en: 'Your Trusted Partner in Firefighting Systems' },
  get_quote: { ar: 'اطلب عرض سعر', en: 'Get a Quote' },
  read_more: { ar: 'اقرأ المزيد', en: 'Read More' },
  contact_us: { ar: 'اتصل بنا', en: 'Contact Us' },
  
  // Home
  hero_title: { ar: 'حماية متكاملة لممتلكاتك', en: 'Complete Protection for Your Assets' },
  hero_subtitle: { ar: 'موزع معتمد لمنتجات Meteory و Apollo - حلول إطفاء وإنذار متكاملة', en: 'Authorized Distributor for Meteory & Apollo - Integrated Firefighting & Alarm Solutions' },
  
  // Footer
  footer_desc: { ar: 'سباركس للهندسة - رواد في توريد وتركيب وصيانة أنظمة مكافحة الحريق في مصر.', en: 'Sparx Engineering - Leaders in supply, installation, and maintenance of firefighting systems in Egypt.' },
  footer_links: { ar: 'روابط سريعة', en: 'Quick Links' },
  footer_contact: { ar: 'بيانات التواصل', en: 'Contact Info' },
  address: { ar: 'المجاورة ٧، مدينة العاشر من رمضان، محافظة الشرقية', en: 'Neighborhood 7, 10th of Ramadan City, Al-Sharqia Governorate' },
  
  // Calculator
  calc_title: { ar: 'حاسبة تقديرية لنظام FM-200', en: 'FM-200 Estimator Calculator' },
  calc_desc: { ar: 'أداة لتقدير كمية الغاز المطلوبة لحماية الغرفة (لأغراض استرشادية فقط).', en: 'Tool to estimate gas quantity required for room protection (for guidance only).' },
  room_length: { ar: 'طول الغرفة (م)', en: 'Room Length (m)' },
  room_width: { ar: 'عرض الغرفة (م)', en: 'Room Width (m)' },
  room_height: { ar: 'ارتفاع الغرفة (م)', en: 'Room Height (m)' },
  calculate: { ar: 'احسب الكمية', en: 'Calculate Quantity' },
  result_mass: { ar: 'كمية الغاز التقديرية:', en: 'Estimated Gas Quantity:' },
  disclaimer: { ar: 'تنبيه: هذه الحسابات تقديرية فقط. يجب استشارة مهندس مختص لتصميم النظام النهائي وفقاً للكود.', en: 'Disclaimer: These calculations are estimates only. Consult a professional engineer for final system design according to code.' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
