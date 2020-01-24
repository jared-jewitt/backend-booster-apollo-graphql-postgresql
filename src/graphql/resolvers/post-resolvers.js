import { PostModel } from '../../db/models';

export const getPosts = async () => {
  try {
    return await PostModel.find();
  } catch (err) {
    throw new Error(err);
  }
};