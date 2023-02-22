module.exports = {
  include: ['./src', './__tests__', './migration'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    ['@babel/preset-typescript']
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ],
    ['@babel/plugin-proposal-class-properties'],
    [
      'module-resolver',
      {
        alias: {
          '@joi/*': './src/interface/Joi/*',
          '@type/*': './src/interface/type/*',
          '@service/*': './src/service/*',
          '@class/*': './src/helpers/class/*',
          '@utils/*': './src/helpers/utils/*',
          '@middleware/*': './src/middleware/*',
          '@manager/*': './src/manager/*',
          '@database/*': './src/database/*',
          '@app': './src/app',
          '@init/*': './src/init/*',
          '@enum/*': './src/enum/*',
          '@migration/*': './migration/*'
        }
      }
    ],
    ['jest-hoist']
  ]
}
