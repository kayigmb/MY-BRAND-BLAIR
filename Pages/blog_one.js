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
        a.innerHTML = `<a onclick="openLink(${id})">Read More ></a>`
         a.style.cursor = 'pointer' 
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

    

    // Clone the template
    const clonedTemplate = template.content.cloneNode(true);

    const h1 = clonedTemplate.querySelector('h1');
    const img = clonedTemplate.querySelector('img');
    const h3 = clonedTemplate.querySelector('.bloginfo h3');
    const article = clonedTemplate.querySelector('.article');
   
    // append 
    mainContent.appendChild(clonedTemplate);
    // Assign content
    h1.innerText = posts[id].title;
    img.src = posts[id].image;
    h3.innerText = `Author: ${posts[id].author}`;

    article.innerHTML = '';

    const p = document.createElement('p');
    p.innerHTML = posts[id].content;
    article.appendChild(p);

    // mainContent.innerText = ''    
}

function openPage() {
        const index = JSON.parse(localStorage.getItem('blogCurrent'))
        if (index !== null){
            openLink(index)
        }
        localStorage.removeItem('blogCurrent')
}

openPage();

