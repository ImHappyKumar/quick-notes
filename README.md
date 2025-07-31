# QuickNotes

Developed by Happy Kumar

QuickNotes is a web application built using React.js, Node.js, and MongoDB, allowing users to manage their notes with features like user authentication, adding, editing, and deleting notes.

## Features

- User registration and login functionality.
- Add, edit, and delete notes.
- Store notes in a MongoDB database.
- Frontend built using React.js for a dynamic user interface.
- Backend powered by Node.js and Express for handling API requests.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/
- Git: https://git-scm.com/

## Installation

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/ImHappyKumar/quick-notes.git
   ```
2. Navigate to the project directory:
   ```
   cd quick-notes
   ```
3. Install dependencies for the client (React) and server (Node.js) applications:
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```

## Configuration

1. Example environment variable files are provided:

   - `/client/.env.example`
   - `/server/.env.example`

2. To configure the application, simply **rename** these files:

   ```
   mv client/.env.example client/.env
   mv server/.env.example server/.env
   ```

3. Update the variable values inside the newly created `.env` files as needed.

### Default `.env` values (examples):

- **Client (`/client/.env`)**

  ```env
  REACT_APP_HOST=http://localhost:5000
  ```

- **Server (`/server/.env`)**
  ```env
  JWT_Secret=your_secret_key
  ```

## Usage

1. Start backend and frontend concurrently (from project root):
   ```
   npm run both
   ```
2. Access the application in your browser at [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions are welcome! If you encounter issues or have suggestions, please create an issue or submit a pull request.
