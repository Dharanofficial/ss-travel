import {useState} from 'react';
import {useSearchParams,Link} from 'react-router-dom';
import BookingForm from '../components/BookingForm/BookingForm';
import BookingSummary from '../components/BookingSummary/BookingSummary';
import {createBooking} from '../services/bookingApi';
import {packages} from '../data/packages';
import {calcTotal,inr} from '../utils/pricing';
const titles=['Trip','Travelers','Extras','Summary','Payment'];
function validate(step,d){const e={};
 if(step===1){if(!d.packageId)e.packageId='Select a package.';if(!d.from)e.from='Pick a departure date.';if(!d.to)e.to='Pick a return date.';}
 if(step===2){if(!d.name.trim())e.name='Enter your full name.';if(!/\S+@\S+\.\S+/.test(d.email))e.email='Enter a valid email.';if(d.phone.replace(/\D/g,'').length<8)e.phone='Enter a valid phone number.';}
 return e;}
export default function Booking(){
 const [q]=useSearchParams();
 const [step,setStep]=useState(1),[errors,setErrors]=useState({}),[loading,setLoading]=useState(false),[fail,setFail]=useState(''),[done,setDone]=useState(null);
 const [data,setData]=useState({packageId:q.get('package')||'',from:'',to:'',adults:2,children:0,room:'Standard',name:'',email:'',phone:'',country:'India',requests:'',extras:[],payMethod:'Card'});
 const next=()=>{const e=validate(step,data);setErrors(e);if(!Object.keys(e).length)setStep(step+1)};
 async function pay(){setLoading(true);setFail('');
  try{setDone(await createBooking({...data,destination:packages.find(p=>p.id===data.packageId).destination,total:calcTotal(data).total}))}
  catch{setFail('Payment could not be completed. Check your details and try again.')}finally{setLoading(false)}}
 if(done){const p=packages.find(x=>x.id===done.packageId);return(<section className="section" style={{paddingTop:110}}><div className="container state"><h1>Booking confirmed</h1><p>Your trip has been successfully booked!</p>
  <p><strong>{done.id}</strong> · {p.title} · {done.from} to {done.to}<br/>{done.adults+done.children} travelers · Payment: {done.payment} · {inr(done.total)}</p>
  <Link to="/my-bookings" className="btn">View My Booking</Link> <button className="btn dark" onClick={()=>window.print()}>Download Invoice</button></div></section>)}
 return(<section className="section" style={{paddingTop:110}}><div className="container"><h1>Book your trip</h1>
  <ol aria-label="Progress" style={{display:'flex',gap:12,listStyle:'none',padding:0,flexWrap:'wrap'}}>{titles.map((t,i)=><li key={t} aria-current={step===i+1?'step':undefined} style={{fontWeight:step===i+1?700:400,color:step>=i+1?'var(--sky)':'#8a99ab'}}>{i+1}. {t}</li>)}</ol>
  <div style={{display:'grid',gridTemplateColumns:'minmax(0,2fr) minmax(0,1fr)',gap:28}} className="bk-grid">
   <div><BookingForm step={step} data={data} setData={setData} errors={errors}/>{fail&&<p role="alert" className="err">{fail}</p>}
    <div style={{display:'flex',gap:12,marginTop:20}}>{step>1&&<button className="btn ghost dark" style={{color:'var(--navy)',borderColor:'var(--navy)'}} onClick={()=>setStep(step-1)}>Back</button>}
     {step<5?<button className="btn" onClick={next}>{step===4?'Proceed to Payment':'Continue'}</button>:<button className="btn" disabled={loading} onClick={pay}>{loading?'Processing…':'Confirm & Pay'}</button>}</div></div>
   <BookingSummary data={data}/></div>
  <style>{`@media(max-width:860px){.bk-grid{grid-template-columns:1fr!important}}`}</style></div></section>);
}
