import React, { useState } from 'react';
import { Language } from '../types';
import { Star, MessageSquarePlus, CheckCircle, Filter, Quote } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ReviewSectionProps {
  language: Language;
  onOpenWriteReviewModal: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  language,
  onOpenWriteReviewModal,
}) => {
  const { cmsData } = useCMS();
  const reviews = cmsData.reviews;

  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [universityFilter, setUniversityFilter] = useState<string>('All');

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
      className="py-16 sm:py-24 bg-[#FFF8F0] border-b border-amber-900/10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black tracking-widest text-[#FA5C38] uppercase block">
              {content.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-md flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFC83B] text-zinc-950 flex items-center justify-center font-black text-xl">
                4.9
              </div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-600 block mt-0.5">
                  {content.totalReviews}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenWriteReviewModal}
              className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold px-5 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-white" />
              <span>{content.writeBtn}</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
            <Filter className="w-4 h-4 text-[#FA5C38]" />
            <span>Filter Reviews:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStarFilter('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                starFilter === 'All'
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {content.filterAll}
            </button>

            <button
              onClick={() => setStarFilter(5)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                starFilter === 5
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              5 ★★★★★
            </button>

            <button
              onClick={() => setStarFilter(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                starFilter === 4
                  ? 'bg-[#FA5C38] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              4 ★★★★☆
            </button>
          </div>

          <select
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
            className="bg-zinc-100 text-zinc-900 text-xs font-bold rounded-xl px-3 py-2 border border-zinc-200"
          >
            <option value="All">{content.filterAllUni}</option>
            <option value="Politecnico">Politecnico</option>
            <option value="UniTO">UniTO</option>
            <option value="Erasmus">Erasmus Students</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#FA5C38]/10 group-hover:text-[#FA5C38]/20 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      {content.verifiedResident}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium italic mb-6">
                  "{rev.comment[language]}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.studentName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC83B] shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-900">{rev.studentName}</h4>
                  <p className="text-xs font-semibold text-[#FA5C38]">{rev.university}</p>
                  <p className="text-[10px] text-zinc-600">
                    {rev.roomType} • {rev.city}
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
