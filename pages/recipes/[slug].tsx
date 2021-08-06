import React from 'react'
import client from '../../apollo/index'
import { getRecipeBySlug } from '../../gql'
const Recipe = ({ recipe }) => {
  return (
    <div>
      {recipe && JSON.stringify(recipe)}
      hello
    </div>
  )
}

export async function getStaticProps(ctx) {

  try {
    const { slug } = ctx.params
    const { data } = await client.query({
        query: getRecipeBySlug,
        variables: {
          slug
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
