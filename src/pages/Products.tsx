import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageHeader } from '../components/ui/PageHeader';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ExternalLink, FileText, Mail, MessageSquare, X } from 'lucide-react';

import productsHeaderImg from '../assets/fire-extinguisher-product.jpeg';
import catalogRaw from '../data/productCatalog.json';
import { buildMailto, buildWhatsApp } from '@/lib/quoteLinks';

type CatalogItem = {
  id: string;
  brand: 'Meteory' | 'Apollo' | 'SRI' | string;
  name: string;
  url: string;
  image?: string | null;
  category?: string | null;
  model?: string | null;
  short_description?: string | null;
  specs?: Record<string, any>;
  datasheets?: Array<{ label: string; url: string }>;
};

function deriveCategory(p: CatalogItem) {
  if (p.category) return p.category;
  try {
    const u = new URL(p.url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (p.brand === 'Apollo' && parts[0] === 'products' && parts[1]) return parts[1];
    if (p.brand === 'SRI' && parts[0] === 'product') return 'Online Store';
  } catch {
    // ignore
  }
  return 'General';
}

function safeImage(p: CatalogItem) {
  return p.image || `${import.meta.env.BASE_URL}products/meteory-drypowder.jpg`;
}

export default function Products() {
  const { t, language } = useLanguage();

  const catalog = (catalogRaw as CatalogItem[]).map((p) => ({
    ...p,
    category: deriveCategory(p),
    specs: p.specs || {},
    datasheets: p.datasheets || [],
  }));

  const brands = useMemo(() => {
    const set = new Set<string>();
    catalog.forEach((p) => set.add(p.brand));
    return ['All', ...Array.from(set).sort()];
  }, [catalog]);

  const [brandFilter, setBrandFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive] = useState<CatalogItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    catalog
      .filter((p) => brandFilter === 'All' || p.brand === brandFilter)
      .forEach((p) => set.add(p.category || 'General'));
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [catalog, brandFilter]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return catalog.filter((p) => {
      const matchesBrand = brandFilter === 'All' || p.brand === brandFilter;
      const matchesCategory = categoryFilter === 'All' || (p.category || 'General') === categoryFilter;
      const hay = `${p.name} ${p.model || ''} ${p.category || ''} ${p.brand}`.toLowerCase();
      const matchesSearch = !q || hay.includes(q);
      return matchesBrand && matchesCategory && matchesSearch;
    });
  }, [catalog, brandFilter, categoryFilter, searchQuery]);

  const modalQuoteText = (p: CatalogItem) => {
    const title = p.model ? `${p.name} (${p.model})` : p.name;
    return `Quote request: ${title} — Brand: ${p.brand}`;
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={t('nav_products')}
        subtitle={
          language === 'ar'
            ? 'كتالوج المنتجات من Meteory و Apollo و SRI — صور وروابط رسمية'
            : 'Full product catalogs from Meteory, Apollo, and SRI — official images and links'
        }
        backgroundImage={productsHeaderImg}
      />

      {/* Specs Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm overflow-y-auto overscroll-contain p-4 md:p-10"
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
              className="mx-auto my-10 w-[min(980px,92vw)] nb-card bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6 p-6 border-b-3 border-[var(--nb-stroke)]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                    {language === 'ar' ? 'المواصفات الفنية' : 'Technical Specs'}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
                      {active.brand}
                    </Badge>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{active.category}</span>
                    {active.model && (
                      <span className="text-xs text-gray-400 uppercase tracking-widest">• {active.model}</span>
                    )}
                  </div>
                  <div className="mt-3 text-2xl md:text-3xl font-display font-bold text-primary uppercase">
                    {active.name}
                  </div>
                  {active.short_description && (
                    <p className="mt-2 text-sm text-zinc-600 max-w-2xl">{active.short_description}</p>
                  )}
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
                <div className="relative min-h-[260px] md:min-h-[460px] bg-zinc-100">
                  <img
                    src={safeImage(active)}
                    alt={active.name}
                    className="absolute inset-0 w-full h-full object-contain p-8"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy={typeof active.image === 'string' && active.image.startsWith('http') ? 'no-referrer' : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {language === 'ar' ? 'المصدر الرسمي' : 'Official Source'}
                    </div>
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary"
                    >
                      {language === 'ar' ? 'فتح صفحة الشركة المصنّعة' : 'Open manufacturer page'}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {Object.keys(active.specs || {}).length > 0 ? (
                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'مواصفات مختصرة' : 'Key Specs'}
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2 max-h-[260px] overflow-auto pr-2">
                        {Object.entries(active.specs || {}).slice(0, 40).map(([k, v]) => (
                          <div key={k} className="flex items-start justify-between gap-4 border border-zinc-100 p-3">
                            <div className="text-xs font-bold text-primary uppercase tracking-wider">{k}</div>
                            <div className="text-xs text-zinc-600 text-right">{String(v)}</div>
                          </div>
                        ))}
                      </div>
                      {Object.keys(active.specs || {}).length > 40 && (
                        <div className="mt-2 text-[11px] text-muted-foreground">
                          {language === 'ar' ? 'تم عرض جزء من المواصفات — راجع صفحة الشركة للمزيد.' : 'Showing a subset — see manufacturer page for full details.'}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'المواصفات' : 'Specs'}
                      </div>
                      <p className="mt-2 text-sm text-zinc-600">
                        {language === 'ar'
                          ? 'لضمان الدقة، يتم عرض المواصفات الكاملة في صفحة الشركة المصنّعة.'
                          : 'For maximum accuracy, full specifications are provided on the manufacturer page.'}
                      </p>
                    </div>
                  )}

                  {active.datasheets && active.datasheets.length > 0 && (
                    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {language === 'ar' ? 'ملفات' : 'Files'}
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        {active.datasheets.slice(0, 6).map((d) => (
                          <a
                            key={d.url}
                            href={d.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary"
                          >
                            <FileText className="w-4 h-4" />
                            {d.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <a
                      href={buildWhatsApp(modalQuoteText(active))}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-secondary text-white px-5 py-3 font-bold uppercase tracking-widest nb-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                    >
                      {language === 'ar' ? 'طلب عرض سعر واتساب' : 'Request Quote (WhatsApp)'}
                      <MessageSquare className="ml-2 w-4 h-4" />
                    </a>
                    <a
                      href={buildMailto(`Quote Request - ${active.name}`, modalQuoteText(active))}
                      className="inline-flex items-center justify-center border-3 border-[var(--nb-stroke)] bg-white text-primary px-5 py-3 font-bold uppercase tracking-widest nb-shadow-sm hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                    >
                      {language === 'ar' ? 'طلب عرض سعر بريد' : 'Request Quote (Email)'}
                      <Mail className="ml-2 w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-[11px] text-muted-foreground">
                    {language === 'ar'
                      ? 'ملاحظة: الصور والروابط من مصادر الشركات المصنّعة لضمان الدقة.'
                      : 'Note: Images and links are sourced from manufacturers for accuracy.'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-10 bg-zinc-50 p-6 border border-zinc-200 rounded-none shadow-sm sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setBrandFilter(b);
                    setCategoryFilter('All');
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none ${
                    brandFilter === b
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-500 border-zinc-300 hover:border-primary hover:text-primary'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{language === 'ar' ? 'الفئة' : 'Category'}</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 bg-white border border-zinc-300 px-3 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative w-full lg:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language === 'ar' ? 'بحث بالاسم أو الموديل أو الفئة…' : 'Search by name, model, or category…'}
              className="pl-10 bg-white border-zinc-300 focus:ring-primary rounded-none h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 bg-secondary border border-primary nb-shadow-sm" />
            {language === 'ar' ? `عدد النتائج: ${filtered.length}` : `Results: ${filtered.length}`}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35 }}
                key={product.id}
              >
                <AnimatedCard className="h-full flex flex-col group">
                  <div className="relative h-64 overflow-hidden bg-zinc-100 flex items-center justify-center">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="secondary" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
                        {product.brand}
                      </Badge>
                    </div>
                    <img
                      src={safeImage(product)}
                      alt={product.name}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy={typeof product.image === 'string' && product.image.startsWith('http') ? 'no-referrer' : undefined}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col border-t border-zinc-100">
                    <div className="mb-4 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] text-gray-400 uppercase tracking-widest">
                          {product.model || product.category || '—'}
                        </span>
                        <span className="text-[11px] text-gray-400 uppercase tracking-widest">{product.category}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-primary leading-snug uppercase">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {product.short_description || (language === 'ar' ? 'اضغط لعرض المواصفات.' : 'Click to view specs.')}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setActive(product)}
                      className="w-full rounded-none border-zinc-300 hover:bg-primary hover:text-white uppercase tracking-wider font-bold text-xs h-10 transition-colors"
                    >
                      {language === 'ar' ? 'عرض المواصفات' : 'View Specs'}
                    </Button>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>{language === 'ar' ? 'لا توجد منتجات تطابق بحثك' : 'No products match your search'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
