import * as faker from "faker";
import { expect } from "chai";
import { ApolloServer } from "apollo-server";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Connection as TypeORMConnection } from "typeorm";
import { User } from "@/entities";
import { getDatabase, getClient, getServer } from "../../support";

let database: TypeORMConnection;
let server: ApolloServer;
let client: ApolloClient<NormalizedCacheObject>;

const username = faker.internet.email();
const password = faker.internet.password();

const REGISTER_MUTATION = gql`
  mutation ($input: RegisterInput!) {
    register(input: $input) {
      id
      username
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

describe("E2E - User flow", () => {
  before(async () => {
    database = await getDatabase();
    server = await getServer();
    client = getClient();
  });

  after(async () => {
    await database.dropDatabase();
    await database.close();
    await server.stop();
    await client.clearStore();
  });

  describe("Happy path", () => {
    it("registers a new user", async () => {
      const response = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input: { username, password },
        },
      });

      const createdUser = await database.getRepository(User).findOne({ username });

      expect(createdUser).to.exist;
      expect(response.data.register.id).to.eql(createdUser.id.toString());
      expect(response.data.register.username).to.eql(createdUser.username);
    });

    it("logs in the registered user", async () => {
      const response = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input: { username, password },
        },
      });

      const existingUser = await database.getRepository(User).findOne({ username });

      expect(existingUser).to.exist;
      expect(response.data.login.token).to.exist;
      expect(response.data.login.user.id).to.eql(existingUser.id.toString());
      expect(response.data.login.user.username).to.eql(existingUser.username);
    });
  });

  describe("Sad path", () => {
    it("fails to register a new user", async () => {
      await expect(
        client.mutate({
          mutation: REGISTER_MUTATION,
          variables: {
            input: { username, password },
          },
        })
      ).to.be.rejectedWith("GraphQL error: Username is taken");
    });

    describe("fails to login a new user", () => {
      it("fails with no user", async () => {
        await expect(
          client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              input: { username: "non-existing username", password: "non-existing password" },
            },
          })
        ).to.be.rejectedWith("GraphQL error: User not found");
      });

      it("fails with invalid credentials", async () => {
        await expect(
          client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              input: { username, password: "Wrong password" },
            },
          })
        ).to.be.rejectedWith("GraphQL error: Wrong credentials");
      });
    });
  });
});
