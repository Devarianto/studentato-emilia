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
    language === 'EN' ? 'Watch Campus Video Tour' : 'Guarda Tour Video Residenza';

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FA5C38] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-block bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white">
            <span>{services.eyebrow[language]}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {services.titleHighlight[language]} <br />
            <span className="text-[#FFC83B]">{services.titleSub[language]}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal">
            {services.subtitle[language]}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Amenities Grid with Yellow & White */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors space-y-2"
              >
                <div className="font-heading text-3xl font-black text-[#FFC83B]">
                  {item.number}
                </div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed font-normal">
                  {item.desc[language]}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Architectural Video Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/30 bg-zinc-900 group h-80 sm:h-[440px] shadow-xl">
              <img
                src={services.showcaseImage}
                alt="Studentato Emilia Living Space Torino"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30" />

              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FFC83B] text-zinc-950 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                aria-label="Play residence video tour"
              >
                <Play className="w-6 h-6 fill-current ml-1 text-zinc-950" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-zinc-950/80 text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 inline-block">
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
