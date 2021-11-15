import Head from 'next/head'

import styles from '../styles/MyLayout.module.css'
import MyFooter from './MyFooter'
import MyHeader from './MyHeader'

const MyLayout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <MyHeader />

      <div className={styles.container}>{children}</div>

      <MyFooter />
    </div>
  )
}

MyLayout.defaultProps = {
  title: 'Music Events | Find great parties',
  keywords: 'music, events, parties',
  description: 'Find the latest musical events and enjoy',
}

export default MyLayout
