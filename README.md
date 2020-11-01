# Backend Booster - GraphQL + PostgreSQL

This codebase is a boilerplate for a GraphQL + PostgreSQL backend. It is intended to be used as a
[Booster](https://github.com/jared-jewitt/booster-guidelines) for my [Launchpad](https://github.com/jared-jewitt/launchpad).
However, that being said, it can still be used completely on its own - CI/CD and infrastructure (IaC) come pre-configured.

#### Requirements:

- [Docker](https://www.docker.com/) (Optional)
- [Node](https://nodejs.org/en/) (Required - unless Docker is used)
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (Optional - only for Windows users)

#### Features:

- [TypeGraphQL](https://typegraphql.com/)
- [TypeORM](https://typeorm.io/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [JWT](https://jwt.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://github.com/typicode/husky)
- [Jest](https://jestjs.io/)

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

Run the backend via either option below, then visit the server at `http://localhost:5000`

**_Docker:_**

```
make run
```

**_NPM:_**

```
npm install
npm start
```

## Commands

**_Docker:_**

| Command        | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| make run       | Launches the server                                                 |
| make close     | Closes the server                                                   |
| make purge     | Purges the server containers, images, networks, volumes             |
| make workspace | Shells into the server to run one-off commands. e.g. `npm run test` |

**_NPM:_**

| Command                                                               | Description                                     |
| --------------------------------------------------------------------- | ----------------------------------------------- |
| npm run build                                                         | Builds the server                               |
| npm run serve                                                         | Serves the built server on port 5000            |
| npm run start                                                         | Runs the server with hot reloading on port 5000 |
| npm run test                                                          | Runs the suite of Jest tests                    |
| npm run lint                                                          | Runs Prettier, and ESLint formatters            |
| npm run db:seed                                                       | Seeds the database with dummy data              |
| npm run db:wipe                                                       | Purges all database tables                      |
| npm run db:migrate [generate&#124;create&#124;up&#124;down&#124;show] | Performs a specified database migration action  |

## Deployment

[Instructions here](DEPLOYMENT.md).

## License

Code released under the [MIT License](LICENSE).
