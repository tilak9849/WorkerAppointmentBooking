import React from 'react';
import '../styles/RegisterStyles.css'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
const Register = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

    // form handler
    const onFinishHandler = async (values) => {
      try {
        dispatch(showLoading())
          const res = await axios.post('/api/v1/user/register', {
              name: values.name,
              email: values.email,
              password: values.password,
              cn: values.cn // Make sure to include 'cn' as per your form field
          });
          dispatch(hideLoading())
          if (res.data.success) {
              message.success('Register Successfully!!');
              navigate('/login');
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
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className='register-form'>
          <h3 className='text-center'>Register Form</h3>

          {/* Name Field */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>

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

          {/* Citizenship Number Field */}
          <Form.Item
            label="Citizenship Number (CN)"
            name="cn"
            rules={[
              { required: true, message: 'Please enter your citizenship number' },
              {
                pattern: /^\d{4}-\d{4}-\d{6}$/,
                message: 'Citizenship number must follow the format ####-####-######',
              },
            ]}
          >
            <Input placeholder="2079-2343-234334" />
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
              Register
            </Button>
          </Form.Item>
            <Link to="/login" className='m-2'>Already Register ? Login Here</Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
