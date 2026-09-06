import React from 'react';

interface CharteLogoProps {
  variant?: 'horizontal' | 'badge' | 'icon' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'blue' | 'natural';
}

export const CharteLogo: React.FC<CharteLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showText = true,
  className = '',
  theme = 'blue'
}) => {
  // Dimension definitions
  const dimensions = {
    sm: { iconSize: 34, textScale: 'text-lg', badgeSize: 'w-16 h-16' },
    md: { iconSize: 46, textScale: 'text-2xl', badgeSize: 'w-24 h-24' },
    lg: { iconSize: 64, textScale: 'text-3xl', badgeSize: 'w-36 h-36' },
    xl: { iconSize: 110, textScale: 'text-5xl', badgeSize: 'w-56 h-56' },
  }[size];

  const emblemSvg = (
    <img
      src="/logo.svg"
      alt="Charte Homes"
      width={dimensions.iconSize}
      height={dimensions.iconSize}
      style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
      className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-md object-contain rounded-[22%]"
    />
  );

  // When rendered as the badge matching the emblem card
  if (variant === 'badge') {
    const isNatural = theme === 'natural';
    return (
      <div
        className={`relative flex flex-col items-center justify-center rounded-[32px] p-6 shadow-xl border text-white ${
          isNatural
            ? 'bg-[#5A5A40] border-[#E5E2D9]/30 shadow-[0_20px_40px_rgba(90,90,64,0.3)]'
            : 'bg-gradient-to-b from-[#0B40A8] via-[#09358F] to-[#062464] border-blue-400/20'
        } ${className}`}
        style={{ aspectRatio: '1/1' }}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          {emblemSvg}
          {showText && (
            <div className="text-center">
              <span
                className="font-serif italic font-medium tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] block"
                style={{
                  fontFamily: "'Fraunces', 'Cinzel', serif",
                  fontSize: size === 'xl' ? '32px' : size === 'lg' ? '24px' : '17px',
                  background: isNatural
                    ? 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F0 70%, #D4D4CC 100%)'
                    : 'linear-gradient(180deg, #FFFFFF 0%, #E0EBF7 80%, #BACEE5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Charte Homes
              </span>
              {isNatural && (
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5E2D9]/80 font-medium block mt-1">
                  Est. 1994 · Ethiopia
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // When stacked
  if (variant === 'stacked') {
    const isNatural = theme === 'natural';
    return (
      <div className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}>
        <div
          className={`p-3 rounded-2xl shadow-md border ${
            isNatural
              ? 'bg-[#5A5A40] border-[#E5E2D9]/20'
              : 'bg-gradient-to-br from-[#0B3F9E] to-[#062466] border-blue-400/25'
          }`}
        >
          {emblemSvg}
        </div>
        {showText && (
          <span
            className="font-serif italic font-semibold tracking-tight block"
            style={{
              fontFamily: "'Fraunces', 'Cinzel', serif",
              fontSize: size === 'xl' ? '36px' : size === 'lg' ? '28px' : '20px',
              color: isNatural ? '#2C2C26' : theme === 'light' ? '#0F2A52' : '#FFFFFF',
            }}
          >
            Charte Homes
          </span>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {emblemSvg}
      </div>
    );
  }

  // Default: Horizontal navbar format
  const isNatural = theme === 'natural';
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <div
        className={`p-1.5 rounded-full shadow-sm border flex items-center justify-center shrink-0 ${
          isNatural
            ? 'bg-[#5A5A40] border-[#E5E2D9]/30 text-white'
            : isDark
            ? 'bg-[#0F284D] border-[#1E3966]'
            : 'bg-gradient-to-br from-[#0C41A4] via-[#09358F] to-[#062464] border-blue-400/30'
        }`}
      >
        {emblemSvg}
      </div>

      {showText && (
        <div className="flex flex-col leading-tight text-left">
          <span
            className="font-serif tracking-tight font-semibold leading-none"
            style={{
              fontFamily: "'Fraunces', 'Cinzel', serif",
              fontSize: size === 'sm' ? '18px' : size === 'md' ? '22px' : '26px',
              color: isNatural ? '#2C2C26' : isDark ? '#FFFFFF' : '#0A2540',
              letterSpacing: '-0.01em',
            }}
          >
            CHARTE
          </span>
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-bold mt-0.5"
            style={{
              color: isNatural ? '#A68B67' : isDark ? '#A5BAD8' : '#3B6FB6',
            }}
          >
            HOMES
          </span>
        </div>
      )}
    </div>
  );
};
