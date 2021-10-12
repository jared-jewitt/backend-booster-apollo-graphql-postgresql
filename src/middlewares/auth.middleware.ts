import { AuthenticationError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@/context/types";

export default (({ context }, next) => {
  if (!context.user) throw new AuthenticationError("Not authenticated");

  return next();
}) as MiddlewareFn<Context>;
