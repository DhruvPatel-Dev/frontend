
const socket = io('https://chat-app-backend-api-88av.onrender.com');
socket.on('connect', () => console.log('✅ WebSocket connected:', socket.id));
socket.on('connect_error', (err) => console.error('❌ WebSocket error:', err.message));

const userId = localStorage.getItem('userId');
socket.emit('login', userId);

const chatBox = document.getElementById('chatBox');

socket.on('sendMsg', (msg) => {
    const div = document.createElement('div');
    div.classList.add('message','received' );
    div.textContent = msg;
    chatBox.appendChild(div);
});

// const username = document.getElementById('username')
// username.innerText = 
const queryParams = new URLSearchParams(window.location.search);
const receiverId = queryParams.get('userId');


async function loadChat() {
    const token = localStorage.getItem('token');
  
    if (!token || !receiverId) {
        window.location.href = 'index.html'; // Redirect if no token or user ID
        return;
    }
   
    // Fetch user details (name)
    const userResponse = await fetch(`https://chat-app-backend-api-88av.onrender.com/api/v1/user/get/${receiverId}`, {
        headers: { Authorization: token },
    });
    const user = await userResponse.json();
    document.getElementById('chatUserName').innerText = `Chat with ${user.data.name}`;

    // Fetch messages
    const chatResponse = await fetch(`https://chat-app-backend-api-88av.onrender.com/api/v1/msg/get/${receiverId}`, {
        headers: { Authorization: token },
    });
    const messages = await chatResponse.json();
    chatBox.innerHTML = ''; // Clear chat
    messages.data.forEach((msg) => {
        addMsg(msg);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

async function sendMessage() {
    const token = localStorage.getItem('token');
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();

    if (!content) return;

    await fetch('https://chat-app-backend-api-88av.onrender.com/api/v1/msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ receiverId, content }),
    });

    messageInput.value = '';
    const msg = {
        senderId: userId,
        content,
    };
    addMsg(msg);
}

function goBack() {
    window.location.href = 'home.html'; // Navigate back to users list
}

function addMsg(msg) {
    const div = document.createElement('div');
    div.classList.add('message', msg.senderId === receiverId ? 'received' : 'sent');
    div.textContent = msg.content;
    chatBox.appendChild(div);
}

window.onload=loadChat(); // Load chat on page load
