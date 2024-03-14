const {useEffect, useState} = React
function Comment(){
    let blog = sessionStorage.getItem('blogCurrent');

    // const nameE = document.getElementById('name');
    // const emailE = document.getElementById('email');
    // const textE = document.getElementById('comment');

    const [show,setShow] = useState()

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [content,setContent] = useState("")

    function HandleAdd(){
        Validation()
        // console.log('dd')
    }

    function Validation() {
        // const nameEnter = document.getElementById("name").value.trim();
        // const emailEnter = document.getElementById("email").value.trim();
        // const textEnter = document.getElementById("comment").value.trim();

        const error = document.getElementById("error");
        error.innerText = "";

        var isValid = true;

        if(name === ''){
            errorMessage('Enter a name')
            isValid = false
        }
        if(email === ''){
            errorMessage('Enter an email')
            isValid = false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage('Enter a valid email');
            isValid = false;
        } 
        if(content === ''){
            errorMessage('Enter a comment')
            isValid = false
    
        }

        if (isValid) {
            // console.log(isValid);
            AddComment(name,email,content);
        }
    } 

    function AddComment(id, n, e, t) {
        console.log("New Comment:", { n, e, t}); 
    }

    function errorMessage(message){
        const error = document.getElementById('error')
        const errorWord = document.createElement("p");
        errorWord.innerText = message;
        error.appendChild(errorWord);
    }


    useEffect(() =>{

        axios({
            url: `https://mybrand-be-4hmq.onrender.com/api/blogs/${blog}/comments`
        }).then((res) => {
            // console.log(res.data)
            setShow(res.data)
        })

    },[show])


    return(
        <div>
            <h2>Comments: <span id="commentnumber"></span></h2>
            <div class="comment_form">

                <div class="each_input_comment">
                    <label for="name">Enter Name:</label>
                    <input type="text" id="name" autocomplete="off" value={name} onChange={
                        (e)=>{
                                setName(e.target.value);
                        }
                    } />
                </div>
                <div class="each_input_comment">

                    <label for="email">Enter Email:</label>
                    <input type="text" id="email" autocomplete="off" value={email} onChange={
                        (e)=>{
                                setEmail(e.target.value);
                        }
                    }/>

                </div>

                <div class="each_input_comment">

                    <label for="comment">Comment:</label>

                    <textarea name="comment" id="comment" cols="30" rows="10"               
                        autocomplete="off" 
                        value={content} 
                        onChange={(e) => {
                            setContent(e.target.value.trim());
                        }}
                    ></textarea>

                </div>

                <div class="error" id="error"></div>
                
                <button id="btn" onClick={HandleAdd}>Post Comment</button>

                                
            </div>

            <div className="clear">

                {show && show.map((e) => (
                    <div className="comments_section">
                    <div className="comment_info">
                        <h3>{e.name}</h3>
                        <p>{e.comment}</p>
                    </div>
                    </div>
                ))}
            </div>
            
            
        </div>
    )

}

ReactDOM.render(<Comment />, document.getElementById('original'));