export const VERSION_INFO = {
  version: 'local',
  releaseDate: '2024-01-01',
  environment: 'development'
} as const;

export const getVersionString = () => `v${VERSION_INFO.version}`;
export const getReleaseDate = () => VERSION_INFO.releaseDate;
export const getEnvironment = () => VERSION_INFO.environment;
