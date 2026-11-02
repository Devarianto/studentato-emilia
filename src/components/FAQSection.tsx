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
      eyebrow: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle:
        'Everything you need to know about booking, contracts, and student living at Studentato Emilia.',
    },
    IT: {
      eyebrow: 'DOMANDE FREQUENTI',
      title: 'Domande Frequenti (FAQ)',
      subtitle: 'Tutto quello che c’è da sapere su prenotazioni, contratti e vita in residenza.',
    },
  }[language];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FA5C38] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-normal">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-extrabold text-base sm:text-lg hover:bg-white/15 transition-colors outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-white">{item.question[language]}</span>
                  <div className="w-8 h-8 rounded-full bg-[#FFC83B] text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
                    {isOpen ? (
                      <Minus className="w-4 h-4 font-bold" />
                    ) : (
                      <Plus className="w-4 h-4 font-bold" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-white/90 leading-relaxed border-t border-white/10 pt-4 animate-fade-in">
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
