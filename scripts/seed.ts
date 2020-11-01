import { createConnection } from "typeorm";

import { User, Post } from "../app/entities";

(async (): Promise<void> => {
  try {
    const database = await createConnection();

    const userRepository = database.getRepository(User);
    const postRepository = database.getRepository(Post);

    await database.synchronize();
    const user = await userRepository.save({
      username: "username",
      password: "password",
    });

    for (let i = 0; i < 10; i++) {
      await postRepository.save({
        message: `Dummy post #${i + 1}`,
        userId: user.id,
      });
    }

    console.log("Database seeded!");
  } catch (e) {
    console.error(e);
  }
})();
