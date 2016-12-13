import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import ip from 'ip';


const devServerConfig = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
}

new WebpackDevServer(Webpack(config), devServerConfig)
  .listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0' , (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 3000}`);
});