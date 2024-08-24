// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/authContext"
import Login from './pages/login/login';


import Signup from './pages/signup/signup';
import BlogPosts from './pages/blogList/blogPosts';
import BlogPage from './pages/blogPage/blogPage';
import AddBlog from './pages/addBlog/addBlog';
import EditBlog from './pages/updateBlog';
import ProtectedRoute from './pages/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BlogPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/edit-blog/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-blog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
