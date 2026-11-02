import React from 'react';
import { Language, DesktopVersion } from '../types';
import { Globe, Layout, Phone, Mail } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TopUtilityBarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  desktopVersion: DesktopVersion;
  setDesktopVersion: (v: DesktopVersion) => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  language,
  setLanguage,
  desktopVersion,
  setDesktopVersion,
}) => {
  const { cmsData } = useCMS();
  const { contact } = cmsData.siteContent;

  return (
    <div className="bg-[#18181B] text-white text-xs py-2 px-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Quick Location & Contact info */}
        <div className="flex items-center space-x-6 text-zinc-300">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-medium text-amber-100/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {contact.topLocationText}
          </span>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1 hover:text-[#FFC83B] transition-colors focus-visible:ring-2 focus-visible:ring-[#FFC83B]"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFC83B]" />
            <span>{contact.phone}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hidden md:inline-flex items-center gap-1 hover:text-[#FFC83B] transition-colors focus-visible:ring-2 focus-visible:ring-[#FFC83B]"
          >
            <Mail className="w-3.5 h-3.5 text-[#FFC83B]" />
            <span>{contact.email}</span>
          </a>
        </div>

        {/* Right Controls: Desktop Version Switcher + ENG | ITA toggle */}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden md:flex items-center bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-700">
            <span className="text-[11px] text-zinc-400 px-2 flex items-center gap-1">
              <Layout className="w-3 h-3 text-[#FFC83B]" />
              Layout:
            </span>
            <button
              onClick={() => setDesktopVersion('v1')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                desktopVersion === 'v1'
                  ? 'bg-[#FA5C38] text-white shadow'
                  : 'text-zinc-300 hover:text-white'
              }`}
              title="Vibrant Figma Style Layout"
            >
              V1 Vibrant
            </button>
            <button
              onClick={() => setDesktopVersion('v2')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                desktopVersion === 'v2'
                  ? 'bg-[#FFC83B] text-zinc-950 shadow'
                  : 'text-zinc-300 hover:text-white'
              }`}
              title="Relife Editorial Style Layout"
            >
              V2 Editorial
            </button>
          </div>

          <div className="flex items-center bg-zinc-800/90 rounded-md p-1 border border-zinc-700 text-xs font-bold tracking-wider">
            <Globe className="w-3.5 h-3.5 text-zinc-400 mr-1.5 ml-1" />
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-0.5 rounded transition-all focus-visible:outline-none ${
                language === 'EN'
                  ? 'bg-[#FA5C38] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              ENG
            </button>
            <span className="text-zinc-600 px-0.5">|</span>
            <button
              onClick={() => setLanguage('IT')}
              className={`px-2 py-0.5 rounded transition-all focus-visible:outline-none ${
                language === 'IT'
                  ? 'bg-[#FA5C38] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
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
