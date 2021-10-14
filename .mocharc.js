const dotenv = require("dotenv");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

if (!process.env.IN_GOOGLE_CLOUD && !process.env.IN_COMPOSE) {
  dotenv.config({ path: "./.env.localhost.test" });
}

chai.use(chaiAsPromised);

module.exports = {
  require: ["ts-node/register", "tsconfig-paths/register"],
  spec: {
    unit: "tests/unit/**/*.spec.ts",
    e2e: "tests/e2e/**/*.spec.ts",
    get all() {
      return [this.unit, this.e2e];
    }
  }[process.env.TYPE || "all"],
  timeout: 10000,
  recursive: true,
  color: true,
  diff: true,
  parallel: process.env.TYPE === "unit",
};
