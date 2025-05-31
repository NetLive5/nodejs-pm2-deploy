require("dotenv").config();

const {
  DEPLOY_USER = "praktikum",
  DEPLOY_HOST = "158.160.100.179",
  DEPLOY_PATH = "/home/praktikum/nodejs-pm2-deploy",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto",
      script: "backend/dist/app.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: "origin/master",
      repo: "git@github.com:NetLive5/nodejs-pm2-deploy.git",
      path: DEPLOY_PATH,
      // скопировать .env в папку backend на сервере
      "pre-deploy": `scp backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend/.env`,
      "post-deploy":
        "cd backend && npm ci && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
