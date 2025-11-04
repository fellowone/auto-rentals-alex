import React, {useState, useEffect} from 'react'

export default function Bookings(){
  const [bookings, setBookings] = useState(()=>{ try{return JSON.parse(localStorage.getItem('bookings')||'[]')}catch{return[]}})

  useEffect(()=> localStorage.setItem('bookings', JSON.stringify(bookings)), [bookings])

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.length===0 ? <p className="muted">No bookings yet — book a car from the home page.</p> :
        <div className="grid">
          {bookings.map((b, i)=>(
            <div key={i} className="card">
              {b.image && <img src={b.image} alt={b.carName} className="card-img" onError={(e)=>{e.target.onerror=null; e.target.src=b.fallbackImage || ''}} />}
              <div className="card-body">
                <h3>{b.carName}</h3>
                <p className="muted">Booked by {b.name} • {b.days} days • ₹{b.price}/day</p>
                <small className="muted">On {new Date(b.date).toLocaleString()}</small>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
