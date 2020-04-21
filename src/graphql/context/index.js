import getUserContext from './user-context';
import getModelsContext from './models-context';

export default ({ req, res }) => ({
  user: getUserContext(req),
  models: getModelsContext(),
});
