import React from 'react';

// Firefighting-themed ambient effects (no external assets)
// - Embers rising (subtle)
// - Heat shimmer band (bottom)
// Respects prefers-reduced-motion via CSS.

const emberLefts = [
  '6%','12%','18%','24%','30%','36%','42%','48%','54%','60%','66%','72%','78%','84%','90%','15%','33%','51%','69%','87%'
];

export function FireEmbers({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Heat shimmer at bottom */}
      <div className="fire-heat absolute bottom-0 left-0 right-0 h-40 opacity-70" />

      {/* Embers */}
      {emberLefts.map((left, i) => (
        <span
          key={i}
          className="fire-ember"
          style={{
            left,
            animationDelay: `${(i % 10) * 0.35}s`,
            animationDuration: `${5.5 + (i % 6) * 0.6}s`,
            opacity: 0.25 + (i % 5) * 0.08
          }}
        />
      ))}
    </div>
  );
}

export function WaterMist({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="water-mist absolute inset-0" />
    </div>
  );
}
