import socketIo from 'socket.io';
import { formatMessages } from '../utils/messages';
import {
  addUser,
  getCurrentUser,
  removeUser,
  getRoomUsers,
} from '../utils/users';

const data = {
  username: undefined,
  text: undefined,
};

export const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    //New User Joined room
    socket.on('JoinRoom', (msg) => {
      addUser(socket.client.id, msg.username, msg.room);
      const user = getCurrentUser(socket.client.id);
      if(user.username != undefined){
      socket.join(user.room);

      //Send a message to the newUser
      data.username = 'CHATBOT';
      data.text = 'Bienvenido! ';
      socket.emit('message', formatMessages(data));

      data.text = `${user.username} se ha unido al chat!`;

      //BroadCast when a user connects
      socket.broadcast.to(user.room).emit('message', formatMessages(data));

      //Send Room info
      const roomInfo = {
        room: user.room,
        users: getRoomUsers(user.room),
      };
      io.to(user.room).emit('roomUsers', roomInfo);
    }
    });

    //Let everyone knows that a user left the chat
    socket.on('disconnect', () => {
      const user = getCurrentUser(socket.client.id);
      if (user) {
        removeUser(socket.client.id);
        data.username = 'CHATBOT';
        data.text = `${user.username} a dejado el chat`;
        io.to(user.room).emit('message', formatMessages(data));

        //Send Room info
        const roomInfo = {
          room: user.room,
          users: getRoomUsers(user.room),
        };
        io.to(user.room).emit('roomUsers', roomInfo);
      }
    });

    //Listen for chat messages
    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.client.id);
      data.username = user.username;
      data.text = msg;
      io.to(user.room).emit('message', formatMessages(data));
    });
  });

  return io;
};
