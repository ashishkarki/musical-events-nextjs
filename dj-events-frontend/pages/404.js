import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'

import MyLayout from '../components/MyLayout'
import styles from '../styles/404.module.css'

function NotFoundPage() {
  return (
    <MyLayout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here..</h4>

        <Link href="/">Go back to the homepage</Link>
      </div>
    </MyLayout>
  )
}

export default NotFoundPage
