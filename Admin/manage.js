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


// add post
    const managePost = document.querySelector('.manage-post');
    var cleartext = document.querySelector('.show-section');

    function showPost(){       

        let blogs = [];
        blogs = JSON.parse(localStorage.getItem('post'));

        const empty  = document.createElement('h1');

        if(blogs.length < 1){
            empty.innerHTML = 'Empty Posts'
    
        }
          
        managePost.appendChild(empty);
        

        // posts each
        blogs.forEach((element,index)=>{

        const postContainer = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const icons = document.createElement('div');
        // class names

        postContainer.className ='manage-each-post';
        icons.className = 'manage-icons'

        // assign
        title.innerText = element.title
        author.innerText = element.author
        icons.innerHTML = '<i class="fas fa-eye"></i>'
        icons.innerHTML += `<i class="fas fa-edit" onclick="edit(${index})"></i>`
        icons.innerHTML += `<i class="fas fa-trash-alt" onclick="deletePost(${index})"></i>`

        // append
        managePost.appendChild(cleartext)
        cleartext.appendChild(postContainer)
        postContainer.appendChild(title)
        postContainer.appendChild(author)
        postContainer.appendChild(icons)
          
        })

        

    }

    showPost()

//delete

function deletePost(index){
    let blog = JSON.parse(localStorage.getItem('post'))||[];

    blog.splice(index, 1);
    localStorage.setItem('post', JSON.stringify(blog));

    
    cleartext.innerHTML = '';

    showPost()
}
//edit

function edit(index){
    let blog = JSON.parse(localStorage.getItem('post'))||[];

    const current = blog[index];
    const currentIndex = blog.indexOf(current);

    console.log(currentIndex)
    localStorage.setItem('current', currentIndex);
     window.location.href = "addpost.html"
}

//view



