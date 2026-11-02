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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md py-3 border-b border-amber-900/10'
          : 'bg-[#FFF8F0] py-4 border-b border-amber-900/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO: Clicking logo leads HOME (Requirement 3: Home -> klik logo, bukan menu item) */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="focus-visible:ring-2 focus-visible:ring-[#FA5C38] rounded-lg p-1 transition-transform hover:opacity-95"
          aria-label="Studentato Emilia Home"
        >
          <Logo variant="header" />
        </a>

        {/* Desktop Nav Items (Notice: NO Home link, as per requirement 3) */}
        <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:text-[#FA5C38] bg-transparent hover:bg-orange-50/60 transition-colors duration-200 rounded-lg focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FA5C38] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-orange-500/20 hover:shadow-lg transition-all hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-[#FA5C38]"
          >
            <span>{labels.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-800 hover:text-[#FA5C38] rounded-lg focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF8F0] border-b border-amber-900/10 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-zinc-800 hover:bg-[#FA5C38]/10 hover:text-[#FA5C38] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white font-bold py-3 rounded-xl shadow-md"
            >
              <span>{labels.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
