// API layer: swap these for real endpoints without touching the UI.
const KEY='ss-travel-bookings';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}};
export const getBookings=async()=>read();
export async function createBooking(b){
 const rec={...b,id:'SST'+Date.now().toString().slice(-7),status:'Confirmed',payment:'Paid'};
 localStorage.setItem(KEY,JSON.stringify([rec,...read()]));return rec;
}
