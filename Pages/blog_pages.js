const {useState,useEffect} = React

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
        localStorage.setItem('blogCurrent', id)
        window.location.href = 'blog_one.html'
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
                        <a href="blog_one.html" class="learn_more" onClick={()=>OpenLink(single._id)}>Learn More  
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

    
}

ReactDOM.render(<App />, document.querySelector('.blog_cards_container'))

