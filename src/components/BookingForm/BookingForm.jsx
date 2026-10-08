import {packages,extras} from '../../data/packages';
import {inr} from '../../utils/pricing';
import './BookingForm.css';
const pay=['Card','UPI','Net Banking','Wallet'];
export default function BookingForm({step,data,setData,errors}){
 const set=k=>e=>setData({...data,[k]:e.target.value});
 const num=k=>e=>setData({...data,[k]:Math.max(0,Number(e.target.value))});
 const err=k=>errors[k]&&<span role="alert" className="err">{errors[k]}</span>;
 const toggle=id=>setData({...data,extras:data.extras.includes(id)?data.extras.filter(x=>x!==id):[...data.extras,id]});
 return(<div className="bform" key={step}>
 {step===1&&<><h2>Choose your trip</h2>
  <label>Package<select value={data.packageId} onChange={set('packageId')}><option value="">Select a package</option>{packages.map(p=><option key={p.id} value={p.id}>{p.title} ({p.duration})</option>)}</select>{err('packageId')}</label>
  <label>Departure<input type="date" value={data.from} onChange={set('from')}/>{err('from')}</label>
  <label>Return<input type="date" min={data.from} value={data.to} onChange={set('to')}/>{err('to')}</label>
  <label>Adults<input type="number" min="1" value={data.adults} onChange={num('adults')}/></label>
  <label>Children<input type="number" min="0" value={data.children} onChange={num('children')}/></label>
  <label>Room type<select value={data.room} onChange={set('room')}><option>Standard</option><option>Deluxe</option><option>Suite</option></select></label></>}
 {step===2&&<><h2>Traveler details</h2>
  <label>Full name<input value={data.name} onChange={set('name')} autoComplete="name"/>{err('name')}</label>
  <label>Email<input type="email" value={data.email} onChange={set('email')} autoComplete="email"/>{err('email')}</label>
  <label>Phone<input type="tel" value={data.phone} onChange={set('phone')} autoComplete="tel"/>{err('phone')}</label>
  <label>Country<input value={data.country} onChange={set('country')}/></label>
  <label className="wide">Special requests<textarea rows="3" value={data.requests} onChange={set('requests')}/></label></>}
 {step===3&&<><h2>Travel extras</h2><fieldset className="wide"><legend className="sr">Extras</legend>{extras.map(x=><label key={x.id} className="chk"><input type="checkbox" checked={data.extras.includes(x.id)} onChange={()=>toggle(x.id)}/>{x.label} <em>+{inr(x.price)} per person</em></label>)}</fieldset></>}
 {step===4&&<><h2>Review your booking</h2><p className="wide">Check the summary on the right, then continue to payment.</p></>}
 {step===5&&<><h2>Payment</h2><fieldset className="wide"><legend className="sr">Payment method</legend>{pay.map(m=><label key={m} className="chk"><input type="radio" name="pay" checked={data.payMethod===m} onChange={()=>setData({...data,payMethod:m})}/>{m}</label>)}</fieldset>
  {data.payMethod==='Card'&&<><label>Card number<input inputMode="numeric" placeholder="1234 5678 9012 3456"/></label><label>Expiry<input placeholder="MM/YY"/></label></>}
  {data.payMethod==='UPI'&&<label>UPI ID<input placeholder="name@bank"/></label>}
  <p className="wide note">Payment UI only. Connect a payment gateway in services/bookingApi.js.</p></>}
 </div>);
}
