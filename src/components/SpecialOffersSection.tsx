import React, { useState } from 'react';
import { Language } from '../types';
import { Tag, Check } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface SpecialOffersSectionProps {
  language: Language;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({ language }) => {
  const { cmsData } = useCMS();
  const offers = cmsData.siteContent.offers;

  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  const labels = {
    EN: {
      emailPlaceholder: 'Enter university email (e.g. name@polito.it)...',
      submitBtn: 'Claim Academic Code',
      claimedSuccess: `Academic discount code ${offers.promoCode} has been sent to your email.`,
    },
    IT: {
      emailPlaceholder: 'Email universitaria (es. nome@unito.it)...',
      submitBtn: 'Richiedi Codice Studio',
      claimedSuccess: `Il codice promozionale ${offers.promoCode} è stato inviato alla tua email.`,
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setClaimed(true);
    }
  };

  return (
    <section id="promotions" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] rounded-lg p-6 sm:p-12 text-stone-100 border border-stone-800 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-stone-400 text-[11px] font-semibold tracking-[0.16em] uppercase">
                <Tag className="w-3.5 h-3.5 text-[#E04D26]" />
                <span>{offers.eyebrow[language]}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                {offers.titleHighlight[language]} <br />
                <span className="text-[#E04D26] italic font-serif font-normal">{offers.titleSub[language]}</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal max-w-lg">
                {offers.desc[language]}
              </p>

              {claimed ? (
                <div className="bg-stone-900 border border-stone-700 text-stone-200 p-4 rounded-md font-medium text-xs flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{labels.claimedSuccess}</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md text-xs"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={labels.emailPlaceholder}
                    className="bg-stone-900 text-stone-100 placeholder-stone-500 px-3.5 py-3 rounded-md text-xs font-medium border border-stone-700 focus:border-[#E04D26] outline-none flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold px-5 py-3 rounded-md text-xs transition-colors shrink-0 shadow-2xs"
                  >
                    {labels.submitBtn}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-stone-700 bg-stone-950">
                <img
                  src={offers.image}
                  alt="Student Room Special Academic Offer"
                  className="w-full h-64 sm:h-72 object-cover opacity-90"
                />
                <div className="absolute top-3 right-3 bg-stone-900/95 text-stone-100 px-3 py-1.5 rounded text-xs font-serif font-bold border border-stone-700">
                  {offers.badgeText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
