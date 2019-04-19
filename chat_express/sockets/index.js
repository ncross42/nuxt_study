
module.exports = function(io){
  io.on('connection', function(socket){
    console.log("global connection", socket.id)
    socket.on('echo', function(msg){
      io.emit('echo', msg);
    });
  });
}