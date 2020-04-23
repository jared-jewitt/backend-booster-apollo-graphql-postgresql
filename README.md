# Portable Backend Boilerplate - GraphQL

This codebase is a boilerplate for creating GraphQL applications. It is intended to be used as a module for 
my [Launch pads](https://github.com/launch-pads). However, that being said, it can still be used completely on its own.

In order for a portable boilerplate to work with a Launch pad, it must abide by the following guidelines:
> <https://github.com/portable-boilerplates/guidelines>

This boilerplate contains the following development tooling:

- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Nodemon](https://nodemon.io/)
- [Jest](https://jestjs.io/)

#### Requirements (If not using Docker):

- [Node](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

1. Rename [.env-example](.env-example) file to `.env` and enter a value for `JWT_SECRET`, as well as add any other
desired env variable(s) you may want

2. Run the app via either of the options below. After that, visit your app at `http://localhost:5000`

##### Without Docker

```
npm install
npm run start
```
 
##### With Docker

```
docker-compose up
```

## Commands

> Note: To use these commands with Docker, run them as such: `docker exec client npm run ...` (make sure the container
> is already running).

| Command               | Description                                                        |
|-----------------------|--------------------------------------------------------------------|
| npm run build         | Builds the application                                             |
| npm run start         | Runs the application locally with hot reloading on port 5000       |
| npm run serve         | Builds the application then runs the application on port 5000      |
| npm run db:seed       | Seeds the database with dummy data                                 |
| npm run db:wipe       | Purges all records from the database                               |
| npm run test          | Runs all jest tests                                                |
| npm run test:update   | Updates jest snapshot files                                        |
| npm run test:coverage | Runs all jest tests and displays a coverage report in the console  |
| npm run lint          | Identifies linting warnings/errors                                 |
| npm run lint:fix      | Fixes linting errors                                               |

## License

Code released under the [Apache License, Version 2.0](LICENSE).
