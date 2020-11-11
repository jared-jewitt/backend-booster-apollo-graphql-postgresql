import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import { IContext, getUserContext } from "@/context";
import { UserResolver, PostResolver } from "@/resolvers";

(async (): Promise<void> => {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, PostResolver],
      }),
      context: ({ req, res }): IContext => ({
        user: getUserContext({ req, res }),
        // Add more context objects here as needed
        // ...
        // ...
      }),
    });

    await createConnection();
    await server
      .listen({ port: process.env.PORT || 5000 })
      .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
  } catch (e) {
    console.error(e);
  }
})();
