import {packages,extras} from '../data/packages';
export const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
export function calcTotal({packageId,adults=1,children=0,extras:sel=[]}){
 const p=packages.find(x=>x.id===packageId); if(!p) return {base:0,extras:0,taxes:0,discount:0,total:0};
 const base=p.price*adults+p.price*0.6*children;
 const ex=sel.reduce((s,id)=>s+(extras.find(e=>e.id===id)?.price||0),0)*(adults+children);
 const discount=adults+children>=4?(base+ex)*0.05:0;
 const taxes=(base+ex-discount)*0.05;
 return {base,extras:ex,taxes,discount,total:base+ex-discount+taxes};
}
