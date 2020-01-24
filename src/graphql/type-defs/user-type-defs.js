import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  extend type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
  }
  
  type User {
    id: ID!
    username: String!
    createdAt: String!
    token: String
  }
`;
