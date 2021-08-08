import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo'
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
