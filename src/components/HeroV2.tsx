import React, { useState } from 'react';
import { Language, SearchFilterState } from '../types';
import { ArrowUpRight, MapPin, ShieldCheck, Check, Star } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface HeroV2Props {
  language: Language;
  onSearch: (filters: SearchFilterState) => void;
  onOpenBookingModal: () => void;
}

export const HeroV2: React.FC<HeroV2Props> = ({
  language,
  onSearch,
  onOpenBookingModal,
}) => {
  const { cmsData } = useCMS();
  const h2 = cmsData.siteContent.heroV2;

  const [activeCityTab, setActiveCityTab] = useState('All');

  const content = {
    EN: {
      cityTabs: ['All Rooms', 'Torino Residence', 'Politecnico Hub', 'UniTO Hub'],
      ctaReserve: 'Reserve Your Room',
      pills: ['1Gbps Fiber Wi-Fi', 'All Utilities Included', 'Weekly Housekeeping', '24/7 Security'],
    },
    IT: {
      cityTabs: ['Tutte le Camere', 'Residenza Torino', 'Polo Politecnico', 'Polo UniTO'],
      ctaReserve: 'Prenota La Tua Stanza',
      pills: ['Wi-Fi Fibra 1Gbps', 'Utenze Tutte Incluse', 'Pulizie Settimanali', 'Sicurezza h24'],
    },
  }[language];

  const handleCityFilter = (cityName: string) => {
    setActiveCityTab(cityName);
    onSearch({ city: 'All', roomType: 'All', maxBudget: 800, moveInDate: 'Sept 2025' });
  };

  return (
    <section className="relative bg-[#F8F1EA] pt-8 pb-20 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-300/60 pb-4">
          <span className="text-xs font-black tracking-widest text-[#FA5C38] uppercase">
            {h2.eyebrow[language]}
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 bg-white/90 px-3 py-1.5 rounded-full border border-zinc-200 shadow-2xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{h2.trustRating[language]}</span>
          </div>
        </div>

        <div className="max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.05]">
            {h2.headlineMain[language]} <br />
            <span className="text-[#FA5C38]">{h2.headlineSub[language]}</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-zinc-700 leading-relaxed font-normal max-w-2xl">
            {h2.paragraph[language]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {content.cityTabs.map((tab, idx) => {
            const isSelected = activeCityTab === tab || (activeCityTab === 'All' && idx === 0);
            return (
              <button
                key={tab}
                onClick={() => handleCityFilter(tab)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-lg'
                    : 'bg-white text-zinc-800 hover:bg-zinc-200 border border-zinc-300'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-xl group min-h-[380px] bg-zinc-900">
            <img
              src={h2.heroImage}
              alt="Editorial Room Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="bg-[#FFC83B] text-zinc-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-2 inline-block">
                  FEATURED RESIDENCE • TORINO, ITALY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{h2.featuredTitle}</h3>
                <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" /> {h2.featuredSubtitle}
                </p>
              </div>
              <button
                onClick={onOpenBookingModal}
                className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-1.5 shadow-md shrink-0"
              >
                <span>{content.ctaReserve}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-zinc-200/80 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#FA5C38]/10 text-[#FA5C38] flex items-center justify-center font-black mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-zinc-900 text-lg">Guaranteed All-Inclusive</h4>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  No separate bills for Wi-Fi, electricity, or heating. Everything is combined into one fixed monthly rate.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap gap-2">
                {content.pills.map((p, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-[#FA5C38]" /> {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                  FALL 2025 SEMESTER
                </span>
                <p className="text-sm font-extrabold text-white mt-0.5">Reservations Now Open</p>
              </div>
              <button
                onClick={onOpenBookingModal}
                className="w-10 h-10 rounded-full bg-[#FFC83B] text-zinc-950 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Book room"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
