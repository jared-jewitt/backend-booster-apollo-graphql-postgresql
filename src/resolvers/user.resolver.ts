import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { generateJWTToken } from "@/helpers";
import { User, LoginInput, RegisterInput, RegisterOutput, LoginOutput } from "@/entities";

@Resolver(() => User)
export default class UserResolver {
  public userRepository: Repository<User> = getRepository(User);

  @Mutation(() => RegisterOutput, { description: "Creates a new user" })
  public async register(
    @Arg("input", () => RegisterInput) { username, password }: RegisterInput
  ): Promise<RegisterOutput> {
    const hasExistingUser = !!(await this.userRepository.findOne({ username }));
    if (hasExistingUser) throw new UserInputError("Username is taken");

    const newUser = await this.userRepository.save({
      username,
      password: await bcrypt.hash(password, 12),
    });

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  @Mutation(() => LoginOutput, { description: "Logs an existing user in" })
  public async login(
    @Arg("input", () => LoginInput) { username, password }: LoginInput
  ): Promise<LoginOutput> {
    const existingUser = await this.userRepository.findOne({ username }, { relations: ["posts"] });
    if (!existingUser) throw new UserInputError("User not found");

    const doPasswordsMatch = await bcrypt.compare(password, existingUser.password);
    if (!doPasswordsMatch) throw new UserInputError("Wrong credentials");

    return {
      token: generateJWTToken(existingUser, { expiresIn: "7 days" }),
      user: {
        id: existingUser.id,
        username: existingUser.username,
        posts: existingUser.posts,
      },
    };
  }
}
