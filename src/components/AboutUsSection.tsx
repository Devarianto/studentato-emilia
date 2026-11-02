import React from 'react';
import { Language } from '../types';
import { Star, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AboutUsSectionProps {
  language: Language;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ language }) => {
  const { cmsData } = useCMS();
  const about = cmsData.siteContent.about;

  const labels = {
    EN: {
      linkToReviews: 'Read All Verified Student Reviews →',
      exploreRooms: 'Explore Available Rooms',
    },
    IT: {
      linkToReviews: 'Leggi Tutte Le Recensioni Degli Studenti →',
      exploreRooms: 'Esplora Le Camere',
    },
  }[language];

  const handleScrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsElem = document.getElementById('reviews');
    if (reviewsElem) {
      reviewsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FA5C38] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src={about.image}
                alt="Studentato Emilia Community & Lounge"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="bg-white text-zinc-900 p-6 rounded-2xl shadow-xl border-2 border-[#FFC83B]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FA5C38]/10 text-[#FA5C38] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6 text-[#FA5C38]" />
                </div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-extrabold text-sm text-zinc-900">
                    {about.socialProofRating[language]}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-zinc-600 mb-4 leading-relaxed font-medium">
                {about.socialProofDesc[language]}
              </p>

              <a
                href="#reviews"
                onClick={handleScrollToReviews}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC83B] hover:bg-[#eab308] text-zinc-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-zinc-950" />
                <span>{labels.linkToReviews}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase">
              {about.eyebrow[language]}
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {about.heading[language]}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {about.paragraph1[language]}
            </p>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              {about.paragraph2[language]}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
              {about.stats.map((st, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-black text-[#FFC83B] block">
                    {st.val}
                  </span>
                  <span className="text-[11px] font-bold text-white/90 block mt-0.5">
                    {st.label[language]}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 bg-white text-[#FA5C38] hover:bg-zinc-100 font-extrabold px-6 py-3 rounded-full text-sm shadow-lg transition-all"
              >
                <span>{labels.exploreRooms}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
