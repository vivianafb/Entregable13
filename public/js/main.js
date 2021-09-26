// const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const formAuthor = document.getElementById('formAuthor');
const msg = document.getElementById('msg');
// const roomName = document.getElementById('room-name');
// const usersList = document.getElementById('users');
//GET Username & Room from url using qs CDN (https://cdnjs.com/libraries/qs)
const qsData = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


let date = new Date();
let now = date.toLocaleString();
// const { username, room } = qsData;

const socket = io();
//Join to the room
socket.emit('JoinRoom', qsData);

// socket.on('message', (data) => {
//   // alert(data.edad)
//   //add the message to the chat Window
//   outputMessage(data); // envia el data a la funcion
//   //Automatically scroll down to the last message
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

//Message submit
formAuthor.addEventListener('submit', (e) =>{
  e.preventDefault();
 
  if (email.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
       text: mensaje.value,
    };
    console.log('EMITIENDO SOCKET');
    socket.emit('newMessage', data);
    socket.emit('chatMessage',mensaje.value);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    alias.value = '',
    edad.value = '',
    avatar.value = '';
    mensaje.value = '';
  
  }
})

socket.on('receiveMessages', (mensajes) => {
  console.log(mensajes);
});

socket.on('newMessage', (mensaje) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${mensaje.author.email} <span> ${date}</span> </p>
  <p class="text"> ${mensaje.text} </p>`;

  chatMessages.appendChild(div);
});

// Va a socket.js al chatmessage
// chatForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   //Emit Message to the server
//    socket.emit('chatMessage', msg.value);

//   //Clear submitted message
//   msg.value = '';
// });

// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   div.innerHTML = `
//   <p class="meta">${message.author.email} <span> ${message.time}</span> </p>
//   <p class="text"> ${message.mensaje} </p>`;

//   chatMessages.appendChild(div);
// }

// function outputUsers(users) {
//   const arrayofUsers = users.map((aUser) => `<li>${aUser.username}</li>`);
//   console.log(arrayofUsers);
//   usersList.innerHTML = arrayofUsers.join('');
// }

//Get Room's Info
// socket.on('roomUsers', (roomInfo) => {
//   const { room, users } = roomInfo;

//   outputRoomName(room);
//   outputUsers(users);
// });

//add Room Name
// function outputRoomName(room) {
//   roomName.innerText = room;
// }