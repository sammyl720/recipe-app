import { gql } from '@apollo/client';

export const getPopularRecipes = gql`
  query {
    getPopularRecipes {
      id
      title
      image
      description
      category
      author {
        id
        user {
          name
          image
        }
      }
    }
  }
`;

export const getRecipeByID = gql`
  query($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      description
      ingredients
      instructions
      prepTime
      servingCount
      category
      author {
        id
        user {
          name
          image
        }
      }
    }
  }
`;

export const getRecipeBySlug = gql`
  query($slug: String!) {
    getRecipeBySlug(slug: $slug) {
      id
      title
      image
      description
      ingredients
      instructions
      prepTime
      servingCount
      category
      author {
        id
        user {
          name
          image
        }
      }
    }
  }
`;