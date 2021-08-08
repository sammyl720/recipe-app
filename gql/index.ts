import { gql } from '@apollo/client';

const userFragment = gql`
  fragment userFragment on User {
    id
    name
    image
  }
`;

const imageFragment = gql`
  fragment imageFragment on Image {
    id
    url
    secure_url
    width
    height
    public_id
  }
`;


export const getPopularRecipes = gql`
  query {
    getPopularRecipes {
      id
      title
      slug
      image {
        ...imageFragment
      }
      description
      category
      author {
        id
        user {
          ...userFragment
        }
      }
    }
  }
  ${imageFragment}
  ${userFragment}
`;

export const getRecipeByID = gql`
  query($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image {
        ...imageFragment
      }
      description
      ingredients
      instructions
      prepTime
      servingCount
      category
      author {
        id
        user {
        ...userFragment
        }
      }
    }
  }
  ${imageFragment}
  ${userFragment}
`;

export const getRecipeBySlug = gql`
  query($slug: String!) {
    getRecipeBySlug(slug: $slug) {
      id
      title
      image {
        ...imageFragment
      }
      description
      ingredients
      instructions
      prepTime
      servingCount
      category
      author {
        id
        user {
          ...userFragment
        }
      }
    }
  }
  ${imageFragment}
  ${userFragment}
`;

export const createRecipe = gql`
  mutation createRecipe($recipe: RecipeInput!) {
    createRecipe(recipe: $recipe) {
      id
      title
      image {
        ...imageFragment
      }
      description
      ingredients
      instructions
      prepTime
      servingCount
      category
      author {
        id
        user {
          ...userFragment
        }
      }
    }
  }
  ${imageFragment}
  ${userFragment}
`;
