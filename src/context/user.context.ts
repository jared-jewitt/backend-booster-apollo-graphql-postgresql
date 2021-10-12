import { Request, Response } from "express";
import { verifyJWTToken } from "@/helpers";
import { User } from "@/entities";

export default function getUserContext({ req }: { req: Request; res: Response }): Partial<User> {
  const authorizationHeader = req.headers.authorization || "";
  const [, token] = authorizationHeader.split("Bearer ");

  return token ? verifyJWTToken(token) : null;
}
