# Portable GraphQL Boilerplate

This codebase is a JavaScript boilerplate for creating [GraphQL](https://graphql.org/) applications. 

It contains the following development tooling:

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

1. Rename the `.env.example` file to `.env` and paste your desired env variables there. If you don't need env 
variables, just delete the file.

2. Run the app via either of the options below. After that, visit your app at `http://localhost:5000`.

##### Without Docker
```
$ npm install
$ npm run start
```
 
##### With Docker
```
$ docker build -f server.Dockerfile.development -t portable-graphql .
$ docker run -d -p 5000:5000 portable-graphql
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

## Deployment

The word "portable" from the repository name derives from the idea of infrastructure modularization.
Thus, this application is intended to be treated as a "child" repository. Deployment logic will sit in a separate
"parent" repository, which pulls in the child. That being said, to deploy your app, pick an appropriate launchpad from 
[my launchpads](https://github.com/launch-pads) and follow the deployment instructions there.

## License

Code released under the [Apache License, Version 2.0](LICENSE).