import React, { useState } from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png';
import bg from '../../assets/images/login.gif'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deepYellow, yellow, white } from '@mui/material/colors';

const Index = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile_no: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); 
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        
        <img src={bg} alt="Login Image" className="h-1/2 rounded-md" />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="h-12 rounded-md" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="full_name" id="full_name" autoComplete="name" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.full_name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" autoComplete="email" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" autoComplete="new-password" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" name="confirm_password" id="confirm_password" autoComplete="new-password" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.confirm_password} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input type="tel" name="mobile_no" id="mobile_no" autoComplete="tel" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.mobile_no} onChange={handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-center my-6">Already have an account? <a href="/login" className="font-medium text-yellow-800 hover:text-yellow-700">Sign in</a></p>
              </div>
            </div>
            <div className="flex items-center justify-center">
            <Button
                        disableElevation 
                        variant="contained" 
                        onClick={() => navigate('/register')}
                        sx={{
                            bgcolor:yellow[700],
                            width:"30rem", 
                            '&:hover': {
                            bgcolor: 'transparent',
                            borderWidth:2,
                            borderColor: yellow[800], 
                            color: yellow[800], 
                            }
                        }}> Submit</Button>
              {/* <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Index</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
