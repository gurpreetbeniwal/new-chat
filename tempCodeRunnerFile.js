const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
////  requriment taken from web site "socket.io"  ////
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const users ={};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
  });
  app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
  });
  app.get('/sent.png', (req, res) => {
    res.sendFile(__dirname + '/sent.png');
  });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
       
    });
    socket.on('disconnect', message =>{
      console.log(`user disconnected ${users[socket.id]}`);
      socket.broadcast.emit( 'left', users[socket.id])
      delete users[socket.id];
      });

    socket.on("new-user-join",name=>{
      console.log(`${name} joined`);
          users[socket.id]=name;
          socket.broadcast.emit('user-join',name); /// user join
  })

  //// to send massage to  everyone  us the io.emit() method to brodecast 
        // socket.on('chat message', (msg) => {
        //     console.log('message: ' + msg);
        //     io.emit('chat message', msg);
        //   });

          socket.on ('send', message =>{
            console.log('message: ' + message);
            socket.broadcast.emit('receive', {message:message , name:users[socket.id]})
            });

  });

  server.listen(PORT, () => {
  console.log('listening on :3000');
});