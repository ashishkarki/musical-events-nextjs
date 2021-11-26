import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import MyLayout from '../../components/MyLayout'
import { API_URL } from '@/config/index'

import styles from '@/styles/Form.module.css'
import { ToastHelper } from '../../utils/toast_helper'
import { dateToISOString, logger } from '../../utils/utils_main'

function AddPage() {
  const [toast, setToast] = useState({
    message: 'Type the fields and press the button',
    type: 'info',
  })
  const [addEvent, setAddEvent] = useState({
    name: '',
    description: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    // image: 'dummy image name',
  })
  const router = useRouter()

  const handleAddSubmit = async (e) => {
    e.preventDefault()

    // validation
    const hasEmptyFields = Object.values(addEvent).some((value) => value === '')
    logger('AddPage, handleAddSubmit - hasEmptyFields::', hasEmptyFields)

    if (hasEmptyFields) {
      setToast({
        message: 'Please fill all the fields',
        type: 'error',
      })

      return
    }

    // post the new event
    const tempEventWithMassagedData = {
      ...addEvent,
      date: dateToISOString(addEvent.date),
    }
    logger(
      'AddPage, handleAddSubmit - tempEventWithMassagedData::',
      JSON.stringify(tempEventWithMassagedData),
    )
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempEventWithMassagedData),
    })
    logger('AddPage, handleAddSubmit - res::', res)

    if (!res.ok) {
      setToast({
        message: 'Something went wrong',
        type: 'error',
      })
      return
    }

    const newlyAddedEvent = await res.json()
    router.push(`/events/${newlyAddedEvent.slug}`)
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

      <ToastHelper message={toast.message} type={toast.type} />

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
              placeholder="Event Name"
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
              placeholder="Performers"
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
              placeholder="Venue"
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
              placeholder="Address"
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
              placeholder="Date"
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
              placeholder="Time"
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
            placeholder="Event Description"
          ></textarea>
        </div>

        <input
          type="submit"
          value="Add Event"
          className="btn"
          onClick={handleAddSubmit}
        />
      </form>
    </MyLayout>
  )
}

export default AddPage
