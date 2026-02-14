import React, { useState } from 'react';
import { useLocation, Link } from "wouter";
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import { Mail, Phone, MapPin, Menu, X, Globe, MessageCircle } from 'lucide-react';
import logoImg from '../assets/logo.webp';

export function Navigation() {
  const { t, language, toggleLanguage, dir } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'nav_home' },
    { href: '/about', label: 'nav_about' },
    { href: '/products', label: 'nav_products' },
    { href: '/services', label: 'nav_services' },
    { href: '/projects', label: 'nav_projects' },
    { href: '/portfolio', label: 'nav_portfolio' },
    { href: '/calculator', label: 'nav_calculator' },
    { href: '/contact', label: 'nav_contact' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="flex flex-col sticky top-0 z-50 w-full">
      {/* Top Bar - Corporate Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100">
              <Phone size={14} className="text-secondary-foreground" />
              <a href="tel:+201010001898" dir="ltr" className="font-mono tracking-wide hover:underline">+20 101 000 1898</a>
            </div>
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100">
              <Mail size={14} className="text-secondary-foreground" />
              <a href="mailto:Info@sparx-engineering.com" className="font-sans hover:underline">Info@sparx-engineering.com</a>
            </div>
            <div className="flex items-center gap-2 opacity-90 hover:opacity-100">
              <MessageCircle size={14} className="text-secondary-foreground" />
              <a
                href="https://wa.me/201010001898?text=Hello%20Sparx%20Engineering%2C%20I%20need%20a%20quotation."
                target="_blank"
                rel="noreferrer"
                className="font-sans hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-75 text-xs uppercase tracking-wider font-bold">ISO 9001:2015 Certified</span>
            <div className="h-3 w-px bg-primary-foreground/20"></div>
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-1 hover:text-secondary-foreground transition-colors font-bold text-xs uppercase"
            >
              <Globe size={12} />
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b-2 border-[var(--nb-stroke)] shadow-[var(--nb-shadow-sm)]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo */}
            <img src={logoImg} alt="Sparx Engineering" className="h-16 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 hover:-translate-y-0.5",
                  isActive(link.href) 
                    ? "text-primary border-primary bg-primary/5" 
                    : "text-muted-foreground border-transparent hover:text-primary hover:bg-muted"
                )}>
                  {t(link.label)}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
             <button 
              onClick={toggleLanguage} 
              className="md:hidden flex items-center gap-1 text-sm font-bold"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-primary">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[var(--nb-stroke)] bg-background absolute w-full shadow-[var(--nb-shadow-sm)]">
            <div className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <div className={cn(
                    "px-4 py-3 text-base font-bold uppercase border-l-4 transition-colors",
                    isActive(link.href)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-muted"
                  )}>
                    {t(link.label)}
                  </div>
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <a href="tel:+201010001898" dir="ltr" className="hover:underline">+20 101 000 1898</a>
                 </div>
                 <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Info@sparx-engineering.com</span>
                 </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0B1F3B] text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div className="md:col-span-1 space-y-6">
          <img src={logoImg} alt="Sparx Engineering" className="h-16 w-auto brightness-0 invert opacity-90" />
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('footer_desc')}
          </p>
          <div className="flex gap-4">
             {/* Social Icons Placeholder */}
             <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">FB</div>
             <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">LI</div>
             <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">IG</div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-secondary">
            {t('footer_links')}
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-secondary transition-colors flex items-center gap-2"><span className="text-secondary">›</span> {t('nav_about')}</Link></li>
            <li><Link href="/products" className="hover:text-secondary transition-colors flex items-center gap-2"><span className="text-secondary">›</span> {t('nav_products')}</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors flex items-center gap-2"><span className="text-secondary">›</span> {t('nav_services')}</Link></li>
            <li><Link href="/projects" className="hover:text-secondary transition-colors flex items-center gap-2"><span className="text-secondary">›</span> {t('nav_projects')}</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors flex items-center gap-2"><span className="text-secondary">›</span> {t('nav_contact')}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-secondary">
             {language === 'ar' ? 'خدماتنا' : 'Our Solutions'}
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white transition-colors">Fire Alarm Systems</li>
            <li className="hover:text-white transition-colors">Fire Fighting Pumps</li>
            <li className="hover:text-white transition-colors">FM-200 Suppression</li>
            <li className="hover:text-white transition-colors">CO2 Systems</li>
            <li className="hover:text-white transition-colors">Maintenance Contracts</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-secondary">
            {t('footer_contact')}
          </h3>
          <div className="text-sm text-gray-400 space-y-4">
            <div className="flex items-start gap-3">
               <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
               <p>{t('address')}</p>
            </div>
            <div className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
               <p>Info@sparx-engineering.com</p>
            </div>
            <div className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
               <div className="font-mono" dir="ltr">
                 <p><a href="tel:+201010001898" className="hover:underline">+20 101 000 1898</a></p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 pt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {t('company_name')}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <Link href="/admin" className="hover:text-white cursor-pointer transition-colors text-gray-500 text-xs">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
