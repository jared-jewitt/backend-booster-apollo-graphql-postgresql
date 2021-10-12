import jwt from "jsonwebtoken";
import { expect } from "chai";
import { AuthenticationError } from "apollo-server";
import { User } from "@/entities";
import { generateJWTToken, verifyJWTToken } from "@/helpers";

describe("Unit - generateJWTToken function", () => {
  it("returns an encoded jwt token", () => {
    const token = generateJWTToken({
      id: 1,
      username: "foo@bar.com",
    });

    expect(token).to.exist;
  });
});

describe("Unit - verifyJWTToken function", () => {
  it("returns a decoded user object", () => {
    const token = generateJWTToken({
      id: 1,
      username: "foo@bar.com",
    });

    const decodedToken = jwt.decode(token) as Partial<User>;

    expect(decodedToken.id).to.eql(1);
    expect(decodedToken.username).to.eql("foo@bar.com");
  });

  it("throws a token expired error", () => {
    expect(() =>
      verifyJWTToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJpZCI6MSwidXNlcm5hbWUiOiJmb29AYmFyLmNvbSIsImlhdCI6MTYzMzI3ODg3NiwiZXhwIjoxNjMzMjc4OTk2fQ." +
          "41PWzg0KF-8r6iHdK_oYQICNe9s-Uq2l-BzcxbzjSxE"
      )
    ).to.throw(AuthenticationError, "Expired token");
  });

  it("throws a token invalid error", () => {
    expect(() =>
      verifyJWTToken(
        "TAMPERED_TOKEN" +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJpZCI6MSwidXNlcm5hbWUiOiJmb29AYmFyLmNvbSIsImlhdCI6MTYzMzI3ODg3NiwiZXhwIjoxNjMzMjc4OTk2fQ." +
          "41PWzg0KF-8r6iHdK_oYQICNe9s-Uq2l-BzcxbzjSxE"
      )
    ).to.throw(AuthenticationError, "Invalid token");
  });
});
