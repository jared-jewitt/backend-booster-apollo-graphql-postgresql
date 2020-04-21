import { ForbiddenError } from 'apollo-server';
import { DataSource } from 'apollo-datasource';

export default class PostAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getPosts() {
    return await this.context.models.Post.find();
  }
  
  async getPostById(postId) {
    return await this.context.models.Post.findById(postId);
  }
  
  async createPost(message) {
    const newPost = new this.context.models.Post({
      message,
      user: this.context.user.id,
    });
  
    const res = await newPost.save();
    return {
      ...res._doc,
      id: res._id,
    };
  }
  
  async deletePost(postId) {
    const post = await this.context.models.Post.findById(postId);
    if (this.context.user.id === post.user.toString()) {
      await post.delete();
      return 'Post deleted successfully';
    } else {
      throw new ForbiddenError('You are not authorized to delete this post');
    }
  }
}
