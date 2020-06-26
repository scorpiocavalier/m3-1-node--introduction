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
|   ├── styles.css
|   └── index.html
├── .gitignore
├── package.json (where we keep a record of the app setup)
├── README.md (this file)
├── server.js
└── yarn.lock ("locks" the dependency versions)
```
