import {Link} from 'react-router-dom';
import {heroImage} from '../../data/destinations';
import SearchBox from '../SearchBox/SearchBox';
import './Hero.css';
export default function Hero(){
 return(<section className="hero" data-navbar-section="home"><img src={heroImage} alt="Mountains meeting a turquoise sea at sunrise" fetchpriority="high"/>
  <div className="container hero-in"><p className="tag">Explore More. Travel Better. Create Memories.</p>
   <h1>Explore the World With SS Travel</h1>
   <p className="sub">Discover breathtaking destinations, unforgettable experiences, and carefully designed travel packages for your next adventure.</p>
   <div className="cta"><Link to="/destinations" className="btn">Explore Destinations</Link><Link to="/booking" className="btn ghost">Book Your Trip</Link></div>
   <div className="float"><SearchBox/></div></div></section>);
}
