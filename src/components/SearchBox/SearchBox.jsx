import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {destinations} from '../../data/destinations';
import './SearchBox.css';
const types=['Honeymoon','Family','Adventure','Luxury','Solo','Group'];
export default function SearchBox(){
 const nav=useNavigate(),[f,setF]=useState({destination:'',from:'',to:'',travelers:2,type:'Adventure'});
 const set=k=>e=>setF({...f,[k]:e.target.value});
 return(<form className="search" role="search" onSubmit={e=>{e.preventDefault();nav('/packages?dest='+f.destination)}}>
  <label>Destination<select value={f.destination} onChange={set('destination')}><option value="">Anywhere</option>{destinations.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
  <label>Departure<input type="date" value={f.from} onChange={set('from')}/></label>
  <label>Return<input type="date" value={f.to} min={f.from} onChange={set('to')}/></label>
  <label>Travelers<input type="number" min="1" max="20" value={f.travelers} onChange={set('travelers')}/></label>
  <label>Travel type<select value={f.type} onChange={set('type')}>{types.map(t=><option key={t}>{t}</option>)}</select></label>
  <button className="btn">Search Trips</button></form>);
}
