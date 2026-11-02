import React, { useState } from 'react';
import { Language, SearchFilterState } from '../types';
import { Search, MapPin, Calendar, ArrowRight, Play, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
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
      cityLabel: 'City / Campus',
      typeLabel: 'Room Style',
      dateLabel: 'Move-in Term',
      searchBtn: 'Search Rooms',
      exploreBtn: 'Explore Residences',
      watchVideo: 'Virtual Video Tour',
    },
    IT: {
      searchTitle: 'Cerca Disponibilità Immediata',
      cityLabel: 'Città / Campus',
      typeLabel: 'Tipologia Stanza',
      dateLabel: 'Periodo Ingresso',
      searchBtn: 'Cerca Camere',
      exploreBtn: 'Esplora Residenze',
      watchVideo: 'Tour Virtuale',
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
    <section className="relative bg-[#FFF8F0] overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-amber-900/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC83B]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FA5C38]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-[#FA5C38]/20">
              <Sparkles className="w-4 h-4 text-[#FA5C38]" />
              <span>{h1.badge[language]}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]">
              <span className="text-[#FA5C38] underline decoration-[#FFC83B] decoration-4 underline-offset-8">
                {h1.titleHighlight[language]}
              </span>{' '}
              <br />
              <span className="text-zinc-900">{h1.titleSub[language]}</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
              {h1.description[language]}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {(h1.features[language] || []).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 bg-white/80 backdrop-blur-sm px-2.5 py-2 rounded-lg border border-amber-900/10 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FA5C38] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-amber-900/10 relative mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#FA5C38]" />
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900">
                    {labels.searchTitle}
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {h1.availabilityTag[language]}
                </span>
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-semibold rounded-lg p-2.5"
                  >
                    <option value="All">All Locations (Tutte)</option>
                    <option value="Torino">Torino Residence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.typeLabel}
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-semibold rounded-lg p-2.5"
                  >
                    <option value="All">All Types (Tutte)</option>
                    <option value="single_deluxe">Single Deluxe</option>
                    <option value="single_standard">Single Standard</option>
                    <option value="shared_twin">Shared Twin</option>
                    <option value="studio">Studio Apt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FA5C38]" />
                    {labels.dateLabel}
                  </label>
                  <select
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-semibold rounded-lg p-2.5"
                  >
                    <option value="Sept 2025">September 2025</option>
                    <option value="Oct 2025">October 2025</option>
                    <option value="Immediate">Immediate / Spring</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#FA5C38] hover:bg-[#E04B28] text-white font-bold text-xs py-2.5 px-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>{labels.searchBtn}</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold px-6 py-3 rounded-full text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{labels.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideoModal}
                className="bg-white hover:bg-zinc-50 text-zinc-900 font-extrabold px-5 py-3 rounded-full text-sm border-2 border-zinc-200 flex items-center gap-2 transition-all hover:border-[#FA5C38]"
              >
                <div className="w-6 h-6 rounded-full bg-[#FFC83B] flex items-center justify-center text-zinc-950">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>{labels.watchVideo}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-zinc-900 group">
              <img
                src={h1.heroImage}
                alt="Studentato Emilia Residence Room"
                className="w-full h-[440px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FA5C38] block">
                      {h1.cardEyebrow}
                    </span>
                    <h4 className="font-extrabold text-zinc-900 text-base">{h1.cardTitle}</h4>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#FA5C38]" /> {h1.cardSubtitle}
                    </p>
                  </div>
                  <div className="text-right bg-[#FFC83B] text-zinc-950 px-3 py-1.5 rounded-xl font-black text-sm">
                    {h1.cardPrice}
                    <span className="text-[10px] font-bold">/mo</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FA5C38] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group/btn"
                aria-label="Play residence virtual tour video"
              >
                <Play className="w-7 h-7 fill-current ml-1 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>

            <div className="hidden sm:flex absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#FFC83B] text-zinc-950 items-center justify-center p-2 shadow-xl border-4 border-white animate-spin-slow pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full font-bold text-[10px] tracking-widest uppercase fill-zinc-950"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text>
                  <textPath href="#circlePath">STUDENTATO EMILIA • HOUSING •</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-[#FA5C38]">
                EST.2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
