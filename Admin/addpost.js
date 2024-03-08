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


//logout
function logout(){

    sessionStorage.removeItem('token');
   
}

//the user name
const userName = document.getElementById('userName');

var author

function getUserName(){

            const user = sessionStorage.getItem('token') || [];

           if(user.length === 0){

                window.location.href = '../Pages/sign_in.html'

           }else{
                axios({
                    url: 'https://mybrand-be-4hmq.onrender.com/api/protected',
                    headers: { 'Authorization': 'Bearer ' + user}
                })
                .then((res)=> {

                    // sessionStorage.setItem('author',res.data.user.username)
                    userName.innerText = `${res.data.user.username}`

                    console.log(res.data.user.username)
                    // localStorage.setItem('author',res.data.user.username)
                    

                })
                .catch((err)=> console.error(err))
           }

}

getUserName()

// rich text
var content = new RichTextEditor("#content");


// validate the input value
const title = document.getElementById('title');
const error = document.getElementById('error');
var contentEnter = document.getElementById('content')

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
    const imageSee = image.value

    var valid = true;

    if(titleEnter === ''){
        errorMessage("Please enter a title");   
        valid = false;
    }
    if (contentEntered === ''){
        errorMessage("Please enter a content");
        valid = false;
    }
    // if(!imageSee){
    //     errorMessage("Please enter an image");
    //     valid = false
    // }
    const update = sessionStorage.getItem('blogUpdate');

    if(update){
        if(!imageSee){
            valid = true
        }
        
    }

    if(!update){
        if(!imageSee){
            errorMessage("Please enter an image");
            valid = false
        }
    }
    

    if (valid) {
        let updateInfo = sessionStorage.getItem('blogUpdate');

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
function addPost() {



    // Check if HTML elements are correctly referenced
    const title = document.getElementById('title');
    const image = document.getElementById('image');
    const contentEnter = document.getElementById('content');



    
    // Ensure that all required elements are available
    if (!title || !image || !contentEnter) {
        console.error("Required HTML elements are missing.");
        return;
    }

    const titleEnter = title.value.trim();
    const imageEntered = image.files[0];
    const contentEntered = contentEnter.value.trim();

    const btn = document.getElementById('btn');
    btn.disabled = true;

    const info = new FormData();
    info.append('title', titleEnter);
    info.append('image', imageEntered);
    info.append('content', contentEntered);

    const user = sessionStorage.getItem('token');

    // Check if token is available
    if (!user) {
        console.error("User token is missing.");
        return;
    }

    axios({
        method:'POST',
        url: 'https://mybrand-be-4hmq.onrender.com/api/blogs',
        headers: {
            'Authorization': `Bearer ${user}`,
            'Content-Type': 'multipart/form-data'
        },
        data: info
    }).then((res) => {
        window.location.href = './manageposts.html';
        // console.log(res);
        // console.log(res.data);
        alertify.success('Successful blog posted ')
    }).catch((err) => {
        btn.disabled = false;
        errorMessage(err.response.data);
        console.error(err);
    });
}




// error in the update

function update() {

    let updateInfo = sessionStorage.getItem('blogUpdate')

    const updateBtn = document.querySelector('.btn1'); 
    const publish = document.querySelector('.btn2'); 
    const images = localStorage.getItem('imageu');

    

    if (updateInfo !== null && updateInfo !== undefined ) {
        updateBtn.style.display = "block";
        publish.style.display = "none";
        const user = sessionStorage.getItem('token');
        const imageshow = document.getElementById('imageshow');

        imageshow.style.display = "block";

        alertify.set('notifier', 'position', 'top-center');
        alertify.success('Default image will be displayed in case of no image input')
    
        axios({
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${updateInfo}`
        })
        .then((res) => {   
            title.value = res.data.title;
            content.setHTML(res.data.content);
            imageshow.src = `${res.data.image}`
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
         
        });
       

    } else {
        updateBtn.style.display = "none"; 
    }   
}

update()

// update action
function updateAction() {
    alertify.set('notifier', 'position', 'top-center');
    alertify.success('Successful blog posted ')

    updatePost();
    
}

// update button

// need to pull the comments and likes 

function updatePost(){
      
        const titleEnter = title.value.trim();
        const imageEntered =  document.getElementById('image').files[0]
        const contentEntered = contentEnter.value.trim();

        let post = sessionStorage.getItem('blogUpdate');
        const user = sessionStorage.getItem('token');

        const form = new FormData();
        form.append('image', imageEntered);
        form.append('title', titleEnter)
        form.append('content', contentEntered)
    
        axios({
            method: 'PATCH',
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${post}`,
            headers: {

                'Authorization': `Bearer ${user}`

            },
            data:form
        })
        .then((res) => {
            console.log(res.data);
            sessionStorage.removeItem('blogUpdate');
            
            window.location.href = "./manageposts.html"
        })
        .catch((err) => {
            console.error(err);
            errorMessage(err.response.data);
    
        });
           

}

