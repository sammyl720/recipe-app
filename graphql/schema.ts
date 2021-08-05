import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    name: String!
    email: String!
    image: String
    id: ID!
  }
`;

export default typeDefs;