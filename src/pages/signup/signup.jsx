import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';


const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(1, 'First name must be at least 1 character long'),
  
  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(1, 'Last name must be at least 1 character long'),

  email: yup
    .string()
    .trim()
    .email('Email is invalid')
    .max(64, 'Email must not exceed 64 characters')
    .required('Email is required'),

  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain 1 upper case, 1 lower case, 1 special character, and 1 number'
    ),
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/signup', data);
        
      if (response) {
     
        navigate('/login');
      } else {
        
        alert(response.data.message );
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register('firstName')}
            className={errors.firstName ? styles.errorInput : ''}
          />
          {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            {...register('lastName')}
            className={errors.lastName ? styles.errorInput : ''}
          />
          {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register('email')}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
