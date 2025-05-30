# FormData Backend Server

## Hosted Heroku Server
- https://next-form-app-backend-26d460c2dfaa.herokuapp.com/

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

4. Create a .env file in the project root and add:
  - MongoDB URI:
    ```bash
    MONGO_DB_URI=[your MongoDB URI]
    ```
  - PORT:
    ```bash
    PORT=3000
    ```

## Usage
To start the server, run:
```bash
node server.js
```
The server will start running on http://localhost:3000. You can make GET requests to the root URL to test the server.

---

## Docker Setup

You can also run this project using Docker:

1. **Build the Docker image:**
   ```bash
   docker build -t next-form-app-backend .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -p 3000:3000 --env-file .env next-form-app-backend
   ```

Make sure your `.env` file (with `MONGO_DB_URI=[your MongoDB URI]` and `PORT=3000`) is present in the project root.

The server will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Contributing
- Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
- This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
