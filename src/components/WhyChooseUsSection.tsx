import React from 'react';
import { Language } from '../types';
import { Play } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface WhyChooseUsSectionProps {
  language: Language;
  onOpenVideoModal: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  language,
  onOpenVideoModal,
}) => {
  const { cmsData } = useCMS();
  const services = cmsData.siteContent.services;
  const amenities = cmsData.amenities;

  const watchTourLabel =
    language === 'EN' ? 'Watch Virtual Residence Tour' : 'Guarda Tour Video Residenza';

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#181614] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-stone-400 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-700 pb-1">
            <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
            <span>{services.eyebrow[language]}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white">
            {services.titleHighlight[language]} <br />
            <span className="text-[#E04D26] italic font-serif font-normal">{services.titleSub[language]}</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-normal">
            {services.subtitle[language]}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Amenities Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-900/90 p-5 rounded-lg border border-stone-800 hover:border-stone-700 transition-colors space-y-2"
              >
                <div className="font-serif text-xl font-normal text-[#E04D26] tracking-wider">
                  {item.number}
                </div>
                <h3 className="font-serif font-semibold text-base text-white">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-normal">
                  {item.desc[language]}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Architectural Video Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-800 bg-stone-950 group h-80 sm:h-[440px]">
              <img
                src={services.showcaseImage}
                alt="Studentato Emilia Living Space Torino"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-stone-950/40" />

              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                aria-label="Play residence video tour"
              >
                <Play className="w-5 h-5 fill-current ml-0.5 text-[#E04D26]" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-stone-900/90 text-stone-300 text-[11px] font-medium px-3.5 py-1.5 rounded border border-stone-700 inline-block">
                  {watchTourLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
