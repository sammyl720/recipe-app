import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    me: Profile
    getRecipe(id: ID!): Recipe
    findRecipes(query: String!): [Recipe]
    getPopularRecipes: [Recipe]
    getRecipeBySlug(slug: String!): Recipe
  }

  type Mutation {
    createRecipe(recipe: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Recipe
    saveRecipe(id: ID!): Recipe
    updateRecipe(id: ID!, recipe: UpdateRecipeInput): Recipe
  }

  type Profile {
    id: ID!
    user: User!
    recipes: [Recipe]
    savedRecipes: [Recipe]
    createdAt: String
    updatedAt: String
  }

  type User {
    name: String!
    email: String!
    image: String
    id: ID!
  }

  type Profile {
    id: ID!
    user: User
    recipes: [Recipe]
    savedRecipes: [Recipe]
    createdAt: String!
    updatedAt: String!
  }
  type Recipe {
    id: ID!
    title: String!
    description: String!
    ingredients: [String]!
    instructions: [String]!
    category: [String]!
    createdAt: String!
    updatedAt: String!
    likeCount: Int!
    prepTime: Int!
    image: String!
    slug: String
    servingCount: Int!
    author: Profile
  }

  input RecipeInput {
    title: String!
    description: String!
    ingredients: [String]!
    instructions: [String]!
    category: [String]!
    image: String!
    prepTime: Int!
    servingCount: Int!
  }
  input UpdateRecipeInput {
    title: String
    description: String
    ingredients: [String]
    instructions: [String]
    category: [String]
    prepTime: Int
    servingCount: Int
  }
`;

export default typeDefs;