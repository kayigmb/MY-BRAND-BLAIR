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


// sidebar 
  const aside = document.querySelector('aside');

function sideBar(){
    let post =  JSON.parse(localStorage.getItem('post')) || [];
  
    post.forEach((e,id) => {
        const each_link = document.createElement('div');
        const  h3 = document.createElement('h3');
        const a = document.createElement('a');
        const hr = document.createElement('hr');
        // class name
        each_link.className = 'eachlink'

        // asign
        h3.innerText = e.title
        a.innerHTML = `<a  onclick="openLink(${id})">Read More ></a>`
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


function openLink(id) {
    let posts = JSON.parse(localStorage.getItem('post')) || [];
    
    const mainContent = document.querySelector('.maincontent');
    const template = document.getElementById('template');
    const mainclear = document.getElementById('mainclear');
   
    const clonedTemplate = template.content.cloneNode(true);
    mainclear.innerText = '';
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

    const original = document.getElementById('original');
    const form = document.querySelector('.comment_form');

    const btn = document.getElementById('btn')
   

    btn.onclick = () => {
        addComment(id);
    };

    // showComment(id)
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

    const textName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const textarea = document.getElementById('comment').value;    
   
    posts[id].comment.push({
        name:textName,
        email:email,
        text:textarea
    });

    localStorage.setItem('post',JSON.stringify(posts));

    showComment()
}

// show the comment 

function showComment(){
    console.log('Comment')
}