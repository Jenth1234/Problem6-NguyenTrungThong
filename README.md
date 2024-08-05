# User Score API Service

## Overview

This API service module manages user scores and provides endpoints to update scores and retrieve the top 10 users. The module also integrates with Socket.IO to provide real-time score updates to connected clients.

## API Endpoints

### 1. Update User Score
- **URL:** `/score/update`
- **Method:** `POST`
- **Request Data:**
  ```json
  {
    "user_id": "string",
    "score": "number"
  }


  Successful Response (200 OK)
    {
  "message": "Score has been successfully updated",
  "data": {
    "user_id": "string",
    "new_score": "number"
    }
    }

  Error Responses:
  400 Bad Request
   {
  "error": "Invalid request data"
  }

  500 Internal Server Error:
    {
  "error": "Server error: error details"
    }

### 2. Get Top 10 Users
URL: /score/top10
Method: GET
Successful Response (200 OK)
{
  "data": [
    {
      "user_id": "string",
      "full_name": "string",
      "score": "number"
    }
  ]
}
Error Response (500 Internal Server Error):
{
  "error": "Server error: error details"
}
### 3. Real-Time Updates with Socket.IO
Event Name: scoreUpdate
Data: json
{
  "user_id": "string",
  "full_name": "string",
  "new_score": "number"
}
Installation Instructions
Install Node.js and MongoDB:
Ensure that Node.js and MongoDB are installed on your system.

Clone the Repository:
    
git clone <URL-to-repository>
cd <repository-folder>
Install Dependencies:

npm install
Create a .env File:
Create a .env file in the root directory of the project with the necessary environment variables. For example:

env
Copy code
MONGO_URI=mongodb://localhost:27017/your-database
PORT=3050
Start the Server:

npm start

### 4.Integrate with Socket.IO
Ensure that you have configured Socket.IO on the client to listen for the scoreUpdate event.
Example client JavaScript:
javascript

const socket = io('http://localhost:3050');

socket.on('scoreUpdate', (data) => {
  console.log('Score has been updated:', data);
 
});

### 5.Execution Flow Diagram
Below is a diagram illustrating the execution flow of the module:
+------------------+          +-----------------+          +-------------------+
| Client           |          | API Service     |          | Database          |
| (Web/Socket.IO)  |          | (Node.js/Express) |          | (MongoDB)         |
+------------------+          +-----------------+          +-------------------+
         |                           |                           |
         |   POST /score/update       |                           |
         | --------------------------> |                           |
         |   {user_id, score}         |                           |
         |                           |                           |
         |                           |   Update Score in DB       |
         |                           | --------------------------> |
         |                           |                           |
         |                           |   Emit scoreUpdate event    |
         |                           | <-------------------------- |
         |                           |                           |
         |   GET /score/top10          |                           |
         | --------------------------> |                           |
         |                           |   Retrieve Top 10 Users     |
         |                           | --------------------------> |
         |                           |                           |
         |                           |   Return Top 10 Users       |
         |                           | <-------------------------- |
         |                           |                           |
         |   Handle scoreUpdate event  |                           |
         | <-------------------------- |                           |
         |                           |                           |

