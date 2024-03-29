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

// view Blogs

const viewBlogs = () =>{

    axios({
        
        url:"https://mybrand-be-4hmq.onrender.com/api/blogs"

    }).then((res)=>{
        const container = document.querySelector('.blog_cards_container');

        const posts = res.data || []
        
                posts.forEach((element,index) =>{
                      
                    const blogCard = document.createElement('div');
                    const img = document.createElement('img');
                    const blogWord = document.createElement('div');
                    const h2 = document.createElement('h2');
                    const p1 = document.createElement('p');
                    const p2 = document.createElement('p');
                    const a = document.createElement('a')

                    const iconReact = document.createElement('div')
                    const icons = document.createElement('div')
                    const react1 = document.createElement('div')
                    const react2 = document.createElement('div')
                        // class names

                        blogCard.className = 'blog_card'
                        blogWord.className = 'blog_word'
                        a.className = 'learn_more'

                        iconReact.className = 'icons_reacticon'
                        icons.className = 'iconsreact'
                        react1.className = 'reaction1'
                        react2.className = 'reaction2'
                    //assign
                    h2.innerText = element.title;
                    img.src = element.image;
                    
                    a.innerHTML = `<a onclick='viewBlog("${element._id}")' class="learn_more">Learn More 
                    <span style="font-weight: bold;">></span>
                        </a>`

                    axios({
                            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${element._id}/likes`
                        }).then((res)=>{

                            react1.innerHTML = `<i class="far fa-thumbs-up"></i><p>${res.data.likes}</p>`
                            
                    })
            
                        
            
                    axios({
                        url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${element._id}/comments`
                    }).then((res)=>{
            

                        react2.innerHTML = `<i class="fa-solid fa-comment"></i><p>${res.data.length}</p>`

                    })

                    container.appendChild(blogCard);

                    blogCard.appendChild(img)   
                    blogCard.appendChild(blogWord);
                    blogCard.appendChild(iconReact)

                    blogWord.appendChild(h2);
                    // blogWord.appendChild(p1);
                    blogWord.appendChild(a);

                    iconReact.appendChild(icons)
                    icons.appendChild(react1);
                    icons.appendChild(react2);

                
            })

    })


}

viewBlogs()



// single blog index

function viewBlog(index){
    
    const currentBlog = sessionStorage.setItem('blogCurrent', index)
    window.location.href = 'blog_one.html'
    // console.log(index)

}

