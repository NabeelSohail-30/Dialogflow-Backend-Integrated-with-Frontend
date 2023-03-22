
//Send Message Function
const handleUserMessage = () => {
    let message = document.getElementById('message').value;
    console.log(message);

    let time = msgTime()

    //display message on screen
    let chats = document.getElementById('chat');
    let userChat = `
            <div class="msg right-msg">
                <div class="msg-img"
                    style="background-image: url(https://cdn-icons-png.flaticon.com/512/4712/4712109.png)">
                </div>

                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">User</div>
                        <div class="msg-info-time">${time}</div>
                    </div>

                    <div class="msg-text">
                        ${message}
                    </div>
                </div>
            </div>
            `;

    chats.innerHTML += userChat;
    document.getElementById('message').value = '';

    //send message to server
    handleBotMessage(message);
    //displayBotMessage();
    //scrollChatScreenToBottom();
}

//Bot Message Function
const handleBotMessage = async (message) => {
    //send message to server
    axios.post('/webhook', {
        queryResult: {
            queryText: message,
            parameters: {}
        }
    })
        .then((res) => {
            console.log(res.data);
            let botChat = `
            <div class="msg left-msg">
                <div class="msg-img"
                    style="background-image: url(https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-883x1000.jpg)">
                </div>

                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                    </div>

                    <div class="msg-text">
                        ${res.data.fulfillmentText}
                    </div>
                </div>
            </div>
            `;
            let chats = document.getElementById('chat');
            chats.innerHTML += botChat;
        })
        .catch((err) => {
            console.log(err);
        })

    return false;
}

//Display Bot Message Function
const displayBotMessage = () => {
    let time = msgTime()

    //display message on screen
    let chats = document.getElementById('chat');
    let botMsg = "Hello, I am a bot. How can I help you?";
    let botChat = `
            <div class="msg left-msg">
            <div class="msg-img"
                style="background-image: url(https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots-883x1000.jpg)">
            </div>

            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">BOT</div>
                    <div class="msg-info-time">${time}</div>
                </div>

                <div class="msg-text">
                    ${botMsg}
                </div>
            </div>
        </div>
            `;

    chats.innerHTML += botChat;
};


//function to get message time
const msgTime = () => {
    let today = new Date();

    let hours = (today.getHours() % 12) || 12;
    hours = String(hours).padStart(2, '0')

    let minutes = String(today.getMinutes()).padStart(2, '0')

    let time = hours + ":" + minutes;
    time = time + (today.getHours() >= 12 ? ' PM' : ' AM');
    return time
}

// Function to scroll the chat screen to the bottom
function scrollChatScreenToBottom() {
    const chatScreen = document.querySelector('.chat');
    chatScreen.scrollTop = chatScreen.scrollHeight;
}

// Call the sendMessageToServer() function when the user submits the message
/* messageBox.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessageToServer();
}); */