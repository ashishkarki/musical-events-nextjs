import styles from '@/styles/Form.module.css'
import { useState } from 'react'
import { API_URL } from '@/config/index'

function ImageUpload({ eventId, uploadDone }) {
  const [image, setImage] = useState(null)

  const handleImgUploadSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', eventId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      uploadDone(eventId)
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleImgUploadSubmit}>
        <div className={styles.file}>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  )
}

export default ImageUpload
