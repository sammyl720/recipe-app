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
export const saveRecipe = gql`
  mutation($id: ID!) {
    saveRecipe(id: $id) {
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
      slug
      author {
        id
        savedRecipes {
          id
          slug
        }
        user {
          ...userFragment
        }
      }
    }
  }
  ${imageFragment}
  ${userFragment}
`;

export const findRecipes = gql`
  query($query: String!) {
    findRecipes(query: $query) {
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
      slug
      author {
        id
        savedRecipes {
          id
          slug
        }
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
      slug
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

export const me = gql`
  {
  me {
    user {
      name
      email
      image
    }
    recipes {
      id
      title
      slug
      description
      image {
        ...imageFragment
      }
    }
    savedRecipes {
      id
      title
      slug
      description
      image {
        ...imageFragment
      }
      author {
        id
        user {
          ...userFragment
        }
      }
    }
  }


}

  ${imageFragment}
  ${userFragment}
`;