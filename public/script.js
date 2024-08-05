





var socket = io();
const name = prompt("enter you name to join");
var messages = document.getElementById('messages');

const appendFun = (message, position)=>{
    const messageElement = document. createElement ( 'div');
    messageElement.innerText = message;
    
    messageElement.classList.add(position);
    msgCantaner.append (messageElement) ;
}

socket.emit("new-user-join",name);

socket.on("user-join", name=>{
var item = document.createElement('div');
item.classList.add('message');
item.classList.add('left');
item.textContent = `${name}: joind the chat`;
messages.appendChild(item);
})




var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
e.preventDefault();////preventDefault stope your page to re load

if (input.value) {
  const massageimp =input.value;
  console.log(massageimp);
    socket.emit('send', massageimp);
    input.value = '';
     ///
  var item = document.createElement('div');
  item.classList.add('message');
  item.classList.add('sent');
  item.textContent = `you : ${massageimp}`;
  messages.appendChild(item);
  ///
}
});



socket.on('receive', data =>{
var item = document.createElement('div');
item.classList.add('message');
item.classList.add('received');
item.textContent = `${data.name} : ${data.message}`;
messages.appendChild(item); });

//// on user left
socket.on('left', name =>{
  var item = document.createElement('div');
  item.classList.add('message');
  item.classList.add('received');
  item.textContent = `left the chat :${name}`;
  messages.appendChild(item); });


// socket.on('chat message', function(msg) {
// var item = document.createElement('div');
// item.classList.add('message');
// item.classList.add('right');
// item.textContent = msg;
// messages.appendChild(item);
// });