// drop down bar
const hmenu = document.querySelector('.hmenu');
const mnav = document.querySelector('.mnav');
const menuItems = document.querySelectorAll('.mnav a');

hmenu.addEventListener('click', function () {
    hmenu.classList.toggle('is-active');
    mnav.classList.toggle('is-active');
});

menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
        hmenu.classList.remove('is-active');
        mnav.classList.remove('is-active');
    });
});

//logout
function logout(){

    sessionStorage.removeItem('token');
   
}

//the user name
const userName = document.getElementById('userName');

function getUserName(){

    const user = sessionStorage.getItem('token') || [];

   if(user.length === 0){

        window.location.href = '../Pages/sign_in.html'

   }else{
        axios({
            url: 'https://mybrand-be-4hmq.onrender.com/api/protected',
            headers: { 'Authorization': 'Bearer ' + user}
        })
        .then((res)=> {

        
            userName.innerText = `${res.data.user.username}`

        })
        .catch((err)=> console.error(err))
   }

}
getUserName()



// receive the messages from the contacts

function showMessages() {
    
    const user = sessionStorage.getItem('token');
    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/protected',
        headers: { 'Authorization': 'Bearer ' + user}
    })
    .then((res)=> {
        const messageSection = document.getElementById('message');
   
        if(res.data.user.admin === false){
            messageSection.innerHTML = "<h1>Unauthorised access to view messages</h1>"
        }
    })

    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/queries',
        headers: { 'Authorization': 'Bearer ' + user}
    })
    .then((res)=> {

        // console.log(res.data)
        const messages = res.data || [];

        const messageSection = document.getElementById('message');
   
        if(messages.length === 0){
            messageSection.innerHTML = "<h1>Empty messages</h1>"
        }
        
        

        messages.forEach((message, index) => {
       
        // Creating the form
        const eachMessage = document.createElement('div');
        const name = document.createElement('div');
        const email = document.createElement('div');
        const messageSent = document.createElement('div');
        const word = document.createElement('p');
        const word2 = document.createElement('p');
        const word3 = document.createElement('p');
        const reaction = document.createElement('div');

        // assign the words
        word.innerText = message.name;
        word2.innerText = message.email;
        word3.innerText = message.content;
        // classnames
        eachMessage.className = 'messages';
        name.className = 'messanger-name';
        email.className = 'messanger-email';
        messageSent.className = 'messanger-message';
        reaction.className = 'message-react';

        // append the sections
        eachMessage.appendChild(name);
        eachMessage.appendChild(email);
        eachMessage.appendChild(messageSent);
        eachMessage.appendChild(reaction);
        name.appendChild(word);
        email.appendChild(word2);
        messageSent.appendChild(word3);

        // append the entire message to the section
        messageSection.appendChild(eachMessage);
        // message react
        reaction.innerHTML = `<i class="fas fa-reply" onclick="reply(${index})"></i>`;
        // reaction.innerHTML += `<i class="fas fa-trash-alt" onclick="deleteMessage(${index})"></i>`;
    });

    
    })
    .catch((err)=> console.error(err))


}
showMessages()


function reply(index){
    const user = sessionStorage.getItem('token');
    
    axios({
        url: 'https://mybrand-be-4hmq.onrender.com/api/queries',
        headers: { 'Authorization': 'Bearer ' + user}
    })
    .then((res)=> {
        const messages = res.data || [];

        window.location.href = `mailto:${messages[index].email}`;

    })
    
    
}

// function deleteMessage(index) {
//     let messages = [];
    
//     if (localStorage.getItem('messages') !== null) {
//         messages = JSON.parse(localStorage.getItem('messages'));
//     }

//     messages.splice(index, 1);
//     localStorage.setItem('messages', JSON.stringify(messages));

//     var cleartext = document.getElementById('message');
//     cleartext.innerHTML = '';

//     showMessages()
    
// }




