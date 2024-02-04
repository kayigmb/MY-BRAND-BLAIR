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

// receive the messages from the contacts

function showMessages() {
    let messages = JSON.parse(localStorage.getItem('messages'))||[];
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
        word3.innerText = message.text;
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
        reaction.innerHTML += `<i class="fas fa-trash-alt" onclick="deleteMessage(${index})"></i>`;
    });
}

function deleteMessage(index) {
    let messages = [];
    
    if (localStorage.getItem('messages') !== null) {
        messages = JSON.parse(localStorage.getItem('messages'));
    }

    messages.splice(index, 1);
    localStorage.setItem('messages', JSON.stringify(messages));

    var cleartext = document.getElementById('message');
    cleartext.innerHTML = '';

    showMessages()
    
}

window.onload = showMessages;

function reply(index){
    let messages = JSON.parse(localStorage.getItem('messages'))||[];
    
    window.location.href = `mailto:${messages[index].email}`;
    
}
