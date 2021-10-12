import { expect } from "chai";
import { Request, Response } from "express";
import { AuthenticationError } from "apollo-server";
import { getUserContext } from "@/context";

describe("Unit - getUserContext function", () => {
  it("returns a user object", () => {
    const mockRes = {};
    const mockReq = {
      headers: {
        authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJpZCI6MSwidXNlcm5hbWUiOiJmb29AYmFyLmNvbSIsImlhdCI6MTYzMzI3ODU1NX0." +
          "e5HcMUyD_gxh42-QMMB0wXu47C73LmLbKHZ6VemY8AE",
      },
    };

    const result = getUserContext({
      req: mockReq as Request,
      res: mockRes as Response,
    });

    expect(result.id).to.eql(1);
    expect(result.username).to.eql("foo@bar.com");
  });

  it("returns null", () => {
    const mockRes = {};
    const mockReq = {
      headers: {
        authorization: "",
      },
    };

    const result = getUserContext({
      req: mockReq as Request,
      res: mockRes as Response,
    });

    expect(result).to.eql(null);
  });

  it("throws an expired token error", () => {
    const mockRes = {};
    const mockReq = {
      headers: {
        authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJpZCI6MSwidXNlcm5hbWUiOiJmb29AYmFyLmNvbSIsImlhdCI6MTYzMzI3ODg3NiwiZXhwIjoxNjMzMjc4OTk2fQ." +
          "41PWzg0KF-8r6iHdK_oYQICNe9s-Uq2l-BzcxbzjSxE",
      },
    };

    expect(() =>
      getUserContext({
        req: mockReq as Request,
        res: mockRes as Response,
      })
    ).to.throw(AuthenticationError, "Expired token");
  });

  it("throws an invalid token error", () => {
    const mockRes = {};
    const mockReq = {
      headers: {
        authorization:
          "Bearer " +
          "TAMPERED_TOKEN" +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJpZCI6MSwidXNlcm5hbWUiOiJmb29AYmFyLmNvbSIsImlhdCI6MTYzMzI3ODg3NiwiZXhwIjoxNjMzMjc4OTk2fQ." +
          "41PWzg0KF-8r6iHdK_oYQICNe9s-Uq2l-BzcxbzjSxE",
      },
    };

    expect(() =>
      getUserContext({
        req: mockReq as Request,
        res: mockRes as Response,
      })
    ).to.throw(AuthenticationError, "Invalid token");
  });
});
