import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xs">
      <div className="bg-[#181614] rounded-lg max-w-4xl w-full p-4 sm:p-6 relative shadow-xl border border-stone-800">
        
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-stone-800 text-stone-200 hover:bg-[#E04D26] hover:text-white transition-colors border border-stone-700 z-10"
          aria-label="Close video tour"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-stone-100 font-serif font-semibold text-sm mb-3">
          <Play className="w-3.5 h-3.5 text-[#E04D26] fill-current" />
          <span>Studentato Emilia — Torino Residence Architectural Tour</span>
        </div>

        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black border border-stone-800">
          <iframe
            title="Studentato Emilia Tour"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-xs text-stone-400 mt-3 text-center">
          Viale della Rimembranza 2, Torino — Private study rooms, community lounges, and rooftop terraces.
        </p>

      </div>
    </div>
  );
};
