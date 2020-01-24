import { getUser } from './user-context';
import { UserModel, PostModel } from '../../db/models';

export default ({ req }) => {
  return {
    user: getUser(req),
    models: {
      UserModel,
      PostModel,
    },
  };
};
