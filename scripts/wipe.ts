import dotenv from "dotenv";
import {
  Connection as TypeORMConnection,
  createConnection as createDatabaseConnection,
} from "typeorm";

if (!process.env.IN_COMPOSE && !process.env.IN_GOOGLE_CLOUD) {
  dotenv.config({ path: "./.env.localhost.development" });
}

let database: TypeORMConnection;

(async (): Promise<void> => {
  try {
    database = await createDatabaseConnection("wipe");

    console.log("Database wiped!");
    await database.close();
    process.exit(0);
  } catch (e) {
    console.log(e);
    await database.close();
    process.exit(1);
  }
})();
