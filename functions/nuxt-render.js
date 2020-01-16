const { resolve } = require('path')
const { Nuxt } = require('nuxt-start')
const { loadNuxtConfig } = require('@nuxt/cli')
const fs = require('fs')

exports.handler = async (event, context) => {
  // console.log(event, context, callback)
  const argv = { _: [resolve(__dirname, '..')], 'config-file': 'nuxt.config.js' }
  const config = await loadNuxtConfig(argv)
  // Load like nuxt start without starting a server
  config.dev = false
  config._start = true
  // Load nuxt
  const nuxt = new Nuxt(config)
  await nuxt.ready()

  console.log(fs.readdirSync(resolve(__dirname, '..')))

  // Render a route
  const { html } = await nuxt.renderRoute('/')

  return { statusCode: 200, body: html }
}
