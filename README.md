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

1. Rename [.env-example](.env-example) file to `.env` and paste your desired env variable(s) there.

2. Run the app via either of the options below. After that, visit your app at `http://localhost:5000`.

##### Without Docker
```
npm install
npm run start
```
 
##### With Docker
```
# Network
docker network create --driver=bridge portable-network

# Database
docker build --file=database.Dockerfile --tag=portable-mongo:dev .
docker run -d --publish=27017:27017 --name=portable_mongo --network=portable-network --volume=db-data:/data/db portable-mongo:dev

# Server
docker build --file=server.Dockerfile.development --tag=portable-graphql:dev .
docker run -d --publish=5000:5000 --name=portable_graphql --network=portable-network --volume=${PWD}:/usr/src/app --volume=/usr/src/app/node_modules --env="DATABASE_URL=mongodb://portable_mongo:27017/dev_db" portable-graphql:dev                    
```

## Commands

| Command               | Description                                                                  |
|-----------------------|------------------------------------------------------------------------------|
| npm run start         | Runs the application locally with hot reloading on port 5000                 |
| npm run build         | Builds the application                                                       |
| npm run serve         | Runs the built application on port 5000. Requires ***npm run build*** first  |
| npm run test          | Runs all jest tests                                                          |
| npm run test:update   | Updates jest snapshot files                                                  |
| npm run test:coverage | Runs all jest tests and displays a coverage report in the console            |
| npm run lint          | Identifies linting warnings/errors                                           |
| npm run lint:fix      | Fixes linting errors                                                         |
| npm run seed-db       | TODO                                                                         |

## License

Code released under the [Apache License, Version 2.0](LICENSE).
