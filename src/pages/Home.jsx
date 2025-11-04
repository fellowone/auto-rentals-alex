import React, { useState, useEffect } from 'react'
import CarCard from '../components/CarCard'
import SearchBar from '../components/SearchBar'
import BookingModal from '../components/BookingModal'
import carsData from '../data/cars.json'

export default function Home({favorites, toggleFav}){
  const [q, setQ] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [modalCar, setModalCar] = useState(null)
  const [sortBy, setSortBy] = useState('none')
  const [bookings, setBookings] = useState(()=>{ try{return JSON.parse(localStorage.getItem('bookings')||'[]')}catch{return[]}})

  useEffect(()=> localStorage.setItem('bookings', JSON.stringify(bookings)), [bookings])

  let filtered = carsData.filter(c=>{
    const match = (c.name + ' ' + c.type).toLowerCase().includes(q.toLowerCase())
    const priceOk = maxPrice ? c.price <= Number(maxPrice) : true
    return match && priceOk
  })

  if(sortBy === 'price_asc') filtered = filtered.sort((a,b)=>a.price - b.price)
  else if(sortBy === 'price_desc') filtered = filtered.sort((a,b)=>b.price - a.price)
  else if(sortBy === 'popularity') filtered = filtered.sort((a,b)=>(b.popularity||0) - (a.popularity||0))

  return (
    <div>
      <h1>Available Cars</h1>

      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <SearchBar q={q} setQ={setQ} minPrice={maxPrice} setMinPrice={setMaxPrice} />
        <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
          <label className="muted">Sort:</label>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="none">None</option>
            <option value="price_asc">Price — Low to High</option>
            <option value="price_desc">Price — High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filtered.map(car=>(
          <CarCard key={car.id} car={car} onToggle={toggleFav} isFav={favorites.some(f=>f.id===car.id)} onBook={(c)=>setModalCar(c)} />
        ))}
      </div>

      {filtered.length===0 && <p className="muted">No cars match your search.</p>}

      {modalCar && <BookingModal car={modalCar} onClose={()=>setModalCar(null)} onBook={(b)=>setBookings(prev=>[b,...prev])} />}
    </div>
  )
}
