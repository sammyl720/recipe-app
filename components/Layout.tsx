import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Loader from './Loader'
import { useSession } from 'next-auth/client'

const Layout = ({ children }) => {
  const [ _, loading] = useSession()

  return (
    <>
      <Head>
        <meta property='fb:app_id' name='fb:app_id' content={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID} />
      </Head>
      <Navbar />
      {loading ? <Loader /> : (
      <div className="container mx-auto max-w-4xl">
        { children }
      </div>
      )}
    </>
  )
}

export default Layout