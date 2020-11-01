import { exec } from "child_process";
import { createConnection } from "typeorm";

enum Action {
  Generate = "generate",
  Create = "create",
  Up = "up",
  Down = "down",
  Show = "show",
}

const execute = (...[command, ...rest]: string[]): void => {
  exec(command, (error, stdout) => {
    error ? console.error(error) : console.log(stdout);
    rest.length && execute(...rest);
  });
};

(async (): Promise<void> => {
  try {
    await createConnection();

    const action = process.argv[2];
    const flags = process.argv.slice(2).join().replace(/,/g, " ").replace(action, "");
    const typeorm = "ts-node ./node_modules/typeorm/cli.js";

    switch (action) {
      case Action.Generate:
        execute(`${typeorm} migration:generate ${flags}`, "npm run lint");
        break;
      case Action.Create:
        execute(`${typeorm} migration:create ${flags}`, "npm run lint");
        break;
      case Action.Up:
        execute(`${typeorm} migration:run ${flags}`);
        break;
      case Action.Down:
        execute(`${typeorm} migration:revert ${flags}`);
        break;
      case Action.Show:
        execute(`${typeorm} migration:show ${flags}`);
        break;
      default:
        throw new Error(
          "Invalid migration command. Must pass either [generate|create|up|down|show]"
        );
    }
  } catch (e) {
    console.error(e);
  }
})();
