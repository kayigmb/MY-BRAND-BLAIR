// navigation bar code
const hmenu = document.querySelector('.hmenu');
                const mnav = document.querySelector('.mnav');
                const menuItems = document.querySelectorAll('.mnav a');
                
                hmenu.addEventListener('click',function() {
                    hmenu.classList.toggle('is-active');
                    mnav.classList.toggle('is-active');
                });

                menuItems.forEach((menuItem)=>{
                        menuItem.addEventListener('click', function() {
                        hmenu.classList.remove('is-active');
                        mnav.classList.remove('is-active');
                         });
                 });    

// validation for landing page contact form

const form = document.getElementById('form');
const error = document.getElementById('errorContainer');


var valid = true

form.addEventListener('submit', (e) => {
        e.preventDefault();
        validation();
});



const name = document.getElementById('name');
const email = document.getElementById('email');
const textarea = document.getElementById('text')


// VALIDATE NAME
name.addEventListener('keyup', () =>{
    error.innerHTML = ''
    validateName()
})

function validateName() {
    const enteredName = name.value.trim();  
    if (enteredName === '') {
        errorMessage("Enter a name");
        valid = false;
    }

}

// VALIDATE EMAIL
email.addEventListener('keyup', () => {
    error.innerHTML = '';
    validateEmail();
});

function validateEmail() {
    const enteredEmail = email.value.trim(); 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enteredEmail === '') {
        errorMessage('Enter an email');
        valid = false; 
    } else if (!emailRegex.test(enteredEmail)) {
        errorMessage('Enter a valid email');
        valid = false;
    } else {
        valid = true; 
    }
 }

// VALIDATE TEXT AREA
textarea.addEventListener('keyup', () => {
    error.innerHTML = '';
    validateTextArea();
});

function validateTextArea() {
    const enteredText = textarea.value.trim();

    if (enteredText === "") {
        errorMessage('Enter a text');
        valid = false;
    }
}


// VALIDATE EVERYTHING
function validation() {

    error.innerHTML = '';

    validateEmail();
    validateName();
    validateTextArea();

    if (valid == true) {
       contactUser();
    } 
}

function errorMessage(message) {
    const word = document.createElement('p');
    error.appendChild(word);
    word.innerHTML = message;
}

//  contact the user 

function contactUser(){

    const enteredName = name.value.trim();    
    const enteredEmail = email.value.trim();    
    const enteredText = textarea.value.trim();

    const btn = document.getElementById("btnMessage");
    btn.disabled = true;
    
    axios({
        method:'POST',
        url:'https://mybrand-be-4hmq.onrender.com/api/queries',
        data:{
            name: enteredName,
            email: enteredEmail,
            content:enteredText
        }
    }).then((response) => {
        
       alertify.set('notifier','position','top-center')
       alertify.success('Message Sent Successfully');
       btn.disabled = false;
        form.reset();
    
    }).catch((error) => {

        console.error(error);
        btn.disabled = false;
    })
   
}   



// slider 





// slider
document.addEventListener('DOMContentLoaded', function() {
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const pages = document.querySelector('.pages');

    left.addEventListener('click', function() {
        pages.scrollLeft -= pages.offsetWidth;
    });

    right.addEventListener('click', function() {
        pages.scrollLeft += pages.offsetWidth;
    });
});

