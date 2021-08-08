import React from 'react'
import Image from 'next/image'
import { NextSeo } from 'next-seo';
import {  useSession } from 'next-auth/client'
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router'

import client from '../../apollo/index'
import { getRecipeBySlug, saveRecipe } from '../../gql'


const Recipe = ({ pageProps: {recipe, meta }}) => {
  const router = useRouter()
  const [session] = useSession()
  const [saveRecipeMutation] = useMutation(saveRecipe)

  const save = async (id) => {
    if(!session){
      return
    }
    try {
      await saveRecipeMutation({
        variables: {
          id
        }
      })
      router.push(`/dashboard`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo
        title={recipe.title}
        description={recipe.description}
        canonical={`${process.env.NEXT_PUBLIC_URL + '/recipes/' + recipe.slug}`}
        openGraph={meta}
        twitter={{
          cardType: 'summary_large_image',
          site: '@eatablerecipes',
          handle: '@eatablerecipes'
        }}
      />
      <article className='flex flex-col w-full p-2 mx-auto mt-2  max-w-4xl'>
        <Image className='object-cover w-full h-auto rounded shadow' src={recipe.image.secure_url} layout='intrinsic' alt={recipe.title} width={recipe.image.width} height={recipe.image.height} objectFit='cover' />
        <div className='flex flex-col p-2 mt-3'>
          <h1 className='text-4xl font-extrabold mb-2'>{recipe.title}</h1>
          <p className='text-md text-dark leading-8 font-medium'>{recipe.description}</p>
        </div>
        {/* add recipe instructions */}
        <section className="flex flex-wrap justify-between">
          
          <section className='flex flex-col my-2 p-2 bg-pink-50 bg-opacity-40'>
            <h2 className='text-xl mb-2 font-semibold text-dark'>Ingredients</h2>
            <ul className='flex-wrap flex gap-2'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className='mb-2'>{ingredient}
                {
                  index < recipe.ingredients.length - 1 ? ', ' : ''
                }
                </li>
              ))}
            </ul>
          </section>
          <section className='flex flex-col my-2 p-2'>
            <h2 className='text-xl mb-2 font-semibold text-dark'>Instructions</h2>
            <ol className='list-decimal list-inside'>
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className='mb-2'>{instruction}</li>
              ))}
            </ol>
          </section>
        </section>
        <aside className='flex flex-wrap px-2 gap-2'>
          {recipe.category.map((category, index) => (
            <div key={index} className='rounded-2xl border px-3 py-1 cursor-pointer bg-dark text-light'>
              {category}
            </div>
          ))}
        </aside>
        
        
      </article>
      { session?.user &&
        // @ts-ignore
        session.user.id == recipe.author.user.id ? (
          <section className='flex flex-wrap justify-end gap-2 my-2 p-2'>
            <button className="btn-secondary">Update Recipe</button>
            <button className="btn-danger">Delete Recipe</button>
          </section>
        ) : (
          <section className='flex flex-wrap justify-end gap-2 my-2 p-2'>
            <button className="btn-secondary" onClick={() => save(recipe.id)} >Save Recipes</button>
          </section>
        )
      }
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
    const recipe = data.getRecipeBySlug
    const meta = {
      url: process.env.NEXT_PUBLIC_URL + '/recipes/' + recipe.slug,
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: recipe.image.secure_url,
          width: recipe.image.width,
          height: recipe.image.height,
          alt: recipe.title
        }
      ],
      type: 'article',
      site_name: 'eatable recipes'
    }

    const props = {
      recipe,
      meta
    }

    return {
      props,
      revalidate: 5
    }

    
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: 'salmon'
      }
    }
  ]
  return { paths, fallback: 'blocking' }
}

export default Recipe
