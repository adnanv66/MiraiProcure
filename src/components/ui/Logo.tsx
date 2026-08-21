import React from 'react';
import Link from 'next/link';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ showTagline = false, size = 'md', href = '/', lightMode = true }) => {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const content = (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Enterprise "M" Logo */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-slate-900 p-0.5 shadow-sm group-hover:shadow-md transition-all duration-300`}>
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 100 100" width="24" height="24" style={{ width: '24px', height: '24px' }} className="w-6 h-6 text-amber-400 fill-current flex-shrink-0">
            <circle cx="25" cy="75" r="7" className="fill-amber-400" />
            <circle cx="50" cy="25" r="7" className="fill-amber-300" />
            <circle cx="75" cy="75" r="7" className="fill-amber-500" />
            <path
              d="M25 75 L25 35 L50 60 L75 35 L75 75"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className={`font-extrabold tracking-tight ${lightMode ? 'text-slate-900' : 'text-white'} ${textSizes[size]}`}>
            Mirai<span className="text-amber-600">Procure</span>
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
            未来
          </span>
        </div>
        {showTagline && (
          <span className={`text-xs ${lightMode ? 'text-slate-500' : 'text-slate-300'} font-medium`}>
            AI Procurement Operating System
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
