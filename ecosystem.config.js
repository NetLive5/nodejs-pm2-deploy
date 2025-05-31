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
      user: "praktikum",
      host: "158.160.100.179",
      ref: "origin/master",
      repo: "git@github.com:NetLive5/nodejs-pm2-deploy.git",
      path: "/home/praktikum/nodejs-pm2-deploy",

      "pre-deploy":
        "scp -i /Users/netlive/.ssh/id_rsa backend/.env praktikum@158.160.100.179:/home/praktikum/nodejs-pm2-deploy/current/backend/.env",

      "post-deploy":
        "cd current/backend && npm ci && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
