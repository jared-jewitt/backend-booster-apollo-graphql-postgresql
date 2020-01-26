import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true,
    maxlength: 1500,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const PostModel = model('Post', PostSchema, 'posts');