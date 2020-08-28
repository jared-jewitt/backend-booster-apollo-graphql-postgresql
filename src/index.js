import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Book {
      title: String
      author: String
    }
    
    type Query {
      books: [Book]
    }
  `,
  resolvers: {
    Query: {
      books: () => [
        {
          title: 'Harry Potter and the Chamber of Secrets',
          author: 'J.K. Rowling',
        },
        {
          title: 'Jurassic Park',
          author: 'Michael Crichton',
        },
      ],
    },
  },
});

(async () => {
  try {
    console.log('Booting up server...');
    const { url } = await server.listen({ port: process.env.PORT || 5000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
