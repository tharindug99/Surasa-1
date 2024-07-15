import React, { useState } from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png';
import bg from '../../assets/images/login.gif';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import UserRequest from '../../services/Requests/User'; // Adjust the import path as necessary

const Login = (props) => {
    const navigate = useNavigate();
    const { title } = props;
    useDocumentTitle(title);

    // State to store login form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Use the loginUser method from UserRequest
            const response = await UserRequest.loginUser(formData.email, formData.password);

            if (response.status === 200) { // Adjust according to your API's success response
                const data = response.data;
                console.log(data);
                navigate('/', { state: { userId: data.userId } }); // Adjust as necessary based on your API response
            } else {
                console.error('Login failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.email} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" autoComplete="current-password"
                                   required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.password} onChange={handleChange}/>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit"
                                    className="bg-yellow-700 text-white w-full h-10 border-1  hover:bg-yellow-900 hover:border-yellow-800 hover:border-2 hover:text-yellow-800 focus:outline-none disabled:opacity-50"
                            >
                                Login
                            </button>
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