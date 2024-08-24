import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import styles from './style.module.css';

const BlogPostDetails = () => {
  let navigate = useNavigate()
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      navigate('/'); 
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    }
  };




  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  if (!post) return null;


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.meta}>
        Added by {post.author} on {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.buttonContainer}>
        <button onClick={handleEdit} className={styles.editButton}>Edit</button>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default BlogPostDetails;
