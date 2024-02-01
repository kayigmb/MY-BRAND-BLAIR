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

var content = new RichTextEditor("#content");

// validate the input value
const title = document.getElementById('title');
const error = document.getElementById('error');
var contentEnter = document.getElementById('content')
const author = document.getElementById('name');
const form = document.querySelector('form');

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
 
// function add post function
function addPost(){
    const titleEnter = title.value.trim();
    const contentEntered = contentEnter.value.trim();
    const authorEnter = author.value.trim();

    let posts = JSON.parse(localStorage.getItem("post"))||[];

        posts.push({
            title: titleEnter,
            author: authorEnter,
            content: contentEntered
        });
    
    localStorage.setItem("post", JSON.stringify(posts));
}





// error in the update

// function update()
function update() {
    let updateInfo = JSON.parse(localStorage.getItem('current'));
    const updateBtn = document.querySelector('.btn1'); 
    const publish = document.querySelector('.btn2'); 
    
    if (updateInfo !== null && updateInfo !== undefined ) {
        updateBtn.style.display = "block";
        publish.style.display = "none"
        title.value = updateInfo.title;
        author.value = updateInfo.author;
        contentEnter.value = updateInfo.content;
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
function updatePost(){
    const titleEnter = title.value.trim();
    const contentEntered = contentEnter.value.trim();
    const authorEnter = author.value.trim();

    let posts = JSON.parse(localStorage.getItem("post"))||[];

        posts.push({
            title: titleEnter,
            author: authorEnter,
            content: contentEntered
        });
    
    localStorage.setItem("post", JSON.stringify(posts));
    localStorage.removeItem('current');
}

