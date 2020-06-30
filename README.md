# 3.1 Node.Js: Introduction

Welcome to your first Node app!!

This is where things start to get a little more complicated, but a heck of a lot more fun!

## Setup

1. Open a terminal window and type `yarn install`
2. Start up the server by typing `yarn dev`

Your node application is now running at http://localhost:8000

### ⚠️ Live Server, NO MORE! ⚠️

**We will no longer be using the "Live Server" extension in VS Code.**

When we type `yarn dev` in the terminal, it will spin up a `node` environment that will render our server-side app to the browser.

## Deeper Dive into this app

### Required dependencies

If you look in the `package.json` file you will see all of the external dependencies, or modules, that we will need for today's workshop.

| package                                          | Description                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated web framework for node.                                                                              |
| [nodemon](https://www.npmjs.com/package/nodemon) | nodemon is a tool that helps develop node-based applications by automatically restarting the node application on change. |
| [morgan](https://www.npmjs.com/package/morgan)   | HTTP request logger middleware for node.js                                                                               |
| [moment](https://www.npmjs.com/package/moment)   | A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.                       |

### File Structure

```
├── __lecture
├── __solution
├── node_modules (where all external dependencies are saved)
|   ├── ...
|   └── ...
├── public (folder that serves static files)
|   ├── cat
|   |   ├── index.html
|   |   └── scripts.js
|   ├── css
|   |   ├── _chat-app.css
|   |   ├── _mini-reset.css
|   |   └── cat-page.css
|   └── images
├── .gitignore
├── package.json (where we keep a record of the app setup)
├── README.md (this file)
├── server.js
└── yarn.lock ("locks" the dependency versions)
```

This app contains both a Frontend and a Backend.

#### Backend

- The backend is essentially the `server.js` file. It contains a functional express app to which we will add some functionality in the exercises below.

#### Frontend

- The frontend is the `public/` folder.
- Once the server is running, it will serve up the frontend files as static resources. The line below is responsible for allowing those files to be accessed.

```js
  // Any requests for static files will go into the public folder
  .use(express.static('public'))
```

##### Example

The `public/` folder contains `html`, `css` and `js` files to be rendered in the browser.

1. A user types http://localhost:8000/cat in the browser.
2. The server looks for an `express()` endpoint of `/cat`.
3. It doesn't find one
4. It then looks for static files in the `public` folder.
5. It finds `public/cat/` that contains an `index.html` file.
6. It responds with that file.
7. The browser loads `/cat` for the user.
8. The browser will also follow-up with requests for any other required files. In this case, the `css` and `js` files.

**Every single server call follows this pattern.**

For this workshop, you will work in the `public` folder as well as the `server.js` file.

---

## Exercise 1 - The Cat Chat

<img src="__lecture/assets/exercise-1.gif" />

In this exercise, we will give a user the possibility of interacting with our cat. The server(cat) will respond with a "meow" everytime someone sends a message. The server never actually sees the user message and doesn't really care. It just responds with a "Meow" no matter what.

The server should already be running. (If you did `yarn dev`, that is.)

### 1.1 - Finish up the `index.html file

We will not go into detailed explanations but suffice it to say that this will setup our chat app in the center of the page. _Remember, the css is already taken care of. You only need to link the file in the `head` of the html file._

#### The `<body>`

```html
<div class="chat-app">
  <div class="chat-app__header">
    <h2>Cat Chat</h2>
  </div>
  <div class="chat-app__content">
    <form class="user-form" onsubmit="sendMessage(event)">
      <label for="user-input" class="user-form--label">
        Message the cat
      </label>
      <input
        name="user-input"
        id="user-input"
        class="user-form--input"
        placeholder="Type your message"
      />
      <button class="user-form--button">Send</button>
    </form>
    <div class="conversation">
      <div id="conversation-container" class="conversation-container"></div>
    </div>
  </div>
</div>
<script src="scripts.js"></script>
```

#### Link to the `.css` file.

```html
<link href="../css/cat-page.css" rel="stylesheet" />
```

### 1.2 - Write the Frontend JavaScript

Notice that the `<form>` element has an attribute `onsubmit` assigned to it. This is a way for us to assign custom `JS` functions to events without an event listener.

#### 1.2.1

Let's start with this `sendMessage` function.

Copy the function below, into the `cat/scripts.js` file.

```js
const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();

  console.log('Send button clicked!');
};
```

Reload the page, click "Send". Did a message appear in the console? If so, move on. If not, `debug`.

#### 1.2.2

When the user clicks "Send", we need to take the contents of the input field and render it to the screen as a user message. Let's start by grabbing the input value.

At the top of the file, declare a variable for `user-input`.

```js
const messageInput = document.querySelector('#user-input');
```

And change the console.log to output `messageInput.value`.

Type something in the input field. Hit "Send". Your message should appear in console.

We want to add that message to the DOM. All of the messages should appear inside the `<div id="conversation-container">`

Declare a second variable at the top of the page.

```js
const conversationElem = document.querySelector('#conversation-container');
```

When sendMessage is called, it should call another function to update the conversation.

```js
// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  console.log(message);
};
```

Note that the function expects an object as an argument, and that object should be in the following shape:

```js
{
  author: '', // 'user' or 'cat'
  text: ''    // the actual message
}
```

When we call `updateConversation` in our `sendMessage` function, we should pass the argument in the proper format.

```js
const message = { author: 'user', text: messageInput.value };
updateConversation(message);
```

If all is good, the the message object should be output to the console. If it does, move on.

We still need to render it in the browser. Add theses lines to `updateConversation()`

```js
// deconstruct the message object
const { author, text } = message;
// create a <p> element
const messageElem = document.createElement('p');
// add the text message to the element
messageElem.innerHTML = `<span>${text}</span>`;
// append the element to the conversation
conversationElem.appendChild(messageElem);
```

The user message should now appear in the browser when "Send" is clicked. _Don't forget that you will need to manually reload the page for the frontend changes to be reflected in the browser._

#### 1.2.3

Ultimately, the user would like to "talk" with the cat. Eveytime, the user sends a message, our page should contact the server and retrieve the cat message.

Let's add a `fetch` call to `sendMessage()`.

```js
// This is a 'GET' call to the /cat-message endpoint.
fetch('/cat-message')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
```

We chain a series of `.then()`s to the call to do something when the server responds.

1. Convert the response to `JSON` format.
2. Use the data received to update the conversation.

Did it work? What happened in the console?

<img src="__lecture/assets/exercise-1_error.png" />

Why? 😭😭

That is because of the `fetch` is contacting our server at `/cat-message` looking for a response. The server is reponding with a `404` (not found).

We need to create that endpoint!

Open `server.js`. Take some time to read through all of the code and comments. Once you're familiar with the code, we can add the `/cat-message` endpoint.

#### 1.2.4

The chat app is making a `GET` request to an endpoint: `/cat-message`. Let's start by creating that.

In the `server.js` file, add the following method where it says to add endpoints.

```js
.get('/cat-message', (req, res) => {
  const message = { author: 'cat', text: 'Meow' };
  res.status(200).json({status: 200, message });
})
```

Try the chat again, and take a look at the console. It should contain the payload that we sent from the server.

We now need to update the conversation with the cat's message. To do this, we will call `updateConversation()` instead of doing a console.log. In `scripts.js` remove the `console.log(data);` and replace it.

```diff
  const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();

    const message = { author: 'user', text: messageInput.value };
    updateConversation(message);

    // This is a 'GET' call to the /cat-message endpoint.
    fetch('/cat-message')
      .then((res) => res.json())
      .then((data) => {
-       console.log(data);
+       updateConversation(data.message);
      });
  };
```

We are taking the response from the server and passing the `message` to `updateConversation()`.

#### 1.2.5 - Move the message bubbles

We need to make the speech bubbles appear in bubbles and lined up on either side of the window.

Remember, _all_ of the CSS is done, we only need to add the proper class to the messages to get them to line up properly. For convenience, the classes to be added to the messages are `cat` and `user`. (Same as the `author` value in the message object.)

Add this line to `updateConversation` after `messageElem` is declared.

```js
// add a 'message' class and a class based on the author
messageElem.classList.add('message', author);
```

#### 1.2.6 Final UX tweaks

We have a functional app, but there are few tweaks that we should make to give our app a little more polish.

1. Cats are notoriously independent, and most likely not going to answer any text _immediately_. Let's add a `setTimeout` to the server method so that the user has to wait a while before receiving a response.

```diff
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'meow' };
+   const randomTime = Math.floor(Math.random() * 3000);
+   setTimeout(() => {
      res.status(200).json({ status: 200, message });
+   }, randomTime);
  })
```

2. When the page loads, it would be easier for the user if the input was _focused_. Create a function called `handleFocus` near the top of the `scripts.js file`.

```js
const handleFocus = () => {
  messageInput.focus();
};
```

- Call this function at the bottom of the file. This will ensure that the input has focus once the `js` file is loaded.
- Call this function at the end of `updateConversation`. this will ensure that the input regains focus after every message is sent.

3. Clear the input field in `updateConversation`, but only if the author is the user.

```js
if (author === 'user') {
  messageInput.value = '';
}
```

4. Finally, chat windows scroll in reverse. As more and more messages appear, they are pushed up and out of the window. As it is now, once messages fill the window, they will appear below the chat and not be visible. Add this line after you append the message. (Inside of `updateConversation`);

```js
conversationElem.scrollTop = conversationElem.scrollHeight;
```

**And we're done!** We are going to use the frontend we built here for the next activities.
