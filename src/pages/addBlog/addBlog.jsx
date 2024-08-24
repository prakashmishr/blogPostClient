import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';


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

const AddPost = () => {
  let navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), 
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/posts', data);
      alert('Post added successfully!');
      navigate("/")
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Post</h1>
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
        <button type="submit" className={styles.submitButton}>Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
