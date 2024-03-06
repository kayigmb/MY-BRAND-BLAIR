
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

        
            userName.innerText = `${res.data.user.username}`

        })
        .catch((err)=> console.error(err))
   }

}

getUserName()



//

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
    
    const messageSent = document.getElementById('messages');

    const user = sessionStorage.getItem('token');
    const blogs = document.getElementById('blog');

    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/queries',
        headers: { 'Authorization': 'Bearer ' + user}
    })
    .then((res)=> {
        messageSent.innerText = res.data.length;
    })
    .catch((err)=> console.error(err))


  
}
totalMessage();


function totalBlogs(){

    const user = sessionStorage.getItem('token');
    const blogs = document.getElementById('blog');

    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/blogs',
        // headers: { 'Authorization': 'Bearer ' + user}
    })
    .then((res)=> {
        blogs.innerHTML = res.data.length;
    })
    .catch((err)=> console.error(err))
    
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