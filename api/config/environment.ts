// @ts-ignore
const envType = process.env.node_env || "local";

const staging = {
  CORS_ORIGIN_WHITELIST: ["http://localhost:3004"],
  SECRET: "doge",
  envType: "staging",
};

const production = {
  ...staging,
  CORS_ORIGIN_WHITELIST: ["http://localhost:3004", "https://citric-snow-269923.appspot.com", "https://datacampsets.com"],
  envType: "production",
};

const local = {
  ...staging,
  PORT: 5000,
  envType: "local",
};

const configs = {
  staging,
  production,
  local,
};

// @ts-ignore
const config = configs[envType];

export default config;
