import * as faker from "faker";
import isDocker from "is-docker";
import dotenv from "dotenv";
import { createConnection as createDatabaseConnection } from "typeorm";
import { User, Post } from "@/entities";

if (!isDocker()) {
  dotenv.config({ path: "./.env.localhost.development" });
}

(async (): Promise<void> => {
  const database = await createDatabaseConnection("seed");

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

  await database.close();

  console.log("Database seeded!");
})().catch((e) => console.error(e));
