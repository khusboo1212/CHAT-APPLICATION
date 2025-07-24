const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username = prompt("Enter your name:");
socket.emit('set username', username);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim()) {
    const msg = input.value;
    addMessage({ user: username, text: msg }, true); // Show your own message
    socket.emit('chat message', msg);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  if (msg.user !== username) {
    addMessage(msg, false); // Show other users' messages
  }
});

function addMessage(message, isSender) {
  const item = document.createElement('li');
  item.textContent = `${message.user}: ${message.text}`;
  item.classList.add(isSender ? 'sent' : 'received');
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}
