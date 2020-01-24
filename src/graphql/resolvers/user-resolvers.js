export const login = async (_, { loginInput }, { dataSources }) => {
  return dataSources.userAPI.login(loginInput);
};

export const register = async (_, { registerInput }, { dataSources }) => {
  return dataSources.userAPI.register(registerInput);
};