const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container')

const sendMessage = event => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();

  const message = {
    author: 'user',
    text: messageInput.value
  }

  updateConversation(message)

  fetch('/cat-message')
    .then(res => res.json())
    .then(data => updateConversation(data.message))
};

const updateConversation = message => {
  const { author, text } = message

  const messageElem = document.createElement('p')

  messageElem.innerHTML = `<span>${author}: ${text}</span>`

  conversationElem.appendChild(messageElem)
}