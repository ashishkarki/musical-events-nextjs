import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaTimes } from 'react-icons/fa'

import styles from '@/styles/Search.module.css'

function Search() {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)

    // reset the search input
    // setTerm('')
  }

  const handleClearSearch = (e) => {
    e.preventDefault()
    router.replace('/events')

    // reset the search input
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for an event"
        />
      </form>

      <button type="submit" onClick={handleClearSearch} className="btn">
        <FaTimes className={styles.close} />
      </button>
    </div>
  )
}

export default Search
