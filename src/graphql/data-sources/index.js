import UserAPI from './users-datasource';
import PostAPI from './posts-datasource';

export default () => ({
  userAPI: new UserAPI(),
  postAPI: new PostAPI(),
});
