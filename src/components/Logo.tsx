import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header', className = '' }) => {
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 group ${className}`}>
        {/* Emblem Crest for Footer */}
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-stone-800 text-stone-100 font-serif font-bold text-lg border border-stone-700 tracking-wider">
          SE
        </div>

        <div className="flex flex-col">
          <span className="font-serif text-xl tracking-tight text-white leading-none">
            Studentato Emilia
          </span>
          <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-stone-400 uppercase mt-1">
            Torino • Residenza Universitaria
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#E04D26] text-white font-serif font-bold text-sm shadow-xs">
          SE
        </div>
        <span className="font-serif text-base tracking-tight text-stone-900">
          Studentato Emilia
        </span>
      </div>
    );
  }

  // Header Default Logo: Refined, Architectural, Bespoke
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Architectural Monogram Seal */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E04D26] text-white font-serif font-bold text-lg shadow-xs group-hover:bg-[#CC3E18] transition-colors border border-amber-900/10">
        SE
      </div>

      <div className="flex flex-col">
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-none group-hover:text-[#E04D26] transition-colors">
          Studentato Emilia
        </span>
        <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] text-[#E04D26] uppercase mt-0.5">
          Torino • Viale della Rimembranza
        </span>
      </div>
    </div>
  );
};
