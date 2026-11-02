import React, { useState } from 'react';
import { Room, Language } from '../types';
import { X, Check, MapPin, Calendar, ShieldCheck, Sparkles, Send, Euro } from 'lucide-react';

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

  if (!room) return null;

  const content = {
    EN: {
      title: 'Room Details & Instant Booking',
      priceMonth: 'Monthly Rent (All-Inclusive)',
      size: 'Room Area:',
      avail: 'Available From:',
      includedTitle: 'All-Inclusive Amenities:',
      bookingTitle: 'Reserve This Room',
      nameLabel: 'Full Student Name',
      emailLabel: 'Email Address',
      uniLabel: 'University / Faculty',
      termLabel: 'Target Move-In',
      submitBtn: 'Submit Booking Application',
      successMsg: '✅ Booking Application Received! Our team will contact you within 24 hours.',
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
      uniLabel: 'Ateneo / Facoltà',
      termLabel: 'Inizio Soggiorno',
      submitBtn: 'Invia Richiesta di Prenotazione',
      successMsg: '✅ Richiesta Ricevuta! Il nostro staff ti contatterà entro 24 ore.',
    },
  }[language];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-900/10 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 text-zinc-800 hover:bg-[#FA5C38] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery & Features */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Active Image */}
            <div className="relative rounded-2xl overflow-hidden h-72 bg-zinc-900 border border-zinc-200 shadow-md">
              <img
                src={room.images[activeImageIndex] || room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#FFC83B] text-zinc-950 font-black text-xs px-3 py-1 rounded-full uppercase">
                {room.city} Residence
              </span>
            </div>

            {/* Thumbnail Selectors */}
            {room.images.length > 1 && (
              <div className="flex gap-2">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#FA5C38] scale-105' : 'border-zinc-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-black text-zinc-900">{room.name}</h2>
              <p className="text-xs text-zinc-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FA5C38]" /> {room.city} • {room.sizeSqM} m²
              </p>
              <p className="text-xs text-zinc-700 leading-relaxed mt-3">
                {room.description[language]}
              </p>
            </div>

            {/* Features List */}
            <div className="pt-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-900 mb-2">
                {content.includedTitle}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {room.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-amber-50 p-2 rounded-xl text-zinc-800 font-semibold border border-amber-200">
                    <Check className="w-3.5 h-3.5 text-[#FA5C38]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5 bg-[#FFF8F0] p-6 rounded-2xl border border-amber-900/10 flex flex-col justify-between">
            <div>
              <div className="bg-[#FA5C38] text-white p-4 rounded-xl shadow-md text-center mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest block opacity-90">
                  {content.priceMonth}
                </span>
                <div className="text-3xl font-black text-[#FFC83B] mt-0.5">
                  €{room.priceMonth} <span className="text-xs text-white font-medium">/ mo</span>
                </div>
              </div>

              <h3 className="font-black text-lg text-zinc-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FA5C38]" />
                {content.bookingTitle}
              </h3>

              {submitted ? (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-2xl font-extrabold text-xs leading-relaxed text-center space-y-2">
                  <p>{content.successMsg}</p>
                  <button
                    onClick={onClose}
                    className="mt-3 bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Close Modal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {content.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Marco Rossi"
                      className="w-full bg-white border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {content.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. marco.rossi@studio.unibo.it"
                      className="w-full bg-white border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {content.uniLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Unibo / Unimore"
                      className="w-full bg-white border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      {content.termLabel}
                    </label>
                    <select
                      value={moveInTerm}
                      onChange={(e) => setMoveInTerm(e.target.value)}
                      className="w-full bg-white border border-zinc-200 text-xs font-semibold rounded-xl p-2.5 focus-visible:ring-2 focus-visible:ring-[#FA5C38]"
                    >
                      <option value="Sept 2025">September 2025 (Fall Semester)</option>
                      <option value="Oct 2025">October 2025</option>
                      <option value="Feb 2026">February 2026 (Spring Semester)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus-visible:ring-4 focus-visible:ring-[#FA5C38]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{content.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero booking commission • Refundable deposit</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
