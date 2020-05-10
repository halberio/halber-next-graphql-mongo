import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User!
    currentUser: User
    users: [User]!
    viewer: User
    posts(first: Int = 25, skip: Int = 0): [Post!]!
  }
  type AuthPayload {
    user: User
  }
  type Mutation {
    signUp(input: SignUpInput): User!
    login(email: String!, password: String!): AuthPayload
    signOut: Boolean!
    createPost(name: String): Post!
  }
  type Post {
    id: ID!
    name: String!
  }
`;
