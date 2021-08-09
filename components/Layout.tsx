import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router' 
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const { pathname } = useRouter()
  return (
    <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property='fb:app_id' name='fb:app_id' content={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID} />
          <link rel='canonical' href={process.env.NEXT_PUBLIC_URL} />
      {pathname === '/'  && (
        <>
          <meta property='og:url' content={process.env.NEXT_PUBLIC_URL} />

          <meta property='og:title' content='Recipes' />
          <meta property='og:type' content='website' />
          <meta property='og:image' content={process.env.NEXT_PUBLIC_URL + '/android-chrome-512x512.png'} />
          <meta property='og:image:width' content='512' />
          <meta property='og:image:height' content='512' />
          <meta property='og:description' content='Find and create your favorite recipes on eatable.recipes' />
          <meta property='og:locale' content='en_US' />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@eatablerecipes' />
          <meta name='twitter:creator' content='@eatablerecipes' />
          <meta name='twitter:title' content='Recipes' />
          <meta name='twitter:description' content='Find and create your favorite recipes on eatable.recipes' />
          <meta name='twitter:image' content={process.env.NEXT_PUBLIC_URL + '/android-chrome-512x512.png'} />
          <meta name='twitter:image:width' content='512' />
          <meta name='twitter:image:height' content='512' />
        </>
      )}
        </Head>
          
      <Navbar />
      <div className="container mx-auto max-w-4xl">
        { children }
      </div>
    </>
  )
}

export default Layout