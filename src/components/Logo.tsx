import React from 'react';
import { Sparkles, Building2, GraduationCap } from 'lucide-react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header', className = '' }) => {
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 group ${className}`}>
        {/* Emblem Badge (Black & White for Footer) */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white text-zinc-950 font-black text-xl shadow-md transition-transform group-hover:scale-105">
          <div className="flex items-center justify-center">
            <Building2 className="w-5 h-5 text-zinc-950" />
          </div>
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-zinc-300 rounded-full border-2 border-zinc-950 flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-zinc-950" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-extrabold text-2xl tracking-tight text-white leading-none">
            STUDENTATO<span className="text-zinc-400">.</span>
          </span>
          <span className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase leading-tight">
            EMILIA
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#FA5C38] to-[#E04B28] text-white font-black shadow-md">
          <GraduationCap className="w-5 h-5 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFC83B] rounded-full border-2 border-white" />
        </div>
        <span className="font-black text-lg tracking-tight text-zinc-900">
          STUDENTATO<span className="text-[#FA5C38]">.</span>
        </span>
      </div>
    );
  }

  // Header Default Logo
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Emblem Badge Icon */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#FA5C38] via-[#F24E2A] to-[#D03B1A] text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
        <div className="flex items-center justify-center relative z-10">
          <Building2 className="w-6 h-6 text-white drop-shadow-xs" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC83B] rounded-full border-2 border-white flex items-center justify-center shadow-xs">
          <Sparkles className="w-2.5 h-2.5 text-zinc-950" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-900 leading-none group-hover:text-[#FA5C38] transition-colors">
          STUDENTATO<span className="text-[#FA5C38]">.</span>
        </span>
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#FA5C38] uppercase leading-tight">
          EMILIA
        </span>
      </div>
    </div>
  );
};
