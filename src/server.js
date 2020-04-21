import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import context from './graphql/context';
import dataSources from './graphql/data-sources';
import database from './database';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
});

(async () => {
  try {
    await database.connect();
    const { url } = await server.listen({ port: process.env.PORT || 5000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    database.disconnect();
    console.error('Connection error:', e);
  }
})();
