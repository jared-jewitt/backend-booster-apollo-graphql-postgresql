import jwt, { SignOptions, TokenExpiredError } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { User } from "@/entities";

export const generateJWTToken = (user: Pick<User, "id" | "username">, options: SignOptions = {}): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    options
  );
};

export const verifyJWTToken = (token: string): Partial<User> => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as Partial<User>;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new AuthenticationError("Expired token");
    }

    throw new AuthenticationError("Invalid token");
  }
};
