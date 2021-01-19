import socketio from 'socket.io'
import http from 'http'
import path from 'path'
import fs from 'fs'

const defaultHandler = (req, res) => {
  fs.readFile(path.join(__dirname, './index.html'), 'utf8',
    function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading demo.html')
      }

      res.writeHead(200)
      res.end(data)
    })
}

const app = http.createServer(defaultHandler)
const io = socketio(app, {
  cors: {
    origin: '*',
    credentials: true
  }
})

const start = (port) => {
  console.log(`socket app is running on localhost:${port}`)
  app.listen(port)
}

io.on('connection', (socket) => {
  socket.on('CHAT_MESSAGE', (msg) => {
    io.sockets.emit('CHAT_MESSAGE', msg)
  })
})

start(9000)