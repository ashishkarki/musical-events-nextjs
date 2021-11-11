import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const EventPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout>
      <h3>Slug-ID event page</h3>
      <p>slug: {slug}</p>
    </Layout>
  )
}

export default EventPage
