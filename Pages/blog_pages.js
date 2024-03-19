const {useState,useEffect} = React

<<<<<<< HEAD
function App(){

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        axios({
            url:"https://mybrand-be-4hmq.onrender.com/api/blogs"
        }).then((res)=>{
                setPosts(res.data)
        }).catch((err)=>{
            console.error(err);
        })
    },[])


    function OpenLink(id){
        // localStorage.setItem('blogCurrent', id)
        // window.location.href = 'blog_one.html'
        const url = `blog_one.html?id=${id}`;
        window.location.href = url;
        // console.log(id)
    }


    const Card=({single})=>{

        const [count, setCount] = useState(0); 

        useEffect(async () => {
                try{
                    axios({
                        url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${single._id}/comments`
                    }).then((res)=>{
                        setCount(res.data.length)
                    }).catch((err)=>{
                        console.error(err)
                    })
                }catch(err){
                    console.log(err)
                }
        }, [single._id]);

            return ( 

                <div className="blog_card">
                    <img src={single.image} alt="" />
                    <div className="blog_word">
                        <h2 id="title">{single.title}</h2>
                        <a class="learn_more" onClick={()=>OpenLink(single._id)}>Learn More  
                                <span>{" ->"}</span>
                        </a>
                    </div>
                    <div className="icons_reactions">
                        <div className="iconsreact">
                            <div className="reaction1"><i class="far fa-thumbs-up"></i><p>{single.likes.length}</p></div>
                        <div className="reaction2"> <i class="fa-solid fa-comment"></i><p>{count}</p></div>
                        </div>
                    </div>
                </div>
            )         
        }

 

    return (
        (posts.length >0 ? (posts.map((e) => (
            <div key={e._id}>
              <Card key={e._id} single={e} />
            </div>
        ))):(
            <div>
                <h3>Blogs loading ...</h3>
            </div>
        ))
    )

    
=======
// view Blogs
function viewBlogs(){
    const posts = JSON.parse(localStorage.getItem('post')) || [];
    
    const container = document.querySelector('.blog_cards_container');
    
    // loop through posts
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
            // p1.innerHTML = element.content

            a.innerHTML = `<a onclick='viewBlog(${index})' class="learn_more">Learn More 
            <span style="font-weight: bold;">></span>
    </a>`
            // ${element[index].likes}
            // let maxLength = 7;

            // if (element.content.length > maxLength) {
            //     p1.innerHTML = element.content.substr(0, maxLength) + '...'; 
            // }

            react1.innerHTML = `<i class="far fa-thumbs-up"></i><p>${element.likes}</p>`
            react2.innerHTML = `<i class="fa-solid fa-comment"></i><p>${Object.keys(element.comment).length}</p>`
            //append

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
    
}

viewBlogs()


// single blog index

function viewBlog(index){
    
    const currentBlog = localStorage.setItem('blogCurrent', JSON.stringify(index))
    window.location.href = 'blog_one.html'

>>>>>>> main
}

ReactDOM.render(<App />, document.querySelector('.blog_cards_container'))

