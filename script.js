const audioUhOh = new Audio('https://www.myinstants.com/media/sounds/icq-uh-oh.mp3');

const contactScreen = document.getElementById('contact-screen');
const chatScreen = document.getElementById('chat-screen');
const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const chatUserName = document.getElementById('chat-user-name');

function openChat(name, status) {
    contactScreen.style.display = 'none';
    chatScreen.style.display = 'flex';
    chatUserName.innerText = (status === 'online' ? '🌻 ' : '😡 ') + name;
    audioUhOh.play().catch(() => {});
}

function closeChat() {
    chatScreen.style.display = 'none';
    contactScreen.style.display = 'flex';
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatHistory.innerHTML += `<div class="msg"><span class="msg-me">Вы:</span> ${text}</div>`;
    chatInput.value = "";
    chatHistory.scrollTop = chatHistory.scrollHeight;

    setTimeout(() => {
        audioUhOh.play().catch(() => {});
        chatHistory.innerHTML += `<div class="msg"><span class="msg-them">Он:</span> ПрЮвЕт! Как делы? ))</div>`;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1000);
}

// Отправка по Enter
chatInput.addEventListener("keypress", (e) => { if(e.key === "Enter") sendMessage(); });
