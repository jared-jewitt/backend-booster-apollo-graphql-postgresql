import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { generateJWTToken } from "@/utils";
import { User, LoginInput, RegisterInput, LoginOutput, RegisterOutput } from "@/entities";

@Resolver(() => User)
export default class UserResolver {
  private repository: Repository<User> = getRepository(User);

  @Mutation(() => LoginOutput)
  private async login(
    @Arg("input", () => LoginInput) { username, password }: LoginInput
  ): Promise<LoginOutput> {
    const existingUser = await this.repository.findOne({ username });
    if (!existingUser) throw new UserInputError("User not found");

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) throw new UserInputError("Wrong credentials");

    return {
      token: generateJWTToken(existingUser),
      user: {
        id: existingUser.id,
        username: existingUser.username,
      },
    };
  }

  @Mutation(() => RegisterOutput)
  private async register(
    @Arg("input", () => RegisterInput) { username, password }: RegisterInput
  ): Promise<RegisterOutput> {
    const existingUser = await this.repository.findOne({ username });
    if (existingUser) throw new UserInputError("Username is taken");

    const newUser = await this.repository.save({
      username,
      password: await bcrypt.hash(password, 12),
    });

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }
}
