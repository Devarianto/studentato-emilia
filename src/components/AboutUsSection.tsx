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
      linkToReviews: 'Read Verified Resident Experiences →',
      exploreRooms: 'Browse All Rooms & Rates',
    },
    IT: {
      linkToReviews: 'Leggi le Recensioni dei Residenti →',
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
    <section id="about" className="py-16 sm:py-24 bg-[#F4EFEA] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Photography & Testimonial Plaque */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-sm bg-stone-900">
              <img
                src={about.image}
                alt="Studentato Emilia Residence Community Lounge"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            {/* Endorsement Card: Solid, Paper-like, Dignified */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-md bg-[#F4EFEA] text-[#E04D26] flex items-center justify-center border border-stone-200">
                  <ShieldCheck className="w-5 h-5 text-[#E04D26]" />
                </div>
                <div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-serif font-semibold text-xs sm:text-sm text-stone-900 mt-0.5">
                    {about.socialProofRating[language]}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-stone-600 mb-3.5 leading-relaxed">
                {about.socialProofDesc[language]}
              </p>

              <a
                href="#reviews"
                onClick={handleScrollToReviews}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E04D26] hover:text-[#CC3E18] hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{labels.linkToReviews}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Statistics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1">
              <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
              <span>{about.eyebrow[language]}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.18]">
              {about.heading[language]}
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>{about.paragraph1[language]}</p>
              <p className="text-stone-500">{about.paragraph2[language]}</p>
            </div>

            {/* Metric Grid: Hairline dividers, crisp typography */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200">
              {about.stats.map((st, i) => (
                <div
                  key={i}
                  className="bg-white p-3.5 rounded-md border border-stone-200 shadow-2xs"
                >
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E04D26] block">
                    {st.val}
                  </span>
                  <span className="text-[11px] font-medium text-stone-600 block mt-1 leading-snug">
                    {st.label[language]}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold px-5 py-3 rounded-md text-xs transition-colors shadow-xs"
              >
                <span>{labels.exploreRooms}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
