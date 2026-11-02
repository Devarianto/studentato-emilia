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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-2xs">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-8 relative shadow-xl border border-stone-300">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-serif text-2xl font-semibold text-stone-900">{content.title}</h3>
        <p className="text-xs text-stone-500 mb-6 mt-1">{content.subtitle}</p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-md text-center space-y-3">
            <Check className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-medium text-xs">{content.successMsg}</p>
            <button
              onClick={onClose}
              className="bg-emerald-800 text-white font-medium text-xs px-5 py-2.5 rounded-md"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                {content.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alessandro Rossi"
                className="w-full bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  {content.uniLabel}
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. PoliTO"
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  {content.cityLabel}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                >
                  <option value="Torino">Torino (Rimembranza 2)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                {content.ratingLabel}
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    type="button"
                    key={starVal}
                    onClick={() => setRating(starVal)}
                    className="p-1 text-amber-500 rounded"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starVal <= rating ? 'fill-current text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                {content.commentLabel}
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about your room, studying atmosphere, and student life in Torino..."
                className="w-full bg-stone-50 border border-stone-300 text-stone-900 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold text-xs py-3 px-4 rounded-md transition-colors shadow-2xs flex items-center justify-center gap-2"
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
