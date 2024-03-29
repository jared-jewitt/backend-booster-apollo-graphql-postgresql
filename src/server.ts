import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema as buildGraphQLSchema } from "type-graphql";
import { Connection as TypeORMConnection, createConnection as createDatabaseConnection } from "typeorm";
import { getUserContext } from "@/context";
import { PostResolver, UserResolver } from "@/resolvers";

let server: ApolloServer;
let database: TypeORMConnection;

(async (): Promise<void> => {
  try {
    database = await createDatabaseConnection("default");

    server = new ApolloServer({
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

    const { url } = await server.listen({ port: process.env.PORT });

    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.log(e);
    await database.close();
    process.exit(1);
  }
})();
