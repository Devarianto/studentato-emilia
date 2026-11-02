import React, { useState } from 'react';
import { Room, Language, SearchFilterState } from '../types';
import { Star, MapPin, ArrowUpRight, Check, Filter, Info } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface RoomCatalogSectionProps {
  language: Language;
  searchFilter: SearchFilterState;
  onSelectRoom: (room: Room) => void;
}

export const RoomCatalogSection: React.FC<RoomCatalogSectionProps> = ({
  language,
  searchFilter,
  onSelectRoom,
}) => {
  const { cmsData } = useCMS();
  const roomsList = cmsData.rooms;

  const [selectedCity, setSelectedCity] = useState<string>(searchFilter.city || 'All');
  const [selectedType, setSelectedType] = useState<string>(searchFilter.roomType || 'All');

  const content = {
    EN: {
      eyebrow: 'ACCOMMODATION DIRECTORY',
      title: 'Curated Rooms & Private Suites',
      seeAll: 'View All Typologies',
      filterAllCities: 'All Locations',
      filterAllTypes: 'All Typologies',
      monthUnit: '/ month (all inclusive)',
      detailBtn: 'View Room Details & Floorplan',
      noResults: 'No rooms match your exact filter. Showing all available options below.',
      resetFilters: 'Reset Filters',
    },
    IT: {
      eyebrow: 'CATALOGO ALLOGGI',
      title: 'Camere Curate & Suite Private',
      seeAll: 'Vedi Tutte le Tipologie',
      filterAllCities: 'Tutte le Zone',
      filterAllTypes: 'Tutte le Tipologie',
      monthUnit: '/ mese (tutto incluso)',
      detailBtn: 'Dettagli Camera & Planimetria',
      noResults:
        'Nessuna camera corrisponde esattamente ai filtri. Mostriamo tutte le opzioni disponibili.',
      resetFilters: 'Reimposta Filtri',
    },
  }[language];

  const uniqueCities = Array.from(new Set(roomsList.map((r) => r.city)));

  const filteredRooms = roomsList.filter((room) => {
    const matchCity =
      selectedCity === 'All' ||
      selectedCity === content.filterAllCities ||
      room.city.toLowerCase() === selectedCity.toLowerCase();
    const matchType =
      selectedType === 'All' ||
      selectedType === content.filterAllTypes ||
      room.type === selectedType;
    const matchBudget = room.priceMonth <= (searchFilter.maxBudget || 2000);

    return matchCity && matchType && matchBudget;
  });

  const displayRooms = filteredRooms.length > 0 ? filteredRooms : roomsList;

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1 mb-2">
              <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight">
              {content.title}
            </h2>
          </div>

          <a
            href="#rooms"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCity('All');
              setSelectedType('All');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E04D26] hover:text-[#CC3E18] transition-colors"
          >
            <span>{content.seeAll}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Minimalist Architectural Filter Toolbar */}
        <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-stone-700">
            <Filter className="w-3.5 h-3.5 text-[#E04D26]" />
            <span>Filter by:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['All', ...uniqueCities].map((cityOption) => (
              <button
                key={cityOption}
                onClick={() => setSelectedCity(cityOption)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCity === cityOption
                    ? 'bg-[#E04D26] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cityOption === 'All' ? content.filterAllCities : `${cityOption} Residence`}
              </button>
            ))}
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-stone-50 text-stone-800 text-xs font-medium rounded-md px-3 py-1.5 border border-stone-300 focus:border-[#E04D26] outline-none"
          >
            <option value="All">{content.filterAllTypes}</option>
            <option value="single_deluxe">Single Deluxe</option>
            <option value="single_standard">Single Standard</option>
            <option value="shared_twin">Shared Twin</option>
            <option value="studio">Studio Apt</option>
          </select>
        </div>

        {filteredRooms.length === 0 && (
          <div className="bg-stone-100 border border-stone-300 p-4 rounded-md mb-8 flex items-center justify-between text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-stone-500 shrink-0" />
              <span>{content.noResults}</span>
            </div>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedType('All');
              }}
              className="font-semibold text-[#E04D26] underline"
            >
              {content.resetFilters}
            </button>
          </div>
        )}

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-52 overflow-hidden bg-stone-900">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />

                  {room.badge && (
                    <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border border-stone-200">
                      {room.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-stone-950/80 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E04D26]" /> {room.city}
                  </span>

                  <div className="absolute bottom-3 left-3 bg-[#1C1917]/90 text-white px-2.5 py-1 rounded text-xs font-serif font-bold">
                    €{room.priceMonth}
                    <span className="text-[10px] font-sans font-normal text-stone-300"> /mo</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex text-amber-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif font-semibold text-stone-900 text-base leading-snug group-hover:text-[#E04D26] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {room.description[language]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-[#E04D26]" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0 border-t border-stone-100 mt-2">
                <button
                  onClick={() => onSelectRoom(room)}
                  className="w-full mt-2.5 inline-flex items-center justify-between text-xs font-semibold text-stone-800 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-stone-300 py-2 px-3 rounded-md transition-colors"
                >
                  <span>{content.detailBtn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E04D26]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
