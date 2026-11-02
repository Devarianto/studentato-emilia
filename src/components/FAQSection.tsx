import React, { useState } from 'react';
import { Language } from '../types';
import { Plus, Minus } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface FAQSectionProps {
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const { cmsData } = useCMS();
  const faqs = cmsData.faqs;

  const [openId, setOpenId] = useState<string>('faq-1');

  const content = {
    EN: {
      eyebrow: 'FREQUENT INQUIRIES',
      title: 'Essential Resident Information',
      subtitle:
        'Clarity on leases, all-inclusive utility bills, move-in procedures, and international student registration.',
    },
    IT: {
      eyebrow: 'DOMANDE FREQUENTI',
      title: 'Informazioni Essenziali per i Residenti',
      subtitle:
        'Dettagli su contratti, utenze tutto incluso, registrazione studenti e regole della residenza.',
    },
  }[language];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-stone-500 text-[11px] font-semibold tracking-[0.18em] uppercase border-b border-stone-300 pb-1">
            <span className="w-1.5 h-1.5 bg-[#E04D26] rounded-xs" />
            <span>{content.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-stone-900">
            {content.title}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-3">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-stone-900 text-sm sm:text-base">
                    {item.question[language]}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#E04D26]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-stone-600" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    {item.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
