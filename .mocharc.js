require("chai").use(require("chai-as-promised"));

module.exports = {
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
