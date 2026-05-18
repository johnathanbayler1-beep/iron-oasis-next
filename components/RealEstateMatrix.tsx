const METRICS = [
  {
    label:  'Revenue / Sq Ft / Month',
    legacy: '$2.50 – $8.00 (blended membership)',
    oasis:  '$130 – $180 (on-demand private slot)',
  },
  {
    label:  'Staffing Requirement',
    legacy: '1 – 8 FTEs on floor at all times',
    oasis:  'Zero — fully automated 24/7 access',
  },
  {
    label:  'Fit-Out Investment',
    legacy: '$80 – $250 per sq ft',
    oasis:  '$45 – $85 per sq ft',
  },
  {
    label:  'Break-Even Timeline',
    legacy: '18 – 48 months',
    oasis:  '4 – 9 months',
  },
  {
    label:  'Minimum Viable Footprint',
    legacy: '2,000+ sq ft (commercial viability threshold)',
    oasis:  '300 – 500 sq ft (flex / industrial)',
  },
];

export function RealEstateMatrix() {
  return (
    <div className="my-12 w-full border border-[var(--chrome-dark)]">

      {/* Header bar */}
      <div className="bg-[var(--soot)] px-4 py-3 border-b border-[var(--chrome-dark)] font-mono text-[10px] uppercase tracking-widest text-[var(--chrome-dark)] flex justify-between items-center">
        <span>[SYS_MATRIX // SPATIAL_YIELD_ANALYSIS]</span>
        <span className="text-amber-500/70 animate-pulse">● OPERATOR_DATA</span>
      </div>

      {/* Grid */}
      <div className="bg-[var(--chrome-dark)] grid grid-cols-1 md:grid-cols-3 gap-[1px]">

        {/* Column headers — desktop only */}
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-[var(--chrome-dark)]">
          Yield Variable
        </div>
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-[var(--chrome-dark)]">
          Legacy Gym Operators
        </div>
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-amber-500/80">
          Iron Oasis Micro-Pod
        </div>

        {/* Data rows */}
        {METRICS.map((row) => (
          <>
            <div
              key={`${row.label}-metric`}
              className="bg-[var(--ink)] p-4 font-mono text-xs uppercase tracking-normal text-[var(--chalk)] flex items-center md:border-none border-b border-[var(--chrome-dark)]"
            >
              <span className="md:hidden text-[10px] text-[var(--chrome-dark)] mr-2">VARIABLE:</span>
              {row.label}
            </div>

            <div
              key={`${row.label}-legacy`}
              className="bg-[var(--soot)] p-4 text-xs tracking-wide text-neutral-500 flex items-center md:border-none border-b border-[var(--chrome-dark)]"
            >
              <span className="md:hidden font-mono text-[10px] text-[var(--chrome-dark)] mr-2 block w-24 shrink-0">LEGACY:</span>
              {row.legacy}
            </div>

            <div
              key={`${row.label}-oasis`}
              className="bg-[var(--steel)] p-4 text-xs font-medium tracking-wide text-[var(--chalk)] flex items-center"
            >
              <span className="md:hidden font-mono text-[10px] text-amber-500/60 mr-2 block w-24 shrink-0">IRON OASIS:</span>
              {row.oasis}
            </div>
          </>
        ))}

      </div>
    </div>
  );
}
