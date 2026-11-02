import React, { useState } from 'react';
import { Language } from '../types';
import { MapPin, Navigation, Bus, CheckCircle2, ExternalLink } from 'lucide-react';
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
        'Located at Viale della Rimembranza 2, Torino, Italy — right in the student district of Torino.',
      addressLabel: 'Address:',
      campusLabel: 'Campus Proximity:',
      transitLabel: 'Public Transit:',
      getDirections: 'Open in Google Maps',
    },
    IT: {
      eyebrow: 'POSIZIONE E CAMPUS',
      title: 'La Nostra Residenza',
      subtitle:
        'Situata in Viale della Rimembranza 2, Torino, Italia — nel cuore del quartiere universitario.',
      addressLabel: 'Indirizzo:',
      campusLabel: 'Vicinanza Campus:',
      transitLabel: 'Trasporti Pubblici:',
      getDirections: 'Apri su Google Maps',
    },
  }[language];

  if (!activeLoc) return null;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FFF8F0] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-black tracking-widest text-[#FA5C38] uppercase block">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto font-normal">
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {locations.map((loc, idx) => (
            <button
              key={loc.city + idx}
              onClick={() => setActiveCityIndex(idx)}
              className={`px-6 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all ${
                activeCityIndex === idx
                  ? 'bg-[#FA5C38] text-white shadow-md'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100 border border-amber-900/10'
              }`}
            >
              {loc.city} Residence
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xl">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FFC83B] text-zinc-950 font-black px-3 py-1 rounded-xl text-xs uppercase">
                <MapPin className="w-3.5 h-3.5 text-zinc-950" />
                <span>{activeLoc.city} CAMPUS HUB</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Studentato Emilia {activeLoc.city}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900">
                      {content.addressLabel}
                    </span>
                    <span className="text-zinc-600">{activeLoc.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900">
                      {content.campusLabel}
                    </span>
                    <span className="text-zinc-600">{activeLoc.distanceToCampus}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#FA5C38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-zinc-900">
                      {content.transitLabel}
                    </span>
                    <span className="text-zinc-600">{activeLoc.metroBusAccess}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-extrabold text-zinc-900 uppercase block mb-2">
                  Residence Amenities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLoc.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold text-zinc-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#FA5C38]" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md"
              >
                <span>{content.getDirections}</span>
                <ExternalLink className="w-4 h-4 text-[#FFC83B]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-zinc-200 min-h-[350px] relative shadow-inner bg-zinc-100">
            <iframe
              title={`Map of Studentato Emilia ${activeLoc.city}`}
              src={activeLoc.mapEmbedUrl}
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
