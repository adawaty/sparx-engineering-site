import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { FM200Calculator } from '@/components/FM200Calculator';
import calculatorHeaderImg from '../assets/hero-engineering-banner.jpeg'; // Reusing hero image or finding another one

export default function CalculatorPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={language === 'ar' ? 'حاسبة FM-200' : 'FM-200 Calculator'} 
        subtitle={language === 'ar' ? 'أداة تقدير كميات الغاز لأنظمة الإطفاء' : 'Gas Quantity Estimation Tool for Fire Suppression Systems'}
        backgroundImage={calculatorHeaderImg}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Information Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary uppercase mb-6">
                {language === 'ar' ? 'كيف تعمل الحاسبة؟' : 'How it Works'}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                {language === 'ar' 
                  ? 'تم تصميم هذه الأداة لمساعدة المهندسين والاستشاريين في الحصول على تقدير مبدئي لكمية غاز FM-200 المطلوبة لحماية غرفة معينة.' 
                  : 'This tool is designed to help engineers and consultants get a preliminary estimate of the FM-200 gas quantity required to protect a specific room.'}
              </p>
            </div>

            <div className="bg-zinc-50 p-6 border-l-4 border-secondary space-y-4">
              <h3 className="font-bold text-lg text-primary">
                {language === 'ar' ? 'ملاحظات هامة' : 'Important Notes'}
              </h3>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>
                  {language === 'ar' ? 'الحسابات مبنية على معايير NFPA 2001.' : 'Calculations are based on NFPA 2001 standards.'}
                </li>
                <li>
                  {language === 'ar' ? 'النتائج تقريبية ولا تغني عن التصميم الهندسي التفصيلي.' : 'Results are approximate and do not replace detailed engineering design.'}
                </li>
                <li>
                  {language === 'ar' ? 'يجب مراعاة درجة الحرارة والارتفاع عن سطح البحر في التصميم النهائي.' : 'Temperature and altitude must be considered in the final design.'}
                </li>
              </ul>
            </div>
          </div>

          {/* Calculator Component */}
          <div>
             <FM200Calculator />
          </div>
        </div>
      </div>
    </div>
  );
}
