import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';
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
      rooms: 'Rooms',
      services: 'Services',
      promotions: 'Promotions',
      reviews: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact Us',
      cta: 'See Our Rooms',
    },
    IT: {
      rooms: 'Camere',
      services: 'Servizi',
      promotions: 'Promozioni',
      reviews: 'Recensioni',
      faq: 'Domande Frequenti',
      contact: 'Contatti',
      cta: 'Vedi Le Camere',
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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md py-3 border-b border-amber-900/10 shadow-xs'
          : 'bg-[#FFF8F0] py-4 border-b border-amber-900/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="focus-visible:ring-2 focus-visible:ring-[#FA5C38] rounded-lg p-0.5 transition-opacity hover:opacity-90"
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
              className="text-sm font-bold text-zinc-700 hover:text-[#FA5C38] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FA5C38] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: Vibrant Orange & Yellow Accent */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full transition-all shadow-md shadow-orange-500/20 hover:shadow-lg active:scale-98"
          >
            <span>{labels.cta}</span>
            <ArrowRight className="w-4 h-4 text-[#FFC83B]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-800 hover:text-[#FA5C38] rounded-lg"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF8F0] border-b border-amber-900/10 px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-bold text-zinc-800 hover:bg-[#FA5C38]/10 hover:text-[#FA5C38] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-amber-900/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-sm py-3.5 rounded-xl transition-colors shadow-md"
            >
              <span>{labels.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#FFC83B]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
