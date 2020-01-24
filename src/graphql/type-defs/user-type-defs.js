import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID!
    token: String!
    username: String!
    createdAt: String!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }
  
  input RegisterInput {
    username: String!
    password: String!
  }
  
  extend type Mutation {
    login(loginInput: LoginInput): User
    register(registerInput: RegisterInput): User
  }
`;
