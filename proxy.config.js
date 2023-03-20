var winston = require('winston');

function logProvider() {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}


var PROXY_CONF = {
  '/api/*': {
    target: 'http://buy-and-sell-3d5e9.uc.r.appspot.com/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    logProvider: logProvider
  },
};

module.exports = PROXY_CONF;