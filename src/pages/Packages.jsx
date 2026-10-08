import {useSearchParams,Link} from 'react-router-dom';
import PackageCard from '../components/PackageCard/PackageCard';
import {packages} from '../data/packages';
export default function Packages(){
 const [q]=useSearchParams(),dest=q.get('dest'),list=dest?packages.filter(p=>p.destination===dest):packages;
 return(<section className="section" style={{paddingTop:110}}><div className="container"><h1>Travel packages</h1>
 {list.length?<div className="grid">{list.map(p=><PackageCard key={p.id} p={p}/>)}</div>:<div className="state"><p>No packages for this destination yet.</p><Link className="btn" to="/packages">View all packages</Link></div>}</div></section>);
}
