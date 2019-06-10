const Middleware = require('connect-history-api-fallback');

function makeKoaConnectHistoryApiFallbackAdapter(options) {
  const middleware = Middleware(options);
  const noop = function noopFunc() {};

  return function koaConnectHistoryApiFallbackAdapter(ctx, next) {
    middleware(ctx, null, noop);
    return next();
  };
}

module.exports = makeKoaConnectHistoryApiFallbackAdapter;
