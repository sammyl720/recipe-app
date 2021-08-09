import { useQuery } from '@apollo/client'
import { getPopularRecipes } from '../gql/index'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'
export default function Home() {
  const [session] = useSession()
  const router = useRouter()
  const { loading, error, data } = useQuery(getPopularRecipes, {
    pollInterval: 4000,
    fetchPolicy: 'cache-and-network',
  })
  

  if (loading) {
    return <Loader />
  }
  if (error) {
    console.log(error)
    return <p>Error loading content. Try reloading page</p>
  }
  return (
    <div className=' w-full mt-4 flex flex-col p-2'>
      <header className='p-2 mb-4'>
      <h1 className='leading-8 font-extrabold text-2xl my-4'>Welcome to recipe app</h1>
      <p>
        Create and share your favorite recipes with eatable.recipes.
      </p>
      </header>

      <h3 className='ml-2 text-2xl leading-8 font-bold'>Popular recipes</h3>
      <div className='flex flex-wrap gap-2 p-2 w-full'>
      { data && data.getPopularRecipes && data.getPopularRecipes.map(recipe => ( 
        <Link href={`/recipes/${recipe.slug}`} key={recipe.id} >
          <a className='mx-auto'>
          <div className='p-4 rounded shadow max-w-sm flex flex-col gap-2 hover:shadow-lg bordered bg-opacity-30 bg-pink-100 w-sm h-full' >
            <h4 className='my-2 text-lg text-dark font-semibold'>{recipe.title}</h4>
            <p>{recipe.description.length > 40 ? 
              recipe.description.substring(0, 40) + '...' : recipe.description
            }</p>
            <Image className='object-cover w-full h-auto' src={recipe.image.secure_url} width={recipe.image.width} height={recipe.image.height} alt={recipe.title} objectFit='cover' />
          </div>
          </a>
        </Link>
      ))}
      </div>
      {session &&
        <div className='my-4 p-2'>
          <Link href='/recipes/create'>
            <a>
            <button className='btn-primary'>Create recipe</button>
            </a>
          </Link>
        </ div>
      }
    </div>
  )
}
