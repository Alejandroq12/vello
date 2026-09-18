/**
 * Vello ProviderCard — the signature listing for a local service provider,
 * as drawn on the Vello home screen ("Trusted on your block").
 *
 * Composes the design system's Avatar, Badge and Rating, exactly as the
 * system's own ProviderCard does. Layout and values: see ProviderCard.css,
 * which records where every value comes from and which ones are unresolved.
 *
 * Semantics: when `href` is given the whole card is one <a> — tapping it
 * opens the provider's details, so it is a link, not a button and not a
 * div with onClick. Without `href` it is a plain <article>.
 */
import { useId, type ElementType } from 'react';
import { ChevronRight, Footprints } from 'lucide-react';
import { Avatar, Badge, Rating } from '../../vello-ds/components';
import './ProviderCard.css';

export interface ProviderCardProps {
  /** Provider name. */
  name: string;
  /** Photo URL. Initials fallback when omitted (DS Avatar behaviour). */
  photo?: string;
  /** Service line, e.g. "Dog walker & pet sitter, just up on 4th Ave." */
  service: string;
  /** Star score, e.g. 4.9. */
  rating: number;
  /** Review count. Omitted on the home screen; the DS Rating can show it. */
  reviews?: number;
  /** Walking time in minutes, rendered as "6 min walk". */
  walkMinutes?: number;
  /** Starting price in dollars, rendered as "from $24 / unit". */
  price?: number;
  /** Price unit without "per": "walk", "hr", "visit". */
  priceUnit?: string;
  /** Shows the background-checked shield on the avatar. */
  verified?: boolean;
  /** Shows the "Available" badge. */
  available?: boolean;
  /** Brand-glow treatment for the one promoted slot in a list. */
  featured?: boolean;
  /** Provider-details URL. When given, the whole card renders as one <a>. */
  href?: string;
  /** Heading level of the name. The list normally sits under an h2. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export function ProviderCard({
  name,
  photo,
  service,
  rating,
  reviews,
  walkMinutes,
  price,
  priceUnit,
  verified = false,
  available = false,
  featured = false,
  href,
  headingLevel = 3,
  className = '',
}: ProviderCardProps) {
  const nameId = useId();
  const interactive = href != null;
  const Root: ElementType = interactive ? 'a' : 'article';
  const Heading: ElementType = `h${headingLevel}`;
  const cls = [
    'vl-provider',
    interactive ? 'vl-provider--interactive' : '',
    featured ? 'vl-provider--featured' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Root className={cls} href={href} aria-labelledby={nameId}>
      <Avatar src={photo} name={name} size="lg" verified={verified} decorative />

      <div className="vl-provider__body">
        <div className="vl-provider__top">
          <Heading id={nameId} className="vl-provider__name">
            {name}
          </Heading>
          {available ? (
            <Badge variant="brand" size="sm" dot>
              Available
            </Badge>
          ) : null}
        </div>

        <p className="vl-provider__service">{service}</p>

        {price != null ? (
          <p className="vl-provider__price">
            from ${price}
            {priceUnit ? <span className="vl-provider__unit"> / {priceUnit}</span> : null}
          </p>
        ) : null}

        <div className="vl-provider__meta">
          {walkMinutes != null ? (
            <span className="vl-provider__dist">
              <Footprints aria-hidden="true" focusable="false" />
              {walkMinutes} min walk
            </span>
          ) : null}
          <Rating value={rating} count={reviews} size="sm" />
        </div>
      </div>

      {interactive ? (
        <span className="vl-provider__tap" aria-hidden="true">
          <ChevronRight focusable="false" />
        </span>
      ) : null}
    </Root>
  );
}
