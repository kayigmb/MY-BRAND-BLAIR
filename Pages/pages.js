
// Sign in page links 

function goHome(){
    window.location.href = "/index.html";
}
// validation functions

const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorDiv = document.getElementsByClassName("error")[0];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
});

function validate() {
    const userName = username.value.trim();
    const passWord = password.value.trim();

    errorDiv.innerHTML = '';
    
    if (userName === '') {
        errorMessage("Enter username");
    }
    
    if (passWord === '') {
        errorMessage("Enter password");
    }
    else if(passWord.length < 5 ){
        errorMessage("Password is too short")
    }
    else if(passWord.length > 15){
        errorMessage('Password is too long')
    }
    
    
    if(userName === "admin" && passWord === "admin123"){
        window.location.href = "/Admin/dashbord.html";
    }
    else
    if(userName !== "admin" && passWord !== "admin123"){
        errorMessage("Wrong username or password")
    }

}


function errorMessage(message) {
    const errorWord = document.createElement("p");
    errorWord.innerHTML = message;
    errorDiv.appendChild(errorWord);
}


