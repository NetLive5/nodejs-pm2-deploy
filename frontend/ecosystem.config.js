require("dotenv").config({ path: "./frontend/.env" });

module.exports = {
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: "origin/master",
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      "post-deploy":
        "cd frontend && npm ci && source .env && NODE_OPTIONS=--openssl-legacy-provider npm run build && rsync -avz build/ /var/www/mesto",
    },
  },
};
