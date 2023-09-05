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
    git clone https://github.com/ImHappyKumar/QuickNotes.git
    ```
2. Navigate to the project directory:
    ```
    cd quick-notes
    ```
3. Install dependencies for the client (React) and server (Node.js) applications:
    ```
    cd 'QuickNotes - Frontend'
    npm install
    cd '../QuickNotes - Backend'
    npm install
    ```

## Configuration
1. Create a .env file in the backend directory ('/QuickNotes - Backend') for environment variables:
    ```
    JWT_Secret = your_secret_key
    ```
2. Create a .env file in the frontend directory ('/QuickNotes - Frontend') for environment variables:
    ```
    REACT_APP_HOST = backend_host_URL
    Example:
    REACT_APP_HOST = 'http://localhost:5000'
    ```
    
## Usage
1. Start backend and frontend concurrently:
    ```
    npm run both
    ```
2. Access the application in your browser at http://localhost:3000

## Contributing
Contributions are welcome! If you encounter issues or have suggestions, please create an issue or submit a pull request.
    


