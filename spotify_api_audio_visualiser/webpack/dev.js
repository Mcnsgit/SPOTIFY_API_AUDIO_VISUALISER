import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../serve'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, '../serve'),
    port: 3000
  }
});
