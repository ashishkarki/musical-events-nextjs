import MyLayout from '@/components/MyLayout'
import EventItem from '../../components/EventItem'
import { API_URL } from '../../config'

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const myEvents = await res.json()
  // console.log('home.js events:', myEvents)

  return {
    props: {
      myEvents,
    },
    revalidate: 1, // check if the data is still the same every 1 second, if not, re-fetch
  }
}

function EventsPage({ myEvents }) {
  return (
    <MyLayout>
      <h1>Events</h1>

      {myEvents.length === 0 && <h3>No events to show</h3>}

      {myEvents.map((myEvent) => (
        <EventItem key={myEvent.id} myEvent={myEvent} />
      ))}
    </MyLayout>
  )
}

export default EventsPage
