import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    getPosts: [Post!]!
    getPostById(postId: ID!): Post
  }

  extend type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
  
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
`;
