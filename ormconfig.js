module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV === "development",
  synchronize: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
  migrationsRun: process.env.NODE_ENV === "production",
  migrationsTableName: "migrations",
  entities: ["app/entities/**/*.ts"],
  migrations: ["app/migrations/**/*.ts"],
  subscribers: ["app/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "app/entities",
    migrationsDir: "app/migrations",
    subscribersDir: "app/subscribers",
  },
};
