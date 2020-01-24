export const getPosts = async (_, __, { dataSources }) => {
  return dataSources.postAPI.getPosts();
};

export const getPostById = async (_, { postId }, { dataSources }) => {
  return dataSources.postAPI.getPostById(postId);
};

export const createPost = async (_, { body }, { dataSources }) => {
  return dataSources.postAPI.createPost(body);
};

export const deletePost = async (_, { postId }, { dataSources }) => {
  return dataSources.postAPI.deletePost(postId);
};