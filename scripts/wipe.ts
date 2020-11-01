import { createConnection } from "typeorm";

(async (): Promise<void> => {
  try {
    const database = await createConnection();

    await database.dropDatabase();

    console.log("Database wiped!");
  } catch (e) {
    console.error(e);
  }
})();
