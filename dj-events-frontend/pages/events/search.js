import MyLayout from '@/components/MyLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'
import EventItem from '../../components/EventItem'
import { API_URL } from '../../config'

export async function getServerSideProps({ query: { term } }) {
  const parameterizedQuery = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })
  // console.log('SearchPage, getServerSideProps - parameterizedQuery::', parameterizedQuery)

  const res = await fetch(`${API_URL}/events?${parameterizedQuery}`)
  const myEvents = await res.json()
  // console.log('home.js events:', myEvents)

  return {
    props: {
      myEvents,
    },
    //// revalidate: 1, // check if the data is still the same every 1 second, if not, re-fetch
  }
}

function SearchPage({ myEvents }) {
  const router = useRouter()

  return (
    <MyLayout title="Search Results">
      <Link href="/events">Go back to all Events</Link>

      <h1>Search Results for {router.query.term}</h1>

      {myEvents.length === 0 && <h3>No events to show</h3>}

      {myEvents.map((myEvent) => (
        <EventItem key={myEvent.id} myEvent={myEvent} />
      ))}
    </MyLayout>
  )
}

export default SearchPage
