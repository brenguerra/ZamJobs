const io = require('socket.io')(8900, {
  cors: {
    origin: "http://localhost:3000"
  }
});


let users = []

const addUser = async (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId)=> {
  users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user)=>user.userId === userId);
}

io.on("connection", (socket) => {
  // take userId and socketId from user
  socket.on('addUser',(userId)=> {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  })

  // remove users on disconnect
  socket.on('disconnect', ()=> {
    removeUser(socket.id);
    io.emit('getUsers', users);
  })

  socket.on('sendMessage', ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    if(user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  })
})