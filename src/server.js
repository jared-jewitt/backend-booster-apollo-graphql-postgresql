import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server';

import { PostModel } from './models';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        return await PostModel.find();
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  });