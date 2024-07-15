import React from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png';
import bg from '../../assets/images/login.gif';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {yellow} from '@mui/material/colors';
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

// Custom hook for form handling could be implemented here
// function useFormInput(initialValue) {...}

const Login = (props) => {
    const navigate = useNavigate();
    const {title} = props;
    useDocumentTitle(title);


    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // Implement login logic here
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        // On successful login, navigate to another route
        // navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src={bg} alt="Login" className='h-2/3 rounded-md'/>
            </div>
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-12">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-8">
                        <img src={Logo} alt="Logo" className="h-12 rounded-md"/>
                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Surasa! 👋</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" autoComplete="email" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" autoComplete="current-password"
                                   required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember
                                    Me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-yellow-800 hover:text-yellow-700">Forgot
                                    Password?</a>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button
                                disableElevation
                                variant="contained"
                                onClick={() => navigate('/register')}
                                sx={{
                                    bgcolor: yellow[700],
                                    width: "30rem",
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        borderWidth: 2,
                                        borderColor: yellow[800],
                                        color: yellow[800],
                                    }
                                }}
                            > Login</Button>
                        </div>
                    </form>
                    <div>
                        <span onClick={() => navigate('/register')}> <p
                            className="text-center my-6 hover:text-yellow-700 hover:cursor-pointer">Create a new account.</p></span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;