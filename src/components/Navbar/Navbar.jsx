import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  ['/', 'Home'],
  ['/destinations', 'Destinations'],
  ['/packages', 'Packages'],
  ['/my-bookings', 'Bookings'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setHeroVisible(false);
      return undefined;
    }

    const hero = document.querySelector('[data-navbar-section="home"]');
    if (!hero || !('IntersectionObserver' in window)) {
      setHeroVisible(window.scrollY <= 50);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const navbarState = !isHome || !heroVisible
    ? 'navbar-dark'
    : scrolled
      ? 'navbar-home-scrolled'
      : 'navbar-home';

  return (
    <header className={`nav ${navbarState}`}>
      <div className="container nav-in">
        <Link to="/" className="logo">
          SS Travel
        </Link>

        <button
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>

        <nav className={`links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <Link to="/booking" className="btn" onClick={() => setOpen(false)}>
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
