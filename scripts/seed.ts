import * as faker from "faker";
import {
  Connection as TypeORMConnection,
  createConnection as createDatabaseConnection,
} from "typeorm";
import { User, Post } from "@/entities";

let database: TypeORMConnection;

(async (): Promise<void> => {
  try {
    database = await createDatabaseConnection("seed");

    const userRepository = database.getRepository(User);
    const postRepository = database.getRepository(Post);

    const user = await userRepository.save({
      username: faker.internet.email(),
      password: faker.internet.password(),
    });

    for (let i = 0; i < 50; i++) {
      await postRepository.save({
        message: faker.random.words(5),
        userId: user.id,
      });
    }

    console.log("Database seeded!");
    await database.close();
    process.exit(0);
  } catch (e) {
    console.log(e);
    await database.close();
    process.exit(1);
  }
})();
