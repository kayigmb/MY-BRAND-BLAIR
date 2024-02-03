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
function viewBlogs(){
    const posts = JSON.parse(localStorage.getItem('post'))|| [];
    const container = document.getElementsByClassName('blog_cards_container');

    // loop through posts
    posts.forEach((element,index) =>{
            const blogCard = document.querySelector('.blog_card');
            const img = document.createElement('img');
            const blogWord = document.querySelector('.blog_word');
            const h2 = document.createElement('h2');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const a = document.querySelector('.learn_more')

            const iconReact = document.querySelector('.icons_reaction')
            const icons = document.querySelector('.iconsreact')
            const react1 = document.querySelector('.reaction1')
            const react2 = document.querySelector('.reaction2')

            //assign

            h2.innerText = element.title;
            p1.innerText = element.content

            // ${element[index].likes}
            react1.innerHTML = `<i class="far fa-thumbs-up"></i><p>88</p>`
            react2.innerHTML = `<i class="fa-solid fa-comment"></i><p>${Object.keys(element.comment).length}</p>`
            //append

            container.appendChild(blogCard);
            blogCard.appendChild(img)
            blogCard.appendChild(blogWord);
            blogCard.appendChild(iconReact)

            blogWord.appendChild(h2);
            blogWord.appendChild(p1);
            blogWord.appendChild(a);

            iconReact.appendChild(icons)
            icons.appendChild(react1);
            icons.appendChild(react2);

        
    })
    
}
viewBlogs()