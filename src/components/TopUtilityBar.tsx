import React from 'react';
import { Language, DesktopVersion } from '../types';
import { Globe, Phone, Mail, MapPin } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TopUtilityBarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  desktopVersion?: DesktopVersion;
  setDesktopVersion?: (v: DesktopVersion) => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  language,
  setLanguage,
}) => {
  const { cmsData } = useCMS();
  const { contact } = cmsData.siteContent;

  return (
    <div className="bg-[#1C1917] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Location & Contact info */}
        <div className="flex items-center space-x-6 text-stone-300">
          <span className="hidden sm:inline-flex items-center gap-2 font-medium text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span className="tracking-wide text-[11px] uppercase font-semibold text-stone-300">
              {contact.topLocationText}
            </span>
          </span>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E04D26]" />
            <span className="font-medium text-[11px]">{contact.phone}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#E04D26]" />
            <span className="font-medium text-[11px]">{contact.email}</span>
          </a>
        </div>

        {/* Right: Language Switcher (V2 switch removed as per user instruction) */}
        <div className="flex items-center space-x-3 ml-auto">
          <div className="inline-flex items-center bg-stone-900 rounded border border-stone-700/60 p-0.5 text-[11px] font-semibold tracking-wider">
            <Globe className="w-3 h-3 text-stone-400 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'EN'
                  ? 'bg-[#E04D26] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              ENG
            </button>
            <span className="text-stone-700 px-0.5">|</span>
            <button
              onClick={() => setLanguage('IT')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'IT'
                  ? 'bg-[#E04D26] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
              aria-label="Passa all'Italiano"
            >
              ITA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
