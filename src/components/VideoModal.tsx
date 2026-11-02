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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#18181D] rounded-3xl max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl border border-zinc-800">
        
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-zinc-800 text-zinc-200 hover:bg-[#FA5C38] hover:text-white transition-colors border border-zinc-700 z-10 cursor-pointer"
          aria-label="Close video tour"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-white font-heading font-black text-sm mb-3">
          <Play className="w-3.5 h-3.5 text-[#FA5C38] fill-current" />
          <span>Studentato Emilia — Torino Residence Architectural Tour</span>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800">
          <iframe
            title="Studentato Emilia Tour"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-xs text-zinc-400 mt-3 text-center">
          Viale della Rimembranza 2, Torino — Private study rooms, community lounges, and rooftop terraces.
        </p>

      </div>
    </div>
  );
};
