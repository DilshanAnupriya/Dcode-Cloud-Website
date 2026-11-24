/** The logo's trace-and-terminal mark, used as the arrow on every action. */
export function TraceArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`trace-arrow ${className}`} width="24" height="10" viewBox="0 0 24 10" aria-hidden="true">
      <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18.5" cy="5" r="3.5" fill="currentColor" />
    </svg>
  );
}
