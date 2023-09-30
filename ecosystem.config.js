/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: 'agencygo-server',
      script: 'npm',
      args: 'run dev',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
