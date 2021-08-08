import Head from 'next/head'
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
    router.reload()
  }
  return (
    <div className=' w-full mt-4 flex flex-col p-2'>
      <Head>
        <title>Recipes</title>
        <meta name='description' content='Find and craete your favorite recipes on eatable.recipes' />
        <meta property='og:title' content='Recipes' />
        <meta property='og:description' content='Find and create your favorite recipes on eatable.recipes' />
        <meta property='og:image' content={process.env.NEXT_PUBLIC_URL + `/android-chrome-512x512.png`} />
        <meta property='og:image:width' content='512' />
        <meta property='og:image:height' content='512' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_URL} />
        <meta property='og:site_name' content='Recipes' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:locale:alternate' content='en_GB' />
        <meta property='og:locale:alternate' content='en_CA' />
        <meta property='og:locale:alternate' content='en_AU' />
        
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@EatableRecipes' />
        <meta name='twitter:creator' content='@EatableRecipes' />
        <meta name='twitter:title' content='Recipes' />
        <meta name='twitter:description' content='Find and create your favorite recipes on eatable.recipes' />
        <meta name='twitter:image' content={process.env.NEXT_PUBLIC_URL + `/android-chrome-512x512.png`} />
        <meta name='twitter:image:width' content='512' />
        <meta name='twitter:image:height' content='512' />
        <meta name='twitter:card' content='summary_large_image' />

        <meta name='theme-color' content='#ffffff' />
        <meta name='msapplication-TileColor' content='#ffffff' />
      </Head>
      <header className='p-2 mb-4'>
      <h1 className='leading-8 font-extrabold text-2xl my-4'>Welcome to recipe app</h1>
      <p>
        Create and share your favorite recipes with eatable.recipes.
      </p>
      </header>
      {!session &&
        <button className='btn-primary' onClick={() => signIn()}>Sign in</button>
      }

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
            <Image className='object-cover w-full h-auto' src={recipe.image.secure_url} width={recipe.image.width} height={recipe.image.height} objectFit='cover' />
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
