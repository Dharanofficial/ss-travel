import {Link} from 'react-router-dom';
import {inr} from '../../utils/pricing';
import './DestinationCard.css';
export default function DestinationCard({d}){
 return(<article className="dcard"><div className="media"><img src={d.image} alt={`${d.name}, ${d.country}`} loading="lazy" width="900" height="600"/><span className="rate" aria-label={`Rated ${d.rating} out of 5`}>★ {d.rating}</span></div>
  <div className="body"><h3>{d.name}</h3><p className="country">{d.country}</p><p className="tags">{d.tags}</p><p>{d.desc}</p>
   <div className="row"><span>From <strong>{inr(d.price)}</strong></span><Link className="btn" to={`/packages?dest=${d.id}`}>Explore</Link></div></div></article>);
}
