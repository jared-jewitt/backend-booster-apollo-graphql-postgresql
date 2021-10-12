import isDocker from "is-docker";
import dotenv from "dotenv";
import { exec } from "child_process";
import { createConnection as createDatabaseConnection } from "typeorm";

if (!isDocker()) {
  dotenv.config({ path: "./.env.localhost.development" });
}

enum Action {
  Generate = "generate",
  Create = "create",
  Up = "up",
  Down = "down",
  Show = "show",
}

const run = (...[command, ...rest]: string[]): void => {
  exec(command, (error, stdout) => {
    error ? console.error(error) : console.log(stdout);
    rest.length && run(...rest);
  });
};

(async (): Promise<void> => {
  const database = await createDatabaseConnection("migrate");

  const action = process.argv[2];
  const flags = process.argv.slice(2).join().replace(/,/g, " ").replace(action, "");
  const typeorm = "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js";

  switch (action) {
    case Action.Generate:
      run(`${typeorm} migration:generate ${flags}`, "prettier --write migrations/**/*.ts");
      break;
    case Action.Create:
      run(`${typeorm} migration:create ${flags}`, "prettier --write migrations/**/*.ts");
      break;
    case Action.Up:
      run(`${typeorm} migration:run ${flags}`);
      break;
    case Action.Down:
      run(`${typeorm} migration:revert ${flags}`);
      break;
    case Action.Show:
      run(`${typeorm} migration:show ${flags}`);
      break;
    default:
      throw new Error("Invalid migration command. Must pass either [generate|create|up|down|show]");
  }

  await database.close();
})().catch((e) => console.error(e));
