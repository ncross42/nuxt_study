const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const http = require('http')
const socket = require('socket.io')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  const server = http.createServer(app)
  const io = socket(server)

  const chat = io.of('/chat').on('connection', (socket) => {
    consola.success('success')
    socket.on('everybody', (name) => {
      socket.emit('everybody',name)
      socket.broadcast.emit('everybody',name)
    }),
    socket.on('disconnect', (s) => {
      const id = socket.id
      consola.info(`disconnected id : ${id}`)
    })
  })

  // Listen the server
  server.listen(port, host)
  // app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })


}
start()
