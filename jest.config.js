module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
