import Link from 'next/link'
import styles from '@/styles/MyFooter.module.css'

function MyFooter() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Musical Events - 2021 and beyond</p>

      <p>
        <Link href="/about">
          <a>About this Project</a>
        </Link>
      </p>
    </footer>
  )
}

export default MyFooter
