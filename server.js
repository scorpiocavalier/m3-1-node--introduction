'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/bot-message', (req, res) => {
    const { text } = req.query;

    const getBotMessage = (text) => {
      const commonGreetings = ['hi', 'hello', 'howdy'];
      let botMsg = null;
      commonGreetings.forEach((word) => {
        console.log(text.includes(word));
        if (text.toLowerCase().includes(word)) botMsg = 'Hello.';
      });
      return botMsg || `"${text}"`;
    };
    const message = { author: 'bot', text: `Bzzt ${getBotMessage(text)}` };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res.send("This is the homepage... it's empty :(");
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .send('404... This is obviously not the page you are looking for.');
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
