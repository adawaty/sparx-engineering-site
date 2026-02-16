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
      '/projects': language === 'ar' ? 'المشاريع | سباركس للهندسة' : 'Projects | Sparx Engineering',
      '/calculator': language === 'ar' ? 'حاسبة FM-200 | سباركس للهندسة' : 'FM-200 Calculator | Sparx Engineering',
      '/contact': language === 'ar' ? 'تواصل معنا | سباركس للهندسة' : 'Contact | Sparx Engineering',
      '/admin': 'Admin | Sparx Engineering',
      '/admin/dashboard': 'Admin Dashboard | Sparx Engineering'
    };

    document.title = titleMap[location] || 'Sparx Engineering';

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
