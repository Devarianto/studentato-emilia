import React, { useState } from 'react';
import { Language } from '../types';
import { MapPin, Navigation, Bus, Check, ArrowUpRight } from 'lucide-react';
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
      eyebrow: 'NEIGHBORHOOD & CONNECTIVITY',
      title: 'Strategic Location in Torino',
      subtitle:
        'Viale della Rimembranza 2, Torino — positioned in a tranquil historic district with rapid transit to Politecnico di Torino and UniTO faculties.',
      addressLabel: 'Official Residence Address:',
      campusLabel: 'University Transit Proximity:',
      transitLabel: 'Metro, Tram & Rail Links:',
      getDirections: 'Open in Google Maps',
    },
    IT: {
      eyebrow: 'QUARTIERE & COLLEGAMENTI',
      title: 'Posizione Strategica a Torino',
      subtitle:
        'Viale della Rimembranza 2, Torino — situata in un tranquillo contesto residenziale con collegamenti rapidi per il Politecnico di Torino e UniTO.',
      addressLabel: 'Indirizzo Ufficiale:',
      campusLabel: 'Distanza dai Campus:',
      transitLabel: 'Metro, Tram e Bus:',
      getDirections: 'Apri su Google Maps',
    },
  }[language];

  if (!activeLoc) return null;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1">
            <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* Location Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-lg p-6 sm:p-8 border border-stone-200 shadow-2xs">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-stone-600 text-[11px] font-medium tracking-wider uppercase border border-stone-200 px-2.5 py-1 rounded bg-stone-50">
                <MapPin className="w-3.5 h-3.5 text-[#E04D26]" />
                <span>Torino • Student Hub</span>
              </div>

              <h3 className="font-serif font-semibold text-2xl text-stone-900">
                Studentato Emilia {activeLoc.city}
              </h3>

              <div className="space-y-3 text-xs text-stone-700 pt-2 border-t border-stone-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E04D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">
                      {content.addressLabel}
                    </span>
                    <span className="text-stone-600">{activeLoc.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-[#E04D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">
                      {content.campusLabel}
                    </span>
                    <span className="text-stone-600">{activeLoc.distanceToCampus}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#E04D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">
                      {content.transitLabel}
                    </span>
                    <span className="text-stone-600">{activeLoc.metroBusAccess}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Building Highlights:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLoc.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded border border-stone-200 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-[#E04D26]" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs py-3 px-4 rounded-md transition-colors shadow-2xs"
              >
                <span>{content.getDirections}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E04D26]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-md overflow-hidden border border-stone-300 min-h-[360px] bg-stone-100 relative">
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
