/**
 * Vello VerifiedMark — ported from `_ds_bundle.js` → components/display/VerifiedBadge.jsx.
 * Pairs colour with a distinct shape so status is legible without colour:
 *   verified → olive shield + cream check · pending → amber dashed circle + clock
 *   top-rated → amber star · unverified → neutral hollow circle
 * Paths, fills and strokes are verbatim. No deviations from the bundle.
 */
export type TrustStatus = 'verified' | 'pending' | 'top-rated' | 'unverified';

export const TRUST_LABELS: Record<TrustStatus, string> = {
  verified: 'Background-checked',
  pending: 'Verification pending',
  'top-rated': 'Top-rated neighbor',
  unverified: 'Not yet verified',
};

export interface VerifiedMarkProps {
  status?: TrustStatus;
  size?: number;
  /** Paper-coloured rim so the mark reads on top of a photo. */
  outline?: boolean;
  title?: string;
  className?: string;
}

export function VerifiedMark({
  status = 'verified',
  size = 16,
  outline = true,
  title,
  className = '',
}: VerifiedMarkProps) {
  const rim = outline ? 'var(--surface-card)' : 'none';
  const rimW = outline ? 2.4 : 0;
  const common = {
    className: ['vl-vmark', className].filter(Boolean).join(' '),
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    role: 'img',
    'aria-label': title ?? TRUST_LABELS[status],
  } as const;
  const t = title ? <title>{title}</title> : null;

  if (status === 'verified') {
    return (
      <svg {...common}>
        {t}
        <path
          d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
          fill="var(--green-600)"
          stroke={rim}
          strokeWidth={rimW}
          strokeLinejoin="round"
        />
        <path
          d="m8.4 12 2.5 2.5 4.7-5"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === 'top-rated') {
    return (
      <svg {...common}>
        {t}
        <path
          d="M12 2.4 14.7 8l6.1.9-4.4 4.3 1 6.1L12 16.4 6.6 19.3l1-6.1L3.2 8.9 9.3 8 12 2.4Z"
          fill="var(--amber-500)"
          stroke={rim}
          strokeWidth={rimW}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === 'pending') {
    return (
      <svg {...common}>
        {t}
        <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
        <circle cx="12" cy="12" r="8" fill="none" stroke="var(--amber-600)" strokeWidth="1.8" strokeDasharray="2.6 2.4" strokeLinecap="round" />
        <path d="M12 7.6V12l3 1.8" fill="none" stroke="var(--amber-700)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      {t}
      <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
      <circle cx="12" cy="12" r="8" fill="none" stroke="var(--ink-300)" strokeWidth="1.8" strokeDasharray="2.4 2.6" strokeLinecap="round" />
      <path d="M9 12h6" fill="none" stroke="var(--ink-400)" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}
