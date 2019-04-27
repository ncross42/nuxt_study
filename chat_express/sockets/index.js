const group = require('./group');
const secret = require('./secret');

var mapNameId = {}
var mapIdName = {}

module.exports = function(io){
  io.of('/group').on('connection', group(io))
  io.of('/secret').on('connection', secret(io))

  io.on('connection', function(socket){
    console.log("global connection", socket.id)
    socket.on('echo', function(msg){
      io.emit('echo', msg);
    });
    socket.on('enter', (name) => {
      const id = socket.id
      if (mapIdName.hasOwnProperty(id)) {
        const ret = { code: 1, name: mapIdName[id], message: `already socket_id : ${id}` }
        socket.emit('enter', ret)
        console.log(ret)
      } else if (mapNameId.hasOwnProperty(name)) {
        const ret = { code: 2, message: `already user_name : ${name}` }
        socket.emit('enter', ret)
        console.log(ret)
      } else {
        mapNameId[name] = id
        mapIdName[id] = name
        console.log(`new user(${name}) : ${id}`)
        const msg = `[${new Date().format('HH:mm:ss')}] '${name}' 님이 입장하였습니다.`
        const ret = { code: 0, name, message: msg }
        socket.emit('enter', ret)
        socket.broadcast.emit('sendAll', msg)
      }
    })
    socket.on('sendAll', (msg) => {
      const id = socket.id
      const ret = `[${new Date().format('HH:mm:ss')}] ${mapIdName[id]} : ${msg}`
      socket.emit('sendAll', ret)
      socket.broadcast.emit('sendAll', ret)
    })
    socket.on('sendWhisper', (info) => {
      const id = socket.id
      const whisperId = mapNameId[info.whisperUser]
      const ret = `[귓속말: ${mapIdName[id]} => ${info.whisperUser}] - ${info.msg} -- (${NOW()})`
      socket.emit('sendWhisper', ret)
      socket.to(whisperId).emit('sendWhisper', ret)
    })
    socket.on('disconnect', (s) => {
      const id = socket.id
      const name = mapIdName[id]
      console.log(`disconnected user : ${name}`)
      delete mapNameId[name]
      delete mapIdName[id]
    })
  });
}