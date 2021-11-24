import Link from 'next/link'

import styles from '@/styles/MyHeader.module.css'
import Search from './Search'

function MyHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Musical Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>All Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add">
              <a>Add new Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MyHeader
