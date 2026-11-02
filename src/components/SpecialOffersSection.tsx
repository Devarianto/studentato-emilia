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
      submitBtn: 'Get Offer Code',
      claimedSuccess: `Discount code ${offers.promoCode} has been sent to your email!`,
    },
    IT: {
      emailPlaceholder: 'Email universitaria (es. nome@unito.it)...',
      submitBtn: 'Ottieni Codice',
      claimedSuccess: `Il codice sconto ${offers.promoCode} è stato inviato alla tua email!`,
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setClaimed(true);
    }
  };

  return (
    <section id="promotions" className="py-16 sm:py-20 bg-[#FFF8F0] dark:bg-[#0F0F12] border-b border-amber-900/10 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vibrant Orange & Yellow Academic Banner */}
        <div className="bg-[#FA5C38] rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white">
                <Tag className="w-3.5 h-3.5 text-[#FFC83B]" />
                <span>{offers.eyebrow[language]}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {offers.titleHighlight[language]} <br />
                <span className="text-[#FFC83B]">{offers.titleSub[language]}</span>
              </h2>

              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal max-w-lg">
                {offers.desc[language]}
              </p>

              {claimed ? (
                <div className="bg-[#FFC83B] text-zinc-950 p-4 rounded-xl font-extrabold text-xs flex items-center gap-2.5 shadow-md">
                  <Check className="w-4 h-4 text-zinc-950 shrink-0" />
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
                    className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 border border-transparent dark:border-zinc-700 px-4 py-3 rounded-xl text-xs font-semibold outline-none flex-1 shadow-xs"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFC83B] hover:bg-[#eab308] text-zinc-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 active:scale-98 cursor-pointer"
                  >
                    {labels.submitBtn}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl bg-zinc-900">
                <img
                  src={offers.image}
                  alt="Student Room Special Academic Offer"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#FFC83B] text-zinc-950 px-3.5 py-1.5 rounded-xl text-xs font-heading font-black shadow-md">
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
