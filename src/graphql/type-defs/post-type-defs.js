import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  extend type Query {
    getPosts: [Post]
  }
`;
