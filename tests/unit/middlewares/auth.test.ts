import { ResolverData } from "type-graphql";

import { IContext } from "@/context";
import { AuthMiddleWare } from "@/middlewares";

describe("AuthMiddleware", () => {
  it("throws an authentication error", () => {
    const mockResolverData: ResolverData<IContext> = {
      root: {},
      context: { user: null },
      args: {},
      info: null,
    };
    const mockNext = jest.fn();

    expect(() => AuthMiddleWare(mockResolverData, mockNext)).toThrow();
  });

  it("calls the `next` function", () => {
    const mockResolverData: ResolverData<IContext> = {
      root: {},
      context: {
        user: {
          id: 123,
          username: "Foo Bar Baz",
        },
      },
      args: {},
      info: null,
    };
    const mockNext = jest.fn();

    AuthMiddleWare(mockResolverData, mockNext);

    expect(mockNext).toBeCalled();
  });
});
