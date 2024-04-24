#  Introduction

A MERN application for basic tasks management.



## Features

### User-side features

- Signup
- Login
- Logout
- Add tasks
- View tasks
- Update tasks
- Delete tasks


## Tools and Technologies

- HTML
- Javascript
- CSS
- Node.js
- Express.js
- Mongodb

## Dependencies

Following are the major dependencies of the project:

- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose



## Installation and Setup

### Note: Node.js Must be installed in the system

To run this application locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.

Inside frontend folder:

- Click on index.html

Inside backend folder:

- `npm install`: Installs all the dependencies
- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## Backend API

<pre>
- POST     /user/signup
- POST     /user/login
- GET      /task/
- GET      /task/:taskId
- POST     /task
- PUT      /task/:taskId
- DELETE   /task/:taskId
- GET      /profile
</pre>

## Frontend pages

<pre>
- /                 Home Screen (Public home page for guests and private dashboard (tasks) for logged-in users)
- /signup.html          Signup page
- /login                Login page
- /taskitem.html        Add new task
</pre>


### Deployment
- Frontend:[Frontend](https://books-task-manager.vercel.app/).
- Backend: [Backend](https://server-demo-58ir.onrender.com).

## ScreenShots





