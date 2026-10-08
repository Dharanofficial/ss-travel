import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {getBookings} from '../services/bookingApi';
import {destinations} from '../data/destinations';
import {packages} from '../data/packages';
import {inr} from '../utils/pricing';
export default function MyBookings(){
 const [list,setList]=useState(null),[err,setErr]=useState('');
 useEffect(()=>{getBookings().then(setList).catch(()=>setErr('Could not load your bookings. Refresh to try again.'))},[]);
 return(<section className="section" style={{paddingTop:110}}><div className="container"><h1>My bookings</h1>
 {err?<div className="state" role="alert">{err}</div>:!list?<div className="state">Loading your bookings…</div>:!list.length?<div className="state"><p>You have no bookings yet.</p><Link to="/packages" className="btn">Browse packages</Link></div>:
 <div className="grid">{list.map(b=>{const d=destinations.find(x=>x.id===b.destination),p=packages.find(x=>x.id===b.packageId);return(
  <article key={b.id} className="pcard"><img src={d.image} alt={d.name} loading="lazy" width="900" height="600"/><div className="pbody"><span className="dur">{b.status}</span><h3>{d.name}: {p.title}</h3>
  <p>ID {b.id}<br/>{b.from} · {b.adults+b.children} travelers<br/><strong>{inr(b.total)}</strong></p><div className="prow"><button className="btn dark" onClick={()=>alert(`${p.title}\n${b.from} to ${b.to}\n${b.payment}`)}>View Details</button><button className="btn" onClick={()=>window.print()}>Download Invoice</button></div></div></article>)})}</div>}</div></section>);
}
