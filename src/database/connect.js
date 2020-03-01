import mongoose from 'mongoose';

const connectionString = process.env.DATABASE_URL
  ? `${process.env.DATABASE_URL}?authSource=admin`
  : process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/test_db'
    : 'mongodb://localhost:27017/dev_db';

export default () => mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});