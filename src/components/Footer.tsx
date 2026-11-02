import React from 'react';
import { Language } from '../types';
import { Phone, Mail, MapPin, Globe, ArrowUp, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const { cmsData, setIsCMSOpen } = useCMS();
  const { contact } = cmsData.siteContent;

  const content = {
    EN: {
      sitemapTitle: 'SITE MAP',
      contactTitle: 'CONTACT INFO',
      nav: ['Home', 'Rooms', 'Services', 'Promotions', 'Reviews', 'FAQ', 'Contact'],
      designCredit: 'Design & Engineering by Studentato Emilia Team',
      backToTop: 'Back to top',
    },
    IT: {
      sitemapTitle: 'MAPPA DEL SITO',
      contactTitle: 'CONTATTI',
      nav: ['Home', 'Camere', 'Servizi', 'Promozioni', 'Recensioni', 'FAQ', 'Contatti'],
      designCredit: 'Design & Sviluppo di Studentato Emilia Team',
      backToTop: 'Torna su',
    },
  }[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090B] text-white pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          <div className="md:col-span-5 space-y-4">
            <Logo variant="footer" />

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {contact.tagline[language]}
            </p>

            <div className="pt-2 text-xs font-mono text-zinc-400">{contact.regionText}</div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black tracking-widest text-white uppercase border-b border-zinc-800 pb-2">
              {content.sitemapTitle}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-medium">
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
            <h4 className="text-xs font-black tracking-widest text-white uppercase border-b border-zinc-800 pb-2">
              {content.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white shrink-0" />
                <span>{contact.website}</span>
              </li>
              <li className="flex items-start gap-2 pt-1 text-zinc-400">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>{contact.copyright[language]}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCMSOpen(true)}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-[#FA5C38]" />
              <span>CMS Admin</span>
            </button>
            <span>{content.designCredit}</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
            >
              <span>{content.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
