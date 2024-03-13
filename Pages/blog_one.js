// sidebar 
const {useEffect,useState} = React


// Define the Sidebar component
function Sidebar() {

    const [posts,setPosts] = useState([])

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

    return (    
        posts.map((post) => {
            const eachLink = document.createElement('div');
            const h3 = document.createElement('h3');
            const a = document.createElement('a');
            const hr = document.createElement('hr');

            eachLink.className = 'eachlink';
            h3.innerText = post.title;
            a.innerText = 'Read More >';
            a.style.cursor = 'pointer';
            a.href = 'javascript:void(0)';

            a.addEventListener('click', () =>{
                openNewLink(post._id)
                // setShow(post._id)
            });

            eachLink.appendChild(h3);
            eachLink.appendChild(a);
            aside.appendChild(eachLink);
            aside.appendChild(hr);
        })
    );
}

function openNewLink(id){  
    // Open(id)
    console.log(id)  

}

function Open(){
    return(
        <div>
            <p>hello</p>
        </div>
    )
}


// ReactDOM.render(<Open />,document.querySelector('#mainclear'))
ReactDOM.render(<Sidebar />, document.getElementById('side'));
