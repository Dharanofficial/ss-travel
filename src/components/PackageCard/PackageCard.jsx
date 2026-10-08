import { Link } from 'react-router-dom';
import { inr } from '../../utils/pricing';
import './PackageCard.css';

export default function PackageCard({ p }) {
  return (
    <article className="pcard">
      <img src={p.image} alt={`${p.title} package`} loading="lazy" width="900" height="600" />
      <div className="pbody">
        <span className="dur">{p.duration}</span>
        <h3>{p.title}</h3>
        <ul>{p.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="prow">
          <span>Starting from<strong>{inr(p.price)}</strong></span>
        </div>
        <div className="pactions">
          <Link className="btn ghost dark" to={`/packages/${p.id}`}>View details</Link>
          <Link className="btn dark" to={`/booking?package=${p.id}`}>Book now</Link>
        </div>
      </div>
    </article>
  );
}
