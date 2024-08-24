import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import styles from './style.module.css';


const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title cannot exceed 100 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(20, 'Content must be at least 20 characters long'),
});

const UpdatePost = () => {
  const { id } = useParams(); 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setValue('title', response.data.title);
        setValue('content', response.data.content);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(`/posts/${id}`, data);
      navigate(`/blog/${id}`); 
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Update Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            {...register('title')}
            className={styles.input}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>Content</label>
          <textarea
            id="content"
            name="content"
            {...register('content')}
            className={styles.textarea}
          />
          {errors.content && <p className={styles.error}>{errors.content.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
