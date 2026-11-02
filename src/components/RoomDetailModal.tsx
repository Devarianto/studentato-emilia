import React, { useState } from 'react';
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

  if (!room) return null;

  const content = {
    EN: {
      title: 'Room Details & Application',
      priceMonth: 'Monthly Academic Rent (All-Inclusive)',
      size: 'Room Area:',
      avail: 'Available From:',
      includedTitle: 'Included Services & Utilities:',
      bookingTitle: 'Reserve This Room',
      nameLabel: 'Full Student Name',
      emailLabel: 'Email Address',
      uniLabel: 'University / Faculty (e.g. PoliTO, UniTO)',
      termLabel: 'Target Move-In Semester',
      submitBtn: 'Submit Booking Application',
      successMsg: 'Booking application received. Our residence registrar will review your file within 24 hours.',
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
      successMsg: 'Richiesta ricevuta. La segreteria della residenza ti contatterà entro 24 ore.',
    },
  }[language];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-2xs">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-stone-300 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery & Features */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Active Image */}
            <div className="relative rounded-md overflow-hidden h-72 bg-stone-900 border border-stone-200">
              <img
                src={room.images[activeImageIndex] || room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#1C1917]/90 text-white font-serif text-xs px-2.5 py-1 rounded">
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
                    className={`w-20 h-14 rounded-md overflow-hidden border transition-all ${
                      activeImageIndex === idx ? 'border-[#E04D26] ring-1 ring-[#E04D26]' : 'border-stone-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <h2 className="font-serif text-2xl font-semibold text-stone-900">{room.name}</h2>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#E04D26]" /> {room.city} • {room.sizeSqM} m²
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mt-2.5">
                {room.description[language]}
              </p>
            </div>

            {/* Features List */}
            <div className="pt-2">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-500 mb-2">
                {content.includedTitle}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {room.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-stone-50 p-2 rounded-md text-stone-800 font-medium border border-stone-200">
                    <Check className="w-3.5 h-3.5 text-[#E04D26]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-lg border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="bg-[#1C1917] text-white p-4 rounded-md text-center mb-5 border border-stone-800">
                <span className="text-[10px] font-medium uppercase tracking-wider block text-stone-400">
                  {content.priceMonth}
                </span>
                <div className="font-serif text-3xl font-bold text-white mt-1">
                  €{room.priceMonth} <span className="text-xs font-sans font-normal text-stone-400">/ mo</span>
                </div>
              </div>

              <h3 className="font-serif font-semibold text-base text-stone-900 mb-3">
                {content.bookingTitle}
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-md font-medium text-xs leading-relaxed text-center space-y-2">
                  <p>{content.successMsg}</p>
                  <button
                    onClick={onClose}
                    className="mt-3 bg-emerald-800 text-white font-medium px-4 py-2 rounded text-xs"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {content.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Marco Rossi"
                      className="w-full bg-white border border-stone-300 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {content.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. student@polito.it"
                      className="w-full bg-white border border-stone-300 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {content.uniLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Politecnico di Torino / UniTO"
                      className="w-full bg-white border border-stone-300 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {content.termLabel}
                    </label>
                    <select
                      value={moveInTerm}
                      onChange={(e) => setMoveInTerm(e.target.value)}
                      className="w-full bg-white border border-stone-300 text-xs font-medium rounded-md p-2.5 focus:border-[#E04D26] outline-none"
                    >
                      <option value="Sept 2025">September 2025 (Autumn Semester)</option>
                      <option value="Oct 2025">October 2025</option>
                      <option value="Feb 2026">February 2026 (Spring Semester)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#E04D26] hover:bg-[#CC3E18] text-white font-semibold text-xs py-3 px-4 rounded-md transition-colors shadow-2xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{content.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 border-t border-stone-200 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero agency commission • Regulated Italian academic lease</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
