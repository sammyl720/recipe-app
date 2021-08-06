import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo'
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;0,700;0,800;1,200;1,400&family=Sintony:wght@400;700&display=swap" rel="stylesheet" />
        <title>Recipe App</title>
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
