import React from 'react'
import { useSession, signOut } from 'next-auth/client';
import { useQuery } from '@apollo/client'
import { me } from '../gql';
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const dashboard = () => {
  
  const [session] = useSession();
  const router = useRouter();
  if(!session) {
    router.push('/');
  }
  useEffect(() => {
  }, []);

  const { loading, error, data } = useQuery(me);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }

  return (
    <div className='mt-2 p-2'>
      <h1 className='font-extrabold text-4xl'>Dashboard</h1>
      <hr className='my-4' />

      <h1 className='mt-4 font-bold text-2xl'>My Recipes</h1>
      <div className='flex w-full gap-4 overflow-x-scroll bordered bg-scroll py-2'>

        {data.me.recipes.map(recipe => (
          <Link href={`/recipes/${recipe.slug}`}>
            <a>
            <div className='flex flex-col rounded shadow bg-red-100 bg-opacity-20 p-2 max-w-xs h-full' key={recipe.id}>
              <Image className='object-cover w-full h-auto rounded' src={recipe.image.secure_url} width={recipe.image.width} height={recipe.image.height} alt={recipe.title} objectFit='cover' />
              <h3 className='font-semibold my-2 text-2xl leading-10'>{recipe.title}</h3>
              <p>{recipe.description.length > 40 ? recipe.description.substr(0,40) + '...' : recipe.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className='my-2 p-2'>
          <Link href='/recipes/create'>
            <a>
            <button className='btn-primary'>Create recipe</button>
            </a>
          </Link>
        </ div>
      <hr className='my-4' />
      <h1 className='mt-4 font-bold text-2xl'>My Saved Recipes</h1>
      <div className='flex w-full gap-4 overflow-x-scroll bordered bg-scroll py-2 '>

        {data.me.savedRecipes.map(recipe => (
          <Link href={`/recipes/${recipe.slug}`}>
            <a>
            <div className='flex flex-col rounded shadow bg-red-100 bg-opacity-20 p-2 max-w-xs h-full' key={recipe.id}>
              <Image className='object-cover w-full h-auto rounded' src={recipe.image.secure_url} width={recipe.image.width} height={recipe.image.height} alt={recipe.title} objectFit='cover' />
              <h3 className='font-semibold my-2 text-2xl leading-10'>{recipe.title}</h3>
              <p>{recipe.description.length > 40 ? recipe.description.substr(0,40) + '...' : recipe.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <hr className='my-4' />
      <button className="btn-danger" onClick={() => {
        signOut()
        router.push('/');
      }}>Signout</button>
    </div>
  )
}

export default dashboard
