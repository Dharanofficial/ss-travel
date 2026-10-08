import {useState,useEffect} from 'react';
import {testimonials} from '../../data/testimonials';
import './Testimonial.css';
export default function Testimonial(){
 const [i,setI]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%testimonials.length),6000);return()=>clearInterval(t)},[]);
 const t=testimonials[i];
 return(<section className="testi" aria-roledescription="carousel" aria-label="Traveler testimonials"><figure key={t.id}>
  <img src={t.photo} alt={`Portrait of ${t.name}`} width="72" height="72" loading="lazy"/>
  <blockquote>“{t.quote}”</blockquote><figcaption>— {t.name}</figcaption></figure>
  <div className="dots">{testimonials.map((x,n)=><button key={x.id} aria-label={`Show testimonial ${n+1}`} aria-current={n===i} onClick={()=>setI(n)}/>)}</div></section>);
}
