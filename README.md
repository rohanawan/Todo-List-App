## TODO LIST BACKEND

Prerequisite

1- Create a .env file in the root directory and copy everything from .env.example file and paste it inside .env file.
2- Replace the values with your desired values in the .env file.

## Quick Start

To run a project, simply run:

To install dependencies on both side

```bash
npm install 
```

To run project

For BackEnd
```bash
npm run dev 
```

For FrontEnd
```bash
npm start 
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

For Backend:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
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
 |--controllers\    # Route controllers (controller layer)
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
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
 |--Views\          # App views File
 |--app.js          # React app
 |--index.js        # App entry point
```

Happy Hacking!