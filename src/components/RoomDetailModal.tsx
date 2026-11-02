import React, { useState, useEffect } from 'react';
import { Room, Language } from '../types';
import { X, Check, MapPin, ShieldCheck, Send } from 'lucide-react';

interface RoomDetailModalProps {
  room: Room | null;
  language: Language;
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  language,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [moveInTerm, setMoveInTerm] = useState('Sept 2025');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!room) return null;

  const content = {
    EN: {
      title: 'Room Details & Application',
      priceMonth: 'Monthly Rent (All-Inclusive)',
      size: 'Room Area:',
      avail: 'Available From:',
      includedTitle: 'All-Inclusive Amenities:',
      bookingTitle: 'Reserve This Room',
      nameLabel: 'Full Student Name',
      emailLabel: 'Email Address',
      uniLabel: 'University / Faculty (e.g. PoliTO, UniTO)',
      termLabel: 'Target Move-In Semester',
      submitBtn: 'Submit Booking Application',
      closeBtn: 'Close Window',
      stickyClose: 'Close',
      successMsg: '✅ Booking application received! Our residence team in Torino will contact you within 24 hours.',
    },
    IT: {
      title: 'Dettagli Camera e Prenotazione',
      priceMonth: 'Canone Mensile (Tutto Incluso)',
      size: 'Superficie:',
      avail: 'Disponibile Dal:',
      includedTitle: 'Servizi Inclusi Nel Canone:',
      bookingTitle: 'Prenota Questa Stanza',
      nameLabel: 'Nome e Cognome Studente',
      emailLabel: 'Indirizzo Email',
      uniLabel: 'Ateneo / Facoltà (es. PoliTO, UniTO)',
      termLabel: 'Inizio Soggiorno',
      submitBtn: 'Invia Richiesta di Prenotazione',
      closeBtn: 'Chiudi Schermata',
      stickyClose: 'Chiudi',
      successMsg: '✅ Richiesta ricevuta! Il nostro staff ti contatterà entro 24 ore.',
    },
  }[language];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Close when clicking the backdrop outside the modal card
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={room.name}
    >
      <div className="bg-white dark:bg-[#141418] rounded-3xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-900/10 dark:border-zinc-800 relative flex flex-col transition-colors">
        
        {/* STICKY TOP HEADER BAR (Always visible on mobile & desktop even when scrolling) */}
        <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#141418]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 pr-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FA5C38] shrink-0" />
            <h3 className="font-heading font-black text-sm sm:text-base text-zinc-900 dark:text-white truncate">
              {room.name}
            </h3>
            <span className="hidden sm:inline-block bg-[#FFC83B] text-zinc-950 font-heading font-black text-xs px-2.5 py-0.5 rounded-full shrink-0">
              €{room.priceMonth}/mo
            </span>
          </div>

          {/* PROMINENT CLOSE BUTTON: High-contrast, easy to tap on any mobile screen */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-zinc-900 dark:bg-zinc-800 hover:bg-[#FA5C38] dark:hover:bg-[#FA5C38] text-white px-3.5 py-2 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            aria-label="Close room details modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">{content.stickyClose}</span>
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-4 sm:p-8 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery & Features */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Active Image */}
              <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
                <img
                  src={room.images[activeImageIndex] || room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#FFC83B] text-zinc-950 font-heading font-black text-xs px-3 py-1 rounded-full uppercase shadow-xs">
                  {room.city} Residence
                </span>
                <span className="absolute bottom-3 right-3 bg-[#FA5C38] text-white px-3 py-1 rounded-xl font-heading font-black text-sm shadow-md sm:hidden">
                  €{room.priceMonth}/mo
                </span>
              </div>

              {/* Thumbnail Selectors */}
              {room.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#FA5C38] scale-102 ring-2 ring-[#FA5C38]/20' : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-zinc-900 dark:text-white">{room.name}</h2>
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" /> {room.city} • {room.sizeSqM} m² • {room.availableFrom}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2.5">
                  {room.description[language]}
                </p>
              </div>

              {/* Features List */}
              <div className="pt-2">
                <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                  {content.includedTitle}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {room.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-amber-50/80 dark:bg-amber-950/30 p-2.5 rounded-xl text-zinc-800 dark:text-zinc-200 font-bold border border-amber-200/80 dark:border-amber-800/40">
                      <Check className="w-3.5 h-3.5 text-[#FA5C38] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-5 bg-[#FFF8F0] dark:bg-[#1C1C24] p-5 sm:p-6 rounded-2xl border border-amber-900/10 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="bg-[#FA5C38] text-white p-4 rounded-xl shadow-md text-center mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest block text-amber-100">
                    {content.priceMonth}
                  </span>
                  <div className="font-heading text-3xl font-black text-[#FFC83B] mt-0.5">
                    €{room.priceMonth} <span className="text-xs text-white font-normal font-sans">/ mo</span>
                  </div>
                </div>

                <h3 className="font-heading font-black text-base sm:text-lg text-zinc-900 dark:text-white mb-3">
                  {content.bookingTitle}
                </h3>

                {submitted ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 p-5 rounded-2xl font-bold text-xs leading-relaxed text-center space-y-3">
                    <p>{content.successMsg}</p>
                    <button
                      onClick={onClose}
                      className="mt-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      {content.closeBtn}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {content.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Marco Rossi"
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {content.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="e.g. marco.rossi@polito.it"
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {content.uniLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. Politecnico di Torino / UniTO"
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        {content.termLabel}
                      </label>
                      <select
                        value={moveInTerm}
                        onChange={(e) => setMoveInTerm(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold rounded-xl p-2.5 focus:border-[#FA5C38] outline-none"
                      >
                        <option value="Sept 2025">September 2025 (Autumn)</option>
                        <option value="Oct 2025">October 2025</option>
                        <option value="Feb 2026">February 2026 (Spring)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{content.submitBtn}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Bottom Mobile Dismiss Button */}
              <div className="pt-4 mt-3 border-t border-amber-900/10 dark:border-zinc-800 flex flex-col items-center gap-2.5">
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero agency commission • Regulated Italian academic lease</span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full sm:hidden py-2.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>{content.closeBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
