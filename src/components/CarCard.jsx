import React from 'react'
import { Link } from 'react-router-dom'

export default function CarCard({car, onToggle, isFav, onBook}){
  return (
    <div className="card">
      <img src={car.image} alt={car.name} className="card-img" onError={(e)=>{e.target.onerror=null; e.target.src=car.fallbackImage || ''}} />
      <div className="card-body">
        <h3>{car.name}</h3>
        <p className="muted">{car.type} • {car.seats} seats</p>
        <p className="muted">{car.available ? 'Available' : 'Not available'}</p>
        <div className="card-actions">
          <strong>₹{car.price}/day</strong>
          <div>
            <button onClick={()=>onBook && onBook(car)} className="fav-btn">Book</button>
            <button onClick={()=>onToggle(car)} className={"fav-btn "+(isFav? "active":"")} style={{marginLeft:8}}>
              {isFav? "♥":"♡"}
            </button>
          </div>
        </div>
        <div style={{marginTop:8}}><Link to={`/car/${car.id}`} className="navlink">View details</Link></div>
      </div>
    </div>
  )
}
