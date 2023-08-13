var socket = io();
const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

socket.on('connection', () => {
  console.log('Connected to server');
});


socket.on('totalclients',(data)=>{
  clientsTotal.innerText=`Total-Clients : ${data}`;
})

socket.on('message', (data) => {
  addMessageToUI(false, data);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
  })

  function sendMessage() {
    const name = nameInput.value; // Replace with appropriate source for the name
    const message = messageInput.value;
    const dateTime = new Date();

    if (message === '') return;

    const data = {
      type: 'sendmessage',
      name: name,
      message: message,
      dateTime: dateTime.toISOString(),
    };
    socket.emit('send_message', data);
    addMessageToUI(true, data);
    messageInput.value = '';
  }

  function addMessageToUI(isOwnMessage, data) {
    // clearFeedback()
    const element = `
        <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
            <p class="message">
              ${data.message}
              <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
            </p>
          </li>
          `
    messageContainer.innerHTML += element
    scrollToBottom()
  }
  function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
  }