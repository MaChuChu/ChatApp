const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e) => {
    e.preventDefault(); // Prevents form from subbmtting
}

sendBtn.onclick = () => {
    // Ajax code
    let xhr = new XMLHttpRequest(); // Creating XML object
    xhr.open("POST", "php/insert-chat.php", true); // Can take many parameters
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; // Message inserted into database then it will be blank
                scrollToBottom();
            }
        }
    }
    // Sending form data through Ajax to php
    let formData = new FormData(form); // Creating new formData Object
    xhr.send(formData); // Sending form data to php
}

chatBox.onmouseenter = () => {
    chatBox.classList.add("active");
}

chatBox.onmouseleave = () => {
    chatBox.classList.remove("active");
}

setInterval(() => {
    // Ajax code
    let xhr = new XMLHttpRequest(); // Creating XML object
    xhr.open("POST", "php/get-chat.php", true); // Can take many parameters
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response; // Gives the response of the passed URL
                chatBox.innerHTML = data;
                if (!chatBox.classList.contains("active")) { // No active class in chatbox, then scroll to bottom
                    scrollToBottom();
                }
            }
        }
    }

    // Sending form data through Ajax to php
    let formData = new FormData(form); // Creating new formData Object
    xhr.send(formData); // Sending form data to php
}, 500); // Function will run frequently after 500ms

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}