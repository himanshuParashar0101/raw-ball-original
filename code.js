var gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
var SEA = Gun.SEA;



var chatLog = gun.get('testChatApp5501').get('messageList');


let sendButton = document.getElementById('sendButton');
let messageInput = document.getElementById('messageInput');
let chatDisplay = document.getElementById('chatDisplay');

let generatedName;

function generateName(){ 

}


// if enter key pressed
function onTestChange() {
var key = window.event.keyCode;

// If the user has pressed enter
    if (key === 13) {
        gunSend()
    }
}



// if send button clicked
sendButton.onclick = () => { 
    gunSend()
};
function gunSend() {
    let message = messageInput.value;
    message = message.trim()
    message = message.replace(/\n|\r/g, "");

    console.log("sending", message);
    chatLog.put(message);
    messageInput.value = "";
}



chatLog.on((data) => { 
    console.log("received", data);

    let thisMessage = data;
    thisMessage = thisMessage.trim()
    thisMessage = thisMessage.replace(/\n|\r/g, "");


    // html template for messages
    let messageTemplate = 
    '<article class="chatItem">\
        <p>\
            <img class="avatar" src="logo.jpg" alt="" width="50" height="50">\
            <span style="font-weight:bold">'+localStorage.userId+': </span>\
            <span>'+ thisMessage +'</span>\
        </p>\
    </article>'

    // insert new chat message to display
    chatDisplay.insertAdjacentHTML('beforeend', messageTemplate)

    //scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    });
