import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { getPopularRecipes } from '../gql/index'
import Image from 'next/image'
import axios from 'axios'
import Loader from '../components/Loader'
import { useSession, signIn, signOut } from 'next-auth/client'
export default function Home() {
  const [session] = useSession()

  const { loading, error, data } = useQuery(getPopularRecipes)
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let file =  e.currentTarget.querySelector<HTMLInputElement>('#file').files[0]
    if(!file) {
      return
    }
    const data = new FormData()
    console.log(data)
    data.append('file', file)
    try {
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      })

      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Loader />
  }
  if (error) {
    console.log(error)
    return <h1>Error!</h1>
  }
  return (
    <div>
      <h3>Welcome to recipe app</h3>
      {!session &&
        <button className='btn-primary' onClick={() => signIn()}>Sign in</button>
      }

      {session &&
        <div style={{ maxWidth: 300, padding: 16, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        Signed in as {session.user.email}
        {Object.entries(session.user).map(([key, value]) => {
          if (key !== 'image') {
            return <div className='text-blue-800'>{key}: {value}</div>
          }
          return <Image src={value} width='60' height='60' />
        }
        )}

        <button className='border rounded p-2' onClick={() => signOut()}>Sign out</button>
        </ div>
      }
      { data && data.getPopularRecipes && data.getPopularRecipes.map(recipe => ( 
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
          <Image src={recipe.image} width='60' height='60' />
        </div>
      ))}
    </div>
  )
}
