import EventItem from '../components/EventItem'
import MyLayout from '../components/MyLayout'
import { API_URL } from '../config'

// Get the events from the API - only during build time with getStaticProps
// but check every 1 sec if the events have changed
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const myEvents = await res.json()
  console.log('home.js events:', myEvents)

  return {
    props: {
      myEvents: myEvents.events,
    },
    revalidate: 1, // check if the data is still the same every 1 second, if not, re-fetch
  }
}

function IndexPage({ myEvents }) {
  return (
    <MyLayout>
      <h1>Upcoming Events</h1>

      {myEvents.length === 0 && <h3>No events to show</h3>}

      {myEvents.map((myEvent) => (
        <EventItem key={myEvent.id} myEvent={myEvent} />
      ))}
    </MyLayout>
  )
}

export default IndexPage
