# FormData Backend Server

## Project Overview
This project is a backend server for handling form data. It uses Node.js and Express for the server framework and MongoDB for data storage.

## Features
- Receive form data through HTTP requests.
- Store form data in a MongoDB database.
- Basic validation and error handling.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a MongoDB database set up and accessible.

## Installation and Setup
To install FormData Backend Server, follow these steps:

1. Clone the repository:
```bash
git clone [repository URL]
```

2. Navigate to the project directory:
```bash
cd [project directory]
```

3. Install dependencies:
```bash
npm install
```

4. Create a .env file in the project root and add your MongoDB URI:
```bash
MONGO_DB_URI=[your MongoDB URI]
```

## Usage
To start the server, run:
```bash
node server.js
```
The server will start running on http://localhost:3000. You can make GET requests to the root URL to test the server.