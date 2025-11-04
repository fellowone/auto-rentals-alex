import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Bookings from './pages/Bookings'
import About from './pages/About'
import Contact from './pages/Contact'
import CarDetails from './pages/CarDetails'

export default function App(){
  const [favorites, setFavorites] = React.useState(()=>{
    try{ return JSON.parse(localStorage.getItem('favCars')||'[]') } catch { return [] }
  })
  React.useEffect(()=> localStorage.setItem('favCars', JSON.stringify(favorites)), [favorites])

  const toggleFav = (car)=> {
    setFavorites(prev=> {
      const exists = prev.find(c=>c.id===car.id)
      if(exists) return prev.filter(c=>c.id!==car.id)
      return [...prev, car]
    })
  }

  // simple theme persistence (keeps previous theme logic minimal)
  const [theme, setTheme] = React.useState(()=> localStorage.getItem('theme') || 'dark')
  React.useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme) }, [theme])

  return (
    <div className="app-root">
      <nav className="nav">
        <Link to="/" className="brand">AlexRentals</Link>
        <div>
          <Link to="/bookings" className="navlink">Bookings</Link>
          <Link to="/favorites" className="navlink">Favorites ({favorites.length})</Link>
          <Link to="/about" className="navlink">About</Link>
          <Link to="/contact" className="navlink">Contact</Link>
          <button onClick={()=>setTheme(prev=>prev==='dark'?'light':'dark')} className="navlink theme-btn" aria-label="Toggle theme">{theme==='dark'?'Dark':'Light'}</button>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} toggleFav={toggleFav} />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFav={toggleFav} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </main>

      <footer className="footer">© 2025 RentalCompany. All rights reserved.</footer>
    </div>
  )
}
