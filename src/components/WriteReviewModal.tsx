import React, { useState } from 'react';
import { Language, Review } from '../types';
import { X, Star, Send, Check } from 'lucide-react';

interface WriteReviewModalProps {
  language: Language;
  onClose: () => void;
  onSubmitReview: (newReview: Partial<Review>) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  language,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [city, setCity] = useState('Torino');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const content = {
    EN: {
      title: 'Submit Resident Feedback',
      subtitle: 'Share your semester experience at Studentato Emilia Torino.',
      nameLabel: 'Full Name',
      uniLabel: 'University / Faculty (e.g. PoliTO, UniTO)',
      cityLabel: 'Residence Location',
      ratingLabel: 'Overall Experience Rating',
      commentLabel: 'Your Review',
      submitBtn: 'Publish Resident Review',
      successMsg: 'Thank you. Your review has been submitted for community verification.',
    },
    IT: {
      title: 'Invia Recensione Residente',
      subtitle: 'Condividi la tua esperienza di soggiorno presso lo Studentato Emilia Torino.',
      nameLabel: 'Nome e Cognome',
      uniLabel: 'Ateneo / Facoltà (es. PoliTO, UniTO)',
      cityLabel: 'Città Residenza',
      ratingLabel: 'Valutazione Soggiorno',
      commentLabel: 'Testo Recensione',
      submitBtn: 'Pubblica Recensione',
      successMsg: 'Grazie. La tua recensione è stata registrata per la verifica comunitaria.',
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && comment) {
      onSubmitReview({
        studentName: name,
        university,
        city,
        rating,
        comment: { EN: comment, IT: comment },
        verified: true,
        date: 'Today',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#141418] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-amber-900/10 dark:border-zinc-800 transition-colors">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#FA5C38] hover:text-white dark:hover:bg-[#FA5C38] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-heading font-black text-2xl text-zinc-900 dark:text-white">{content.title}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 mt-1">{content.subtitle}</p>

        {submitted ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <p className="font-bold text-xs">{content.successMsg}</p>
            <button
              onClick={onClose}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {content.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alessandro Rossi"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {content.uniLabel}
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. PoliTO"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {content.cityLabel}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                >
                  <option value="Torino">Torino (Rimembranza 2)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {content.ratingLabel}
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    type="button"
                    key={starVal}
                    onClick={() => setRating(starVal)}
                    className="p-1 rounded cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starVal <= rating ? 'fill-current text-[#FFC83B]' : 'text-zinc-300 dark:text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {content.commentLabel}
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about your room, studying atmosphere, and student life in Torino..."
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{content.submitBtn}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
