const modeToggle = document.getElementById('mode-toggle-checkbox');
const chatContainer = document.querySelector('.chat-container');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sidebar = document.querySelector('.sidebar');

modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const newConversationBtn = document.getElementById('new-conversation-btn');
    const conversationContent = document.querySelector('.conversation-content');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            chatContainer.style.width = '96%';
            chatContainer.style.marginLeft = '3%';
        } else {
            chatContainer.style.width = 'calc(100% - 300px)';
            chatContainer.style.marginLeft = '300px';
        }
    });

    newConversationBtn.addEventListener('click', function () {
        conversationContent.textContent = "Nova Conversa Iniciada!";
    });

    modeToggle.addEventListener('change', function () {
        chatContainer.classList.toggle('light-mode');
        chatContainer.classList.toggle('dark-mode');
    });
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('Usuario', message);
        getResponse(message);
        userInput.value = ''; 
    }
}

function appendMessage(sender, message) {
    const p = document.createElement('p');   
    p.innerHTML = `<strong>${sender}:</strong> ${message.replace(/\n/g, '<br>')}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(message) {
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_input=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        appendMessage('ChatStarling', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('ChatStarling', "Oops! Something went wrong.");
    });

    let response;
    if (message.toLowerCase() in commands) {
        response = commands[message.toLowerCase()];
    } else if (message.toLowerCase().includes("thank")) {
        response = getRandomElement(thanks);
    } else if (message.toLowerCase().includes("yes")) {
        response = getRandomElement(affirmatives);
    } else if (message.toLowerCase().includes("no")) {
        response = getRandomElement(negatives);
    } else {
        response = getRandomElement(greetings);
    }

    setTimeout(() => appendMessage('ChatStarling', response), 1000);
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
