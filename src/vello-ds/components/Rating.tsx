/**
 * Vello Rating — ported from `_ds_bundle.js` → components/display/Rating.jsx.
 * Markup, class names and CSS match the bundle. One accessibility deviation:
 * the bundle names the star row with `aria-label` on a bare <span> (invalid
 * for a generic element) and leaves five identical SVGs exposed. Here the
 * stars are `aria-hidden` and the score is spoken as "4.9 out of 5 stars"
 * via visually-hidden text next to the visible numeral.
 */
import './Rating.css';
import './sr-only.css';

export interface RatingProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  starsOnly?: boolean;
  className?: string;
}

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 18.9 6.1 21.3l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
  </svg>
);

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  count,
  starsOnly = false,
  className = '',
}: RatingProps) {
  const rounded = Math.round(value);
  const label = value.toFixed(1);
  const numeralVisible = !starsOnly && showValue;
  return (
    <span className={['vl-rating', `vl-rating--${size}`, className].filter(Boolean).join(' ')}>
      <span className="vl-rating__stars" aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < rounded ? undefined : 'vl-rating__star-bg'}>
            <Star />
          </span>
        ))}
      </span>
      {numeralVisible ? <span className="vl-rating__value">{label}</span> : null}
      <span className="vl-sr-only">
        {numeralVisible ? ` out of ${max} stars` : `Rated ${label} out of ${max} stars`}
      </span>
      {!starsOnly && count != null ? (
        <span className="vl-rating__count">
          ({count}
          <span className="vl-sr-only"> reviews</span>)
        </span>
      ) : null}
    </span>
  );
}
