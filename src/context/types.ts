import { User } from "@/entities";

export interface Context {
  user: Partial<User>;
}
