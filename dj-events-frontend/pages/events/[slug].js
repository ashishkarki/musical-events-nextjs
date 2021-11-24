import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

import { useRouter } from 'next/router'
import superjson from 'superjson'

import MyLayout from '@/components/MyLayout'
import { API_URL } from '../../config'
import styles from '@/styles/Event.module.css'
import { dateToLocalString } from '../../utils/utils_main'

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/events?slug=${params.slug}`)
  const myEventFromApi = await res.json()
  const stringifiedMyEvent = JSON.parse(JSON.stringify(myEventFromApi))
  console.log('[slug] page, myEventFromApi:', stringifiedMyEvent)

  return {
    props: {
      myEvent: stringifiedMyEvent[0],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const myEventsFromApi = await res.json()

  const tempJson = superjson.parse(superjson.stringify(myEventsFromApi))
  // console.log('[slug] page, getStaticPaths events:', tempJson)

  const paths = tempJson.map((event) => {
    return {
      params: {
        slug: event.slug,
      },
    }
  })
  console.log('[slug] page, getStaticPaths paths:', paths)

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
          {dateToLocalString(myEvent.date)} at {myEvent.time}
        </span>
        <h1>{myEvent.name}</h1>
        {myEvent.image && (
          <div className={styles.image}>
            <Image
              src={myEvent.image.formats.medium.url}
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
