# Backend Booster - GraphQL + PostgreSQL

This codebase is a GraphQL + PostgreSQL boilerplate. It is intended to be used as a
[Booster](https://github.com/jared-jewitt/booster-guidelines) for my [Launchpad](https://github.com/jared-jewitt/launchpad).
However, that being said, it can still be used completely on its own.

#### Requirements:

- [Docker](https://www.docker.com/)
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) - Only for Windows users

#### Features:

- 👨‍🚀 Apollo Server 3
- 🦄 TSC + Webpack for code transpiling and bundling
- 🤖 TypeGraphQL + TypeORM for shared schema and entity classes
- 🔒 JWT based authentication
- 🌎 Path aliasing for streamlined imports
- 🌈 Prettier + ESLint for consistent code style
- 🐺 Husky + lint-staged for code quality assurance
- 🧪 Mocha + apollo-boost for unit and end-to-end tests

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

---

### 🏃 Getting Started

Starting the fully-fledged backend is as simple as running the commands below.

```shell
sh setup.sh

make database

make server
```

- The database container exposes port 5432 and can be viewed by using [Postico](https://eggerapps.at/postico/). 
  See [.env.development.local](.env.development.local) for connection values
- The server container exposes port 7000 and can be viewed by visiting http://localhost:7000

### ⌨️ Commands

###### Make

| Command         | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `make database` | Launches the database container                                         |
| `make server`   | Launches the server container                                           |
| `make down`     | Removes the database + server containers                                |
| `make nuke`     | Purges all database + server containers, images, networks, volumes      |
| `make bash`     | Shells into the server to run one-off commands. e.g. `npm run test:e2e` |

###### NPM

| Command                       | Description                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `npm run build`               | Bundles the app into a single `build` folder                                      |
| `npm run prod`                | Runs the built server on $PORT &#124;&#124; 7002 (must run `npm run build` first) |
| `npm run dev`                 | Runs the server with hot reloading on $PORT &#124;&#124; 7000                     |
| `npm run test`                | Runs the entire suite of unit and end-to-end tests                                |
| `npm run test:e2e`            | Runs the suite of end-to-end tests                                                |
| `npm run test:unit`           | Runs the suite of unit tests                                                      |
| `npm run db:seed`             | Seeds the database with dummy data                                                |
| `npm run db:wipe`             | Drops the database and all its data                                               |
| `npm run db:migrate:generate` | Generates a migration file with all SQL queries needed to update the database     |
| `npm run db:migrate:create`   | Creates an empty migration file for you to fill in                                |
| `npm run db:migrate:up`       | Executes all pending migrations                                                   |
| `npm run db:migrate:down`     | Reverts the most recently executed migration                                      |
| `npm run db:migrate:show`     | Shows all migrations and whether they've been run or not                          |

### 🌱 Environment Variables

Environment variables are injected into the app at runtime. To add a new environment variable, you will need to update
the following files:

- [.env.production.local](.env.production.local) - Loads environment variables for the app at runtime in prod mode
- [.env.development.local](.env.development.local) - Loads environment variables for the app at runtime in dev mode
- [.env.test.local](.env.test.local) - Loads environment variables for the app at runtime in test mode

Please note the environment variables in each of these places are only used when running the app locally. If you are 
deploying this app, it is expected you specify env vars on the hosted server and reference them in
[google-cloud-build/build.yaml](google-cloud-build/build.yaml) and
[google-cloud-build/promote.yaml](google-cloud-build/promote.yaml). See [deployment](DEPLOYMENT.md).

### 🔃 Migrations

Migrations are located in the [migrations](migrations) folder. To create a migration, run either of the following
commands:

- `npm run db:migrate:create -- -n <name>` --> This will create an empty migration file ready for you to populate
- `npm run db:migrate:generate -- -n <name>` --> This will create a migration file and write all SQL queries needed to 
   update the database. If there were no changes generated from the last migration, the command will exit with code 1

When creating and running migrations, it's a very good idea to stop your dev server if it's running. Since the server
runs with `syncronize` on in dev mode, it will automatically try to update your schema as you change your code. Which 
can be very frustrating as you're trying to test out your migrations.

### 🚀 Deployment

[Instructions here](DEPLOYMENT.md)

### ⚖️ License

Code released under the [MIT License](LICENSE)
