const express = require('express');
const app = express();
const fs = require('fs')

const PORT = process.env.PORT || 3000;
////  requriment taken from web site "socket.io"  ////
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let savemsg =" " ;
let msgs ;

const users ={};

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {

  fs.readFile('savemassage.txt', (err, data) => {
    if (err) throw err;
    msgs =data.toString();
  });
    res.render('index',{data:msgs});
  });

  app.get('/admin', (req, res) => {

    fs.readFile('savemassage.txt', (err, data) => {
      if (err) throw err;
      msgs =data.toString();
    });
   console.log(msgs)
      res.render('admin',{data:msgs});
    });


io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('disconnect', message =>{
      console.log(`user disconnected ${users[socket.id]}`);
      socket.broadcast.emit( 'left', users[socket.id])
      delete users[socket.id];

      if(savemsg!=" ")
        fs.appendFile('savemassage.txt', savemsg, (err) => {
          // In case of a error throw err.
          if (err) throw err;
        })
        savemsg=" "
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
            savemsg = savemsg + `【 ${users[socket.id]} : ${message} 】  `
            socket.broadcast.emit('receive', {message:message , name:users[socket.id]})
                                        });

  });

  server.listen(PORT, () => {
  console.log('listening on :3000');
});