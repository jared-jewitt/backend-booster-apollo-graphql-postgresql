import { Schema, model } from 'mongoose';

export const PostModel = model('Post', new Schema({
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}));
