import React, {useState} from 'react'

export default function BookingModal({car, onClose, onBook}){
  const [name, setName] = useState('')
  const [days, setDays] = useState(1)

  if(!car) return null

  const confirm = ()=>{
    const booking = {
      carId: car.id,
      carName: car.name,
      name,
      days,
      price: car.price,
      image: car.image,
      fallbackImage: car.fallbackImage || '',
      date: new Date().toISOString()
    }
    onBook(booking)
    // simple confirmation toast (alert)
    alert('Booking confirmed for ' + car.name + '!')
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Book {car.name}</h2>
        <label>
          Your name
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />
        </label>
        <label>
          Days
          <input type="number" min="1" value={days} onChange={e=>setDays(Number(e.target.value))} />
        </label>
        <div className="modal-actions">
          <button onClick={confirm}>Confirm Booking</button>
          <button onClick={onClose} className="muted">Cancel</button>
        </div>
      </div>
    </div>
  )
}
