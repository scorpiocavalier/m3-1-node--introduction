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

  // endpoints

  // this serves up the homepage
  .get('/', (req, res) => {
    res.send("This is the homepage... it's empty :(");
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res.status(404);
    res.send('404... This is obviously not the page you are looking for.');
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
