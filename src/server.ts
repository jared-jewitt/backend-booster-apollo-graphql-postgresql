import "reflect-metadata";
import isDocker from "is-docker";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { buildSchema as buildGraphQLSchema } from "type-graphql";
import { createConnection as createDatabaseConnection } from "typeorm";
import { getUserContext } from "@/context";
import { PostResolver, UserResolver } from "@/resolvers";

if (!isDocker()) {
  dotenv.config({ path: `./.env.localhost.${process.env.NODE_ENV}` });
}

(async (): Promise<void> => {
  await createDatabaseConnection("default");

  const server = new ApolloServer({
    schema: await buildGraphQLSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        // Add more resolvers here as needed.
        // ...
        // ...
      ],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      user: getUserContext({ req, res }),
      // Add more context objects here as needed.
      // ...
      // ...
    }),
  });

  server
    .listen({ port: process.env.PORT })
    .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
})().catch((e) => console.error(e));
