import React from 'react'

export default function SearchBar({q, setQ, minPrice, setMinPrice}){
  return (
    <div className="searchbar">
      <input placeholder="Search by name or type..." value={q} onChange={e=>setQ(e.target.value)} />
      <input type="number" min="0" placeholder="Max price/day" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
    </div>
  )
}
