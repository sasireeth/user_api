User API
This is a simple RESTful API for managing a list of users. It supports CRUD operations, authentication, validation, and error handling.

Installation
Clone the repository (if you haven't already):

bash
git clone <repository-url>
Navigate to the project directory:

bash
cd user-api

Install dependencies:
bash
npm install

Start the server:
bash
nodemon index.js

API Endpoints
Authentication
All endpoints require an API key for access. Include the API key in the request headers as x-api-key.
API Key: 12345

Create User
Endpoint: POST /users
Description: Creates a new user.
Headers: x-api-key: 12345
Request Body:
json
{
  "name": "Alice",
  "email": "alice@example.com"
}
Response:
json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
Errors:
400 Bad Request: If name or email is missing or email is invalid.
409 Conflict: If a user with the same name already exists.

Read User
Endpoint: GET /users/:id
Description: Retrieves a user by ID.
Headers: x-api-key: 12345
Response:
json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
Errors:
404 Not Found: If the user does not exist.

Update User
Endpoint: PUT /users/:id
Description: Updates a user by ID.
Headers: x-api-key: 12345
Request Body:
json
{
  "name": "AliceUpdated",
  "email": "alice_updated@example.com"
}
Response:
json
{
  "id": 1,
  "name": "AliceUpdated",
  "email": "alice_updated@example.com"
}
Errors:
400 Bad Request: If name or email is missing or email is invalid.
404 Not Found: If the user does not exist.
409 Conflict: If a user with the same name already exists.

Delete User
Endpoint: DELETE /users/:id
Description: Deletes a user by ID.
Headers: x-api-key: 12345
Response:
json
{
  "message": "User deleted successfully"
}
Errors:
404 Not Found: If the user does not exist.
Error Handling
The API uses standard HTTP status codes to indicate the result of operations. Common status codes include:

200 OK: Successful operation.
201 Created: Resource successfully created.
204 No Content: Resource successfully deleted.
400 Bad Request: Invalid request data.
401 Unauthorized: Missing or invalid API key.
404 Not Found: Resource not found.
409 Conflict: Conflict in request, such as duplicate username.
500 Internal Server Error: An unexpected error occurred.

Postman Collection
You can use the following Postman link to access the API endpoints and test them directly:
https://www.postman.com/jack00-1321/workspace/user-api/collection/32887219-30ecd57d-dcdb-43bc-a583-b953ab555b91?action=share&creator=32887219#

Usage

Create User:
Send a POST request to /users with the required user data.

Read User:
Send a GET request to /users/:id with the user ID.

Update User:
Send a PUT request to /users/:id with the updated user data.

Delete User:
Send a DELETE request to /users/:id to delete the user.
