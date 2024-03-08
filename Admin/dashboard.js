
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

    const comment = document.getElementById('comment');

    var count = 0
    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/blogs'
    }).then((res)=>{

        res.data.forEach((data)=>{
            
            axios({
                url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${data._id}/comments`,
            }).then((res)=>{
                // console.log(res.data.length)
                count =  count + res.data.length
                // console.log(count)
                comment.innerText = count;
            })

        })
        
    })

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
   
    const like = document.getElementById('likes');

    var count = 0
    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/blogs'
    }).then((res)=>{

        res.data.forEach((data)=>{
            
            axios({
                url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${data._id}/likes`,
            }).then((res)=>{
                // console.log(res.data.likes)
                count =  count + res.data.likes
                // // console.log(count)
                like.innerText = count;
            })

        })

        
    })

}
totalLikes()