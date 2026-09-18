/**
 * Vello Badge — ported from `_ds_bundle.js` → components/display/Badge.jsx.
 * Markup, class names and CSS match the bundle. No deviations.
 */
import type { ReactNode } from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'accent'
  | 'solid';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon = null,
  className = '',
  children,
}: BadgeProps) {
  const cls = ['vl-badge', `vl-badge--${variant}`, `vl-badge--${size}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls}>
      {dot ? <span className="vl-badge__dot" /> : null}
      {icon}
      {children}
    </span>
  );
}
