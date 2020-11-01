import { Request, Response } from "express";

import { verifyJWTToken } from "../utils";
import { User } from "../entities";

export const getUserContext = ({ req }: { req: Request; res: Response }): Partial<User> => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split("Bearer ")[1];

  return token ? verifyJWTToken(token) : null;
};
