const path = require("path");

const baseOptions = {
  type: "postgres",
  migrationsTableName: "migrations",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.IN_GOOGLE_CLOUD ? process.env.DATABASE_NAME : {
    "production": "prod",
    "development": "dev",
    "test": "test",
  }[process.env.NODE_ENV || "development"],
};

const pathOptions = {
  migrations: [path.join(__dirname, "migrations/**/*.ts")],
  entities: [path.join(__dirname, "src/entities/**/*.entity.ts")],
  cli: {
    migrationsDir: path.join(__dirname, "migrations"),
    entitiesDir: path.join(__dirname, "src/entities"),
  },
};

module.exports = [
  {
    name: "default",
    logging: process.env.NODE_ENV === "development",
    dropSchema: process.env.NODE_ENV === "test",
    synchronize: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
    migrationsRun: false,
    ...baseOptions,
    ...(process.env.NODE_ENV === "production" ? {} : pathOptions)
  },
  {
    name: "seed",
    logging: true,
    dropSchema: true,
    synchronize: true,
    migrationsRun: false,
    ...baseOptions,
    ...pathOptions,
  },
  {
    name: "wipe",
    logging: true,
    dropSchema: true,
    synchronize: false,
    migrationsRun: false,
    ...baseOptions,
    ...pathOptions,
  },
  {
    name: "migrate",
    logging: true,
    dropSchema: false,
    synchronize: false,
    migrationsRun: false,
    ...baseOptions,
    ...pathOptions,
  },
];
