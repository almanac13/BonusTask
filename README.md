Bonus Task 1 Report

Foundational Backend with Node.js and Express

1. Objective

The objective of this task was to create a foundational backend application using Node.js and Express.js, implement basic routing, and demonstrate CRUD operations using different HTTP methods. The functionality was tested using Postman.

2. Tools and Technologies Used

Node.js – JavaScript runtime environment

Express.js – Backend web framework

Postman – API testing tool

Visual Studio Code – Code editor

3. Environment Setup

Node.js was installed successfully.

A new project directory was created.

package.json was initialized using npm init -y.

Express was installed using npm install express.

The server was started using node index.js.

4. Implemented Routes and Functionality
4.1 Basic Routes
Route	Method	Description	Status
/	GET	Returns plain text "Hello user"	✅ Working
/json	GET	Returns JSON object	✅ Working
/profile/:username	GET	Dynamic route displaying username	✅ Working
/letters?text=value	GET	Processes query parameter and returns different formats	✅ Working
4.2 CRUD Operations for Users

Dummy user data was stored in an in-memory array:

[
  { id: 1, name: "Adam" },
  { id: 2, name: "Sara" }
]

Route	Method	Description	Status
/users	GET	Returns list of users	✅ Working
/users	POST	Creates a new user	✅ Working
/users/:id	PUT	Updates user by ID	❌ Not working
/users/:id	DELETE	Deletes user by ID	✅ Working
5. PUT Method Issue Explanation

The PUT /users/:id route was implemented correctly in code, however during testing with Postman the request body was not properly received by the server.

As a result:

The server returned the message "Request body is empty"

The update operation could not be completed

Possible reasons include:

Incorrect body format in Postman

Missing or incorrect Content-Type: application/json header

Request body not being sent properly

Despite multiple attempts, the PUT request did not function as expected, while all other CRUD operations worked correctly.

6. Testing with Postman

All routes were tested using Postman:

GET, POST, and DELETE methods worked correctly

PUT method returned an error related to an empty request body

Screenshots were taken for all successful requests and the PUT error
