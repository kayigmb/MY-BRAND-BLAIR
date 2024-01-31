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


function validate() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validation();
    });
}

validate();

function validation() {
    const name = document.getElementById('name');
    const enteredName = name.value.trim();
    const email = document.getElementById('email');
    const enteredEmail = email.value.trim();
    const textarea = document.querySelector('textarea');
    const enteredText = textarea.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    error.innerHTML = '';

    if (enteredName === '') {
        errorMessage(" Enter a VALID name");
    }
    if (enteredEmail === ""){
        errorMessage('Enter an VALID email')

    } else if(!emailRegex.test(enteredEmail)){
        errorMessage('Enter a VALID email')
    }

    if(enteredText === ""){
        errorMessage('Enter a  VALID text');
    }

}

function errorMessage(message) {
    const word = document.createElement('p');
    error.appendChild(word);
    word.innerHTML = message;
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






