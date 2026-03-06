import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Router, Route, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Navigation, Footer } from "@/components/Layout";
import React, { Suspense, useEffect } from "react";

const Home = React.lazy(() => import("@/pages/Home"));
const About = React.lazy(() => import("@/pages/About"));
const Services = React.lazy(() => import("@/pages/Services"));
const Products = React.lazy(() => import("@/pages/Products"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const Portfolio = React.lazy(() => import("@/pages/Portfolio"));
const CalculatorPage = React.lazy(() => import("@/pages/Calculator"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const AdminLogin = React.lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));

// Service landing pages
const FirefightingSystems = React.lazy(() => import("@/pages/services/FirefightingSystems"));
const FireAlarmSystems = React.lazy(() => import("@/pages/services/FireAlarmSystems"));
const EngineeringConsulting = React.lazy(() => import("@/pages/services/EngineeringConsulting"));

function ScrollHandler() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function SeoManager() {
  const [location] = useLocation();
  const { language, dir } = useLanguage();

  useEffect(() => {
    // Set html attributes
    document.documentElement.lang = language;
    document.documentElement.dir = dir;

    // Titles per route
    const titleMap: Record<string, string> = {
      '/': 'سباركس للهندسة | Sparx Engineering',
      '/about': language === 'ar' ? 'عن الشركة | سباركس للهندسة' : 'About | Sparx Engineering',
      '/products': language === 'ar' ? 'المنتجات | سباركس للهندسة' : 'Products | Sparx Engineering',
      '/services': language === 'ar' ? 'الخدمات | سباركس للهندسة' : 'Services | Sparx Engineering',
      '/services/firefighting-systems': language === 'ar' ? 'أنظمة مكافحة الحريق | سباركس للهندسة' : 'Firefighting Systems | Sparx Engineering',
      '/services/fire-alarm-systems': language === 'ar' ? 'أنظمة إنذار الحريق | سباركس للهندسة' : 'Fire Alarm Systems | Sparx Engineering',
      '/services/engineering-consulting': language === 'ar' ? 'استشارات هندسية | سباركس للهندسة' : 'Engineering Consulting | Sparx Engineering',
      '/projects': language === 'ar' ? 'المشاريع | سباركس للهندسة' : 'Projects | Sparx Engineering',
      '/calculator': language === 'ar' ? 'حاسبة FM-200 | سباركس للهندسة' : 'FM-200 Calculator | Sparx Engineering',
      '/contact': language === 'ar' ? 'تواصل معنا | سباركس للهندسة' : 'Contact | Sparx Engineering',
      '/admin': 'Admin | Sparx Engineering',
      '/admin/dashboard': 'Admin Dashboard | Sparx Engineering'
    };

    document.title = titleMap[location] || 'Sparx Engineering';

    // Descriptions per route
    const descMap: Record<string, string> = {
      '/': language === 'ar'
        ? 'حلول إنذار ومكافحة الحريق في مصر — تصميم، توريد، تركيب، اختبار، تشغيل وصيانة.'
        : 'Fire alarm and firefighting solutions across Egypt — design, supply, installation, testing, commissioning, and maintenance.',
      '/services': language === 'ar'
        ? 'الخدمات: التصميم الهندسي، التوريد، التركيب والتشغيل، والصيانة الدورية لأنظمة مكافحة الحريق.'
        : 'Services: engineering design, supply, installation & commissioning, and preventive maintenance for fire protection systems.',
      '/services/firefighting-systems': language === 'ar'
        ? 'أنظمة مكافحة الحريق: رشاشات، صناديق حريق، شبكات خارجية، اختبار وتشغيل.'
        : 'Firefighting systems: sprinklers, fire cabinets, external hydrants, testing & commissioning.',
      '/services/fire-alarm-systems': language === 'ar'
        ? 'أنظمة إنذار الحريق: كواشف، تقسيم مناطق، لوحات، تكامل وتشغيل.'
        : 'Fire alarm systems: detectors, zoning, panels, integration and commissioning.',
      '/services/engineering-consulting': language === 'ar'
        ? 'استشارات هندسية: رسومات تنفيذية، حسابات، مراجعات وتنسيق قبل التسليم.'
        : 'Engineering consulting: shop drawings, calculations, reviews and coordination before handover.',
      '/products': language === 'ar'
        ? 'معدات مكافحة الحريق والإنذار — توريد منتجات معتمدة وحلول متكاملة للمشاريع الصناعية.'
        : 'Firefighting and alarm products — certified equipment supply for industrial projects.',
      '/projects': language === 'ar'
        ? 'مشاريع منفذة لأنظمة إنذار ومكافحة الحريق في مواقع صناعية داخل مصر.'
        : 'Delivered fire alarm and firefighting projects across industrial sites in Egypt.',
      '/calculator': language === 'ar'
        ? 'حاسبة تقديرية لكمية FM-200 (لأغراض استرشادية فقط) وفق تقديرات NFPA 2001.'
        : 'FM-200 preliminary estimator (indicative only) based on NFPA 2001 estimations.',
      '/contact': language === 'ar'
        ? 'تواصل مع سباركس للهندسة — فريق المبيعات والدعم الفني.'
        : 'Contact Sparx Engineering — sales and technical support.',
      '/about': language === 'ar'
        ? 'عن سباركس للهندسة — حلول هندسية لأنظمة إنذار ومكافحة الحريق.'
        : 'About Sparx Engineering — engineering solutions for fire safety systems.',
      '/portfolio': language === 'ar'
        ? 'ملف الأعمال — قصة التنفيذ من المعاينة إلى التسليم.'
        : 'Portfolio — delivery story from survey to handover.'
    };

    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (desc) desc.content = descMap[location] || descMap['/'];

    // Noindex admin pages
    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (robots) {
      if (location.startsWith('/admin')) robots.content = 'noindex,nofollow';
      else robots.content = 'index,follow';
    }

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = `https://sparx-engineering.com${location === '/' ? '/' : location}`;
    }

    // Hreflang (same URL, language toggled in-app; still helps crawlers understand language availability)
    const alternates = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')) as HTMLLinkElement[];
    alternates.forEach((l) => {
      if (l.hreflang === 'en' || l.hreflang === 'ar' || l.hreflang === 'x-default') {
        l.href = `https://sparx-engineering.com${location === '/' ? '/' : location}`;
      }
    });

    // Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) ogUrl.content = `https://sparx-engineering.com${location === '/' ? '/' : location}`;
  }, [location, language, dir]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      {/* Use History API routing for clean, SEO-friendly URLs.
          - Production (https): History routing + vercel.json rewrites
          - Local file previews (file://): Hash routing to avoid 404 in static preview */}
      <Router hook={typeof window !== 'undefined' && (window.location.protocol === 'file:' || window.location.pathname.endsWith('index.html')) ? useHashLocation : undefined}>
        <SeoManager />
        <ScrollHandler />

        <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
          <Navigation />
          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="nb-card px-8 py-6 bg-white">
                    <div className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                      Loading…
                    </div>
                    <div className="mt-3 h-2 w-48 bg-zinc-100 border-2 border-[var(--nb-stroke)] overflow-hidden">
                      <div className="h-full w-1/2 bg-secondary animate-pulse" />
                    </div>
                  </div>
                </div>
              }
            >
                <Switch>
                <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/services/firefighting-systems" component={FirefightingSystems} />
              <Route path="/services/fire-alarm-systems" component={FireAlarmSystems} />
              <Route path="/services/engineering-consulting" component={EngineeringConsulting} />
              <Route path="/products" component={Products} />
              <Route path="/projects" component={Projects} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/calculator" component={CalculatorPage} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin" component={AdminLogin} />
              <Route path="/admin/dashboard" component={AdminDashboard} />

              <Route>
                <div className="container mx-auto py-20 text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-lg text-muted-foreground">The page you are looking for does not exist.</p>
                </div>
              </Route>
              </Switch>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
