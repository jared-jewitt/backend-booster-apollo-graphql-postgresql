import { AuthenticationError } from 'apollo-server';
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
  
  // TODO: ...
  async createPost(body) {
    if (!this.context.user) throw new AuthenticationError('Not authenticated');
  }
  
  // TODO: ...
  async deletePost(postId) {
    if (!this.context.user) throw new AuthenticationError('Not authenticated');
  }
}
