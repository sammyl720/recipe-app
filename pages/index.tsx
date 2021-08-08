import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { getPopularRecipes } from '../gql/index'
import Image from 'next/image'
import axios from 'axios'
import Loader from '../components/Loader'
import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'
export default function Home() {
  const [session] = useSession()

  const { loading, error, data } = useQuery(getPopularRecipes)
  

  if (loading) {
    return <Loader />
  }
  if (error) {
    console.log(error)
    return <h1>Error!</h1>
  }
  return (
    <div className='bg-gray-100 w-full mt-4 flex flex-col'>
      <h1 className='leading-8 font-extrabold text-2xl'>Welcome to recipe app</h1>
      {!session &&
        <button className='btn-primary' onClick={() => signIn()}>Sign in</button>
      }

      {session &&
        <div className='my-4'>
          <Link href='/recipes/create'>
            <a>
            <button className='btn-primary'>Create recipe</button>
            </a>
          </Link>
        </ div>
      }
      { data && data.getPopularRecipes && data.getPopularRecipes.map(recipe => ( 
        <Link href={`/recipes/${recipe.slug}`}>
          <a>
          <div key={recipe.id}>
            <h4>{recipe.title}</h4>
            <p>{recipe.description}</p>
            <Image src={recipe.image} width='60' height='60' />
          </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
