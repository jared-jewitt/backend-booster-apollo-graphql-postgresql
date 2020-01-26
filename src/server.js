import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';
import dataSources from './graphql/data-sources';
import connectDatabase from './database/connect';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
});

connectDatabase()
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((e) => {
    console.error('Connection error:', e);
  });