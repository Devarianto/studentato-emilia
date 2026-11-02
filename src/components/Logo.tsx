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
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-900 text-[#FFC83B] font-heading font-black text-lg border border-stone-800 tracking-wider">
          SE
        </div>

        <div className="flex flex-col">
          <span className="font-heading font-extrabold text-xl tracking-tight text-white leading-none">
            STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
          </span>
          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-stone-400 uppercase mt-1">
            TORINO • ITALY
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FA5C38] text-white font-heading font-black text-sm border-2 border-[#FFC83B] shadow-xs">
          SE
        </div>
        <span className="font-heading font-extrabold text-base tracking-tight text-zinc-900">
          STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
        </span>
      </div>
    );
  }

  // Modern Bold Header Logo
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Modern Vibrant Monogram Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FA5C38] text-white font-heading font-black text-base border-2 border-[#FFC83B] shadow-sm group-hover:bg-[#E04B28] transition-colors">
        SE
      </div>

      <div className="flex flex-col">
        <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-zinc-900 leading-none group-hover:text-[#FA5C38] transition-colors">
          STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] text-zinc-500 uppercase mt-0.5">
          TORINO • ITALY
        </span>
      </div>
    </div>
  );
};
