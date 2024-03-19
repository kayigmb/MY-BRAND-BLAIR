// sidebar 
<<<<<<< HEAD
const {useEffect,useState} = React

function Open(){
   
    const urlParams = new URLSearchParams(window.location.search);
    let blog =  urlParams.get('id');

    const token = sessionStorage.getItem('token');

    const [show,setShow] = useState([])
    const [likes,setLikes] = useState(0)
    const [comments,setComments] = useState(0)

    useEffect(() => {
       

        if (blog !== null) {
            OpenLink(blog);
            // console.log(blog)
        }

        function OpenLink(blog) {
            axios({
                method: 'GET',
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}`,
            }).then((res) => {

                // console.log(res.data)
                setShow(res.data);

            }).catch((err) => {
                console.error(err);
            })
        }
        
        axios({
            url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}/comments`
        }).then((res) => {
            setComments(res.data.length)
        })
        axios({
            url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}/likes`
        }).then((res) => {
            // console.log(res.data.likes)
            setLikes(res.data.likes)
        })

    }, []); 

    function like(blog){   
        if(token){
            axios({
                method: 'PUT',
                url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}/likes`,
                headers: { 'Authorization': 'Bearer ' + token}
            }).then((res) => {
                alertify.set('notifier','position','top-center');
                alertify.success(res.data.message)
                showLike(blog)
            })
        }else{
            const id = document.getElementById('popup')
            const yes = document.getElementById('yes')
            const no = document.getElementById('no')

            id.showModal()
            yes.addEventListener('click',() => {
                window.location.href = "sign_in.html"
            })
            no.addEventListener('click',() => {
                id.close()
            })

        }
    }

    function showLike(blog){
        axios({
            url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}/likes`
        }).then((res) => {
            // console.log(res.data.likes)
            setLikes(res.data.likes)
        })
    }  
=======
const aside = document.querySelector('aside');

function sideBar(){
    let post =  JSON.parse(localStorage.getItem('post')) || [];
  console.log(post)
    post.forEach((e,id) => {
        const each_link = document.createElement('div');
        const  h3 = document.createElement('h3');
        const a = document.createElement('a');
        const hr = document.createElement('hr');
        // class name
        each_link.className = 'eachlink'

        // asign
        h3.innerText = e.title
        a.innerHTML = `<a  onclick="openNewLink(${id})">Read More ></a>`
         a.style.cursor = 'pointer' 
         a.href = 'javascript:void(0)'
        // append
        aside.appendChild(each_link)
        aside.appendChild(hr)
        each_link.appendChild(h3)
        each_link.appendChild(a)
    })
}

sideBar()

// view from admin
function openBlogLink() {
    let blog = JSON.parse(localStorage.getItem('openblog'));
        if(blog !== null){
            openLink(blog)
        }
    localStorage.removeItem('openblog')
}
openBlogLink()

// side bar 
function openNewLink(id){  
    
    openLink(id)    
    // window.location.reload()
}

function openLink(id) {
    
    let posts = JSON.parse(localStorage.getItem('post')) || [];
    
    const mainContent = document.querySelector('.maincontent');
    const template = document.getElementById('template');
   
    const mainclear = document.getElementById('mainclear');
    
    mainclear.innerText = '';   

    const clonedTemplate = template.content.cloneNode(true); 

    const h1 = clonedTemplate.querySelector('h1');
    const img = clonedTemplate.querySelector('img');
    const h3 = clonedTemplate.querySelector('.bloginfo h3');
    const article = clonedTemplate.querySelector('.article');
       
    // append 
    mainContent.appendChild(mainclear);
    mainclear.appendChild(clonedTemplate);

    // Assign content
    h1.innerText = posts[id].title;
    img.src = posts[id].image;
    h3.innerText = `Author: ${posts[id].author}`;

    article.innerHTML = '';
    const p = document.createElement('p');
    p.innerHTML = posts[id].content;
    article.appendChild(p);

    const reaction1 = document.querySelector('.reaction1');
    reaction1.innerHTML = `<i class="far fa-thumbs-up" onclick="like(${id})"></i>
    <p id='like_count'>${posts[id].likes}</p>`;
    
    const reaction2 = document.querySelector('.reaction2');
    reaction2.innerHTML = `<i class="far fa-comment"></i>
    <p>${posts[id].comment.length}</p>`
    
    // const original = document.getElementById('original');
    // const form = document.querySelector('.comment_form');

    const btn = document.getElementById('btn')
   

    btn.onclick = () => {
        addComment(id);
    };
    
    showComment(id)
}


// like function
function like(id){
    const changeLike = document.getElementById('like_count');
    let posts = JSON.parse(localStorage.getItem('post')) || [];  
    posts[id].likes += 1    
    localStorage.setItem('post', JSON.stringify(posts));
    changeLike.innerText = posts[id].likes
}



// open page from blog pages
function openPage() {
        const index = JSON.parse(localStorage.getItem('blogCurrent'))
        if (index !== null){
            openLink(index)
        }
        localStorage.removeItem('blogCurrent')
}

openPage();


// add comment 

function addComment(id){
    let posts = JSON.parse(localStorage.getItem('post')) || [];  
    const error = document.getElementById('error')
    error.innerHTML = ''
    const textName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const textarea = document.getElementById('comment').value;   

    const name = document.getElementById('name').value.trim();
    const emailed = document.getElementById('email').value.trim();
    const text = document.getElementById('comment').value.trim();
    
    var valid = true; 
    if(name === ''){
        errorMessage('Enter a name')
        valid = false
    }
    if(emailed === ''){
        errorMessage('Enter an email')
        valid = false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailed)) {
        errorMessage('Enter a valid email');
        valid = false;
    } 
    if(text === ''){
        errorMessage('Enter a comment')
        valid = false

    }


    if(valid){   
    posts[id].comment.push({
        name:textName,
        email:email,
        text:textarea
    });
}
    localStorage.setItem('post',JSON.stringify(posts));

    showComment(id)
}

// error message function
function errorMessage(message){
    const error = document.getElementById('error')
   
    const errorWord = document.createElement("p");
    errorWord.innerText = message;
    error.appendChild(errorWord);
}


// show the comment 
function showComment(id){

    var comments = [];
    
    if (localStorage.getItem('post') !== null) {
      comments = JSON.parse(localStorage.getItem('post'));
      }
      const clear = document.getElementById('clear')
      clear.innerHTML = ""
      comments[id].comment.forEach((word) => {
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
          commentWord.textContent = word.text;
  
          
          // append the comment
          original.append(clear)
          clear.appendChild(commentSection);
          commentSection.appendChild(commentInfo);
          commentInfo.appendChild(heading);
          commentInfo.appendChild(commentWord);
          
      });
>>>>>>> main

    // console.log(show)
        
    return(

        <div>
            <h1>{show.title}</h1> 
            <div className="heading">
                <div className="imagetitle">
                    <img src={show.image} alt="blog image"/>
                </div>
                <div className="bloginfo">
                    <h3>Author: {show.author}</h3>
                </div>
            </div>
            <div className="article" dangerouslySetInnerHTML={{ __html: show.content }}></div>
            <div className="blog_reaction">
                <div className="reaction1">
                    <i class="far fa-thumbs-up " onClick={()=>like(blog)}></i>
                    <p>{likes}</p> 
                </div>
                <div className="reaction1">
                    <i class="far fa-comment"></i>
                    <p>{comments}</p> 
                </div>
            </div>
        </div>   
        
    )
        
}

<<<<<<< HEAD

ReactDOM.render(<Open />,document.getElementById('template'))



=======
// ************************************

// const name = document.getElementById('name').value.trim();
// const emailed = document.getElementById('email').value.trim();
// const text = document.getElementById('comment').value.trim();

// name.addEventListener('keyup', (e)=>{
//         if(e === ''){
//             errorMessage('Please enter a name');
//         }


// })  
// emailed.addEventListener('keyup', (e)=>{
//     if(e === ''){
//         errorMessage('Please enter an email');
//     }

    
// })  
// text.addEventListener('keyup', (e)=>{
//     error.innerText = ''

// })
>>>>>>> main
