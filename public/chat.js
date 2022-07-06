const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${room}`);

let user = null

socket.on('Update_messages', (messages) => {

    updateMessagesOnScreen(messages)
})

const updateMessagesOnScreen = (messages) => {

    const div_messages = document.querySelector('#messages');

    let list_messages = `<ul 
    style='list-style: none;
    text-decoration: none;'>`

    messages.forEach(message => {
        list_messages += 
        `<li style='font-size:larger;                     
        font-weight:bold; 
        letter-spacing: 1px; 
        color: #B7DDF5 ;' >
        ${message.user}:
            <li style='font-size: medium;'>
            ${message.msg}</li>
        </li>`
    })
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if(!user){
            alert('Defina um usuario');
            return;
        }

        const message = document.forms['message_form_name']['msg'].value
            document.forms['message_form_name']['msg'].value = '';
            socket.emit('new_message', {user: user, msg: message})
            console.log(message)
        
    })

        const userForm = document.querySelector('#user_form');
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            user = document.forms['user_form_name']['user'].value  
            userForm.parentNode.removeChild(userForm)
    })
})