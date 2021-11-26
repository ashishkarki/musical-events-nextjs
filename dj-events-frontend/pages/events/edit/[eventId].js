import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaImage } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

import MyLayout from '@/components/MyLayout'
import { API_URL } from '@/config/index'

import styles from '@/styles/Form.module.css'
import { ToastHelper } from '@/utils/toast_helper'
import {
  dateToISOString,
  dateToLocalString,
  dateToMomentFormat,
  logger,
} from '@/utils/utils_main'
import MyModal from '@/components/MyModal'
import ImageUpload from '@/components/ImageUpload'

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

function EditEventPage({ event: myEvent }) {
  const [toast, setToast] = useState({
    message: 'Type the fields and press the button',
    type: 'info',
  })
  const [addEvent, setAddEvent] = useState({
    name: myEvent.name,
    description: myEvent.description,
    performers: myEvent.performers,
    venue: myEvent.venue,
    address: myEvent.address,
    date: dateToLocalString(myEvent.date),
    time: myEvent.time,
    // image: 'dummy image name',
  })
  const [imgPreview, setImgPreview] = useState(
    myEvent.image ? myEvent.image.formats.thumbnail.url : null,
  )
  const [showModal, setShowModal] = useState(false)

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

    const res = await fetch(`${API_URL}/events/${myEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempEventWithMassagedData),
    })
    // logger('EditEventPage, handleAddSubmit - res::', res)

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

  const imgUploadDone = async (eventId) => {
    const res = await fetch(`${API_URL}/events/${eventId}`)
    const event = await res.json()

    setImgPreview(event.image.formats.thumbnail.url) // update the preview image
    setShowModal(false) // close the modal
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
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <MyModal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={myEvent.id}
          uploadDone={(eventId) => imgUploadDone(eventId)}
        />
      </MyModal>
    </MyLayout>
  )
}

export default EditEventPage
