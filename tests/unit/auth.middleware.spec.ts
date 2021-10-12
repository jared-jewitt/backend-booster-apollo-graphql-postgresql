import * as faker from "faker";
import sinon from "sinon";
import { expect } from "chai";
import { AuthenticationError } from "apollo-server";
import { ResolverData } from "type-graphql";
import { Context } from "@/context/types";
import { AuthMiddleWare } from "@/middlewares";

describe("Unit - AuthMiddleware function", () => {
  it("throws an authentication error", () => {
    const mockNext = sinon.fake();
    const mockResolverData = {
      context: {
        user: null,
      },
    };

    expect(() => AuthMiddleWare(mockResolverData as ResolverData<Context>, mockNext)).to.throw(
      AuthenticationError,
      "Not authenticated"
    );
  });

  it("calls the next function", () => {
    const mockNext = sinon.fake();

    const mockResolverData = {
      context: {
        user: {
          id: faker.datatype.number(5),
          username: faker.internet.email(),
        },
      },
    };

    AuthMiddleWare(mockResolverData as ResolverData<Context>, mockNext);

    expect(mockNext.calledOnce).to.be.true;
  });
});
