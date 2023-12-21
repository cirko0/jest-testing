import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/server_app";
const baseTestDir = "<rootDir>/src/test/server_app3";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // more info in the console
  // For big projects takes a lot of time (will only use when i am done with my implementations)
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*test.ts`],
  setupFiles: ["<rootDir>/src/test/server_app3/utils/config.ts"],
};

export default config;
