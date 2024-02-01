// navigation bar code
const hmenu = document.querySelector('.hmenu');
                const mnav = document.querySelector('.mnav');
                const menuItems = document.querySelectorAll('.mnav a');
                
                hmenu.addEventListener('click',function() {
                    hmenu.classList.toggle('is-active');
                    mnav.classList.toggle('is-active');
                });
                menuItems.forEach(function(menuItem) {
                          menuItem.addEventListener('click', function() {
                         hmenu.classList.remove('is-active');
                         mnav.classList.remove('is-active');
        });
    });

// validation for landing page contact form

const form = document.getElementById('form');
const error = document.getElementById('errorContainer');



form.addEventListener('submit', (e) => {
        e.preventDefault();
        validation();
});



const name = document.getElementById('name');
const email = document.getElementById('email');
const textarea = document.querySelector('textarea');

function validation() {
    
    const enteredName = name.value.trim();    
    const enteredEmail = email.value.trim();    
    const enteredText = textarea.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    error.innerHTML = '';
    let valid = true;
    if (enteredName === '') {
        errorMessage(" Enter a name");
        valid = false
    }
    if (enteredEmail === ""){
        errorMessage('Enter an email')
        valid = false

    } else if(!emailRegex.test(enteredEmail)){
        errorMessage('Enter a valid email')
        valid = false
    }

    if(enteredText === ""){
        errorMessage('Enter a  text');
        valid = false
    }

    if(valid){
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
    
    let messageSent = JSON.parse(localStorage.getItem('messages'))||[];

    messageSent.push({
        name: enteredName,
        email: enteredEmail,
        text:enteredText
    });
    localStorage.setItem('messages', JSON.stringify(messageSent));
}

// slider 
document.addEventListener("DOMContentLoaded", function () {
    const blogPages = document.querySelector('.blog_pages');
    const leftButton = document.querySelector('.left');
    const rightButton = document.querySelector('.right');

    let current = 0;
    const pages = document.querySelectorAll('.blog_individual');

    leftButton.addEventListener('click', function () {
        if (current > 0) {
            current--;
        }
        scroll();
    });

    rightButton.addEventListener('click', function () {
        if (current < pages.length - 1) {
            current++;
        }
        scroll();
    });

    function scroll() {
        const pageWidth = pages[current].offsetWidth;
        blogPages.scrollLeft = current * pageWidth;
    }
});









