import React from 'react';
import { useAuth } from '../../context/authContext';
import axiosInstance from '../../utils/axiosInstance';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  username: yup
    .string()
    .email('Please enter a valid email address')
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: data.username, 
        password: data.password,
      });
      if (response) {
        login(response.data.token);
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username (Email)
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your email"
            className={`${styles.input} ${
              errors.username ? styles.inputError : ''
            }`}
            {...register('username')}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ''
            }`}
            {...register('password')}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <p className={styles.demo}>for demo email:"admin@demo.com" & password:"1234@Pm"</p>
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className={styles.signupButton}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
