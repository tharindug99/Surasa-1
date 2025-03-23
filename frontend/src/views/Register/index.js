import React, { useState } from 'react';
import Logo from '../../../src/assets/images/Surasa Logo.png';
import loginBg from '../../assets/images/login.gif';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import UserRequest from '../../services/Requests/User';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/User';
import Toaster from "../../components/Toaster/Toaster";

const Register = (props) => {
    // State for form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_num: ''
    });
    const [showToaster, setShowToaster] = useState(false); 
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("error");

    const { title } = props;
    const [errorMessage, setErrorMessage] = useState('');
    useDocumentTitle(title);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirm_password) {
            setErrorMessage('Passwords do not match.');
            setToasterMessage('Passwords do not match.');
            setToasterType('error');
            setShowToaster(true);
            return;
        }
        try {
            const response = await UserRequest.addAUser({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                phone_num: formData.phone_num
            });
            dispatch(addUser(response.data));
            setShowToaster(true);
            setToasterType("success");
            setToasterMessage("Registration successful!");
            navigate('/login');
        } catch (error) {
            let errorMsg = 'Registration failed. Please try again.';
            if (error.response && error.response.data) {
                if (error.response.data.email) {
                    errorMsg = error.response.data.email[0];
                } else if (error.response.data.phone_num) {
                    errorMsg = error.response.data.phone_num[0];
                } else if (error.response.data.password) {
                    errorMsg = error.response.data.password[0];
                }    
            }
            setErrorMessage(errorMsg);
            setToasterMessage(errorMsg);
            setToasterType("error");
            setShowToaster(true);
            console.error('An error occurred:', error);
        }
    };

    // Update form data state on input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="flex max-h-screen bg-gray-100">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src={loginBg} alt="Login Image" className="h-3/4 mt-[80px] md:mt-0 rounded-md"/>
            </div>
            <div className="flex flex-col items-center justify-center w-full  md:w-1/2 p-6 md:p-12">
                <div className="w-full max-w-md">
                    <div className="flex  justify-center mb-8">
                        <img src={Logo} alt="Logo" className="h-12 rounded-md"/>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-center">Create an Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First
                                Name</label>
                            <input type="text" name="first_name" id="first_name" autoComplete="name" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.first_name} onChange={handleChange}/>
                        </div>
                        {/* Last Name Input */}
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last
                                Name</label>
                            <input type="text" name="last_name" id="last_name" autoComplete="name" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.last_name} onChange={handleChange}/>
                        </div>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" autoComplete="email" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.email} onChange={handleChange}/>
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" autoComplete="new-password" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.password} onChange={handleChange}/>
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm
                                Password</label>
                            <input type="password" name="confirm_password" id="confirm_password"
                                   autoComplete="new-password" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.confirm_password} onChange={handleChange}/>
                        </div>
                        {/* Mobile Number Input */}
                        <div>
                            <label htmlFor="phone_num" className="block text-sm font-medium text-gray-700">Mobile
                                Number</label>
                            <input type="tel" name="phone_num" id="phone_num" autoComplete="tel" required
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   value={formData.phone_num} onChange={handleChange}/>
                        </div>
                        {/* Sign In Link */}
                        <div className="text-sm">
                            <p className="text-center my-6">Already have an account? 
                                <a href="/login"
                                className="font-medium text-yellow-800 hover:text-yellow-700">Sign
                                in</a></p>
                        </div>
                        {/* Submit Button */}
                        <div className="flex items-center justify-center">
                            <button type="submit"
                                    className="bg-yellow-700 text-white w-full h-10 border-1  hover:bg-yellow-900 hover:border-yellow-800 hover:border-2 hover:text-yellow-800 focus:outline-none disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showToaster && <Toaster message={toasterMessage} type={toasterType} onClose={() => setShowToaster(false)} />}
        </div>
    );
};

export default Register;