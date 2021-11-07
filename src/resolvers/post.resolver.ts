import { ForbiddenError, ApolloError } from "apollo-server";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware, ID } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { AuthMiddleWare } from "@/middlewares";
import { Post, User } from "@/entities";

@Resolver(() => Post)
export default class PostResolver {
  public postRepository: Repository<Post> = getRepository(Post);

  @Query(() => Post, { nullable: true, description: "Gets a single post record by id" })
  public async getPost(@Arg("id", () => ID) id: number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  @Query(() => [Post], { description: "Gets a list of all created posts" })
  public async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  @Mutation(() => Post, { description: "Creates a single post record" })
  @UseMiddleware(AuthMiddleWare)
  public async createPost(
    @Arg("message", () => String) message: string,
    @Ctx("user") user: Partial<User>
  ): Promise<Post> {
    return await this.postRepository.save({
      message,
      userId: user.id,
    });
  }

  @Mutation(() => String, { description: "Deletes a single post record by id" })
  @UseMiddleware(AuthMiddleWare)
  public async deletePost(@Arg("id", () => ID) id: number, @Ctx("user") user: Partial<User>): Promise<string> {
    const existingPost = await this.postRepository.findOne(id);
    if (!existingPost) {
      throw new ApolloError(`No post was found with id: ${id}`, "NOT_FOUND");
    } else if (user.id === existingPost.userId) {
      await this.postRepository.remove(existingPost);
      return "Post deleted successfully";
    } else {
      throw new ForbiddenError("You are not authorized to delete this post");
    }
  }
}
