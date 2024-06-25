import React from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png'
import bg from '../../assets/images/login.gif'
import { useNavigate } from 'react-router-dom';
import { deepYellow, yellow, white } from '@mui/material/colors';
import { Button } from '@mui/material';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
    <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={bg} alt="Login Image" className='h-2/3 rounded-md'/>
    </div>
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="h-12 rounded-md" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Surasa! 👋</h2>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" autoComplete="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"  />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" autoComplete="current-password" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"  />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember Me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-800 hover:text-yellow-700">Forgot Password?</a>
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
                        }}> Login</Button>
              {/* <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-700 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button> */}
            </div>
          </form>
          <div>
          <p className="text-center my-6">Create a new account.</p>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
