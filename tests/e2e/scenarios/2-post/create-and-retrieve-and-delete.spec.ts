import * as faker from "faker";
import { expect } from "chai";
import { ApolloServer } from "apollo-server";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Connection } from "typeorm";
import { Post, User } from "@/entities";
import { generateJWTToken } from "@/helpers";
import { getDatabase, getClient, getServer } from "../../support";

let database: Connection;
let server: ApolloServer;
let client: ApolloClient<NormalizedCacheObject>;

const username = faker.internet.email();
const password = faker.internet.password();

const CREATE_POST_MUTATION = gql`
  mutation ($message: String!) {
    createPost(message: $message) {
      id
      message
      userId
    }
  }
`;

const GET_POST_QUERY = gql`
  query ($id: ID!) {
    getPost(id: $id) {
      id
      message
      userId
    }
  }
`;

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      message
      userId
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;

describe("E2E - Post flow", () => {
  before(async () => {
    database = await getDatabase();
    server = await getServer();
  });

  after(async () => {
    await database.dropDatabase();
    await database.close();
    await server.stop();
    await client.clearStore();
  });

  describe("Happy path", () => {
    before(async () => {
      const user = await database.getRepository(User).save({
        username,
        password,
      });

      client = getClient({
        headers: {
          authorization: `Bearer ${generateJWTToken({ id: user.id, username: user.username })}`,
        },
      });
    });

    after(async () => {
      await database.dropDatabase();
      await database.synchronize();
    });

    it("creates 3 new posts", async () => {
      for (let i = 1; i <= 3; i++) {
        const response = await client.mutate({
          mutation: CREATE_POST_MUTATION,
          variables: {
            message: faker.random.words(5),
          },
        });

        const createdPost = await database.getRepository(Post).findOne(i);

        expect(createdPost).to.exist;
        expect(response.data.createPost.id).to.eql(i.toString());
        expect(response.data.createPost.message).to.eql(createdPost.message);
        expect(response.data.createPost.userId).to.eql(createdPost.userId.toString());
      }
    });

    it("gets a random post by id", async () => {
      const id = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      const response = await client.query({
        query: GET_POST_QUERY,
        variables: {
          id,
        },
      });

      const existingPost = await database.getRepository(Post).findOne(id);

      expect(existingPost).to.exist;
      expect(response.data.getPost.id).to.eql(existingPost.id.toString());
      expect(response.data.getPost.message).to.eql(existingPost.message);
      expect(response.data.getPost.userId).to.eql(existingPost.userId.toString());
    });

    it("gets a list of posts", async () => {
      const response = await client.query({
        query: GET_POSTS_QUERY,
      });

      const existingPosts = await database.getRepository(Post).find();

      expect(existingPosts).to.exist;
      expect(response.data.getPosts[0].id).to.eql(existingPosts[0].id.toString());
      expect(response.data.getPosts[0].message).to.eql(existingPosts[0].message);
      expect(response.data.getPosts[0].userId).to.eql(existingPosts[0].userId.toString());

      expect(response.data.getPosts[1].id).to.eql(existingPosts[1].id.toString());
      expect(response.data.getPosts[1].message).to.eql(existingPosts[1].message);
      expect(response.data.getPosts[1].userId).to.eql(existingPosts[1].userId.toString());

      expect(response.data.getPosts[2].id).to.eql(existingPosts[2].id.toString());
      expect(response.data.getPosts[2].message).to.eql(existingPosts[2].message);
      expect(response.data.getPosts[2].userId).to.eql(existingPosts[2].userId.toString());
    });

    it("deletes a post", async () => {
      const response = await client.mutate({
        mutation: DELETE_POST_MUTATION,
        variables: {
          id: 3,
        },
      });

      const deletedPost = await database.getRepository(Post).findOne(3);

      expect(deletedPost).to.not.exist;
      expect(response.data.deletePost).to.eql("Post deleted successfully");
    });
  });

  describe("Sad path", () => {
    before(async () => {
      const user = await database.getRepository(User).save({
        username,
        password,
      });

      client = await getClient({
        headers: {
          authorization: `Bearer ${generateJWTToken({ id: user.id, username: user.username })}`,
        },
      });
    });

    after(async () => {
      await database.dropDatabase();
      await database.synchronize();
    });

    it("fails to create a new post", async () => {
      await expect(
        client.mutate({
          mutation: CREATE_POST_MUTATION,
          variables: {
            invalidKey: faker.random.words(5),
          },
        })
      ).to.be.rejectedWith("Network error: Response not successful: Received status code 400");
    });

    it("fails to get a post by id", async () => {
      const response = await client.query({
        query: GET_POST_QUERY,
        variables: {
          id: 123,
        },
      });

      const existingPost = await database.getRepository(Post).findOne(123);

      expect(existingPost).to.not.exist;
      expect(response.data.getPost).to.eql(null);
    });

    it("fails to get a list of posts", async () => {
      const response = await client.query({
        query: GET_POSTS_QUERY,
      });

      const existingPosts = await database.getRepository(Post).find();

      expect(existingPosts).to.eql([]);
      expect(response.data.getPosts).to.eql([]);
    });

    describe("fails to delete a post", () => {
      it("fails with an invalid post id", async () => {
        await expect(
          client.mutate({
            mutation: DELETE_POST_MUTATION,
            variables: {
              id: 123,
            },
          })
        ).to.be.rejectedWith(`GraphQL error: No post was found with id: ${123}`);
      });

      it("fails with authorized credentials", async () => {
        // Quickly make a post with the existing user
        await client.mutate({
          mutation: CREATE_POST_MUTATION,
          variables: {
            message: faker.random.words(5),
          },
        });

        // Set a new user token
        client = await getClient({
          headers: {
            authorization: `Bearer ${generateJWTToken({ id: 123, username })}`,
          },
        });

        // Try to access that post with the new user token
        await expect(
          client.mutate({
            mutation: DELETE_POST_MUTATION,
            variables: {
              id: 1,
            },
          })
        ).to.be.rejectedWith("GraphQL error: You are not authorized to delete this post");
      });
    });
  });
});
