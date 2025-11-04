import React from 'react'
import CarCard from '../components/CarCard'

export default function Favorites({favorites, toggleFav}){
  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length===0 ? <p className="muted">No favorites yet — add some cars!</p> :
        <div className="grid">
          {favorites.map(car=>(
            <CarCard key={car.id} car={car} onToggle={toggleFav} isFav={true} />
          ))}
        </div>
      }
    </div>
  )
}
