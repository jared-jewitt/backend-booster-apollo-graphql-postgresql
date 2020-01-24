import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
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