module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    mocha: true
  },
  extends: 'elemefe',
  globals: {
    expect: true
  }
}
