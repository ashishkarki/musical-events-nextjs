import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import MyLayout from '../../components/MyLayout'
import { API_URL } from '@/config/index'

import styles from '@/styles/Add.module.css'

function AddPage() {
  const [addEvent, setAddEvent] = useState({
    name: '',
    description: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    image: '',
  })
  const router = useRouter()

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addEvent),
    })
    const data = await res.json()

    router.push('/events')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAddEvent({
      ...addEvent,
      [name]: value,
    })
  }

  return (
    <MyLayout title="Add new Event" description="You can add new events here">
      <Link href="/events">Go back to all Events</Link>
      <h2>Add a new Event</h2>

      <form onSubmit={handleAddSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={addEvent.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={addEvent.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={addEvent.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={addEvent.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={addEvent.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={addEvent.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={addEvent.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </MyLayout>
  )
}

export default AddPage
