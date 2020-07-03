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

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' }
    const randomTime = Math.floor(Math.random() * 3000)
    setTimeout(() => res.status(200).json({ status: 200, message }), randomTime)
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      'Don’t monkey around with me.',
      'If you pay peanuts, you get monkeys.',
      'I fling 💩 at you!',
      '🙊',
      '🙈',
      '🙉',
    ]

    const getRandomMessage = () => {
      return {
        author: 'monkey',
        text: messages[Math.floor(Math.random() * messages.length)]
      }
    }

    const randomTime = Math.floor(Math.random() * 3000)

    setTimeout(() => 
      res
        .status(200)
        .json({ status: 200, message: getRandomMessage() }),
      randomTime
    )
  })

  .get('/parrot-message/', (req, res) => {
    const message = { author: 'parrot', text: req.query.msg }
    const randomTime = Math.floor(Math.random() * 3000)
    setTimeout(() => 
      res.status(200).json({ status: 200, message }), randomTime)
  })

  .get('/bot-message', (req, res) => {

      const getBotResponse = userInput => {
      const commonGreetings = ['hi', 'hello', 'howdy']
      const commonGoodbyes = ['goodbye', 'bye', 'chao', 'sayonara', 'later']
      const commonInputs = [commonGreetings, commonGoodbyes]
      const commonResponses = ['hello!', 'goodbye!']

      let inputArr = userInput.split(' ')
      for(let input of inputArr)
        for(let [index, arr] of commonInputs.entries())
          if(arr.some(word => input.toLowerCase().startsWith(word)))
            return commonResponses[index]

      return userInput
    }

    // User input
    let text = ''
    let userInput = req.query.msg
    // Convert 'true' to boolean true with JSON.parse.
    let jokeTime = JSON.parse(req.query.jokeTime)

    if(jokeTime) {
      if(userInput.toLowerCase() == 'yes')
        text = `How do you remove a bug? By using arr.filter(isBug)`
      else
        text = `Next time then. Goodbye!`
      
      jokeTime = false
    } else {
      if(userInput.toLowerCase() == 'something funny') {
        text = 'You want to hear something funny? (Y/N)'
        jokeTime = true
      } else {
        text = `Bzzt ${getBotResponse(userInput)}`
        jokeTime = false
      }
    }

    // Send response
    const message = { author: 'bot', text }
    const randomTime = Math.floor(Math.random() * 3000)
    setTimeout(() => {
      res
        .status(200)
        .json({ status: 200, message, jokeTime })
    }, randomTime)
  })

  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
