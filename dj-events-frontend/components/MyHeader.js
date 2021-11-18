import Link from 'next/link'

import styles from '@/styles/MyHeader.module.css'

function MyHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Musical Events</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>All Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MyHeader
