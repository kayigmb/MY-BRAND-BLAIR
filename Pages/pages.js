function goHome(){
    window.location.href = "/index.html";
}





const form = document.querySelector('form');
const error = document.getElementById('error');

const token = sessionStorage.getItem('token');

if(token){
    window.location.href = '../Admin/dashbord.html'
}

var valid = true

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

function validateName() {
    const enteredName = username.value.trim();  
    if (enteredName === '') {
        errorMessage("Enter a name");
        valid = false;
    }else if (enteredName.length <=3){
        errorMessage("Username should not less than 3 characters");
        valid = false;
    }
    else if (enteredName.length >= 16){
        errorMessage("Password should not more than 15 characters");
        valid = false;
    }

}

// VALIDATE password
password.addEventListener('keyup', () => {
    error.innerHTML = '';
    validatePassword();
});

function validatePassword() {
    const enteredText = password.value.trim();

    if (enteredText === "") {
        errorMessage('Enter a password');
        valid = false;
    }else if (enteredText.length <= 3) {

        errorMessage("Password should not less than 3 characters");
        valid = false;
    }
    else if (enteredText.length >= 16) {

        errorMessage("Password should not more than 15 haracters");
        valid = false;
    }
}

function errorMessage(message) {
    const word = document.createElement('p');
    error.appendChild(word);
    word.innerHTML = message;
}

// VALIDATE EVERYTHING
function validation() {

    error.innerHTML = '';

    validateName();
    validatePassword()

    if (valid = true) {
        console.log('validation finished');
        login()
    } 
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
                        sessionStorage.setItem('token', response.data.user.token);
                        window.location.href = '../Admin/dashbord.html'
                        
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




// document.getElementById('loginForm').addEventListener('submit',async(e)=>{
//     e.preventDefault();

//     try{
//         var username = document.getElementById('username').value.trim();
//         var password = document.getElementById('password').value.trim();
    
//         axios({
//             method:'POST',
//             url: 'https://mybrand-be-4hmq.onrender.com/api/signin',
//             data:{
//                 username: username,
//                 password: password
//             }
//         })
//         .then(function (response) {
//             // console.log(response.data.user.token); 
//             sessions.setItem('token', response.data.user.token);
//             window.location.href = '../Admin/dashbord.html'
            
//         })
//         .catch(function (error) {
//             alert(error.message); 
//         });
//     }catch(error) {

//         console.log(error);
//     }

// });
