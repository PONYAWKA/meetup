const env = process.env;

const envs = {
  PORT: env["PORT"] ?? 3000,
  SECRET_ACCESS_KEY: env["SECRET_ACCESS_KEY"] ?? "KEY",
  SECRET_REFRESH_KEY: env["SECRET_REFRESH_KEY"] ?? "_KEY",
};

export const getBuildEnv = (key: keyof typeof envs) => {
  return envs[key];
};
