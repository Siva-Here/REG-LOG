import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Log = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

    const sanitizeInput = (input) => {
        let sanitizedInput = input.trim();
        sanitizedInput = sanitizedInput.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        return sanitizedInput;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sanitizedFormData = {
            username: sanitizeInput(formData.username),
            password: sanitizeInput(formData.password)
        };

        console.log((sanitizedFormData));

        const isSafeInput = Object.values(formData).every(value => typeof value === 'string');

        if (!isSafeInput) {
            console.error('Input validation failed: Non-string values detected.');
            window.alert('Input validation failed: Non-string values detected.');
            return;
        }

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sanitizedFormData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response.json();
            })
            .then(data => {
                if (data === 'Invalid username And Password') {
                    window.alert('Invalid username And Password');
                    console.log('Invalid username And Password');
                    return;
                } else {
                    if (data.username) { // Assuming the username is returned in the response
                        window.alert('Login successful! Welcome, ' + data.username);
                        setIsLogin(true);
                    } else {
                        console.error('Invalid username And Password');
                        window.alert('Invalid username And Password');
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            {isLogin ? (
                <div className="alert alert-success" role="alert">
                    Login successful!
                    <br />
                </div>
            ) : null}

            {!isLogin && (
                <div className="p-5 rounded-5 siva" >
                    <h1 className='text-center signup'><RiAccountCircleFill className='icon' /> Sign In</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <MdEmail className='me-2' />
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="username" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <RiLockPasswordFill className='me-2' />
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleChange} required />
                                <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash className='text-dark'/> : <BsEye className='text-dark'/>}
                                </button>
                            </div>
                        </div>
                        <div className='justify-content-between d-flex'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <NavLink to="/register" className='btn btn-outline-primary ms-4'>SignUp</NavLink>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Log;
