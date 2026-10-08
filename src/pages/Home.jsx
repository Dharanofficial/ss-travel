import {Link} from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import DestinationCard from '../components/DestinationCard/DestinationCard';
import PackageCard from '../components/PackageCard/PackageCard';
import Testimonial from '../components/Testimonial/Testimonial';
import {destinations} from '../data/destinations';
import {packages} from '../data/packages';
const why=[['Carefully selected experiences','Destinations and activities chosen for quality and memorable moments.'],['Best value','Transparent packages with competitive pricing.'],['Trusted travel partners','Reliable hotels, transport providers and local guides.'],['24/7 travel support','Assistance before and during your journey.']];
const stories=['10 Destinations You Should Visit This Year','The Ultimate Bali Travel Guide','Best European Destinations','Top Luxury Resorts Around the World'];
export default function Home(){
 return(<><Hero/>
 <section className="section" data-navbar-section="projects" style={{paddingTop:180}}><div className="container"><h2>Popular destinations</h2><div className="grid">{destinations.map(d=><DestinationCard key={d.id} d={d}/>)}</div></div></section>
 <section className="section sand" data-navbar-section="experience"><div className="container"><h2>Travel packages</h2><div className="grid">{packages.map(p=><PackageCard key={p.id} p={p}/>)}</div></div></section>
 <section className="section" data-navbar-section="skills"><div className="container"><h2>Why travel with SS Travel?</h2><div className="grid">{why.map(([t,d])=><div key={t} className="state"><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
 <section className="section sand" data-navbar-section="projects"><div className="container"><h2>Travel inspiration</h2><div className="grid">{stories.map((s,i)=><article key={s} className="state" style={{background:`linear-gradient(rgba(11,31,58,.55),rgba(11,31,58,.8)),url(${destinations[i].image}) center/cover`,color:'#fff',minHeight:200,textAlign:'left'}}><h3 style={{color:'#fff'}}>{s}</h3></article>)}</div><p><Link to="/destinations" className="btn">Explore Travel Stories</Link></p></div></section>
 <section className="section" data-navbar-section="contact"><div className="container"><Testimonial/></div></section></>);
}
