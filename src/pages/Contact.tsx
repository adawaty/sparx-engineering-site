import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

// Images
import contactHeaderImg from '../assets/hero-engineering-banner.jpeg';

export default function Contact() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get('content-type') || '';
      const raw = await response.text();
      const data = contentType.includes('application/json') ? JSON.parse(raw) : null;

      if (!response.ok) {
        throw new Error(data?.error || raw || 'Failed to submit form');
      }

      setIsSuccess(true);
      toast.success(language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
      }, 5000);

    } catch (err) {
      console.error(err);
      setError(language === 'ar' ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.');
      toast.error(language === 'ar' ? 'حدث خطأ!' : 'An error occurred!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('nav_contact')} 
        subtitle={language === 'ar' ? 'فريقنا جاهز للرد على استفساراتكم وبدء تعاون مثمر' : 'Our Team is Ready to Answer Your Inquiries and Start Fruitful Cooperation'}
        backgroundImage={contactHeaderImg}
      />

      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary uppercase mb-6">
                {language === 'ar' ? 'بيانات التواصل' : 'Get In Touch'}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                {language === 'ar' 
                  ? 'سواء كنت بحاجة إلى استشارة فنية، عرض سعر، أو دعم فني، نحن هنا لخدمتك.' 
                  : 'Whether you need technical consultation, a quote, or technical support, we are here to serve you.'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                  <MapPin className="text-secondary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'العنوان' : 'Address'}</h3>
                  <p className="text-gray-500 max-w-xs">{t('address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                  <Phone className="text-secondary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'الهاتف' : 'Phone'}</h3>
                  <a className="text-gray-500 font-mono hover:underline inline-block" dir="ltr" href="tel:+201010001898">+20 101 000 1898</a>
                  <a className="text-gray-500 font-mono hover:underline inline-block" dir="ltr" href="tel:+201000188041">+20 100 018 8041</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-none border border-secondary/20 transition-all hover:bg-secondary hover:text-white group">
                  <Mail className="text-secondary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-primary">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h3>
                  <a className="text-gray-500 hover:underline" href="mailto:Info@sparx-engineering.com">Info@sparx-engineering.com</a>
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
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-50 p-8 md:p-12 border-2 border-[var(--nb-stroke)] shadow-[var(--nb-shadow)] relative overflow-hidden group hover:border-secondary/50 transition-colors duration-500">
            {/* Neon Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/20 transition-all duration-500"></div>
            
            <h3 className="text-2xl font-display font-bold text-primary uppercase mb-8 flex items-center gap-3">
              <MessageSquare className="text-secondary" />
              {language === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
            </h3>
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-primary">
                  {language === 'ar' ? 'شكراً لك!' : 'Thank You!'}
                </h4>
                <p className="text-gray-500 max-w-sm">
                  {language === 'ar' 
                    ? 'تم استلام رسالتك وسيتم التواصل معك في أقرب وقت ممكن.' 
                    : 'Your message has been received. We will contact you as soon as possible.'}
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                    <Input 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white border-zinc-300 h-12 rounded-none focus:ring-secondary focus:border-secondary focus:ring-1 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                    <Input 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white border-zinc-300 h-12 rounded-none focus:ring-secondary focus:border-secondary focus:ring-1 transition-all" 
                      dir="ltr" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <Input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white border-zinc-300 h-12 rounded-none focus:ring-secondary focus:border-secondary focus:ring-1 transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{language === 'ar' ? 'نوع المشروع / الخدمة' : 'Project Type / Service'}</label>
                  <Input 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="bg-white border-zinc-300 h-12 rounded-none focus:ring-secondary focus:border-secondary focus:ring-1 transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                  <Textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border-zinc-300 min-h-[150px] rounded-none focus:ring-secondary focus:border-secondary focus:ring-1 transition-all resize-none" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest h-14 rounded-none shadow-lg transition-all hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                    : (
                      <>
                        {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'} <Send className="ml-2 w-4 h-4" />
                      </>
                    )
                  }
                </Button>
                
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                  Securely stored in Neon Database
                </p>
              </form>
            )}
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
