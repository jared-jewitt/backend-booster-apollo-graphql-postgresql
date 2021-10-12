import isDocker from "is-docker";
import dotenv from "dotenv";
import { createConnection as createDatabaseConnection } from "typeorm";

if (!isDocker()) {
  dotenv.config({ path: "./.env.localhost.development" });
}

(async (): Promise<void> => {
  const database = await createDatabaseConnection("wipe");

  await database.close();

  console.log("Database wiped!");
})().catch((e) => console.error(e));
