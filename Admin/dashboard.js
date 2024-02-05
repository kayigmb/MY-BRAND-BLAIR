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
    const commenting = JSON.parse(localStorage.getItem('post'))||[];
    const comment = document.getElementById('comment');
    var count = 0;
    commenting.forEach((e)=>{
        count += e.comment.length
    })        
    comment.innerText = count;
}

totalComments();

function totalMessage(){
    let messages = JSON.parse(localStorage.getItem('messages'))||[];
    const messageSent = document.getElementById('messages');
    messageSent.innerText = messages.length;
}
totalMessage();

function totalBlogs(){
    let blog = JSON.parse(localStorage.getItem('post'))||[];
    const blogs = document.getElementById('blog');
    blogs.innerHTML = blog.length;
}   
totalBlogs()

function totalLikes(){
    var likes = JSON.parse(localStorage.getItem('post'))||[];
    const like = document.getElementById('likes');
    var counting = 0;
    likes.forEach((e)=>{
        counting += e.likes
    })        
    like.innerText = counting;

}
totalLikes()