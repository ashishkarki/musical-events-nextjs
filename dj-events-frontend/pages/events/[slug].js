import { useRouter } from 'next/router'
import MyLayout from '@/components/MyLayout'

const EventPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <MyLayout>
      <h3>Slug-ID event page</h3>
      <p>slug: {slug}</p>
    </MyLayout>
  )
}

export default EventPage
