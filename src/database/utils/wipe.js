import path from 'path';
import mongoose from 'mongoose';
import { env } from 'custom-env';

import database from '..';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    await database.connect();
    await mongoose.connection.db.dropDatabase();
    console.log('Database wiped!');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    database.disconnect();
    process.exit();
  }
})();
