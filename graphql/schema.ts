import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
    password: String
    token: String
    tokenExpiration: Int
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
  
  type payloadAuthUser {
    isLoggedIn: Boolean!
    name:String!
    email:String!
    token:String!
  }
  
  type Query {
    authUser: payloadAuthUser!
    user(id: ID!): User!
    getUserWithToken(token:String!): payloadAuthUser!
    currentUser: User
    users: [User]!
    posts(first: Int = 25, skip: Int = 0): [Post!]!
  }
  type LoginPayload {
    user: User!
  }
  type Mutation {
    signUp(input: SignUpInput): User!
    login(input: SignInInput!): LoginPayload!
    logout: Boolean!
    createPost(name: String): Post!
  }
  type Post {
    id: ID!
    name: String!
  }
`;
