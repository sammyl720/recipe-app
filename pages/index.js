import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/client'
export default function Home() {
  const [session, loading] = useSession()
  return (
    <div className={styles.container}>
      <h3>Welcome to recipe app</h3>
      {!session &&
        <button onClick={() => signIn()}>Sign in</button>
      }

      {session &&
        <div style={{ maxWidth: 300, padding: 16, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        Signed in as {session.user.email}
        {Object.entries(session.user).map(([key, value]) => {
          if (key !== 'image') {
            return <div>{key}: {value}</div>
          }
          return <img src={value} width='60' height='60' />
        }
        )}

        <button onClick={() => signOut()}>Sign out</button>
        </ div>
      }
    </div>
  )
}
