console.log("Login : Hello World");

const form = document.querySelector(".login form"),
continueButton = form.querySelector(".button input"),
errorText = form.querySelector(".error-txt");


form.onsubmit = (e) => {
    e.preventDefault(); // Prevents form from subbmtting
}

continueButton.onclick = () => {
    // Ajax code
    let xhr = new XMLHttpRequest(); // Creating XML object
    xhr.open("POST", "php/login.php", true); // Can take many parameters
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response; // Gives the response of the passed URL
                console.log(data);
                if (data == "success") {
                    location.href = "users.php";
                } else {
                    errorText.style.display = "block";
                    errorText.textContent = data;
                }
            }
        }
    }
    // Sending form data through Ajax to php
    let formData = new FormData(form); // Creating new formData Object
    xhr.send(formData); // Sending form data to php
}