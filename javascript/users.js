console.log("Users : Hello World");

const searchBar = document.querySelector(".users .search input"),
searchButton = document.querySelector(".users .search button"),
usersList = document.querySelector(".users .users-list");

searchButton.onclick = ()=>{
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchButton.classList.toggle("active");
    searchBar.value = "";
}

searchBar.onkeyup = () => {
    let searchTerm = searchBar.value;
    if (searchTerm != "") { // Will only run Ajax once the user starts searching and when there is no active class
        searchBar.classList.add("active");
    } else {
        searchBar.classList.remove("active");
    }
    // Ajax code
    let xhr = new XMLHttpRequest(); // Creating XML object
    xhr.open("POST", "php/search.php", true); // Can take many parameters
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response; // Gives the response of the passed URL
                usersList.innerHTML = data;
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("searchTerm=" + searchTerm);
}

setInterval(() => {
    // Ajax code
    let xhr = new XMLHttpRequest(); // Creating XML object
    xhr.open("GET", "php/users.php", true); // Can take many parameters
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response; // Gives the response of the passed URL
                if (!searchBar.classList.contains("active")) { // if active does not contain in search bar
                    usersList.innerHTML = data;
                }
            }
        }
    }
    xhr.send();
}, 500); // Function will run frequently after 500ms