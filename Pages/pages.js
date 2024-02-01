
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

// username keyup event
username.addEventListener("keyup",()=>{
    errorDiv.innerHTML = '';
    validateName()
});

// password keyup event
password.addEventListener("keyup",()=>{   
    errorDiv.innerHTML = '';
    validatePassword()   
});

// validate username
function validateName(){
    const userName = username.value.trim();

    if(userName === ""){        
        errorMessage("Enter a username")
    }
}

// validate password
function validatePassword(){
    const passWord = password.value.trim();

    if(passWord === ""){
        errorMessage("Enter a password")
    }
    else if(passWord.length < 5 ){
        errorMessage("Password is too short")
    }
    else if(passWord.length > 15){
        errorMessage('Password is too long')
    }
}


// validation 
function validate(){
    const userName = username.value.trim();
    const passWord = password.value.trim();

    errorDiv.innerHTML = '';

    validateName();
    validatePassword();

    if(userName.length > 0 && passWord.length > 0){
        validateLogin(userName,passWord)
    } 


}


// validate login
function validateLogin(name,pass){
        if (name !== "admin"){
            errorMessage("Wrong login name")
        }

        if(pass !== "admin123"){
            errorMessage("Wrong login password")
        }
        if(name === "admin" && pass === "admin123"){
            window.location.href = "/Admin/dashbord.html";
        }
    
}

// error message
function errorMessage(message) {
    const errorWord = document.createElement("p");
    errorWord.innerHTML = message;
    errorDiv.appendChild(errorWord);
}




