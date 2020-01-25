export const login = async (_, { loginInput }, { dataSources }) => {
  return await dataSources.userAPI.login(loginInput);
};

export const register = async (_, { registerInput }, { dataSources }) => {
  return await dataSources.userAPI.register(registerInput);
};