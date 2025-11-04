import React from 'react'
import { useParams, Link } from 'react-router-dom'
import carsData from '../data/cars.json'

export default function CarDetails(){
  const { id } = useParams()
  const car = carsData.find(c => String(c.id) === String(id))
  if(!car) return <div><p className="muted">Car not found.</p></div>

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{car.name}</h1>
      <img src={car.image} alt={car.name} className="card-img" onError={(e)=>{e.target.onerror=null; e.target.src=car.fallbackImage || ''}} />
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Seats:</strong> {car.seats}</p>
      <p><strong>Price:</strong> ₹{car.price}/day</p>
      <p><strong>Availability:</strong> {car.available ? 'Available' : 'Not available'}</p>
      <p><strong>Popularity:</strong> {car.popularity || '—'}</p>
    </div>
  )
}
