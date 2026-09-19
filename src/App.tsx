import { useState } from 'react';
import { ProviderCard } from './components/ProviderCard';

/* Data is the prototype's own (vello-product.vercel.app/flow-shared.jsx → NEIGHBORS).
   Photos are the same Unsplash URLs the prototype uses. */
const PHOTO = {
  maya: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70',
  devon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70',
  priya: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&facepad=3&w=240&h=240&q=70',
};

export function App() {
  const [strict, setStrict] = useState(false);
  return (
    <main className={strict ? 'demo demo--strict' : 'demo'}>
      <header className="demo__head">
        <h1 className="v-h2">ProviderCard</h1>
        <label className="demo__toggle">
          <input type="checkbox" checked={strict} onChange={(e) => setStrict(e.target.checked)} />
          Preview nearest-token candidates for the unresolved values
        </label>
        <p className="demo__hint">
          The prototype shared by the design team uses some sizes that the design system does not
          have. For example, the provider name is 17px, but the design system only offers 16px, 18px
          or 20px. With the box unticked, the cards below match the prototype (17px). With the box
          ticked, they use 20px, the size the design system&apos;s own provider card uses. Toggle it
          to compare and pick one.
        </p>
      </header>

      <section className="demo__section" aria-labelledby="trusted">
        <h2 id="trusted" className="demo__title">
          Trusted on your block
          <small>Verified by your neighborhood, minutes away</small>
        </h2>
        <p className="demo__flag" role="note">
          Note for design review: in the prototype the Available badge is coral. Here it is green on
          purpose. The coral text is too light on its background to pass the accessibility contrast
          rule (WCAG AA, see web.dev Learn Accessibility, Color and contrast). The green badge from
          the design system passes. My first fix kept coral and made the text darker, which also
          passes. I then chose green because it is the badge the design system already defines for
          this card. Both options are written down in{' '}
          <a href="https://github.com/Alejandroq12/vello/blob/main/docs/fidelity-audit.md" target="_blank" rel="noopener noreferrer">the fidelity audit</a>.
        </p>
        <ul className="demo__list">
          <li>
            <ProviderCard
              name="Maya Rivera"
              photo={PHOTO.maya}
              service="Dog walker & pet sitter, just up on 4th Ave."
              rating={4.9}
              walkMinutes={6}
              price={24}
              priceUnit="walk"
              verified
              available
              featured
              href="#/neighbors/maya"
            />
          </li>
          <li>
            <ProviderCard
              name="Devon Clarke"
              photo={PHOTO.devon}
              service="Handyman — shelves, leaky faucets, flat-pack furniture."
              rating={4.8}
              reviews={96}
              walkMinutes={9}
              price={65}
              priceUnit="flat"
              verified
              href="#/neighbors/devon"
            />
          </li>
          <li>
            <ProviderCard
              name="Priya Anand"
              photo={PHOTO.priya}
              service="Deep cleans & move-outs. Brings her own eco supplies."
              rating={5}
              walkMinutes={12}
              price={90}
              priceUnit="visit"
              verified
              available
              href="#/neighbors/priya"
            />
          </li>
          <li>
            <ProviderCard
              name="Ana Silva"
              service="Tutor · Math, 4–8th grade"
              rating={5}
              reviews={12}
            />
          </li>
        </ul>
        <p className="demo__note">
          Cards 1–3 are links to provider details. Card 4 has no destination.
        </p>
      </section>

      <section className="demo__section" aria-labelledby="two-cards">
        <h2 id="two-cards" className="demo__title">
          Two cards, not one
          <small>Why this card does not match the design system&apos;s ProviderCard</small>
        </h2>
        <p className="demo__flag" role="note">
          Note for design review: the design system has its own ProviderCard, and it is a different
          card from the one in the prototype. The design system card shows distance in miles, the
          number of reviews, a big hourly price and a Book button. The prototype card shows walking
          minutes, no review count, a small &quot;from&quot; price and a chevron, and the whole card
          opens the provider. I built the prototype card, because that is the screen that was handed
          off. The two need a decision from design: make the prototype card an official variant of
          the design system, or document it as its own component. Details and one more finding are
          in <a href="https://github.com/Alejandroq12/vello/blob/main/docs/fidelity-audit.md" target="_blank" rel="noopener noreferrer">the fidelity audit</a>.
        </p>
      </section>

      <section className="demo__section" aria-labelledby="reference">
        <h2 id="reference" className="demo__title">
          Reference
          <small>The screen that was handed off</small>
        </h2>
        <figure className="demo__ref">
          <img
            src="/reference/provider-card-screenshot.png"
            alt="The handed-off Vello home-screen card for Maya Rivera: verified avatar, coral Available badge, description, from $24 per walk, a 6 min walk chip and a 4.9 star rating."
            width={818}
            height={354}
          />
        </figure>
      </section>
    </main>
  );
}
