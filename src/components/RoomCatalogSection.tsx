import React, { useState } from 'react';
import { Room, Language, SearchFilterState } from '../types';
import { Star, MapPin, ArrowRight, Check, Filter, Info } from 'lucide-react';
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
      eyebrow: 'ACCOMMODATION CATALOG',
      title: 'Our Premium Rooms',
      seeAll: 'See all rooms',
      filterAllCities: 'All Locations',
      filterAllTypes: 'All Room Types',
      monthUnit: '/ month',
      detailBtn: 'Detail Room >',
      noResults: 'No rooms match your exact filter. Showing all available options below.',
      resetFilters: 'Reset Filters',
    },
    IT: {
      eyebrow: 'CATALOGO ALLOGGI',
      title: 'Le Nostre Camere',
      seeAll: 'Vedi tutte le camere',
      filterAllCities: 'Tutte le Zone',
      filterAllTypes: 'Tutti i Tipi',
      monthUnit: '/ mese',
      detailBtn: 'Dettagli Stanza >',
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
    <section id="rooms" className="py-16 sm:py-24 bg-[#FFF8F0] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3 py-1 rounded-full text-xs font-bold mb-2">
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight">
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
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#FA5C38] hover:text-[#E04B28] transition-colors"
          >
            <span>{content.seeAll}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-amber-900/10 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-zinc-700">
            <Filter className="w-4 h-4 text-[#FA5C38]" />
            <span>Filter Catalog:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...uniqueCities].map((cityOption) => (
              <button
                key={cityOption}
                onClick={() => setSelectedCity(cityOption)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedCity === cityOption
                    ? 'bg-[#FA5C38] text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cityOption === 'All' ? content.filterAllCities : `${cityOption} Residence`}
              </button>
            ))}
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-zinc-100 text-zinc-900 text-xs font-bold rounded-xl px-3 py-2 border border-zinc-200 outline-none"
          >
            <option value="All">{content.filterAllTypes}</option>
            <option value="single_deluxe">Single Deluxe</option>
            <option value="single_standard">Single Standard</option>
            <option value="shared_twin">Shared Twin</option>
            <option value="studio">Studio Apt</option>
          </select>
        </div>

        {filteredRooms.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{content.noResults}</span>
            </div>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedType('All');
              }}
              className="font-extrabold text-[#FA5C38] underline"
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
              className="bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-56 overflow-hidden bg-zinc-900">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {room.badge && (
                    <span className="absolute top-3 left-3 bg-[#FFC83B] text-zinc-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                      {room.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-zinc-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FA5C38]" /> {room.city}
                  </span>

                  <div className="absolute bottom-3 right-3 bg-[#FA5C38] text-white px-3 py-1 rounded-xl font-heading font-black text-sm shadow-md">
                    €{room.priceMonth}
                    <span className="text-[10px] font-sans font-normal text-amber-100"> {content.monthUnit}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex text-[#FFC83B] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-heading font-black text-zinc-900 text-lg leading-snug group-hover:text-[#FA5C38] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {room.description[language]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-[#FA5C38]" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 border-t border-zinc-100 mt-2">
                <button
                  onClick={() => onSelectRoom(room)}
                  className="w-full mt-3 inline-flex items-center justify-between text-xs font-black text-[#FA5C38] hover:text-[#E04B28] hover:bg-[#FA5C38]/10 py-2.5 px-3 rounded-xl transition-all"
                >
                  <span>{content.detailBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
