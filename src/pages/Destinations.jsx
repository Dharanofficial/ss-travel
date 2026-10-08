import DestinationCard from '../components/DestinationCard/DestinationCard';
import {destinations} from '../data/destinations';
export default function Destinations(){return(<section className="section" style={{paddingTop:110}}><div className="container"><h1>Destinations</h1>{destinations.length?<div className="grid">{destinations.map(d=><DestinationCard key={d.id} d={d}/>)}</div>:<div className="state">No destinations available.</div>}</div></section>)}
