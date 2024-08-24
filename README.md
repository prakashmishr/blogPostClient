# Blog Management Application

## Overview

This project is a full-featured blog management application built using React, including functionality for user authentication, blog post management, and form validation. The app uses the MERN stack (MongoDB, Express, React, Node.js) and includes features such as protected routes, user signup and login, and a user-friendly interface.

## Features

- **User Authentication**: Signup and login functionality with validation.
- **Protected Routes**: Access to blog posts and management features is restricted to authenticated users.
- **Blog Management**: Create, read, update, and delete blog posts.
- **Responsive Design**: User interface is styled with CSS for a modern and clean look.

## Technologies Used

- **Frontend**: React, React Hook Form, Yup, React Router
- **Backend**: Node.js, Express 
- **Database**: MongoDB 

## Setup

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone repo-link
   cd repo-link
Install dependencies

bash
Copy code
npm install
# or
yarn install

Start the application

bash
Copy code
npm start
# or
yarn start
The app will run on http://localhost:3000.

Usage
Pages
Home (/): Displays a list of blog posts.
Login (/login): Allows users to log in.
Signup (/signup): Allows users to register an account.
Blog Post (/blog/:id): Displays a single blog post with details.
Add Blog (/add-blog): Form to create a new blog post.
Edit Blog (/edit-blog/:id): Form to edit an existing blog post.

Authentication
Login: Users can log in with their email and password. On successful login, they are redirected to the home page.
Signup: Users can register with their first name, last name, email, and password.
Protected Routes
Routes that require authentication are protected by the ProtectedRoute component. Users will be redirected to the login page if they are not authenticated.

API Endpoints
Login: POST /auth/login

Request Body: { email: string, password: string }
Response: { token: string }
Signup: POST /auth/signup

Request Body: { firstName: string, lastName: string, email: string, password: string }
Response: { message: string }
Blog Posts: GET /posts

Single Blog Post: GET /posts/:id

Create Blog Post: POST /posts

Update Blog Post: PUT /posts/:id

Delete Blog Post: DELETE /posts/:id

Validation
Validation is handled using Yup and React Hook Form. The following validations are applied:

Signup:
firstName: Required, minimum length of 1
lastName: Required, minimum length of 1
email: Required, must be a valid email address, unique
password: Required, minimum length of 6, must contain upper and lower case letters, numbers, and special characters

Login:
username (Email): Required, must be a valid email address
password: Required, minimum length of 6
"# blogPostClient" 
