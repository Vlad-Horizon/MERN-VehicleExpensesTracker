# Project Name: Vehicle Expenses Tracker

This is a pet project built with React, TypeScript, Node.js, Redux, Express, JWT, MongoDB, Mongoose, Axios, React Router DOM, and Jest. The project aims to track expenses for specific vehicles, including spare parts, lubricants, and other related expenses.

## Project Description

The project allows users to manage their vehicle expenses by keeping a history of expenses for each vehicle. Users can create, delete, update, and retrieve expenses as well as vehicles.

The project consists of both a server-side and client-side implementation. The two parts communicate with each other through a REST API.

## Features

- User authentication using JWT (JSON Web Tokens)
- Create, read, update, and delete vehicle records
- Create, read, update, and delete expense records
- Secure API endpoints using authentication and authorization
- Store data in a MongoDB database using Mongoose
- Perform CRUD operations on the server using Express
- Implement routing and navigation using React Router DOM
- State management using Redux
- Asynchronous HTTP requests using Axios
- Unit testing using Jest

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd vehicle-expenses-tracker
```

3. Install the dependencies for the server-side:
```bash
cd server
npm install
```

4. Install the dependencies for the client-side:
```bash
cd ../client
npm install
```

## Usage

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd ../client
npm start
```

3. Access the application in your browser at `http://localhost:3000`.

## Testing

To run the unit tests for the server-side:
```bash
cd server
npm test
```

## Technologies Used

- React
- TypeScript
- Node.js
- Redux
- Express
- JWT
- MongoDB
- Mongoose
- Axios
- React Router DOM
- Jest

## Contributors

- [Your Name]

## License

This project is licensed under the [MIT License](LICENSE).
