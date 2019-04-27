module.exports = (io) => {
  return function(socket){
    console.log("group connection", socket.id)
    
    socket.on('echo', function(msg){
      console.log('echo',msg)
      // io.of('/group').emit('echo', msg);
      socket.nsp.emit('echo', msg);
    });

    socket.on('sendGroup', (info) => {
      const id = socket.id
      console.log('sendGroup',info)
      console.log('------------------------------------')
      // socket.join(info.group)
      // console.log('nsp.rooms', socket.nsp.rooms)
      // console.log('------------------------------------')
      socket.join(info.group, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
      });
      console.log('------------------------------------')
      console.log(io.adapter.rooms[info.group])
      socket.nsp.to(info.group).emit('sendGroup',info.msg)
    })
    
    socket.on('disconnect', (s) => {
      const id = socket.id
      console.log(`disconnected user : ${id}`)
    })
  }
}