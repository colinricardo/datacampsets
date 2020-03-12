// @ts-ignore
const envType = process.env.node_env || `local`;
console.log(`env type -->`, process.env.node_env || `local`);

const staging = {
  API: "",
  GA_TRACKING_ID: "",
  envType,
};

const production = {
  ...staging,
  API: "https://api.datacampsets.com/api/v1",
  GA_TRACKING_ID: "UA-128508377-5",
};

const local = {
  ...staging,
  API: "http://localhost:5000/api/v1",
};

const configs = {
  staging,
  production,
  local
};

const config = configs[envType];

module.exports = { ...config };
