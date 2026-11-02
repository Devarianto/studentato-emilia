import React, { useState } from 'react';
import { Language } from '../types';
import { Tag, Sparkles, CheckCircle2 } from 'lucide-react';
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
      emailPlaceholder: 'Your mail address...',
      submitBtn: 'Get Offer Code',
      claimedSuccess: `🎉 Discount code ${offers.promoCode} sent to your email!`,
    },
    IT: {
      emailPlaceholder: 'La tua email...',
      submitBtn: 'Ottieni Codice',
      claimedSuccess: `🎉 Codice sconto ${offers.promoCode} inviato alla tua email!`,
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setClaimed(true);
    }
  };

  return (
    <section id="promotions" className="py-16 sm:py-20 bg-[#FFF8F0] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FA5C38] rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#FFC83B]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-white">
                <Tag className="w-3.5 h-3.5 text-[#FFC83B]" />
                {offers.eyebrow[language]}
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {offers.titleHighlight[language]} <br />
                <span className="text-[#FFC83B]">{offers.titleSub[language]}</span>
              </h2>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-lg">
                {offers.desc[language]}
              </p>

              {claimed ? (
                <div className="bg-[#FFC83B] text-zinc-950 p-4 rounded-2xl font-extrabold text-sm flex items-center gap-2 shadow-lg animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-zinc-950 shrink-0" />
                  <span>{labels.claimedSuccess}</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={labels.emailPlaceholder}
                    className="bg-white text-zinc-900 placeholder-zinc-400 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold outline-none flex-1 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFC83B] hover:bg-[#eab308] text-zinc-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-all shrink-0"
                  >
                    {labels.submitBtn}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={offers.image}
                  alt="Student Room Special Deal"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#FFC83B] text-zinc-950 px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-zinc-950" />
                  <span>{offers.badgeText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
