import { User } from "@/entities";

export { getUserContext } from "./user";

export interface IContext {
  user: Partial<User>;
}
