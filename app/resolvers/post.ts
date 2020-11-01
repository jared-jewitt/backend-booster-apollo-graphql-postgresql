import { ForbiddenError, ApolloError } from "apollo-server";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, ID } from "type-graphql";
import { getRepository, Repository } from "typeorm";

import { ErrorCode } from "../constants";
import { AuthMiddleWare } from "../middlewares";
import { Post, User } from "../entities";

@Resolver(() => Post)
export default class PostResolver {
  private repository: Repository<Post> = getRepository(Post);

  @Query(() => [Post])
  private async getPosts(): Promise<Post[]> {
    return this.repository.find();
  }

  @Query(() => Post, { nullable: true })
  private async getPost(@Arg("id", () => ID) id: number): Promise<Post> {
    return this.repository.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(AuthMiddleWare)
  private async createPost(
    @Arg("message", () => String) message: string,
    @Ctx("user") user: Partial<User>
  ): Promise<Post> {
    return await this.repository.save({
      message,
      userId: user.id,
    });
  }

  @Mutation(() => String)
  @UseMiddleware(AuthMiddleWare)
  private async deletePost(
    @Arg("id", () => ID) id: number,
    @Ctx("user") user: Partial<User>
  ): Promise<string> {
    const post = await this.repository.findOne(id);
    if (!post) {
      throw new ApolloError(`No post was found with id: ${id}`, ErrorCode.NotFound);
    } else if (user.id === post.userId) {
      await this.repository.remove(post);
      return "Post deleted successfully";
    } else {
      throw new ForbiddenError("You are not authorized to delete this post");
    }
  }
}
