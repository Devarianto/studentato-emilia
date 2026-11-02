import React, { useState } from 'react';
import { Language } from '../types';
import { MapPin, Navigation, Bus, Check, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface LocationSectionProps {
  language: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const { cmsData } = useCMS();
  const locations = cmsData.locations;

  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const activeLoc = locations[activeCityIndex] || locations[0];

  const content = {
    EN: {
      eyebrow: 'LOCATION & CAMPUS HUB',
      title: 'Our Residence Location',
      subtitle:
        'Viale della Rimembranza 2, Torino, Italy — positioned in a tranquil student district with direct transit to Politecnico di Torino and UniTO faculties.',
      addressLabel: 'Official Residence Address:',
      campusLabel: 'Campus Proximity:',
      transitLabel: 'Public Transit:',
      getDirections: 'Open in Google Maps',
    },
    IT: {
      eyebrow: 'POSIZIONE E CAMPUS',
      title: 'La Nostra Residenza',
      subtitle:
        'Viale della Rimembranza 2, Torino, Italia — situata nel cuore del distretto universitario con collegamenti rapidi per Politecnico e UniTO.',
      addressLabel: 'Indirizzo:',
      campusLabel: 'Vicinanza Campus:',
      transitLabel: 'Trasporti Pubblici:',
      getDirections: 'Apri su Google Maps',
    },
  }[language];

  if (!activeLoc) return null;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FFF8F0] dark:bg-[#0F0F12] border-b border-amber-900/10 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FA5C38]/20">
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* Location Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#18181D] rounded-3xl p-6 sm:p-8 border border-amber-900/10 dark:border-zinc-800 shadow-sm">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FFC83B] text-zinc-950 font-black px-3 py-1 rounded-xl text-xs uppercase shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-zinc-950" />
                <span>{activeLoc.city} CAMPUS HUB</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                Studentato Emilia {activeLoc.city}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900 dark:text-white">
                      {content.addressLabel}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">{activeLoc.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900 dark:text-white">
                      {content.campusLabel}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">{activeLoc.distanceToCampus}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900 dark:text-white">
                      {content.transitLabel}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">{activeLoc.metroBusAccess}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-extrabold text-zinc-900 dark:text-white uppercase block mb-2">
                  Building Highlights:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLoc.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/40 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-[#FA5C38]" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>{content.getDirections}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC83B]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 min-h-[360px] bg-zinc-100 dark:bg-zinc-900 relative shadow-inner">
            <iframe
              title={`Map of Studentato Emilia ${activeLoc.city}`}
              src={activeLoc.mapEmbedUrl}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
