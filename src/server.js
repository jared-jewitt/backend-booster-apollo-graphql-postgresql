import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';
import dataSources from './graphql/data-sources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
});

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((e) => {
    console.error('Connection error:', e);
  });