import MyLayout from '@/components/MyLayout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { EVENTS_PER_PAGE } from '@/utils/constants'
import MyPagination from '@/components/MyPagination'

//export async function getStaticProps() {
export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate the index of the first event to display on this page
  const startIdxOfEventsToShow = +page === 1 ? 0 : (+page - 1) * EVENTS_PER_PAGE

  // fetch total/count of events
  const resTotalEvents = await fetch(`${API_URL}/events/count`)
  const totalEvents = await resTotalEvents.json()

  // fetch all events from the API
  const resEvents = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${EVENTS_PER_PAGE}&_start=${startIdxOfEventsToShow}`,
  )
  const myEvents = await resEvents.json()

  return {
    props: {
      myEvents,
      page: +page, // page number that I want to show e.g. local:3000/events?page=2
      total: totalEvents, // total count of events in the API
    },
    ////revalidate: 1, // check if the data is still the same every 1 second, if not, re-fetch - only happens during production
  }
}

function EventsPage({ myEvents, page, total }) {
  return (
    <MyLayout>
      <h1>Events</h1>

      {myEvents.length === 0 && <h3>No events to show</h3>}

      {myEvents.map((myEvent) => (
        <EventItem key={myEvent.id} myEvent={myEvent} />
      ))}

      <MyPagination page={page} total={total} />
    </MyLayout>
  )
}

export default EventsPage
