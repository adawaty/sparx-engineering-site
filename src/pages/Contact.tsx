import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Images
import contactHeaderImg from '../assets/hero-engineering-banner.jpeg';

export default function Contact() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={t('nav_contact')}
        subtitle={
          language === 'ar'
            ? 'فريقنا جاهز للرد على استفساراتكم وبدء تعاون مثمر'
            : 'Our Team is Ready to Answer Your Inquiries and Start Fruitful Cooperation'
        }
        backgroundImage={contactHeaderImg}
      />

      <div className="container mx-auto px-4 py-24 max-w-7xl">
        {/* Contact Info */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-primary uppercase mb-6">
            {language === 'ar' ? 'بيانات التواصل' : 'Get In Touch'}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {language === 'ar'
              ? 'للاستفسارات، عروض الأسعار، أو الدعم الفني — تواصل معنا عبر الهاتف أو البريد الإلكتروني.'
              : 'For inquiries, quotations, or technical support — reach us by phone or email.'}
          </p>

          <div className="mt-10 space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                <MapPin className="text-secondary w-6 h-6 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'العنوان' : 'Address'}</h3>
                <p className="text-gray-500 max-w-xl">{t('address')}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                <Phone className="text-secondary w-6 h-6 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'الهاتف' : 'Phone'}</h3>
                <div className="flex flex-col gap-1">
                  <a className="text-gray-500 font-mono hover:underline inline-block" dir="ltr" href="tel:+201010001898">
                    +20 101 000 1898
                  </a>
                  <a className="text-gray-500 font-mono hover:underline inline-block" dir="ltr" href="tel:+201000188041">
                    +20 100 018 8041
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                <Mail className="text-secondary w-6 h-6 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h3>
                <a className="text-gray-500 hover:underline" href="mailto:Info@sparx-engineering.com">
                  Info@sparx-engineering.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                <Clock className="text-secondary w-6 h-6 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'ساعات العمل' : 'Working Hours'}</h3>
                <p className="text-gray-500">
                  {language === 'ar' ? 'السبت - الخميس: ٩:٠٠ ص - ٥:٠٠ م' : 'Sat - Thu: 9:00 AM - 5:00 PM'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+201010001898"
              className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-secondary text-white px-5 py-3 font-bold uppercase tracking-widest nb-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {language === 'ar' ? 'اتصل الآن' : 'Call Now'}
            </a>
            <a
              href="mailto:Info@sparx-engineering.com"
              className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-white text-primary px-5 py-3 font-bold uppercase tracking-widest nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {language === 'ar' ? 'أرسل بريدًا' : 'Send Email'}
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24 h-[500px] w-full bg-zinc-100 border-2 border-[var(--nb-stroke)] relative group overflow-hidden shadow-[var(--nb-shadow-sm)]">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.7383781%2C30.2811022%2C31.7583781%2C30.3011022&layer=mapnik&marker=30.2911022%2C31.7483781"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.85)' }}
              loading="lazy"
              title="Sparx Engineering Location (OpenStreetMap)"
              className="group-hover:filter-none transition-all duration-700"
            ></iframe>
          </div>
          <div className="absolute bottom-8 left-8 bg-white p-6 shadow-2xl max-w-sm border-l-4 border-secondary hidden md:block z-10 animate-fade-in-up">
            <h4 className="font-bold text-primary uppercase mb-2 text-lg">Visit Our HQ</h4>
            <p className="text-gray-500 text-sm mb-4">{t('address')}</p>
            <a
              href="https://www.openstreetmap.org/?mlat=30.2911022&mlon=31.7483781#map=18/30.2911022/31.7483781"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary"
            >
              Open Map →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
