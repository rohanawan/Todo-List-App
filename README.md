## TODO LIST BACKEND

Prerequisite

1- Create a .env file in the root directory of Frontend and Backend copy everything from .env.example file and paste it inside .env file.For Frontend you just have to put 'REACT_APP_API_URL=http://localhost:5000'

2- Replace the values with your desired values in the .env file.

## Quick Start

To run a project, simply run:

To install dependencies on both side

```bash
npm install 
```

## Commands

To run project

For BackEnd
```bash
npm run dev 
```

For FrontEnd
```bash
npm start 
```

For Backend Tests
```bash
npm run test:watch
```

For Backend Tests Coverage
```bash
npm run coverage 
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

For Backend:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017

```

For FrontEnd
```
REACT_APP_BACKEND_URL='your_backend_url'
```

## Project Structure

Backend
```
src\
 |--config\         # Environment variables and configuration related things
 |--middlewares\    # Middlewares
 |--controllers\    # Route controllers (controller layer)
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--tests\          # Unit and Integration Tests
 |--app.js          # Express app
 |--index.js        # App entry point
```

FrontEnd
```
src\
 |--components\     # Components Files
 |--config\         # Environment variables and configuration related things
 |--interceptos\    # Api Handling
 |--routes\         # App Routes files
 |--styles\         # Css styling Files
 |--services\       # Api Services
 |--Views\          # App views File
 |--app.js          # React app
 |--index.js        # App entry point
```

Happy Hacking!