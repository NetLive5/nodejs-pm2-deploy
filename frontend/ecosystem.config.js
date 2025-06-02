module.exports = {
  deploy: {
    production: {
      user: "praktikum",
      host: "158.160.100.179",
      ref: "origin/master",
      repo: "git@github.com:NetLive5/nodejs-pm2-deploy.git",
      path: "/home/praktikum/nodejs-pm2-deploy",
      "post-deploy":
        "cd frontend && npm ci && NODE_OPTIONS=--openssl-legacy-provider npm run build && rsync -avz build/ /var/www/mesto",
    },
  },
};
