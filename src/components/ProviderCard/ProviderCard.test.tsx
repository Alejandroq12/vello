import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { ProviderCard } from './ProviderCard';
import css from './ProviderCard.css?raw';

const maya = {
  name: 'Maya Rivera',
  photo: 'https://example.test/maya.jpg',
  service: 'Dog walker & pet sitter, just up on 4th Ave.',
  rating: 4.9,
  walkMinutes: 6,
  price: 24,
  priceUnit: 'walk',
  verified: true,
  available: true,
  featured: true,
  href: '/neighbors/maya',
};

describe('ProviderCard — semantics', () => {
  it('renders the whole card as one link named after the provider', () => {
    render(<ProviderCard {...maya} />);
    const link = screen.getByRole('link', { name: 'Maya Rivera' });
    expect(link).toHaveAttribute('href', '/neighbors/maya');
    expect(link.tagName).toBe('A');
    expect(within(link).getByRole('heading', { level: 3, name: 'Maya Rivera' })).toBeInTheDocument();
  });

  it('renders as a non-interactive article when there is nowhere to go', () => {
    render(<ProviderCard {...maya} href={undefined} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Maya Rivera' })).toBeInTheDocument();
  });

  it('exposes no chevron to assistive tech, and none at all when not a link', () => {
    const { container, rerender } = render(<ProviderCard {...maya} />);
    const tap = container.querySelector('.vl-provider__tap');
    expect(tap).toHaveAttribute('aria-hidden', 'true');
    rerender(<ProviderCard {...maya} href={undefined} />);
    expect(container.querySelector('.vl-provider__tap')).toBeNull();
  });

  it('is reachable by keyboard', async () => {
    const user = userEvent.setup();
    render(<ProviderCard {...maya} />);
    await user.tab();
    expect(screen.getByRole('link', { name: 'Maya Rivera' })).toHaveFocus();
  });
});

describe('ProviderCard — content', () => {
  it('treats the photo as decorative because the name is adjacent', () => {
    render(<ProviderCard {...maya} />);
    const img = document.querySelector('img.vl-avatar__img');
    expect(img).toHaveAttribute('alt', '');
    expect(screen.queryByRole('img', { name: 'Maya Rivera' })).not.toBeInTheDocument();
  });

  it('announces the verified shield by name, not by colour', () => {
    render(<ProviderCard {...maya} />);
    expect(screen.getByRole('img', { name: 'Background-checked' })).toBeInTheDocument();
  });

  it('shows the Available badge only when available', () => {
    const { rerender } = render(<ProviderCard {...maya} />);
    expect(screen.getByText('Available')).toHaveClass('vl-badge--brand');
    rerender(<ProviderCard {...maya} available={false} />);
    expect(screen.queryByText('Available')).not.toBeInTheDocument();
  });

  it('renders the price line as drawn: "from $24 / walk"', () => {
    render(<ProviderCard {...maya} />);
    expect(document.querySelector('.vl-provider__price')).toHaveTextContent(/^from \$24 \/ walk$/);
  });

  it('renders the walk-time chip and omits it when unknown', () => {
    const { rerender } = render(<ProviderCard {...maya} />);
    expect(screen.getByText('6 min walk')).toBeInTheDocument();
    rerender(<ProviderCard {...maya} walkMinutes={undefined} />);
    expect(screen.queryByText(/min walk/)).not.toBeInTheDocument();
  });

  it('shows five filled stars for 4.9, hides them from screen readers, and speaks the score', () => {
    const { container } = render(<ProviderCard {...maya} />);
    const stars = container.querySelector('.vl-rating__stars');
    expect(stars).toHaveAttribute('aria-hidden', 'true');
    expect(stars?.querySelectorAll('svg')).toHaveLength(5);
    expect(stars?.querySelectorAll('.vl-rating__star-bg')).toHaveLength(0);
    expect(container.querySelector('.vl-rating')).toHaveTextContent('4.9 out of 5 stars');
    expect(container.querySelector('.vl-rating__count')).toBeNull();
  });

  it('shows the review count when the DS Rating is given one', () => {
    const { container } = render(<ProviderCard {...maya} reviews={213} />);
    expect(container.querySelector('.vl-rating__count')).toHaveTextContent('(213 reviews)');
  });

  it('falls back to initials without a photo', () => {
    render(<ProviderCard {...maya} photo={undefined} />);
    expect(document.querySelector('.vl-avatar__fallback')).toHaveTextContent('MR');
  });
});

describe('ProviderCard — accessibility audit (axe)', () => {
  it('has no violations as a link', async () => {
    const { container } = render(
      <ul>
        <li>
          <ProviderCard {...maya} />
        </li>
      </ul>,
    );
    // Colour contrast needs a real renderer; it is verified by hand in docs/fidelity-audit.md.
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });

  it('has no violations as an article', async () => {
    const { container } = render(<ProviderCard {...maya} href={undefined} />);
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});

describe('ProviderCard.css — token guardrail', () => {
  const marker = '/* ---------------- END UNRESOLVED ---------------- */';
  const rules = css.slice(css.indexOf(marker) + marker.length);

  it('reads the real stylesheet, not a test stub', () => {
    expect(css.length).toBeGreaterThan(1000);
    expect(css).toContain('BEGIN UNRESOLVED');
    expect(css).toContain(marker);
  });

  it('never hardcodes a colour', () => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/\brgba?\(/i);
  });

  it('keeps every pixel literal inside the UNRESOLVED block', () => {
    const withoutComments = rules.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(withoutComments).not.toMatch(/\d(\.\d+)?px\b/);
  });

  it('declares each unresolved value once, as a --pc-* custom property', () => {
    const block = css.slice(css.indexOf('BEGIN UNRESOLVED'), css.indexOf(marker));
    const names = [...block.matchAll(/^\s*(--pc-[a-z-]+):/gm)].map((m) => m[1]);
    expect(names.length).toBeGreaterThan(0);
    expect(new Set(names).size).toBe(names.length);
    for (const n of names) expect(rules).toContain(`var(${n})`);
  });
});
