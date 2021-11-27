import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/EventItem.module.css'
import { dateToLocalString } from '@/utils/utils_main'

function EventItem({ myEvent }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            myEvent.image
              ? myEvent.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          alt={myEvent.title}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {dateToLocalString(myEvent.date)} at {myEvent.time}
        </span>
        <h3>{myEvent.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${myEvent.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem
