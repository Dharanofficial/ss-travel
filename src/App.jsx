import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

const Destinations = lazy(() => import('./pages/Destinations'));
const Packages = lazy(() => import('./pages/Packages'));
const Booking = lazy(() => import('./pages/Booking'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const Contact = lazy(() => import('./pages/Contact'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));

const PageLoading = () => (
  <div className="state page-state" aria-live="polite">
    Loading...
  </div>
);

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-content">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:packageId" element={<PackageDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="state page-state">Page not found.</div>} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
