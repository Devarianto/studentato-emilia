import React from 'react';
import { Language } from '../types';
import { Globe, Phone, Mail, MapPin, Moon, Sun } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TopUtilityBarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  language,
  setLanguage,
  isDarkMode,
  toggleDarkMode,
}) => {
  const { cmsData } = useCMS();
  const { contact } = cmsData.siteContent;

  return (
    <div className="bg-[#18181B] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Location & Contact info */}
        <div className="flex items-center space-x-6 text-stone-300">
          <span className="hidden sm:inline-flex items-center gap-2 font-medium text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" />
            <span className="tracking-wide text-[11px] uppercase font-semibold text-stone-300">
              {contact.topLocationText}
            </span>
          </span>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#FFC83B] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#FA5C38]" />
            <span className="font-semibold text-[11px]">{contact.phone}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-stone-300 hover:text-[#FFC83B] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#FA5C38]" />
            <span className="font-semibold text-[11px]">{contact.email}</span>
          </a>
        </div>

        {/* Right: Dark Mode Toggle + Language Switcher */}
        <div className="flex items-center space-x-2.5 ml-auto">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white px-2.5 py-1 rounded-md border border-stone-700/60 text-[11px] font-bold transition-all active:scale-95"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FFC83B]" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-300" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="inline-flex items-center bg-stone-900 rounded-md border border-stone-700/60 p-0.5 text-[11px] font-bold tracking-wider">
            <Globe className="w-3 h-3 text-stone-400 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'EN'
                  ? 'bg-[#FA5C38] text-white shadow-xs'
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
                  ? 'bg-[#FA5C38] text-white shadow-xs'
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
