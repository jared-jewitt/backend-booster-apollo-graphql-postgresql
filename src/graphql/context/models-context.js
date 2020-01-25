import { PostModel, UserModel } from '../../database/models';

export const getModelsContext = () => ({
  User: UserModel,
  Post: PostModel,
});