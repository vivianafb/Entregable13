import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../models/messages';
import { formatMessages } from '../utils/messages';
import {
  addUser,
  getCurrentUser,
  removeUser,
  getRoomUsers,
} from '../utils/users';


const data = {
  email: undefined,
  mensaje: undefined,
};

export const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', async (socket) => {
    // console.log('Nueva Conexion establecida!');
     let msges = await getAllMessages();
     socket.emit('receiveMessages', msges);
    //New User Joined room
    socket.on('JoinRoom', (msg) => {
      // msg.room = '';
      // addUser(socket.client.id, msg.username, msg.room);
       //const user = getCurrentUser(socket.client.id);
      // if(user.username != undefined){
      // socket.join(user.room);

      //Send a message to the newUser
      // data.email = 'CHATBOT';
      // data.mensaje = 'Bienvenido! ';
      // socket.emit('message', formatMessages(data));

      // data.mensaje = `${user.email} se ha unido al chat!`;

      //BroadCast when a user connects
      // socket.broadcast.emit('message', formatMessages(data));
    
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
        // const roomInfo = {
        //   room: user.room,
        //   users: getRoomUsers(user.room),
        // };
        // io.to(user.room).emit('roomUsers', roomInfo);
      }
    });

    //Listen for chat messages
    // socket.on('chatMessage', (msg) => {

    //    const user = getAllMessages();
    //     data.email = user.email;
    //     data.text = msg;
    //    io.emit('message', data); // emite message de main
    // });

    socket.on('newMessage', (msge) => {
      // console.log('LLEGO MENSAJE');
      addMessage(msge);
      io.emit('newMessage', msge);
      // io.emit('message', formatMessages(data));
    });
  });

  return io;
};
