import ConnectHistoryApiFallback = require('connect-history-api-fallback');
import Koa = require('koa');

interface historyApiFallbackUsageRequest extends Pick<Koa.Request, 'headers' | 'method' | 'url'> {}

interface koaMiddleHandler {
  (req: historyApiFallbackUsageRequest, _res: any, _next: any): any;
}

export default function makeKoaConnectHistoryApiFallbackAdapter(
  options?: ConnectHistoryApiFallback.Options
): Koa.Middleware {
  const middleware: koaMiddleHandler = ConnectHistoryApiFallback(options);
  const noop = function noopFunc() {};

  return function koaConnectHistoryApiFallbackAdapter(ctx, next) {
    middleware(ctx, null, noop);
    return next();
  };
}
