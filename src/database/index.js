import mongoose from 'mongoose';

/**
 * NOTE: It is expected an environment variable will be supplied in the case of
 * connecting to an actual production database, or running with Docker. If no
 * variable is supplied, `NODE_ENV` will be used to determine the database url.
 * The `production` NODE_ENV in this case would still be a local build of the
 * application and does not connect to the real prod database; hence why there
 * is no username or password.
 */
const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : {
  'development': 'mongodb://localhost:27017/dev_db',
  'production': 'mongodb://localhost:27017/prod_db',
  'test': 'mongodb://localhost:27017/test_db',
}[process.env.NODE_ENV] || 'mongodb://localhost:27017/dev_db';

export default {
  disconnect: () => mongoose.connection.close(),
  connect: () => mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
};
