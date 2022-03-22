const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  moduleNameMapper: {
    "\\module\\.css$": "identity-obj-proxy",
    // "\\.css$": require.resolve("./test/mockcss.js"),
    // "\\.scss$": require.resolve("./test/mockcss.js"),
  },
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverage: false,
  collectCoverageFrom: ["pages/**/*.{js,jsx,tsx,ts}", "!pages/cms/*.{js,jsx,tsx,ts}"],
  setupFiles: ['./setup.js'],
};
