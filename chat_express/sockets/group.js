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
      console.log('sendGroup:',info)
      console.log('----------- info.group -------------')
      socket.join(info.group, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room_name' ]
      });
      socket.nsp.to(info.group).emit('sendGroup', info.msg)
    })
    
    socket.on('getMember', (group_name) => {
      console.log('getMember:', group_name)
      const id = socket.id
      const rooms = socket.nsp.adapter.rooms
      // let arrMember = []
      console.log('------------------------------------')
      console.log('socket.nsp.adapter.rooms :', rooms )
      console.log('------------------------------------')
      console.log(`Object.keys(rooms) : `, Object.keys(rooms) )

      let arrMember = []
      if ( rooms.hasOwnProperty(group_name) ) {
        arrMember = Object.keys(rooms[group_name].sockets)
        console.log('------------------------------------')
        console.log('arrMember :', arrMember)
      }
      const ret = arrMember.length
        ? { code: 0, arrMember, message: id }
        : { code: 1, arrMember, message: '아무도 없습니다.' }
      console.log('------------------------------------')
      console.log('ret :', ret)
      socket.emit('getMember', ret)
    })

    socket.on('disconnect', (s) => {
      const id = socket.id
      console.log(`disconnected user : ${id}`)
    })
  }
}