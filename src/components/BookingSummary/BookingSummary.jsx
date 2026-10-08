import {packages} from '../../data/packages';
import {inr,calcTotal} from '../../utils/pricing';
import './BookingSummary.css';
export default function BookingSummary({data}){
 const p=packages.find(x=>x.id===data.packageId),t=calcTotal(data);
 if(!p) return <div className="state">Choose a package to see your summary.</div>;
 const rows=[['Package',p.title],['Dates',`${data.from||'—'} to ${data.to||'—'}`],['Travelers',`${data.adults} adults, ${data.children} children`],['Extras',data.extras.length||'None'],['Base price',inr(t.base)],['Extras total',inr(t.extras)],['Taxes',inr(t.taxes)],['Discount','-'+inr(t.discount)]];
 return(<aside className="bsum" aria-label="Booking summary"><img src={p.image} alt={p.title} width="600" height="300" loading="lazy"/>
  <dl>{rows.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p className="tot">Total <strong>{inr(t.total)}</strong></p></aside>);
}
