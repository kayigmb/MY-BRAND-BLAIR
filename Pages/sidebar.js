const {useEffect,useState} = React

// Define the Sidebar component
function Sidebar() {

    const [posts,setPosts] = useState([])

    // const [current, setCurrent] = useState('')
    
    const aside = document.querySelector('aside');
    
    useEffect(() => {
        axios({
            url: 'https://mybrand-be-4hmq.onrender.com/api/blogs',
        })
        .then((res) => {
            setPosts(res.data)
        }).catch((err) => {
            console.error(err)
        });
    }, []); 

    

    function OpenLink(id){
        // console.log(id)
        // localStorage.setItem('blogCurrent',id);
        // window.location.reload();
        const url = `blog_one.html?id=${id}`;
        window.location.href = url;

    }

    return (    
            posts.map((post) => (
                <div className="eachlink">
                    <h3>{post.title}</h3>
                
                    <a href='javascript:void(0)' onClick={() => {OpenLink(post._id); }}>{'Read More ->'}
                    </a>
                    <hr />
                </div>
            )) 
    );
}

ReactDOM.render(<Sidebar />, document.getElementById('side'));