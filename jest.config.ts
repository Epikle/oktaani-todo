import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
