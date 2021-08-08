import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { NextSeo } from 'next-seo';
import Head from 'next/head'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo'
function MyApp({ Component, ...pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Layout>
          {pageProps.meta && (
            <>
              <Head>
                <title>{pageProps.meta.title}</title>
                <meta name="description" content={pageProps.meta.description} />

                <NextSeo openGraph={pageProps.meta} />
              </Head>
            </>
          )}
          <Component {...({...pageProps})} />
        </Layout>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
