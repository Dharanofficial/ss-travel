import {useState} from 'react';
export default function Contact(){
 const [sent,setSent]=useState(false);
 return(<section className="section" style={{paddingTop:110}}><div className="container" style={{maxWidth:560}}><h1>Contact us</h1>
 {sent?<div className="state" role="status">Thanks. Our team will reply within 24 hours.</div>:
 <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:'grid',gap:14}}><label>Name<input required/></label><label>Email<input type="email" required/></label><label>Message<textarea rows="4" required/></label><button className="btn">Send message</button></form>}</div></section>);
}
