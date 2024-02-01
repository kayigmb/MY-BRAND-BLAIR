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
    });
// form control
const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    validate();
})

const name = document.getElementById('name');
const email = document.getElementById('email');
const textarea = document.querySelector('textarea');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const error = document.getElementById('error')
// validate  form
function validate() {
    const nameEnter = name.value.trim();
    const emailEnter = email.value.trim();
    const textareaEnter = textarea.value.trim(); 

    error.innerHTML = ""; 
    let valid = true; 

    if (nameEnter === "") {
        errorMessage('Enter name');
        valid = false;
    }

    if (emailEnter === "") {
        errorMessage('Enter email');
        valid = false;
    } else if (!emailRegex.test(emailEnter)) {
        errorMessage('Enter valid email');
        valid = false;
    }

    if (textareaEnter === "") {
        errorMessage('Enter a comment');
        valid = false;
    }
     if (valid) {
        addComment();
    }
}

// error message function
function errorMessage(message) {
    const text = document.createElement('p')
    text.innerHTML = message
    error.appendChild(text)
}


// show the comment
function showComment(){
  var comments = [];
    
  if (localStorage.getItem('comment') !== null) {
    comments = JSON.parse(localStorage.getItem('comment'));
    }
    const clear = document.getElementById('clear')
    clear.innerHTML = ""
    comments.forEach((word) => {
        // declaring the comment       
        const heading = document.createElement('h3');
        const commentWord = document.createElement('p');
        const commentInfo = document.createElement('div');
        const commentSection = document.createElement('div')
        const original = document.getElementById('original')
        
        // classnames
        commentInfo.className = 'comment_info'
        commentSection.className = 'comments_section'

        
        // assignin the values

        heading.textContent = word.name;
        commentWord.textContent = word.textarea;

        
        // append the comment
        original.append(clear)
        clear.appendChild(commentSection);
        commentSection.appendChild(commentInfo);
        commentInfo.appendChild(heading);
        commentInfo.appendChild(commentWord);
        
    });

    const commentNum = document.getElementById('commentnumber');

    commentNum.innerHTML = comments.length
    
}

window.onload = showComment()



// add comments
function addComment(){
    const nameEnter = name.value.trim();
    const emailEnter = email.value.trim();
    const textareaEnter = textarea.value.trim();
    let record = JSON.parse(localStorage.getItem('comment'))||[];
    
    record.push({
        name:nameEnter,
        email:emailEnter,
        textarea:textareaEnter
    });

    localStorage.setItem('comment',JSON.stringify(record));
    showComment()
}




