import React from 'react';
import { Language } from '../types';
import { Star, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AboutUsSectionProps {
  language: Language;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ language }) => {
  const { cmsData } = useCMS();
  const about = cmsData.siteContent.about;

  const labels = {
    EN: {
      linkToReviews: 'Read All Verified Resident Reviews →',
      exploreRooms: 'Explore Available Rooms',
    },
    IT: {
      linkToReviews: 'Leggi Tutte le Recensioni dei Residenti →',
      exploreRooms: 'Esplora Tutte le Camere',
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
    <section id="about" className="py-16 sm:py-24 bg-[#FFF8F0] dark:bg-[#0F0F12] text-zinc-900 dark:text-zinc-100 border-b border-amber-900/10 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography & Testimonial Plaque */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-zinc-900">
              <img
                src={about.image}
                alt="Studentato Emilia Residence Community Lounge"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            {/* Endorsement Card with Warm Yellow & Orange Accents */}
            <div className="bg-white dark:bg-[#18181D] p-6 rounded-2xl border-2 border-[#FFC83B] shadow-md">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FA5C38]/10 text-[#FA5C38] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-[#FA5C38]" />
                </div>
                <div>
                  <div className="flex text-[#FFC83B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-zinc-900 dark:text-white mt-0.5">
                    {about.socialProofRating[language]}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">
                {about.socialProofDesc[language]}
              </p>

              <a
                href="#reviews"
                onClick={handleScrollToReviews}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC83B] hover:bg-[#eab308] text-zinc-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-zinc-950" />
                <span>{labels.linkToReviews}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Narrative & Statistics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FA5C38]/20">
              <span className="w-2 h-2 rounded-full bg-[#FA5C38]" />
              <span>{about.eyebrow[language]}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {about.heading[language]}
            </h2>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>{about.paragraph1[language]}</p>
              <p className="text-zinc-500 dark:text-zinc-400">{about.paragraph2[language]}</p>
            </div>

            {/* Metric Grid with Vibrant Orange Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-900/10 dark:border-zinc-800">
              {about.stats.map((st, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#18181D] p-4 rounded-2xl border border-amber-900/10 dark:border-zinc-800 shadow-xs"
                >
                  <span className="font-heading text-2xl sm:text-3xl font-black text-[#FA5C38] block">
                    {st.val}
                  </span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mt-1 leading-snug">
                    {st.label[language]}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold px-6 py-3.5 rounded-full text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20 active:scale-98"
              >
                <span>{labels.exploreRooms}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC83B]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
