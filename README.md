# Blog API

This project showcases a secure NodeJS Express API for a blog as a part of the [Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api) curriculum. The API handles user registration and authentication. Blog posts, comments, and user info are stored in MongoDB and can be created, modified, or deleted based on the requesting user's admin status. This API is used by a React front-end application which can be found [here](https://github.com/snaeem3/blog-client).

## Skills involved with this project

- [JSON Web Token (JWT)](https://jwt.io/) for secure and verifiable user authentication
  - Creation of token when users successfully log-in
  - Token verification when users make certain requests (e.g. Blog post creation, comment deletion, etc.)
- User authentication with [Passport.js](https://www.passportjs.org/)
  - LocalStrategy for username and password authentication
  - Managing user sessions and serialization/deserialization
- Secure password hashing using bcrypt
- Database integration with MongoDB using Mongoose to store user info, blog posts, and comments
- Routing with modular route handlers (`postsRouter`, `authRouter`, etc.)
- Environment configuration using a `.env` file with `dotenv`
- Asynchronous programming with `async/await`
- MVC (Model-View-Controller) pattern for structuring the application
- Form validation and sanitization using express-validator middleware

## Prerequisites

Before you get started with this application, make sure you have the following prerequisites installed on your system:

- Node.js (version >= 18.12.1)
- npm (Node Package Manager)

## Installation

To run the Blog API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/snaeem3/blog-api.git
   ```

2. Change into the project directory:

   ```bash
   cd blog-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_jwt_access_token_code
   REFRESH_TOKEN_SECRET=your_jwt_refresh_token_code
   ```

   Replace `your_mongodb_uri` with the MongoDB connection URI. Replace `your_jwt_access_token_code` and `your_jwt_refresh_token_code` with secret keys of your choosing.

## Usage

### Development

To run the application in development mode with automatic restarts (using Nodemon), use the following command:

```bash
npm run serverstart
```

### Production

For a production-ready start, use:

```bash
npm start
```
