const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));


// If user is not logged in
if (!token) {
    window.location.href = "/";
}


// Send message
const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const messages =
    document.getElementById("messages");


function sendMessage() {

    const text =
        messageInput.value.trim();

    if (text === "") {
        return;
    }

    const now = new Date();

    const time =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    const message =
        document.createElement("div");

    message.className =
        "message sent";

    message.innerHTML = `
        <p>${text}</p>
        <span>${time}</span>
    `;

    messages.appendChild(message);

    messageInput.value = "";

    messages.scrollTop =
        messages.scrollHeight;
}


// Button click
sendBtn.addEventListener(
    "click",
    sendMessage
);


// Enter key
messageInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    }
);


// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

    });