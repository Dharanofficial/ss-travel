import {Link} from 'react-router-dom';
import './Footer.css';
export default function Footer(){
 return(<footer className="foot"><div className="container fgrid"><div><h3>SS Travel</h3><p>Explore More. Travel Better. Create Memories.</p></div>
  <nav aria-label="Footer"><Link to="/destinations">Destinations</Link><Link to="/packages">Packages</Link><Link to="/my-bookings">My Bookings</Link><Link to="/contact">Contact</Link></nav>
  <p>© {new Date().getFullYear()} SS Travel. 24/7 support.</p></div></footer>);
}
