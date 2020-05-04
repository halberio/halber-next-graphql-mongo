import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
  input SignUpInput {
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }
  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    posts(first: Int = 25, skip: Int = 0): [Post!]!
  }
  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createPost(name: String): Post!
  }
  type Post {
    id: ID!
    name: String!
  }
`;
