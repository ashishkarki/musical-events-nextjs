import Link from 'next/link'

import { EVENTS_PER_PAGE } from '@/utils/constants'

function MyPagination({ page, total }) {
  // this gives us the last page number
  const pageCount = Math.ceil(total / EVENTS_PER_PAGE)

  return (
    <>
      {
        // show pagination only if there are more than one page
        page > 1 && (
          <Link href={`/events?page=${page - 1}`}>
            <a className="btn-secondary">&lt; Prev</a>
          </Link>
        )
      }

      {page < pageCount && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next &gt;</a>
        </Link>
      )}
    </>
  )
}

export default MyPagination
