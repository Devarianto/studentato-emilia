import React, { useState } from 'react';
import { Language, SearchFilterState } from '../types';
import { Search, MapPin, Calendar, ArrowRight, Play, Check, Building2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface HeroV1Props {
  language: Language;
  onSearch: (filters: SearchFilterState) => void;
  onOpenVideoModal: () => void;
  onOpenBookingModal: () => void;
}

export const HeroV1: React.FC<HeroV1Props> = ({
  language,
  onSearch,
  onOpenVideoModal,
  onOpenBookingModal,
}) => {
  const { cmsData } = useCMS();
  const h1 = cmsData.siteContent.heroV1;

  const [city, setCity] = useState('All');
  const [roomType, setRoomType] = useState('All');
  const [maxBudget] = useState(750);
  const [moveInDate, setMoveInDate] = useState('Sept 2025');

  const labels = {
    EN: {
      searchTitle: 'Instant Availability Finder',
      cityLabel: 'Campus / Location',
      typeLabel: 'Accommodation Style',
      dateLabel: 'Semester / Move-in',
      searchBtn: 'Search Rooms',
      exploreBtn: 'Explore All Rooms',
      watchVideo: 'Virtual Video Tour',
    },
    IT: {
      searchTitle: 'Verifica Disponibilità Immediata',
      cityLabel: 'Campus / Zona',
      typeLabel: 'Tipologia Alloggio',
      dateLabel: 'Ingresso Semestre',
      searchBtn: 'Cerca Camere',
      exploreBtn: 'Esplora Tutte le Camere',
      watchVideo: 'Guarda Video Tour',
    },
  }[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, roomType, maxBudget, moveInDate });
    const roomsElem = document.getElementById('rooms');
    if (roomsElem) {
      roomsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#FFF8F0] dark:bg-[#0F0F12] pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-amber-900/10 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Modern High-Impact Layout */}
          <div className="lg:col-span-7 space-y-6">
            {/* Modern Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FA5C38]/20">
              <span className="w-2 h-2 rounded-full bg-[#FA5C38]" />
              <span>{h1.badge[language]}</span>
            </div>

            {/* Modern Bold Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              <span className="text-[#FA5C38]">
                {h1.titleHighlight[language]}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span>{h1.titleSub[language]}</span>
            </h1>

            {/* Modern Clean Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              {h1.description[language]}
            </p>

            {/* Key Residence Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {(h1.features[language] || []).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-[#18181D] px-3 py-2.5 rounded-xl border border-amber-900/10 dark:border-zinc-800 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 text-[#FA5C38] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Search Availability Box */}
            <div className="bg-white dark:bg-[#18181D] p-5 sm:p-6 rounded-2xl shadow-md border border-amber-900/10 dark:border-zinc-800 mt-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FA5C38]" />
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
                    {labels.searchTitle}
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  {h1.availabilityTag[language]}
                </span>
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-zinc-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#111115] border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                  >
                    <option value="All">All Locations (Torino)</option>
                    <option value="Torino">Viale della Rimembranza 2</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.typeLabel}
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#111115] border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                  >
                    <option value="All">All Room Types</option>
                    <option value="single_deluxe">Single Deluxe Suite</option>
                    <option value="single_standard">Standard Single Study</option>
                    <option value="shared_twin">Shared Twin Studio</option>
                    <option value="studio">Studio Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.dateLabel}
                  </label>
                  <select
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#111115] border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                  >
                    <option value="Sept 2025">September 2025</option>
                    <option value="Oct 2025">October 2025</option>
                    <option value="Immediate">Immediate / Spring</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>{labels.searchBtn}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenBookingModal}
                className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold px-6 py-3.5 rounded-full text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>{labels.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC83B]" />
              </button>

              <button
                onClick={onOpenVideoModal}
                className="bg-white dark:bg-[#18181D] hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-extrabold px-5 py-3.5 rounded-full text-xs sm:text-sm border border-zinc-300 dark:border-zinc-700 flex items-center gap-2.5 transition-all shadow-xs cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#FFC83B] flex items-center justify-center text-zinc-950 font-bold">
                  <Play className="w-3 h-3 fill-current ml-0.5 text-zinc-950" />
                </div>
                <span>{labels.watchVideo}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Modern Image Card with Orange & Yellow accents */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-zinc-900 group">
              <img
                src={h1.heroImage}
                alt="Studentato Emilia Residence Torino"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Plaque: Orange & Yellow Brand Accents */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#18181D]/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-zinc-700/60 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FA5C38] block">
                      {h1.cardEyebrow}
                    </span>
                    <h4 className="font-heading font-black text-zinc-900 dark:text-white text-base">
                      {h1.cardTitle}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" /> {h1.cardSubtitle}
                    </p>
                  </div>
                  <div className="text-right bg-[#FFC83B] text-zinc-950 px-3.5 py-1.5 rounded-xl font-heading font-black text-sm shadow-xs">
                    {h1.cardPrice}
                    <span className="text-[10px] font-bold font-sans">/mo</span>
                  </div>
                </div>
              </div>

              {/* Play Video Trigger */}
              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FA5C38] hover:bg-[#E04B28] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Play virtual residence tour video"
              >
                <Play className="w-7 h-7 fill-current ml-1 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
