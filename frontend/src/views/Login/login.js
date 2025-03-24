import React, { useState } from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png';
import bg from '../../assets/images/login.gif';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import UserRequest from '../../services/Requests/User';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../redux/actions";
import Toaster from "../../components/Toaster/Toaster";

const Login = (props) => {
    const navigate = useNavigate();
    const [showToaster, setShowToaster] = useState(false); // Initially set to false
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("error");
    const { title } = props;
    useDocumentTitle(title);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await UserRequest.loginUser(formData);
            const { success, message, userId, token, tokenType, expiresIn, first_name } = response;

            if (success) {
                setShowToaster(true);
                setToasterType("success");
                localStorage.setItem('authToken', token);
                localStorage.setItem('tokenType', tokenType);
                localStorage.setItem('userId',userId);
                localStorage.setItem('first_name',first_name);
                const expirationTime = new Date().getTime() + expiresIn * 60 * 1000;
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                console.log(message);

                dispatch(loginUser({ userId, token, tokenType, expiresIn, first_name }));
                navigate(`/?user=${encodeURIComponent(first_name)}`);
                setToasterMessage("Login successful!");
                
            } else {
                setShowToaster(true);
                setToasterType("error");
                console.error(message);
                setToasterMessage(message);
            }
        } catch (error) {
            setShowToaster(true);
            setToasterType("error");
            console.error('An error occurred:', error);
            setToasterMessage(error.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src={bg} alt="Login" className='h-2/3 rounded-md' />
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
                            <input type="email" name="email" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password"
                                className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.password} onChange={handleChange} />
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
            {showToaster && <Toaster message={toasterMessage} type={toasterType} onClose={() => setShowToaster(false)} />}
        </div>
    );
};

export default Login;