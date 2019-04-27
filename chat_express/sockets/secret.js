module.exports = (io) => {
  return function(socket){
    console.log("secret connection", socket.id)
    
    socket.on('echo', function(msg){
      console.log('echo',msg)
      // io.of('/secret').emit('echo', msg);
      socket.nsp.emit('echo', msg);
    });
    
    socket.on('disconnect', (s) => {
      const id = socket.id
      console.log(`disconnected user : ${id}`)
    })
  }
}