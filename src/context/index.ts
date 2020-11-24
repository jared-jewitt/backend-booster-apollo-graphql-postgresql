import { User } from "@/entities";

export { getUserContext } from "@/context/user";

export interface IContext {
  user: Partial<User>;
}
