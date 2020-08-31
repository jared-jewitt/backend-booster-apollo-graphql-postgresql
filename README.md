# Server Booster - GraphQL

This codebase is a boilerplate for a GraphQL server. It is intended to be used as a
[Booster](https://github.com/jared-jewitt/booster-guidelines) for my [Launchpad](https://github.com/jared-jewitt/launch-pad). 
However, that being said, it can still be used completely on its own - CI/CD and infrastructure come pre-configured.

#### Requirements:

- [Docker](https://www.docker.com/) (Optional)
- [Node](https://nodejs.org/en/) (Optional if Docker is used)
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (Windows users only)

#### Features:

- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Nodemon](https://nodemon.io/)
- [Jest](https://jestjs.io/)

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

Run the server via either option below, then visit it at `http://localhost:5000`

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
|----------------|---------------------------------------------------------------------|
| make run       | Launches the server                                                 |
| make close     | Closes the server                                                   |
| make purge     | Purges the server containers, images, networks, volumes             |
| make workspace | Shells into the server to run one-off commands. e.g. `npm run test` |

**_NPM:_**

| Command               | Description                                                       |
|-----------------------|-------------------------------------------------------------------|
| npm run build         | Builds the server                                                 |
| npm run start         | Runs the server locally with hot reloading on port 5000           |
| npm run serve         | Runs the built server on port 5000                                |
| npm run test          | Runs all jest tests                                               |
| npm run test:update   | Updates jest snapshot files                                       |
| npm run test:coverage | Runs all jest tests and displays a coverage report in the console |
| npm run lint          | Identifies linting warnings/errors                                |
| npm run lint:fix      | Fixes linting errors                                              |

## Deployment

[Instructions here](DEPLOYMENT.md).

## License

Code released under the [MIT License](LICENSE).
