// sidebar 
const {useEffect,useState} = React

function Open(){
    let blog = sessionStorage.getItem('blogCurrent');

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

    // console.log(show)

    return(

        <div>
            <h1>{show.title}</h1> 
            <div className="heading">
                <div className="imagetitle">
                    <img src={show.image} alt="blog image"/>
                </div>
                <div className="bloginfo">
                    <h3>{show.author}</h3>
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


ReactDOM.render(<Open />,document.getElementById('template'))



