import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-950 rounded-3xl max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl border border-zinc-800">
        
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-4 sm:right-4 p-2.5 rounded-full bg-[#FA5C38] text-white hover:bg-[#E04B28] transition-colors shadow-lg focus-visible:ring-2 focus-visible:ring-white z-10"
          aria-label="Close video tour"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
          <Sparkles className="w-4 h-4 text-[#FFC83B]" />
          <span>Studentato Emilia Residence Virtual Tour</span>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
          <iframe
            title="Studentato Emilia Tour"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-xs text-zinc-400 mt-3 text-center">
          Take a look at our Bologna, Modena, and Parma study lounges, private rooms, and rooftop spaces.
        </p>

      </div>
    </div>
  );
};
