import React from 'react';

// Industrial neobrutalist mini-diagrams for Services page.
// Pure SVG + CSS animations (no external deps). Respects prefers-reduced-motion.

export type ServiceDiagramType = 'design' | 'supply' | 'install' | 'maintenance';

export function ServiceDiagram({ type, title }: { type: ServiceDiagramType; title: string }) {
  const common = {
    stroke: 'var(--nb-stroke)' as const,
    red: 'oklch(0.53 0.23 29)' as const,
    navy: 'oklch(0.20 0.06 265)' as const,
  };

  return (
    <div className="border-3 border-[var(--nb-stroke)] bg-white nb-shadow-sm p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{title}</div>

      <svg
        viewBox="0 0 440 160"
        className="mt-3 w-full h-[120px]"
        role="img"
        aria-label={title}
      >
        <defs>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .pulse { animation: pulse 1200ms ease-in-out infinite; transform-origin: center; }
              .dash { stroke-dasharray: 6 6; animation: dash 1200ms linear infinite; }
            }
            @keyframes pulse { 0%,100%{opacity:.35; transform:scale(1)} 50%{opacity:1; transform:scale(1.04)} }
            @keyframes dash { to { stroke-dashoffset: -24; } }
          `}</style>
        </defs>

        {/* Frame */}
        <rect x="10" y="10" width="420" height="140" fill="none" stroke={common.stroke} strokeWidth="3" />

        {type === 'design' && (
          <>
            <rect x="26" y="28" width="160" height="104" fill="none" stroke={common.stroke} strokeWidth="2" />
            <path d="M36 50 H176" stroke={common.stroke} strokeWidth="2" />
            <path d="M36 68 H164" stroke={common.stroke} strokeWidth="2" />
            <path d="M36 86 H150" stroke={common.stroke} strokeWidth="2" />
            <path d="M36 104 H172" stroke={common.stroke} strokeWidth="2" />

            <path d="M220 44 H400" stroke={common.navy} strokeWidth="6" />
            <path d="M220 44 V120" stroke={common.navy} strokeWidth="6" />
            <path d="M220 120 H400" stroke={common.navy} strokeWidth="6" />
            <circle cx="300" cy="44" r="10" fill={common.red} className="pulse" />
            <circle cx="220" cy="82" r="10" fill={common.red} className="pulse" />
            <circle cx="340" cy="120" r="10" fill={common.red} className="pulse" />

            <text x="220" y="34" fontSize="12" fill={common.stroke} fontWeight="700">SHOP DRAWINGS</text>
            <text x="26" y="24" fontSize="12" fill={common.stroke} fontWeight="700">APPROVAL SET</text>
          </>
        )}

        {type === 'supply' && (
          <>
            <rect x="26" y="40" width="120" height="92" fill="none" stroke={common.stroke} strokeWidth="2" />
            <rect x="156" y="56" width="86" height="76" fill="none" stroke={common.stroke} strokeWidth="2" />
            <rect x="250" y="34" width="160" height="98" fill="none" stroke={common.stroke} strokeWidth="2" />
            <path d="M26 40 L86 18 L146 40" fill="none" stroke={common.stroke} strokeWidth="2" />

            <path d="M86 18 V40" stroke={common.stroke} strokeWidth="2" />
            <path d="M290 52 H380" stroke={common.red} strokeWidth="6" className="dash" />
            <path d="M280 86 H400" stroke={common.navy} strokeWidth="6" className="dash" />

            <text x="34" y="122" fontSize="12" fill={common.stroke} fontWeight="700">WAREHOUSE</text>
            <text x="262" y="122" fontSize="12" fill={common.stroke} fontWeight="700">DELIVERY</text>
          </>
        )}

        {type === 'install' && (
          <>
            <path d="M34 44 H406" stroke={common.navy} strokeWidth="8" />
            <path d="M110 44 V120" stroke={common.navy} strokeWidth="8" />
            <path d="M250 44 V120" stroke={common.navy} strokeWidth="8" />
            <circle cx="110" cy="88" r="10" fill={common.red} className="pulse" />
            <circle cx="250" cy="96" r="10" fill={common.red} className="pulse" />

            <rect x="300" y="70" width="100" height="62" fill="none" stroke={common.stroke} strokeWidth="3" />
            <path d="M312 88 H388" stroke={common.stroke} strokeWidth="2" />
            <path d="M312 104 H372" stroke={common.stroke} strokeWidth="2" />
            <text x="306" y="62" fontSize="12" fill={common.stroke} fontWeight="700">TEST & COMM.</text>
          </>
        )}

        {type === 'maintenance' && (
          <>
            <rect x="26" y="34" width="180" height="98" fill="none" stroke={common.stroke} strokeWidth="3" />
            <path d="M44 58 H194" stroke={common.stroke} strokeWidth="2" />
            <path d="M44 78 H176" stroke={common.stroke} strokeWidth="2" />
            <path d="M44 98 H188" stroke={common.stroke} strokeWidth="2" />

            <circle cx="292" cy="82" r="34" fill="none" stroke={common.navy} strokeWidth="10" />
            <path d="M292 58 V82 L312 96" fill="none" stroke={common.red} strokeWidth="6" strokeLinecap="round" className="pulse" />

            <text x="26" y="28" fontSize="12" fill={common.stroke} fontWeight="700">PM CHECKLIST</text>
            <text x="344" y="90" fontSize="12" fill={common.stroke} fontWeight="700">SLA</text>
          </>
        )}
      </svg>
    </div>
  );
}
