const messageInput = document.querySelector('#user-input')
const conversationElem = document.querySelector('#conversation-container')

const handleFocus = () => messageInput.focus()

let jokeTime = false

const sendMessage = event => {
  event.preventDefault()

  const message = { author: 'user', text: messageInput.value }
  updateConversation(message)

  fetch(`/bot-message/?msg=${message.text}&jokeTime=${jokeTime}`)
    .then(res => res.json())
    .then(data => {
      jokeTime = data.jokeTime
      updateConversation(data.message)
    })
}

const updateConversation = message => {
  const { author, text } = message

  const messageElem = document.createElement('p')
  messageElem.classList.add('message', author)
  messageElem.innerHTML = `<span>${text}</span>`

  conversationElem.appendChild(messageElem)
  conversationElem.scrollTop = conversationElem.scrollHeight

  author === 'user' && (messageInput.value = '')

  handleFocus()
}

handleFocus()