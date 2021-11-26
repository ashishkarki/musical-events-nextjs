import { FaTimes } from 'react-icons/fa'
import ReactDOM from 'react-dom'

import styles from '@/styles/Modal.module.css'
import { useEffect, useState } from 'react'
import { logger } from '../utils/utils_main'

function MyModal({ show, onClose, children, title, showFooter = false }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    setIsBrowser(true)
    // }
  }, [])

  const handleClose = (event) => {
    event.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>

        {title && <div>{title}</div>}

        <div className={styles.body}>{children}</div>

        {showFooter && (
          <div className={styles.footer}>
            <button
              type="submit"
              onClick={() => logger('clicked on upload button')}
              className="btn"
              style={{ width: '100%' }}
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null

  if (!isBrowser) {
    return null
  } else {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root'),
    )
  }
}

export default MyModal
