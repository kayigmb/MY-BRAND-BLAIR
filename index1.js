const { useEffect, useState } = React;

function App() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios({
            url: "https://mybrand-be-4hmq.onrender.com/api/blogs"
        }).then((res) => {
            // console.log(res.data);
            setBlogs(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    function View(index) {
        // localStorage.setItem('blogCurrent', index);
        const url = `/Pages/blog_one.html?id=${index}`;
        window.location.href = url;
    }

    function Card(props) {
        const [count, setCount] = useState(0);

        useEffect(() => {
            axios({
                url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${props.blog._id}/comments`
            }).then((res) => {
                setCount(res.data.length);
            }).catch((err) => {
                console.error(err);
            });
        }, [props.blog._id]);

        return (
            <div className="blog_individual" onClick={()=>View(props.blog._id)}>
                <div className="image">
                    <img src={props.blog.image} alt="image" />
                </div>
                <div className="blog_word">
                    <h3>{props.blog.title}</h3>
                    <a onClick={() => View(props.blog._id)} className="learn_more">Learn More
                        <span style={{ fontWeight: 'bold' }}>{"->"}</span>
                    </a>
                </div>
                <div className="icons_reaction">
                    <div className="iconsreact">
                      <div className="reaction1">
                        <i class="far fa-thumbs-up"></i><p>{props.blog.likes.length}</p>
                      </div>
                      <div className="reaction2">
                        <i class="fa-solid fa-comment"></i><p>{count}</p>
                      </div>
                    </div>
                    
                </div>
            </div>
        );
    }

    return (
        (blogs.length > 0 ? (blogs.map((e) => (
            <div>
                <Card key={e._id} blog={e} />
            </div>
        ))) : (
            <div className="loading">
                <h3>Blogs loading ...</h3>
            </div>
        ))
    );
}

ReactDOM.render(<App />, document.querySelector('.pages'));
