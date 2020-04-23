module.exports = {
  apps: [
    {
      name: "diego-service",
      script: "dist/app.js",
      env: {
        name: "backend",
        NODE_ENV: "development",
      },
    },
  ],
};
