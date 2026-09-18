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
      </header>

      <section className="demo__section" aria-labelledby="trusted">
        <h2 id="trusted" className="demo__title">
          Trusted on your block
          <small>Verified by your neighborhood, minutes away</small>
        </h2>
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

      <section className="demo__section" aria-labelledby="reference">
        <h2 id="reference" className="demo__title">
          Reference
          <small>The screen that was handed off</small>
        </h2>
        <figure className="demo__ref">
          <img
            src="/reference/provider-card-screenshot.png"
            alt="The handed-off Vello home-screen card for Maya Rivera: verified avatar, orange Available badge, description, from $24 per walk, a 6 min walk chip and a 4.9 star rating."
            width={818}
            height={354}
          />
        </figure>
      </section>
    </main>
  );
}
