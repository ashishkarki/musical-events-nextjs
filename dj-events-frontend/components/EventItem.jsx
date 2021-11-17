import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/EventItem.module.css'

function EventItem({ myEvent }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={myEvent.image ? myEvent.image : '/images/event-default.png'}
          alt={myEvent.title}
          width={170}
          height={100}
        />
      </div>
    </div>
  )
}

export default EventItem
