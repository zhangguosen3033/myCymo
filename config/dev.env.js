'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '""',
  API_TOKEN: '"bearer 467405f6-331c-4914-beb7-42027bf09a01"'
})