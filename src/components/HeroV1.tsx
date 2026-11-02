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
      eyebrow: 'RESIDENZA UNIVERSITARIA • TORINO, ITALIA',
      searchTitle: 'Check Academic Availability',
      cityLabel: 'Campus / Location',
      typeLabel: 'Accommodation Type',
      dateLabel: 'Semester / Intake',
      searchBtn: 'Search Available Rooms',
      exploreBtn: 'View Room Catalog',
      watchVideo: 'Video Tour (2 Min)',
    },
    IT: {
      eyebrow: 'RESIDENZA UNIVERSITARIA • TORINO, ITALIA',
      searchTitle: 'Verifica Disponibilità Accademica',
      cityLabel: 'Campus / Zona',
      typeLabel: 'Tipologia Alloggio',
      dateLabel: 'Ingresso Semestre',
      searchBtn: 'Cerca Camere Disponibili',
      exploreBtn: 'Catalogo Alloggi',
      watchVideo: 'Guarda Tour Video (2 Min)',
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
    <section className="relative bg-[#FAF8F5] pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-7">
            {/* Architectural Eyebrow (No Sparkles, No Rainbow Pills) */}
            <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1">
              <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
              <span>{labels.eyebrow}</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-stone-900 leading-[1.12]">
              <span className="text-[#E04D26] italic font-serif font-normal">
                {h1.titleHighlight[language]}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span>{h1.titleSub[language]}</span>
            </h1>

            {/* Subtitle with unhurried editorial tone */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
              {h1.description[language]}
            </p>

            {/* Key Residence Facts (Clean Hairline Badges, not neon bubbles) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {(h1.features[language] || []).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-stone-800 bg-white px-3 py-2 rounded-md border border-stone-200 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-[#E04D26] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Search Availability Box: Architectural & Tactile */}
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-xs border border-stone-200/90 mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E04D26]" />
                  <h3 className="font-serif font-semibold text-sm sm:text-base text-stone-900">
                    {labels.searchTitle}
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                  {h1.availabilityTag[language]}
                </span>
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
              >
                <div>
                  <label className="block font-medium text-stone-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E04D26]" />
                    {labels.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-800 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                  >
                    <option value="All">All Locations (Torino)</option>
                    <option value="Torino">Viale della Rimembranza 2</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-600 mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#E04D26]" />
                    {labels.typeLabel}
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-800 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                  >
                    <option value="All">All Room Types</option>
                    <option value="single_deluxe">Single Deluxe Suite</option>
                    <option value="single_standard">Standard Single Study</option>
                    <option value="shared_twin">Executive Twin Suite</option>
                    <option value="studio">Private Studio Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#E04D26]" />
                    {labels.dateLabel}
                  </label>
                  <select
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 text-stone-800 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                  >
                    <option value="Sept 2025">September 2025 (Autumn)</option>
                    <option value="Oct 2025">October 2025</option>
                    <option value="Immediate">Immediate Availability</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold text-xs py-2.5 px-3 rounded-md transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>{labels.searchBtn}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenBookingModal}
                className="bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold px-5 py-3 rounded-md text-xs shadow-xs flex items-center gap-2 transition-colors border border-amber-950/15"
              >
                <span>{labels.exploreBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenVideoModal}
                className="bg-white hover:bg-stone-50 text-stone-800 font-semibold px-4 py-3 rounded-md text-xs border border-stone-300 flex items-center gap-2 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 border border-stone-200">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-stone-700" />
                </div>
                <span>{labels.watchVideo}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Photography Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-sm bg-stone-900 group">
              <img
                src={h1.heroImage}
                alt="Studentato Emilia Residence Torino"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Architectural Label Plaque */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 rounded-md border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E04D26] block">
                      {h1.cardEyebrow}
                    </span>
                    <h4 className="font-serif font-semibold text-stone-900 text-sm sm:text-base">
                      {h1.cardTitle}
                    </h4>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#E04D26]" /> {h1.cardSubtitle}
                    </p>
                  </div>
                  <div className="text-right bg-stone-100 border border-stone-200 text-stone-900 px-3 py-1.5 rounded font-serif font-bold text-sm">
                    {h1.cardPrice}
                    <span className="text-[10px] font-sans font-normal text-stone-500">/mo</span>
                  </div>
                </div>
              </div>

              {/* Play Tour Button */}
              <button
                onClick={onOpenVideoModal}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                aria-label="Play virtual residence tour video"
              >
                <Play className="w-5 h-5 fill-current ml-0.5 text-[#E04D26]" />
              </button>
            </div>

            {/* Official Residence Seal (Dignified & Architectural, not spinning cartoon) */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-[#1C1917] text-stone-200 px-3.5 py-2 rounded-md shadow-md border border-stone-700 text-[11px] font-serif tracking-wide items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Torino Official Student Housing • Viale della Rimembranza 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
