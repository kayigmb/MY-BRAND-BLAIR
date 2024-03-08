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
    
    let messageSent = JSON.parse(localStorage.getItem('messages')) || [];

    messageSent.push({
        name: enteredName,
        email: enteredEmail,
        text:enteredText
    });
    localStorage.setItem('messages', JSON.stringify(messageSent));
    window.location.reload();
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


// blogs

function blogPagesShow(){

    const pages = document.querySelector('.pages')

    const posts =  JSON.parse(localStorage.getItem('post')) || [];

    posts.forEach((e)=>{
        const blog_individual = document.createElement('div');
        const image = document.createElement('img');
        const blog_word = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p')
        const a = document.createElement('a')
        const  iconReact = document.createElement('div');
        const icons = document.createElement('div');
        const react1 = document.createElement('div');
        const react2 = document.createElement('div');

        //class name
        blog_individual.className = 'blog_individual'
        blog_word.className = 'blog_word'
        iconReact.className = 'icons_reaction'
        icons.className = 'iconsreact'
        react1.className = 'reaction1'
        react2.className = 'reaction2'
        // assign
        image.src = e.image
        h3.innerText = e.title
        let maxLength = 7;

            if (e.content.length > maxLength) {
                p.innerHTML = e.content.substr(0, maxLength) + '...'; 
            }
        a.innerHTML = `<a href="Pages/blog_page.html" class="learn_more">View More 
        <span style="font-weight: bold;">></span>
</a> `  
        react1.innerHTML = `<i class="far fa-thumbs-up"></i><p>${e.likes}</p>`
        react2.innerHTML = `<i class="fa-solid fa-comment"></i><p>${Object.values(e.comment).length}</p>`

        // append
        pages.appendChild(blog_individual)


        blog_individual.appendChild(image)
        blog_individual.appendChild(blog_word)

        blog_word.appendChild(h3)
        // blog_word.appendChild(p)
        blog_word.appendChild(a)
        blog_individual.appendChild(iconReact)
        iconReact.appendChild(icons)
        icons.appendChild(react1)
        icons.appendChild(react2)
    
    })

}

blogPagesShow()



