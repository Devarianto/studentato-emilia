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
      eyebrow: 'TESTIMONIALS & REVIEWS',
      title: 'What Our Students Say',
      subtitle:
        'Read authentic feedback from verified university residents living at Studentato Emilia.',
      writeBtn: 'Write a Student Review',
      filterAll: 'All Ratings',
      filterAllUni: 'All Universities',
      verifiedResident: 'Verified Resident',
      totalReviews: `based on ${reviews.length}+ verified reviews`,
    },
    IT: {
      eyebrow: 'TESTIMONIANZE E RECENSIONI',
      title: 'Cosa Dicono I Nostri Studenti',
      subtitle:
        'Leggi le recensioni autentiche di studenti residenti nelle nostre strutture Studentato Emilia.',
      writeBtn: 'Scrivi Una Recensione',
      filterAll: 'Tutte le Stelle',
      filterAllUni: 'Tutti gli Atenei',
      verifiedResident: 'Residente Verificato',
      totalReviews: `basato su ${reviews.length}+ recensioni verificate`,
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
      className="py-16 sm:py-24 bg-[#FFF8F0] dark:bg-[#0F0F12] border-b border-amber-900/10 dark:border-zinc-800 scroll-mt-12 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black tracking-widest text-[#FA5C38] uppercase block">
              {content.eyebrow}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white dark:bg-[#18181D] p-4 rounded-2xl border border-amber-900/10 dark:border-zinc-800 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFC83B] text-zinc-950 flex items-center justify-center font-heading font-black text-xl shadow-xs">
                4.9
              </div>
              <div>
                <div className="flex text-[#FFC83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mt-0.5">
                  {content.totalReviews}
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold px-5 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-white" />
              <span>{content.writeBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white dark:bg-[#18181D] p-4 rounded-2xl border border-amber-900/10 dark:border-zinc-800 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-zinc-700 dark:text-zinc-300">
            <Filter className="w-4 h-4 text-[#FA5C38]" />
            <span>Filter Reviews:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStarFilter('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                starFilter === 'All'
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {content.filterAll}
            </button>

            <button
              onClick={() => setStarFilter(5)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                starFilter === 5
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              5 ★★★★★
            </button>

            <button
              onClick={() => setStarFilter(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                starFilter === 4
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              4 ★★★★☆
            </button>
          </div>

          <select
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold rounded-xl px-3 py-2 border border-zinc-200 dark:border-zinc-700 outline-none"
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
              className="bg-white dark:bg-[#18181D] p-6 rounded-3xl border border-amber-900/10 dark:border-zinc-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#FFC83B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      {content.verifiedResident}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium italic mb-6">
                  "{rev.comment[language]}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.studentName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC83B] shadow-xs"
                />
                <div>
                  <h4 className="font-heading font-black text-sm text-zinc-900 dark:text-white">
                    {rev.studentName}
                  </h4>
                  <p className="text-xs font-bold text-[#FA5C38]">{rev.university}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
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
