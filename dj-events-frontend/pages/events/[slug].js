import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

import { useRouter } from 'next/router'
import superjson from 'superjson'

import MyLayout from '@/components/MyLayout'
import { API_URL } from '../../config'
import styles from '@/styles/Event.module.css'

export async function getStaticProps({ params }) {
  console.log('[slug] page, params:', JSON.stringify(params))

  const res = await fetch(`${API_URL}/api/events/${params.slug}`)
  const myEventFromApi = await res.json()

  return {
    props: {
      myEvent: JSON.parse(JSON.stringify(myEventFromApi)),
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const myEventsFromApi = await res.json()

  const tempJson = superjson.parse(superjson.stringify(myEventsFromApi))
  console.log('getStaticPaths events:', tempJson)

  const paths = tempJson.events.map((event) => {
    return {
      params: {
        slug: event.slug,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

const EventPage = ({ myEvent }) => {
  const router = useRouter()
  const { slug } = router.query

  const deleteEvent = async () => {
    const res = await fetch(`${API_URL}/api/events/${slug}`, {
      method: 'DELETE',
    })
    const myEventFromApi = await res.json()

    console.log('deleteEvent myEventFromApi:', myEventFromApi)
    router.push('/events')
  }

  return (
    <MyLayout>
      {/* <h3>Slug-ID event page</h3>
      <p>slug: {slug}</p>
      <p>event name: {myEvent.name}</p> */}
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${myEvent.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {myEvent.date} at {myEvent.time}
        </span>
        <h1>{myEvent.name}</h1>
        {myEvent.image && (
          <div className={styles.image}>
            <Image
              src={myEvent.image}
              alt={myEvent.name}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{myEvent.performers}</p>

        <h3>Description:</h3>
        <p>{myEvent.description}</p>

        <h3>Venue: {myEvent.venue}</h3>
        <p>{myEvent.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </div>
    </MyLayout>
  )
}

export default EventPage
