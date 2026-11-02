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
      title: 'Frequently Asked Questions',
      subtitle:
        'Everything you need to know about booking, contracts, and student living at Studentato Emilia Torino.',
    },
    IT: {
      eyebrow: 'DOMANDE FREQUENTI',
      title: 'Domande Frequenti (FAQ)',
      subtitle:
        'Tutto quello che c’è da sapere su prenotazioni, contratti e vita in residenza a Torino.',
    },
  }[language];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FFF8F0] border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#FA5C38]/10 text-[#FA5C38] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#FA5C38]/20">
            <span>{content.eyebrow}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-zinc-900">
            {content.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* Modern Accordion with Yellow/Orange Touches */}
        <div className="space-y-3.5">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-amber-900/10 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-orange-50/40 transition-colors outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-extrabold text-zinc-900 text-sm sm:text-base">
                    {item.question[language]}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#FA5C38] text-white' : 'bg-[#FFC83B] text-zinc-950'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 font-bold" />
                    ) : (
                      <Plus className="w-4 h-4 font-bold" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
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
