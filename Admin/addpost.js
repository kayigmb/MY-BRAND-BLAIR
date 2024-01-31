// validate the input value
const title = document.getElementById('title');
const image = document.getElementById('image');
const error = document.getElementById('error');
const content = document.getElementById('content');
const btn = document.getElementById('btn');




btn.onclick = (e) =>{
    e.preventDefault();
    validateForm();
}

function validateForm() {
    clearErrorMessage();
    
    const titleEnter = title.value;
    const imageEnter = image.value.trim();
    // const contentEnter = content.value.trim();

    if(titleEnter === ''){
        errorMessage("Please enter a title");
        console.log('vali')     
    }
    if(imageEnter ===''){
        errorMessage("Please enter an image");
    }
    // if (contentEnter == ''){
    //     errorMessage("Please enter a content");
    // }

}

function clearErrorMessage() {
    error.innerHTML = ''
}

function errorMessage(message){
    const errorWord = document.createElement("p");
    errorWord.innerHTML = message;
    error.appendChild(errorWord);
}