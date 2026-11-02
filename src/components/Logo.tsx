import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header', className = '' }) => {
  if (variant === 'footer') {
    return (
      <div className={`flex flex-col group ${className}`}>
        <span className="font-heading font-black text-2xl tracking-tight text-white leading-none">
          STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
        </span>
        <span className="text-[11px] font-sans font-bold tracking-[0.22em] text-zinc-400 uppercase mt-1.5">
          TORINO • ITALY
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className="font-heading font-black text-lg tracking-tight text-zinc-900 dark:text-white">
          STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
        </span>
      </div>
    );
  }

  // Header Logo: Clean, modern typography only (Icon box removed as requested)
  return (
    <div className={`flex flex-col group py-0.5 ${className}`}>
      <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white leading-none group-hover:text-[#FA5C38] transition-colors">
        STUDENTATO <span className="text-[#FA5C38]">EMILIA</span>
      </span>
      <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.24em] text-zinc-500 dark:text-zinc-400 uppercase mt-1">
        TORINO • ITALY
      </span>
    </div>
  );
};
