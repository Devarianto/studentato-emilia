import React, { useState } from 'react';
import { Language, Review } from '../types';
import { X, Star, Send, CheckCircle2 } from 'lucide-react';

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
  const [city, setCity] = useState('Bologna');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const content = {
    EN: {
      title: 'Write a Verified Student Review',
      subtitle: 'Share your authentic experience living at Studentato Emilia.',
      nameLabel: 'Your Name',
      uniLabel: 'University / Program',
      cityLabel: 'Residence City',
      ratingLabel: 'Overall Rating',
      commentLabel: 'Your Review Message',
      submitBtn: 'Submit Student Review',
      successMsg: 'Thank you! Your review has been submitted for verification.',
    },
    IT: {
      title: 'Scrivi Una Recensione Studente',
      subtitle: 'Condividi la tua esperienza in residenza con altri studenti.',
      nameLabel: 'Nome e Cognome',
      uniLabel: 'Ateneo / Corso',
      cityLabel: 'Città della Residenza',
      ratingLabel: 'Valutazione Generale',
      commentLabel: 'Messaggio di Recensione',
      submitBtn: 'Invia Recensione',
      successMsg: 'Grazie! La tua recensione è stata inviata per la verifica.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-amber-900/10">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 text-zinc-800 hover:bg-[#FA5C38] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-black text-zinc-900">{content.title}</h3>
        <p className="text-xs text-zinc-600 mb-6 mt-1">{content.subtitle}</p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-extrabold text-sm">{content.successMsg}</p>
            <button
              onClick={onClose}
              className="bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                {content.nameLabel}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alessandro M."
                className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  {content.uniLabel}
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. Univ. of Bologna"
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  {content.cityLabel}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                >
                  <option value="Bologna">Bologna</option>
                  <option value="Modena">Modena</option>
                  <option value="Reggio Emilia">Reggio Emilia</option>
                  <option value="Parma">Parma</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                {content.ratingLabel}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    type="button"
                    key={starVal}
                    onClick={() => setRating(starVal)}
                    className="p-1 text-amber-400 focus-visible:ring-2 focus-visible:ring-[#FA5C38] rounded-md"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        starVal <= rating ? 'fill-current text-amber-400' : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                {content.commentLabel}
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus-visible:ring-4 focus-visible:ring-[#FA5C38]"
            >
              <Send className="w-4 h-4" />
              <span>{content.submitBtn}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
