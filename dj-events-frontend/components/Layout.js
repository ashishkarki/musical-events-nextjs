import Head from 'next/head'

import styles from '../styles/Layout.module.css'

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <div className={styles.container}>{children}</div>
    </div>
  )
}

Layout.defaultProps = {
  title: 'Music Events | Find great parties',
  keywords: 'music, events, parties',
  description: 'Find the latest musical events and enjoy',
}

export default Layout
