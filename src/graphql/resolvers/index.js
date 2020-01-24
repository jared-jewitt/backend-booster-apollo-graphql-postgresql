import { login, register } from './user-resolvers';
import { getPosts } from './post-resolvers';

export default {
  Query: {
    getPosts,
  },
  Mutation: {
    login,
    register,
  },
};