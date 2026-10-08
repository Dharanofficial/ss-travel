import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookingCard,
  Itinerary,
  PackageHero,
  PlacesGrid,
  TravelGallery,
} from '../components/PackageDetails/PackageDetails';
import { packages } from '../data/packages';
import { inr } from '../utils/pricing';
import './PackageDetails.css';

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

export default function PackageDetails() {
  const { packageId } = useParams();
  const packageInfo = packages.find((item) => item.id === packageId);

  if (!packageInfo) {
    return (
      <section className="section package-not-found">
        <div className="container state">
          <h1>Package not found</h1>
          <p>This travel package may no longer be available.</p>
          <Link className="btn" to="/packages">Browse all packages</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="package-details-page">
      <PackageHero packageInfo={packageInfo} />
      <main className="container package-details-content">
        <div className="package-overview-layout">
          <Reveal className="package-overview">
            <span className="package-eyebrow">About this destination</span>
            <h2>A remarkable stay in {packageInfo.destinationName}</h2>
            <p>{packageInfo.description}</p>
            <div className="package-facts-grid">
              <div><span>Destination</span><strong>{packageInfo.destinationName}</strong></div>
              <div><span>Country</span><strong>{packageInfo.country}</strong></div>
              <div><span>State / city</span><strong>{packageInfo.city}</strong></div>
              <div><span>Duration</span><strong>{packageInfo.duration}</strong></div>
              <div><span>Best time to visit</span><strong>{packageInfo.bestTime}</strong></div>
              <div><span>Guest rating</span><strong>★ {packageInfo.rating} / 5</strong></div>
              <div><span>Travelers hosted</span><strong>{packageInfo.travelers}</strong></div>
              <div><span>Starting price</span><strong>{inr(packageInfo.price)} / person</strong></div>
            </div>
          </Reveal>
          <BookingCard packageInfo={packageInfo} />
        </div>
        <Reveal><TravelGallery images={packageInfo.gallery} destination={packageInfo.destinationName} /></Reveal>
        <Reveal><PlacesGrid places={packageInfo.places} /></Reveal>
        <Reveal><Itinerary days={packageInfo.itinerary} /></Reveal>
        <div className="package-bottom-cta">
          <div><span className="package-eyebrow">Ready when you are</span><h2>Make {packageInfo.destinationName} your next story.</h2></div>
          <Link className="btn" to={`/booking?package=${packageInfo.id}`}>Book {packageInfo.title}</Link>
        </div>
      </main>
      <div className="mobile-booking-bar">
        <span><strong>{inr(packageInfo.price)}</strong><small> / person</small></span>
        <Link className="btn" to={`/booking?package=${packageInfo.id}`}>Book Now</Link>
      </div>
    </div>
  );
}
