import fetch from "cross-fetch";
import { ApolloServer } from "apollo-server";
import { buildSchema as buildGraphQLSchema } from "type-graphql";
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "apollo-boost";
import {
  Connection as TypeORMConnection,
  createConnection as createDatabaseConnection,
} from "typeorm";
import { UserResolver, PostResolver } from "@/resolvers";
import { getUserContext } from "@/context";

export const getDatabase = async (): Promise<TypeORMConnection> => {
  return await createDatabaseConnection("default");
};

export const getServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({
    schema: await buildGraphQLSchema({
      resolvers: [UserResolver, PostResolver],
    }),
    context: ({ req, res }) => ({
      user: getUserContext({ req, res }),
    }),
  });

  await server.listen({ port: process.env.PORT });

  return server;
};

export const getClient = (httpOptions?: HttpLink.Options): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      fetch,
      uri: `http://localhost:${process.env.PORT}/graphql`,
      ...httpOptions,
    }),
  });
};
