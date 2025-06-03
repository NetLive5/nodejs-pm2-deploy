require("dotenv").config({ path: "./backend/.env" });

module.exports = {
  apps: [
    {
      name: "mesto",
      script: "dist/app.js",
      cwd: "./backend",
      env_production: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
    },
  ],
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: "origin/master",
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,

      "post-deploy":
        "cd backend && npm ci && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
