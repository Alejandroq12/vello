/**
 * Vello Avatar — ported from `_ds_bundle.js` → components/display/Avatar.jsx.
 * Markup and class names match the bundle. Two accessibility deviations:
 *   1. `decorative` prop. The bundle always emits `alt={name}`; the DS's own
 *      ProviderCard a11y note says the photo should be decorative when the
 *      name is adjacent, so ProviderCard passes `decorative`.
 *   2. The initials fallback gets `role="img"` when it is not decorative. The
 *      bundle puts `aria-label` on a bare <span>, which ARIA 1.2 prohibits
 *      (generic elements cannot be named).
 */
import { VerifiedMark, type TrustStatus } from './VerifiedMark';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  /** Full name — drives initials and alt text. */
  name?: string;
  size?: AvatarSize;
  /** Trust mark in the corner. Takes precedence over `online`. */
  badge?: TrustStatus;
  /** Shorthand for badge="verified". */
  verified?: boolean;
  online?: boolean;
  /** Hide the photo/initials from assistive tech when the name is already adjacent. */
  decorative?: boolean;
  className?: string;
}

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

export function Avatar({
  src,
  name = '',
  size = 'md',
  badge,
  verified = false,
  online = false,
  decorative = false,
  className = '',
}: AvatarProps) {
  const status = badge ?? (verified ? 'verified' : null);
  const cls = ['vl-avatar', `vl-avatar--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {src ? (
        <img className="vl-avatar__img" src={src} alt={decorative ? '' : name} />
      ) : decorative ? (
        <span className="vl-avatar__fallback" aria-hidden="true">
          {initials(name)}
        </span>
      ) : (
        <span className="vl-avatar__fallback" role="img" aria-label={name}>
          {initials(name)}
        </span>
      )}
      {status ? (
        <span className="vl-avatar__badge">
          <VerifiedMark status={status} />
        </span>
      ) : online ? (
        <span className="vl-avatar__status" />
      ) : null}
    </span>
  );
}
