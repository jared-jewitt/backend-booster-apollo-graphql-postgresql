import { DataSource } from 'apollo-datasource';

export default class PostAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getPosts() {
    try {
      return await this.context.models.PostModel.find();
    } catch (e) {
      throw new Error(e);
    }
  }
  
  async getPostById(postId) {
    try {
      const post = await this.context.models.PostModel.findById(postId);
      if (post) return post;
      throw new Error('Post not found');
    } catch (e) {
      throw new Error(e);
    }
  }
  
  // TODO: ...
  async createPost(body) {
  
  }
  
  // TODO: ...
  async deletePost(postId) {
  
  }
}
