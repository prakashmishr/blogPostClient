import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

const BlogPosts = () => {
  let navigate =  useNavigate()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : content;
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Blog Posts</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.postItem} onClick={()=> navigate(`/blog/${post._id}`)}>
            <a  className={styles.postTitle}>
              {post.title}
            </a>
            <p className={styles.postContent}>
              {truncateContent(post.content, 50)}
             
            </p>
          </li>
        ))}
      </ul>
      <button 
        className={styles.addButton} 
        onClick={() => navigate('/add-blog')}
      >
        +
      </button>
    </div>
  );
};

export default BlogPosts;
