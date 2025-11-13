import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default (env, argv) => {
  const isEmulation = env && env.EMULATION === 'true'
  return {
    mode: argv.mode || 'production',
    entry: {
      main: './main.ts',
      preload: './preload.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.ojs'],
      alias: {
        src: path.resolve(__dirname, 'src/')
      }
    },
    module: {
      rules: [
        {
          oneOf: [
            // Everything else (css, omss, ocss, html)
            {
              test: /\.(omss|css|ocss|html)$/i,
              use: {
                loader: 'raw-loader',
                options: { esModule: false }
              }
            }
          ]
        },
        {
          test: /\.(js|ts)$/,
          loader: 'ts-loader',
          options: { transpileOnly: true }
        },

        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024 // <8kb → inline as base64
            }
          }
        },

        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource'
        },

        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
          type: 'asset/resource'
        },

        {
          test: /\.(txt|md)$/i,
          type: 'asset/source'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: isEmulation ? ['preload', 'main']: ['preload'],
        inject: 'head',
        chunksSortMode: (a, b) => {
          if (a.startsWith('preload')) {
            return -1
          }
          return 1
        }
      }),
      new webpack.DefinePlugin({
        __WEB_OUID_EMULATION__: JSON.stringify(isEmulation)
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
        ],
      }),
    ],
    devServer: {
      static: './dist',
      port: 3000,
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/index.html' }]
      }
    }
  }
}
