export function TableIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 70" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="84" height="12" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 24v34M80 24v34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowDownRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7l10 10M17 7v10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
