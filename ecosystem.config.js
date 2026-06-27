module.exports = {
  apps: [
    {
      name: "lovi",
      script: ".next/standalone/server.js",
      cwd: "/home/desgvjox/apps/loviroots",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
