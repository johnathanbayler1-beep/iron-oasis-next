const METRICS = [
  {
    label:  'Occupancy Density',
    legacy: '1.5 - 3.0 persons per 100 sq. ft.',
    oasis:  'Strict 1:1 Private On-Demand Booking',
  },
  {
    label:  'Acoustic Floor Baseline',
    legacy: '78dB - 88dB (High ambient noise)',
    oasis:  '< 35dB Decoupled Noise Isolation',
  },
  {
    label:  'Air Turnover Rate',
    legacy: 'Shared commercial HVAC loop',
    oasis:  'Localized Dedicated Air Exchanges',
  },
  {
    label:  'Friction Vector',
    legacy: 'High (Equipment queues / crowded lanes)',
    oasis:  'Zero (24/7 private automated entry)',
  },
];

export function TelemetryMatrix() {
  return (
    <div className="my-12 w-full border border-[var(--chrome-dark)]">

      {/* Telemetry header bar */}
      <div className="bg-[var(--soot)] px-4 py-3 border-b border-[var(--chrome-dark)] font-mono text-[10px] uppercase tracking-widest text-[var(--chrome-dark)] flex justify-between items-center">
        <span>[SYS_MATRIX // COMPARATIVE_LOGISTICS]</span>
        <span className="text-emerald-500/70 animate-pulse">● LIVE_DATA</span>
      </div>

      {/* 1px laser-etched grid */}
      <div className="bg-[var(--chrome-dark)] grid grid-cols-1 md:grid-cols-3 gap-[1px]">

        {/* Column headers — desktop only */}
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-[var(--chrome-dark)]">
          Operational Metric
        </div>
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-[var(--chrome-dark)]">
          Legacy Commercial Gyms
        </div>
        <div className="hidden md:block bg-[var(--soot)] p-4 font-mono text-[11px] uppercase tracking-wider text-amber-500/80">
          Iron Oasis Micro-Gym Pods
        </div>

        {/* Data rows */}
        {METRICS.map((row) => (
          <>
            <div
              key={`${row.label}-metric`}
              className="bg-[var(--ink)] p-4 font-mono text-xs uppercase tracking-normal text-[var(--chalk)] flex items-center md:border-none border-b border-[var(--chrome-dark)]"
            >
              <span className="md:hidden text-[10px] text-[var(--chrome-dark)] mr-2">METRIC:</span>
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
