import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1500,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const PostModel = model('Post', PostSchema, 'posts');