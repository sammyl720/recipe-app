import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import client from '../../apollo/index'
import { getRecipeBySlug } from '../../gql'
const Recipe = ({ recipe }) => {
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
        <meta name="description" content={recipe.description} />
        <meta name="og:title" content={recipe.title} />
        <meta name="og:description" content={recipe.description} />
        <meta name="og:image" content={recipe.image} />
        <meta name="og:type" content="recipe" />
      </Head>
      <div className='flex flex-col border rounded p-2 mx-auto mt-2  max-w-3xl w-100'>
        <Image className='object-cover w-100 h-auto' src={recipe.image.secure_url} layout='intrinsic' alt={recipe.title} width={recipe.image.width} height={recipe.image.height} objectFit='cover' />
        <div className='flex flex-col p-2'>
          <h1 className='text-2xl font-bold mb-2'>{recipe.title}</h1>
          <p className='text-sm text-gray-700'>{recipe.description}</p>
        </div>
        {/* add recipe instructions */}
        <div className="flex flex-wrap gap-8 p-2 justify-between">
          <div className='flex flex-col'>
            <h2 className='text-2xl mb-2'>Instructions</h2>
            <ol className='list-reset'>
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className='mb-2'>{instruction}</li>
              ))}
            </ol>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl mb-2'>Ingredients</h2>
            <ul className='list-reset'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className='mb-2'>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap px-2 gap-2'>
          {recipe.category.map((category, index) => (
            <div key={index} className='rounded-2xl border px-3 py-1 cursor-pointer bg-dark text-light'>
              {category}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(ctx) {

  try {
    const { slug } = ctx.params
    const { data } = await client.query({
        query: getRecipeBySlug,
        variables: {
          slug: slug.toLowerCase()
        }
    })

    if (!data) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    
    return {
      props: {
        recipe: data.getRecipeBySlug
      }
    }

    
  } catch (error) {
    console.log(error)
    return {
      props: {
        recipe: null
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: 'spagheti'
      }
    }
  ]
  return { paths, fallback: 'blocking' }
}

export default Recipe
