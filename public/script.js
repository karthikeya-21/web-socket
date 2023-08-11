const socket = new WebSocket("ws://localhost:4050");
const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

socket.addEventListener('open',(event)=>{
    console.log("connected")
});

socket.addEventListener('message',(event)=>{
    var data=JSON.parse(event.data)
    if(data.type=="count"){
        clientsTotal.innerText=`Total-Clients : ${data.count}`
        console.log(data.count)
    }else if(data.type="sendmessage"){
        addMessageToUI(false, data)
        console.log("message-received",data)
    }
});


messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
  })

  function sendMessage() {
    if (messageInput.value === '') return
    // console.log(messageInput.value)
    const data = {
        type:"sendmessage",
      name: nameInput.value,
      message: messageInput.value,
      dateTime: new Date(),
    }
    messageInput.value = ''
    socket.send(JSON.stringify(data))
    addMessageToUI(true, data)
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