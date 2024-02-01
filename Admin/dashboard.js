// drop menu bar

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



function totalComments(){
    let comments = JSON.parse(localStorage.getItem('comment'))||[];
    const comment = document.getElementById('comment');
    comment.innerText = comments.length;
    console.log(comments.length)
}
totalComments();

function totalMessage(){
    let messages = JSON.parse(localStorage.getItem('messages'))||[];
    const messageSent = document.getElementById('messages');
    messageSent.innerText = messages.length;
    console.log(messages.length);
}
totalMessage();

function totalBlogs(){
    let blog = JSON.parse(localStorage.getItem('post'))||[];
    const blogs = document.getElementById('blog');
    blogs.innerHTML = blog.length;
}   
totalBlogs()