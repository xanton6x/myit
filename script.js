// Ссылка на легендарный звук "О-оу!"
const audioUhOh = new Audio('https://www.myinstants.com/media/sounds/icq-uh-oh.mp3');

const chatWindow = document.getElementById('chat-window');
const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const chatUserTitle = document.getElementById('chat-user-title');

// Функция открытия чата
function openChat(name) {
    chatWindow.style.display = 'block';
    chatUserTitle.innerText = 'Чат с: ' + name;
    audioUhOh.play().catch(() => console.log("Нажми на страницу, чтобы звук заработал!"));
}

// Закрыть чат
function closeChat() {
    chatWindow.style.display = 'none';
}

// Отправить сообщение
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // Ваше сообщение
    const myMsg = `<div class="msg"><span class="msg-name">Вы:</span> <span>${text}</span></div>`;
    chatHistory.innerHTML += myMsg;
    chatInput.value = "";
    
    // Автопрокрутка вниз
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Имитация ответа через 1.5 секунды
    setTimeout(() => {
        audioUhOh.play();
        const responses = ["Превед!", "Как дела? =)", "Аська жива!", "О-оу!", "Я тут, пиши."];
        const randomRes = responses[Math.floor(Math.random() * responses.length)];
        
        const replyMsg = `<div class="msg"><span class="msg-name">Собеседник:</span> <span>${randomRes}</span></div>`;
        chatHistory.innerHTML += replyMsg;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1200);
}

// Позволяет отправлять сообщение по нажатию Enter
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
