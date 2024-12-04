import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // Form handler
  const onFinishHandler = async (values) => {
    try {
        dispatch(showLoading())

      const res = await axios.post('/api/v1/user/login', values);
     window.location.reload()
      dispatch(hideLoading())
      if (res.data.success) {
        message.success('Login Successfully!!');

        // Save token to localStorage
        localStorage.setItem('token', res.data.token);

        // Navigate to the homepage or dashboard
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading())
      console.log(err);
      message.error('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h3 className="text-center">Login Form</h3>

          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters long' },
            ]}
          >
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-primary">
              Login
            </Button>
          </Form.Item>
          <Link to="/register" className="m-2">
            Not Registered? Register Here
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
