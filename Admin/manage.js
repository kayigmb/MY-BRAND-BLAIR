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

            // console.log(res.data)
            userName.innerText = `${res.data.user.username}`

        })
        .catch((err)=> console.error(err))
   }

}

getUserName()


//show the posts

const managePost = document.querySelector('.manage-post');

const cleartext = document.querySelector('.show-section');

function showPost(){   
        
        const user = sessionStorage.getItem('token');

                axios({
                    url: `https://mybrand-be-4hmq.onrender.com/api/blogs`,
                }).then((res)=> {
                        // console.log(res);

                        const blogs = res.data || [];
            
                        blogs.forEach((e, index)=>{

                        // console.log(res.data);
                        const postContainer = document.createElement('div');
                        const title = document.createElement('p');
                        const author = document.createElement('p');
                        const icons = document.createElement('div');
                        // class names
                        
               
                        // console.log(index)

                        postContainer.className ='manage-each-post';
                        icons.className = 'manage-icons'
                        
                        // assign
                        title.innerText = e.title
                        author.innerText = e.author

                        icons.innerHTML = `<i class="fas fa-eye" onclick="view('${e._id}')"></i>`
                        icons.innerHTML += `<i class="fas fa-edit" onclick="edit('${e._id}')"></i>`
                        icons.innerHTML += `<i class="fas fa-trash-alt" onclick="deletePost('${e._id}')"></i>`
    
                        // append
                        managePost.appendChild(cleartext)
                        cleartext.appendChild(postContainer)
                        postContainer.appendChild(title)
                        postContainer.appendChild(author)
                        postContainer.appendChild(icons)

                })


            })
        .catch((err)=> console.error(err))
}

showPost()


//delete

function deletePost(index){

    const user = sessionStorage.getItem('token');

    axios({

        method:'DELETE',

        url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${index}`,

        headers: { 'Authorization': 'Bearer ' + user}
        

    }).then((response)=> {
        alertify.set('notifier','position','top-center')
        alertify.error(response.data)
        // window.location.reload() 
        cleartext.innerHTML = ""
        showPost()   
    }).catch((error)=>{

        alertify.set('notifier','position','top-center')
        alertify.error(error.response.data.message)
    })
  
}




//edit

function edit(index){

    const user = sessionStorage.getItem('token');

    axios({

        url: `https://mybrand-be-4hmq.onrender.com/api/protected`,

        headers: { 'Authorization': 'Bearer ' + user}

    }).then((response)=> {
      if(response.data.user.admin === true)
        {
            sessionStorage.setItem('blogUpdate',index)
            window.location.href = "./addpost.html"
        }
        else{
            alertify.set('notifier','position','top-center')
            alertify.error('Unauthorized access')
        }
    }).catch((error)=>{
        // alert(error.response.data.message)
        alertify.set('notifier','position','top-center')
            alertify.error(error.response.data.message)
    })
    // console.log(index)
    

}

//view

function view(index){

    const url = `blog_one.html?id=${index}`;
    window.open(`../Pages/${url}`,'_blank');

    // window.location.href = url;
    // console.log(index);
}