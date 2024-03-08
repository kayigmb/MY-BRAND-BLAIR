// hamburger menu
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
})

// rich text
var content = new RichTextEditor("#content");

// validate the input value
const title = document.getElementById('title');
const error = document.getElementById('error');
var contentEnter = document.getElementById('content')

const author = document.getElementById('name');
const form = document.querySelector('form');
const image =  document.getElementById('image');

// form call

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    validateForm();
})

function validateForm() {

    error.innerHTML = ''
    const titleEnter = title.value.trim();
    const contentEntered = contentEnter.value;
    const authorEnter = author.value.trim();
    var valid = true;
    if(titleEnter === ''){
        errorMessage("Please enter a title");   
        valid = false;
    }
    if (contentEntered === ''){
        errorMessage("Please enter a content");
        valid = false;
    }
    if(authorEnter === ''){
        errorMessage('Please enter the author name');
        valid = false;
    }

    if (valid) {
        let updateInfo = JSON.parse(localStorage.getItem('current'));
        if (updateInfo !== null && updateInfo !== undefined) {
            updatePost();
        } else {
            addPost();
        }
    }
    
}
// error message function
function errorMessage(message){
    const errorWord = document.createElement("p");
    errorWord.innerHTML = message;
    error.appendChild(errorWord);
}

var img;


// image.addEventListener('change', ()=>{
//     const fr = new FileReader()
//     fr.readAsDataURL(image.files[0]);
//     fr.addEventListener('load', ()=>{
//        const url = fr.result
//     })
// });


let imageUrl
image.addEventListener('change', () => {
    const fr = new FileReader();

    fr.addEventListener('load', () => {
    imageUrl = fr.result;
        saveImage()
    });

    fr.readAsDataURL(image.files[0]);

});



function saveImage() {
    const imageu = imageUrl;
    localStorage.setItem('imageu',imageu);
}


// function add post function
function addPost() {
    const titleEnter = title.value.trim();
    const contentEntered = contentEnter.value.trim();
    const authorEnter = author.value.trim();
    const images = localStorage.getItem('imageu');
    let posts = JSON.parse(localStorage.getItem("post")) || [];

    if (!Array.isArray(posts)) {
        posts = [];
    }
    posts.push({
        title: titleEnter,
        author: authorEnter,
        content: contentEntered,
        image:images,
        likes: 0,
        comment:[]
    });

    localStorage.setItem("post", JSON.stringify(posts));
    window.location.href = 'manageposts.html';
    localStorage.removeItem("imageu");
}





// error in the update

// function update()
function update() {

    let updateInfo = JSON.parse(localStorage.getItem('current'));
    let post = JSON.parse(localStorage.getItem('post'));


    const updateBtn = document.querySelector('.btn1'); 
    const publish = document.querySelector('.btn2'); 
    const images = localStorage.getItem('imageu');

    if (updateInfo !== null && updateInfo !== undefined ) {
        updateBtn.style.display = "block";
        publish.style.display = "none";

        title.value = post[updateInfo].title;
        author.value = post[updateInfo].author;
        content.setHTML(post[updateInfo].content)
        image = images;

    } else {
        updateBtn.style.display = "none"; 
    }   
}

update()

// update action
function updateAction() {
    updatePost();
    
}

// update button

// need to pull the comments and likes 

function updatePost(){
        const titleEnter = title.value.trim();
        const contentEntered = contentEnter.value;
        const authorEnter = author.value.trim();
        const images = localStorage.getItem('imageu');
        // const imageLocal = localStorage.getItem('imageu');

        let posts = JSON.parse(localStorage.getItem("post"))||[];
        let updateInfo = JSON.parse(localStorage.getItem('current'));
        
        posts[updateInfo].title = titleEnter
        posts[updateInfo].author = authorEnter
        posts[updateInfo].content = contentEntered
        // posts[updateInfo].image = images

        localStorage.setItem("post", JSON.stringify(posts));
        
        localStorage.removeItem('current');
        localStorage.removeItem('imageu')
        window.location.href = "manageposts.html";
    }

