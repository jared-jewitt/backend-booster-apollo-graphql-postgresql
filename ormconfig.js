module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV === "development",
  synchronize: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
  migrationsRun: process.env.NODE_ENV === "production",
  migrationsTableName: "migrations",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
