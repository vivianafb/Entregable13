import express from 'express';
import apiRouter from './routes/index'
import handlebars from 'express-handlebars'
import path from 'path';
import * as http from 'http';
import { initWsServer } from './services/socket';
import Config from './config';
import { connectToDB } from './services/db';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { StoreOptions } from './services/server.js';
import passport from './middlewares/auth';

const puerto = Config.PORT;
const app = express();
connectToDB();

const server = http.Server(app);
const myWSServer = initWsServer(server);
server.listen(puerto, () => console.log('Server up en puerto', puerto));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);

const messages = [];

myWSServer.on('connection',  (socket) =>{
  // console.log('\nUn cliente se ha conectado');
    // console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
    // console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

  socket.on('new-message',  (data)=> {
    const newMessage = {
      message: data,
    };
    messages.push(newMessage);
    myWSServer.emit('messages', messages);
  });

  socket.on('askData', (data) => {
    console.log('ME LLEGO DATA');
    myWSServer.emit('messages', messages);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

