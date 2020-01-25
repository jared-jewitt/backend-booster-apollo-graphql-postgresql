export const getPosts = async (_, __, { dataSources }) => {
  return await dataSources.postAPI.getPosts();
};

export const getPostById = async (_, { postId }, { dataSources }) => {
  return await dataSources.postAPI.getPostById(postId);
};

export const createPost = async (_, { body }, { dataSources }) => {
  return await dataSources.postAPI.createPost(body);
};

export const deletePost = async (_, { postId }, { dataSources }) => {
  return await dataSources.postAPI.deletePost(postId);
};