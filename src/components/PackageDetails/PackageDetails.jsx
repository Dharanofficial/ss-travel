import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inr } from '../../utils/pricing';

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PackageHero({ packageInfo }) {
  return (
    <section className="package-hero">
      <img className="package-hero-image" src={packageInfo.image} alt={`${packageInfo.destinationName} landscape`} />
      <div className="package-hero-shade" />
      <div className="package-hero-content container">
        <span className="package-eyebrow">Curated travel experience</span>
        <h1>{packageInfo.title}</h1>
        <p className="package-hero-location"><LocationIcon />{packageInfo.city}, {packageInfo.country}</p>
        <p>{packageInfo.description}</p>
        <div className="package-hero-facts">
          <span>★ {packageInfo.rating} rating</span>
          <span>{packageInfo.duration}</span>
          <span>{packageInfo.travelers} travelers</span>
        </div>
      </div>
    </section>
  );
}

export function BookingCard({ packageInfo }) {
  return (
    <aside className="package-booking-card">
      <span className="package-eyebrow">Package</span>
      <h2>{packageInfo.duration}</h2>
      <p className="package-booking-price">{inr(packageInfo.price)} <span>/ person</span></p>
      <p className="package-booking-caption">A memorable escape, thoughtfully arranged.</p>
      <ul>
        {packageInfo.includes.map((item) => (
          <li key={item}><span aria-hidden="true">✓</span>{item}</li>
        ))}
      </ul>
      <Link className="btn package-book-button" to={`/booking?package=${packageInfo.id}`}>Book this package</Link>
      <small>Final trip details can be reviewed before confirmation.</small>
    </aside>
  );
}

export function TravelGallery({ images, destination }) {
  return (
    <section className="package-section">
      <div className="package-section-heading">
        <div><span className="package-eyebrow">A closer look</span><h2>Travel Gallery</h2></div>
        <p>Moments and places that make {destination} unforgettable.</p>
      </div>
      <div className="travel-gallery" aria-label={`${destination} photo gallery`}>
        {images.map((image, index) => (
          <figure key={image}>
            <img src={image} alt={`${destination} travel view ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function PlaceCard({ place, onView }) {
  return (
    <article className="place-card">
      <div className="place-image-wrap">
        <img src={place.image} alt={place.name} loading="lazy" />
        <span className="place-rating">★ {place.rating}</span>
      </div>
      <div className="place-card-body">
        <h3>{place.name}</h3>
        <p className="place-city"><LocationIcon />{place.city}</p>
        <p>{place.description}</p>
        <div className="place-meta"><span>{place.duration}</span><span>{place.bestTime}</span></div>
        <button className="place-details-button" type="button" onClick={onView}>View details <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  );
}

function PlaceDetails({ place, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location)}`;

  return (
    <div className="place-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="place-modal" role="dialog" aria-modal="true" aria-labelledby="place-modal-title">
        <button className="place-modal-close" type="button" onClick={onClose} aria-label="Close place details">×</button>
        <img className="place-modal-image" src={place.image} alt={place.name} />
        <div className="place-modal-content">
          <span className="package-eyebrow">Place highlight · ★ {place.rating}</span>
          <h2 id="place-modal-title">{place.name}</h2>
          <p className="place-city"><LocationIcon />{place.location}</p>
          <p>{place.fullDescription}</p>
          <a className="place-map-link" href={mapUrl} target="_blank" rel="noreferrer">Open location in Google Maps ↗</a>
          <div className="place-modal-facts">
            <div><strong>Opening hours</strong><span>{place.openingHours}</span></div>
            <div><strong>Entry fee</strong><span>{place.entryFee}</span></div>
            <div><strong>Recommended visit</strong><span>{place.duration}</span></div>
            <div><strong>Best time</strong><span>{place.bestTime}</span></div>
          </div>
          <div className="place-modal-lists">
            <div><h3>Things to do</h3><ul>{place.thingsToDo.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Travel tips</h3><ul>{place.tips.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="nearby-places"><strong>Nearby attractions</strong><p>{place.nearby.join(' · ')}</p></div>
        </div>
      </section>
    </div>
  );
}

export function PlacesGrid({ places }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section className="package-section">
      <div className="package-section-heading">
        <div><span className="package-eyebrow">Make it memorable</span><h2>Places to Visit</h2></div>
        <p>Landmarks, local favorites and experiences worth making time for.</p>
      </div>
      <div className="places-grid">
        {places.map((place) => (
          <PlaceCard key={place.name} place={place} onView={() => setSelectedPlace(place)} />
        ))}
      </div>
      {selectedPlace && <PlaceDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
    </section>
  );
}

export function Itinerary({ days }) {
  return (
    <section className="package-section">
      <div className="package-section-heading">
        <div><span className="package-eyebrow">Your journey, day by day</span><h2>Package Itinerary</h2></div>
        <p>Designed to balance signature experiences with time to explore at your own pace.</p>
      </div>
      <ol className="itinerary-timeline">
        {days.map((day, index) => (
          <li className="itinerary-day" key={day.title}>
            <span className="itinerary-day-number">Day {String(index + 1).padStart(2, '0')}</span>
            <div><h3>{day.title}</h3><p>{day.description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
