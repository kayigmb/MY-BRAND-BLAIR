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


// blogs

function blogPagesShow() {
    axios({
        url: "https://mybrand-be-4hmq.onrender.com/api/blogs"
    }).then((res) => {
        const pages = document.querySelector('.pages'); 

        const posts = res.data;
        // console.log(posts)
        posts.forEach((element, index) => {
        //    console.log(element)
            const blog_individual = document.createElement('div');
            const image = document.createElement('img');
            const blog_word = document.createElement('div');
            const h3 = document.createElement('h3');
            const a = document.createElement('a');
            const iconReact = document.createElement('div');
            const icons = document.createElement('div');
            const react1 = document.createElement('div');
            const react2 = document.createElement('div');

            //class name
            blog_individual.className = 'blog_individual';
            blog_word.className = 'blog_word';
            iconReact.className = 'icons_reaction';
            icons.className = 'iconsreact';
            react1.className = 'reaction1';
            react2.className = 'reaction2';
            // assign
            image.src = element.image;
            h3.innerText = element.title;

            a.innerHTML = `<a href="Pages/blog_page.html" class="learn_more">View More 
                <span style="font-weight: bold;">></span>
                </a> `;
            

            axios({
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${element._id}/likes`
            }).then((res)=>{
                react1.innerHTML = `<i class="far fa-thumbs-up"></i><p>${res.data.likes}</p>`   
            })  

            axios({
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${element._id}/comments`
            }).then((res)=>{
                react2.innerHTML = `<i class="fa-solid fa-comment"></i><p>${res.data.length}</p>`
            })

            // append
           
            pages.appendChild(blog_individual);


            blog_individual.appendChild(image);
            blog_individual.appendChild(blog_word);

            blog_word.appendChild(h3);
            blog_word.appendChild(a);
            blog_individual.appendChild(iconReact);
            iconReact.appendChild(icons);
            icons.appendChild(react1);
            icons.appendChild(react2);
        });

    }).catch((err) => {
        console.error(err);
    })
}

blogPagesShow();


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

