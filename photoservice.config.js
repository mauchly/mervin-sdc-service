module.exports = {
  apps: [{
    name: "client-jason_FEC_service",
    script: "./public/bundle.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  },
  {
    name: "api-jason_FEC_service",
    script: "./server/index.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
    "NODE_ENV": "production"
    }
  }]
};