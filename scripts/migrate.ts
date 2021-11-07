import { exec } from "child_process";

enum Action {
  Generate = "generate",
  Create = "create",
  Up = "up",
  Down = "down",
  Show = "show",
}

const run = (...[command, ...rest]: string[]): void => {
  exec(command, (error, stdout, stderr) => {
    if (stderr) {
      console.log(stderr);
      process.exit(1);
    } else {
      console.log(stdout);
      rest.length && run(...rest);
    }
  });
};

((): void => {
  const action = process.argv[2];
  const flags = process.argv.slice(2).join().replace(/,/g, " ").replace(action, "");
  const typeorm = "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --connection migrate";

  switch (action) {
    case Action.Generate:
      run(`${typeorm} migration:generate --pretty ${flags}`, "prettier --write migrations/**/*.ts");
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
})();
