import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';

import { generateJWTToken } from '../../utils';

export default class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async login(loginInput) {
    const { username, password } = loginInput;
  
    const user = await this.context.models.UserModel.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
  
    if (!user) throw new UserInputError('User not found');
    if (!match) throw new UserInputError('Wrong credentials');
    
    return {
      ...user._doc,
      id: user._id,
      token: generateJWTToken(user),
    };
  }
  
  async register(registerInput) {
    const { username, password } = registerInput;
  
    const user = await this.context.models.UserModel.findOne({ username });
  
    if (user) throw new UserInputError('Username is taken');
    
    const newUser = new this.context.models.UserModel({
      username,
      password: await bcrypt.hash(password, 12),
      createdAt: new Date().toISOString()
    });
  
    const res = await newUser.save();
  
    return {
      ...res._doc,
      id: res._id,
    };
  }
}
