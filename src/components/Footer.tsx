import React from 'react';
import { Language } from '../types';
import { Phone, Mail, MapPin, Globe, ArrowUp, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';

interface FooterProps {
  language: Language;
  onOpenBookingModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const { cmsData, navigateTo } = useCMS();
  const { contact } = cmsData.siteContent;

  const content = {
    EN: {
      sitemapTitle: 'CAMPUS DIRECTORY',
      contactTitle: 'RESIDENCE DESK',
      nav: ['Home', 'Rooms & Suites', 'Amenities', 'Seasonal Offers', 'Student Reviews', 'FAQ', 'Contact'],
      designCredit: 'Official Residence Portal • Torino',
      backToTop: 'Back to Top',
    },
    IT: {
      sitemapTitle: 'INDICE SITO',
      contactTitle: 'SEGRETERIA RESIDENZA',
      nav: ['Home', 'Camere & Suite', 'Servizi', 'Offerte', 'Recensioni', 'Domande Frequenti', 'Contatti'],
      designCredit: 'Portale Ufficiale Residenza • Torino',
      backToTop: 'Torna su',
    },
  }[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181614] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          <div className="md:col-span-5 space-y-4">
            <Logo variant="footer" />

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              {contact.tagline[language]}
            </p>

            <div className="pt-1 text-[11px] text-stone-500 font-mono">
              {contact.regionText}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.16em] text-stone-200 uppercase border-b border-stone-800 pb-2">
              {content.sitemapTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  {content.nav[1]}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {content.nav[2]}
                </a>
              </li>
              <li>
                <a href="#promotions" className="hover:text-white transition-colors">
                  {content.nav[3]}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {content.nav[4]}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {content.nav[5]}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.16em] text-stone-200 uppercase border-b border-stone-800 pb-2">
              {content.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC83B] shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-[#FFC83B] transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFC83B] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#FFC83B] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FA5C38] shrink-0" />
                <span>{contact.website}</span>
              </li>
              <li className="flex items-start gap-2 pt-1 text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-[#FA5C38] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{contact.copyright[language]}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3 text-[#E04D26]" />
              <span>Portal CMS (/admin)</span>
            </button>
            <span className="hidden sm:inline">{content.designCredit}</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded border border-stone-700 transition-colors"
            >
              <span>{content.backToTop}</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
