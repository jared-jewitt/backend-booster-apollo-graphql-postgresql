import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";

import { IContext } from "@/context";

export default (({ context }, next) => {
  if (!context.user) throw new AuthenticationError("Not authenticated");

  return next();
}) as MiddlewareFn<IContext>;
