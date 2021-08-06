import React from 'react'
import Navbar from './Navbar'
import Loader from './Loader'
import { useSession } from 'next-auth/client'

const Layout = ({ children }) => {
  const [ _, loading] = useSession()

  return (
    <>
      <Navbar />
      {loading ? <Loader /> : (
      <div className="container mx-auto max-w-2xl flex flex-col p-2 items-center justify-center">
        { children }
      </div>
      )}
    </>
  )
}

export default Layout