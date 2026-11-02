import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  language: Language;
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = {
    EN: {
      rooms: 'Rooms & Suites',
      services: 'Amenities',
      promotions: 'Seasonal Offers',
      reviews: 'Residents',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'View Available Rooms',
    },
    IT: {
      rooms: 'Camere & Suite',
      services: 'Servizi',
      promotions: 'Offerte',
      reviews: 'Residenti',
      faq: 'Domande Frequenti',
      contact: 'Contatti',
      cta: 'Vedi Disponibilità',
    },
  }[language];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: labels.rooms, href: '#rooms' },
    { name: labels.services, href: '#services' },
    { name: labels.promotions, href: '#promotions' },
    { name: labels.reviews, href: '#reviews' },
    { name: labels.faq, href: '#faq' },
    { name: labels.contact, href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-xs py-3 border-b border-stone-300/80 shadow-xs'
          : 'bg-[#FAF8F5] py-4 border-b border-stone-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO: Leads Home */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="focus-visible:ring-2 focus-visible:ring-[#E04D26] rounded p-0.5 transition-opacity hover:opacity-90"
          aria-label="Studentato Emilia Home"
        >
          <Logo variant="header" />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-stone-700 hover:text-[#E04D26] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#E04D26] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: Tactile, Editorial, Crisp (Not an oversized pill bubble) */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-1.5 bg-[#E04D26] hover:bg-[#CC3E18] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-colors border border-amber-950/15 shadow-xs"
          >
            <span>{labels.cta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-stone-700 hover:text-[#E04D26] rounded-md"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 space-y-4 shadow-md">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded text-sm font-medium text-stone-800 hover:bg-stone-100 hover:text-[#E04D26] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#E04D26] hover:bg-[#CC3E18] text-white font-medium text-xs py-3 rounded-md transition-colors shadow-xs"
            >
              <span>{labels.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
