import React, { useState } from 'react';
import { Language } from '../types';
import { Star, MessageSquarePlus, Check, Filter } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ReviewSectionProps {
  language: Language;
  onOpenWriteReviewModal?: () => void;
  onOpenWriteReview?: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  language,
  onOpenWriteReviewModal,
  onOpenWriteReview,
}) => {
  const { cmsData } = useCMS();
  const reviews = cmsData.reviews;

  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [universityFilter, setUniversityFilter] = useState<string>('All');

  const handleOpenModal = onOpenWriteReviewModal || onOpenWriteReview || (() => {});

  const content = {
    EN: {
      eyebrow: 'RESIDENT EXPERIENCES',
      title: 'Voices of Our Student Community',
      subtitle:
        'Unfiltered feedback from verified students attending Politecnico di Torino and Università degli Studi di Torino.',
      writeBtn: 'Submit Your Experience',
      filterAll: 'All Ratings',
      filterAllUni: 'All Universities',
      verifiedResident: 'Verified Resident',
      totalReviews: `based on ${reviews.length}+ verified resident stays`,
    },
    IT: {
      eyebrow: 'ESPERIENZE DEI RESIDENTI',
      title: 'La Voce della Nostra Comunità Studentesca',
      subtitle:
        'Recensioni autentiche di studenti iscritti al Politecnico di Torino e all’Università degli Studi di Torino.',
      writeBtn: 'Condividi la Tua Esperienza',
      filterAll: 'Tutte le Valutazioni',
      filterAllUni: 'Tutti gli Atenei',
      verifiedResident: 'Residente Verificato',
      totalReviews: `basato su ${reviews.length}+ soggiorni verificati`,
    },
  }[language];

  const filteredReviews = reviews.filter((rev) => {
    const matchStar = starFilter === 'All' || rev.rating === starFilter;
    const matchUni =
      universityFilter === 'All' ||
      rev.university.toLowerCase().includes(universityFilter.toLowerCase());
    return matchStar && matchUni;
  });

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-stone-200 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1">
              <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#1C1917] text-white flex items-center justify-center font-serif font-bold text-base">
                4.9
              </div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-stone-600 block mt-0.5">
                  {content.totalReviews}
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold px-4 py-3 rounded-md text-xs shadow-2xs transition-colors flex items-center gap-2"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-white" />
              <span>{content.writeBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-stone-700">
            <Filter className="w-3.5 h-3.5 text-[#E04D26]" />
            <span>Filter Reviews:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setStarFilter('All')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                starFilter === 'All'
                  ? 'bg-[#E04D26] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {content.filterAll}
            </button>

            <button
              onClick={() => setStarFilter(5)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                starFilter === 5
                  ? 'bg-[#E04D26] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              5 Stars (★★★★★)
            </button>

            <button
              onClick={() => setStarFilter(4)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                starFilter === 4
                  ? 'bg-[#E04D26] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              4 Stars (★★★★☆)
            </button>
          </div>

          <select
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
            className="bg-stone-50 text-stone-800 text-xs font-medium rounded-md px-3 py-1.5 border border-stone-300 focus:border-[#E04D26] outline-none"
          >
            <option value="All">{content.filterAllUni}</option>
            <option value="Politecnico">Politecnico di Torino</option>
            <option value="UniTO">Università di Torino (UniTO)</option>
            <option value="Erasmus">Erasmus & International</option>
          </select>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      {content.verifiedResident}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic mb-5">
                  "{rev.comment[language]}"
                </p>
              </div>

              <div className="pt-3.5 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.studentName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-300"
                />
                <div>
                  <h4 className="font-serif font-semibold text-xs sm:text-sm text-stone-900">
                    {rev.studentName}
                  </h4>
                  <p className="text-[11px] font-medium text-[#E04D26]">{rev.university}</p>
                  <p className="text-[10px] text-stone-500">
                    {rev.roomType} • Torino
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
