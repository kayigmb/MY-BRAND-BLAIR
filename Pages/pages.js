function goHome(){
    window.location.href = "/index.html";
}





const form = document.querySelector('form');
const error = document.getElementById('error');

const token = sessionStorage.getItem('token');

if(token){
    window.location.href = '../Admin/dashbord.html'
}

let valid = true

form.addEventListener('submit', (e) => {
        e.preventDefault();
        validation();
});

const username = document.getElementById('username');
const password = document.getElementById('password');

// VALIDATE NAME
username.addEventListener('keyup', () =>{
    error.innerHTML = ''
    validateName()
})

// VALIDATE password
password.addEventListener('keyup', () => {
    error.innerHTML = '';
    validatePassword();
});

function validateName() {
    const enteredName = username.value.trim();  
    if (enteredName === '') {
        errorMessage("Enter a name");
        return false;
    } else if (enteredName.length <= 3) {
        errorMessage("Username should not be less than 3 characters");
        return false;
    } else if (enteredName.length >= 16) {
        errorMessage("Username should not be more than 15 characters");
        return false;
    }
    return true;
}

function validatePassword() {
    const enteredText = password.value.trim();

    if (enteredText === "") {
        errorMessage('Enter a password');
        return false;
    } else if (enteredText.length < 6) {
        errorMessage("Password should not be less than 6 characters");
        return false;
    } else if (enteredText.length >= 16) {
        errorMessage("Password should not be more than 15 characters");
        return false;
    }
    return true;
}

function validation() {
    error.innerHTML = '';

    const isNameValid = validateName();
    const isPasswordValid = validatePassword();

    if (isNameValid && isPasswordValid) {
        console.log('Validation finished');
        login();
    } else {
        console.log('Validation failed');
    }
}

function errorMessage(message) {
    const word = document.createElement('p');
    error.appendChild(word);
    word.innerHTML = message;
}


const login = async() => {
            try{            
                
                var username = document.getElementById('username').value.trim();
                var password = document.getElementById('password').value.trim();
                
                const btn = document.querySelector('.lgnbtn')
                btn.disabled = true;
                axios({
                    method:'POST',
                    url: 'https://mybrand-be-4hmq.onrender.com/api/signin',
                    data:{
                        username: username,
                        password: password
                    }
                })
                .then((response)=>{
                    // console.log(response.data.user.token); 
                    alertify.set('notifier','position', 'top-center');
                    alertify.success('Success Login');
                    sessionStorage.setItem('token', response.data.user.token);
                    window.location.href = '../Admin/dashbord.html'
                    btn.disabled = false;
                    
                })
                .catch((error)=>{
                    // alert(error.message); 
                    btn.disabled = false
                    errorMessage(error.response.data.message)

                    // console.log(error)
                });

            }catch(error) {
        
                console.log(error);
                
            }
}





