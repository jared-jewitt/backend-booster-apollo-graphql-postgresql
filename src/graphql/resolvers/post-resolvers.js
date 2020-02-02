import { authGuard } from '../utils';

export const getPosts = async (_, __, { dataSources }) => {
  return await dataSources.postAPI.getPosts();
};

export const getPostById = async (_, { postId }, { dataSources }) => {
  return await dataSources.postAPI.getPostById(postId);
};

export const createPost = authGuard(async (_, { message }, { dataSources }) => {
  return await dataSources.postAPI.createPost(message);
});

export const deletePost = authGuard(async (_, { postId }, { dataSources }) => {
  return await dataSources.postAPI.deletePost(postId);
});