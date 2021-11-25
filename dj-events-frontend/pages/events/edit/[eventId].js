import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaImage } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

import MyLayout from '@/components/MyLayout'
import { API_URL } from '@/config/index'

import styles from '@/styles/Add.module.css'
import { ToastHelper } from '@/utils/toast_helper'
import {
  dateToISOString,
  dateToLocalString,
  dateToMomentFormat,
  logger,
} from '@/utils/utils_main'

export async function getServerSideProps(context) {
  const { eventId } = context.params
  const res = await fetch(`${API_URL}/events/${eventId}`)
  const event = await res.json()

  return {
    props: {
      event,
    },
  }
}

function EditEventPage({ event }) {
  const [toast, setToast] = useState({
    message: 'Type the fields and press the button',
    type: 'info',
  })
  const [addEvent, setAddEvent] = useState({
    name: event.name,
    description: event.description,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: dateToLocalString(event.date),
    time: event.time,
    // image: 'dummy image name',
  })
  const [imgPreview, setImgPreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null,
  )

  const router = useRouter()

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    // validation
    const hasEmptyFields = Object.values(addEvent).some((value) => value === '')
    logger('EditEventPage, handleAddSubmit - hasEmptyFields::', hasEmptyFields)

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
      'EditEventPage, handleAddSubmit - tempEventWithMassagedData::',
      JSON.stringify(tempEventWithMassagedData),
    )
    const res = await fetch(`${API_URL}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempEventWithMassagedData),
    })
    logger('EditEventPage, handleAddSubmit - res::', res)

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
    <MyLayout
      title="Edit Event"
      description="You can edit existing events here"
    >
      <Link href="/events">Go back to all Events</Link>
      <h2>edit a new Event</h2>

      <ToastHelper message={toast.message} type={toast.type} />

      <form onSubmit={handleEditSubmit} className={styles.form}>
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
              value={dateToMomentFormat(addEvent.date)}
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
          value="Update Event"
          className="btn"
          onClick={handleEditSubmit}
        />
      </form>

      <h2>Event Image</h2>
      {imgPreview ? (
        <Image
          src={imgPreview}
          height={100}
          width={100}
          alt="Event Image"
          className={styles.imagePreview}
        />
      ) : (
        <p>No image uploaded</p>
      )}

      <div>
        <button className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
    </MyLayout>
  )
}

export default EditEventPage
