import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

import { User } from "@/entities";

export const generateJWTToken = (user: Omit<User, "password">): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyJWTToken = (token: string): Partial<User> => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as Partial<User>;
  } catch (e) {
    throw new AuthenticationError("Invalid/Expired token");
  }
};
