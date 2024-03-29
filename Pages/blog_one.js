// hamburger menu
const hmenu = document.querySelector('.hmenu');
            const mnav = document.querySelector('.mnav');
            const menuItems = document.querySelectorAll('.mnav a');
            
            hmenu.addEventListener('click',()=>{
                hmenu.classList.toggle('is-active');
                mnav.classList.toggle('is-active');
            });

            menuItems.forEach((menuItem)=>{
                      menuItem.addEventListener('click', function() {
                     hmenu.classList.remove('is-active');
                     mnav.classList.remove('is-active');
    });

});


// sidebar 

const aside = document.querySelector('aside');

const sideBar= ()=>{

        axios({
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs`,
        })
        .then((res)=>{
            const post = res.data
            // console.log(post)
            post.forEach((e,id) => {
                const each_link = document.createElement('div');
                const  h3 = document.createElement('h3');
                const a = document.createElement('a');
                const hr = document.createElement('hr');
                // class name
                each_link.className = 'eachlink'
        
                // asign
                h3.innerText = e.title
                a.innerHTML = `<a  onclick="openNewLink('${e._id}')">Read More ></a>`
                 a.style.cursor = 'pointer' 
                 a.href = 'javascript:void(0)'
                // append
                aside.appendChild(each_link)
                aside.appendChild(hr)
                each_link.appendChild(h3)
                each_link.appendChild(a)
            })
            
    
        }).catch((err)=>{
            console.error(err);
        })
    

       

}

sideBar()

// view from admin

function openBlogLink() {

    let blog = sessionStorage.getItem('blogCurrent');

        if(blog !== null){
            openNewLink(blog)
        }
    // localStorage.removeItem('openblog')
    sessionStorage.removeItem('blogCurrent');
}

openBlogLink()

// side bar 
function openNewLink(id){  
    // console.log(id)
    openLink(id)    
    // window.location.reload()
}

function openLink(posts){


        showComment(posts)

        axios({
            method:'GET',
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${posts}`,

        }).then((res)=>{
            // console.log(res.data._id)
            const mainContent = document.querySelector('.maincontent');

            const template = document.getElementById('template');
        
            const mainclear = document.getElementById('mainclear');
                       
            const clonedTemplate = template.content.cloneNode(true); 

            mainContent.innerHTML = '';

            const h1 = clonedTemplate.querySelector('h1');
            const img = clonedTemplate.querySelector('img');
            const h3 = clonedTemplate.querySelector('.bloginfo h3');
            const article = clonedTemplate.querySelector('.article');
            
            // append 
            mainContent.appendChild(mainclear);
            mainContent.appendChild(clonedTemplate);

            // Assign content
            h1.innerText = res.data.title;
            img.src = res.data.image;
            h3.innerText = res.data.author;
            
            article.innerHTML = '';

            const p = document.createElement('p');

            p.innerHTML = res.data.content;

            article.appendChild(p);


            const reaction1 = document.querySelector('.reaction1');
            reaction1.innerHTML = `<i class="far fa-thumbs-up" id="liked" onclick='like("${res.data._id}")' "></i>
            <p id='like_count'></p>`;         

           axios({
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${res.data._id}/likes`
            }).then((res)=>{
                const like = document.getElementById('like_count')      
                like.innerText = res.data.likes            
            })

            
                const reaction2 = document.querySelector('.reaction2');
            reaction2.innerHTML = `<i class="far fa-comment"></i>
            <p id="commentCount">   </p>` 
            axios({
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${res.data._id}/comments`
            }).then((res)=>
            {
                const comment = document.getElementById('commentCount')
                comment.innerHTML = res.data.length
            })
          
        

            
        
            const btn = document.getElementById('btn')
            
            btn.onclick = () => {

                addComment(res.data._id);

            };   

        }).catch((err)=>{
            
            console.error("error",err)

        })    
               
}




// add comment 

function addComment(id){
        // console.log(id)
  
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

        axios({
            method: 'POST',
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${id}/comments`,
            data:{
                    name:name,
                    email:emailed,
                    comment:text
            }
        }).then((res)=>{
            console.log('success')
            alertify.set('notifier','position','top-center');
            alertify.success("Comment Posted")
            showComment(id)

        }).catch((err)=>{
            console.log(err);
        })

    }

    // showComment(id)  
    
}

// error message function
function errorMessage(message){
    const error = document.getElementById('error')
   
    const errorWord = document.createElement("p");
    errorWord.innerText = message;
    error.appendChild(errorWord);
}


// show the comment 
function showComment(id) {

    axios({
        url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${id}/comments`
    }).then((res) => {
        const comment = document.getElementById('commentCount')
        comment.innerHTML = res.data.length
        const clear = document.getElementById('clear');

        clear.innerHTML = "";
        
        res.data.forEach((word) => {
            // Create elements for each comment
            const heading = document.createElement('h3');
            const commentWord = document.createElement('p');
            const commentInfo = document.createElement('div');
            const commentSection = document.createElement('div');
            const original = document.getElementById('original');

            // Add classes to elements
            commentInfo.className = 'comment_info';
            commentSection.className = 'comments_section';

            // Assign values to elements
            heading.textContent = word.name;
            commentWord.textContent = word.comment;

            // Append comments to the DOM
            original.appendChild(clear);
            clear.appendChild(commentSection);
            commentSection.appendChild(commentInfo);
            commentInfo.appendChild(heading);
            commentInfo.appendChild(commentWord);
            
        });
    }).catch((err) => {
        console.error(err);
    });
    // Location.reload()
}

// like function
function like(id){
    const changeLike = document.getElementById('like_count');
    const token = sessionStorage.getItem('token');
    const liking = document.getElementById('liked');

    if(!token){

        // window.location.href="./sign_in.html"
        // alertify.set('notifier','position','top-center');
        // alertify.error('Unauthorized access')
        const pop = document.getElementById('popup');
        const yes = document.getElementById('yes');
        const no = document.getElementById('no');

        pop.showModal()
        yes.addEventListener('click',()=>{
            window.location.href="./sign_in.html"
        })
        no.addEventListener('click',()=>{
            pop.close()
        })

    }
    else{
        
        axios({
            method: 'PUT',
            url:`https://mybrand-be-4hmq.onrender.com/api/blogs/${id}/likes`,
            headers: { 'Authorization': 'Bearer ' + token}
        }).then((res)=>{ 
            // console.log(res.data)
            // console.log(res.data.blog);  
            alertify.set('notifier','position','top-center');
            alertify.success(res.data.message)

            axios({
                method: 'GET',
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${res.data.blog}/likes`,
            })
                .then((res) => {

                    // liking.style.backgroundColor = "green"
                    changeLike.innerText = res.data.likes
                    
                    
                    
                })
                .catch((err) => {
                    console.error(err);
                });

        }).catch((err)=>{
            console.log(err)
        })
        
        
    }


}
