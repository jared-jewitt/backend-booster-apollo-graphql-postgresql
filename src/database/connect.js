import mongoose from 'mongoose';

const connectionString = !process.env.DB_HOST
  ? 'mongodb://localhost:27017/fullstack-database'
  : `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export default () => mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});