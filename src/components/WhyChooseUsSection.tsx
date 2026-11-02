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
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-white">
            {services.eyebrow[language]}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {services.titleHighlight[language]} <br />
            <span className="text-[#FFC83B]">{services.titleSub[language]}</span>
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            {services.subtitle[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 hover:bg-white/20 transition-all space-y-2"
              >
                <div className="text-3xl font-black text-[#FFC83B]">{item.number}</div>
                <h3 className="font-extrabold text-lg text-white">{item.title[language]}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{item.desc[language]}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-zinc-900 group h-80 sm:h-[460px]">
              <img
                src={services.showcaseImage}
                alt="Studentato Emilia Living Space"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-black/40" />

              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#FFC83B] text-zinc-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group/btn"
                aria-label="Play video tour"
              >
                <Play className="w-8 h-8 fill-current ml-1 group-hover/btn:scale-110 transition-transform text-zinc-950" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-center">
                <span className="bg-zinc-950/80 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 inline-block">
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
