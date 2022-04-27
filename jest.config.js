const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  coveragePathIgnorePatterns: [],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "\\module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./styles/mockcss.js"),
    "\\.scss$": require.resolve("./styles/mockcss.js"),
  },
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{js,jsx,tsx,ts}",
    // "components/common/*/index.{js,jsx,tsx,ts}",
    "!components/**/descriptor.js",
    "!components/icons/*.{js,jsx,tsx,ts}",
    "!components/xm-component-library.ts",
    "!components/common/ui/**/*.{js,jsx,tsx,ts}",
    "!pages/cms/*.{js,jsx,tsx,ts}",
    "!components/common/app-content-wrapper/*.{js,jsx,tsx,ts}",
    "!components/common/bambuser-ended-sessions/*.{js,jsx,tsx,ts}",
    "!components/common/bambuser-popup/*.{js,jsx,tsx,ts}",
    "!components/common/header/index.tsx",
    "!components/common/card-slider/*.{js,jsx,tsx,ts}",
    "!components/common/brand-cards/*.{js,jsx,tsx,ts}",
    "!components/common/collection-card/*.{js,jsx,tsx,ts}",
    "!components/common/product-card/*.{js,jsx,tsx,ts}",
    "!components/common/product-listing/index.tsx",
  ],
  setupFiles: ["./setup.js"],
};
