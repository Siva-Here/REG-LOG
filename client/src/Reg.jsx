import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Reg = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

        // Validate password
        if (!passwordRegex.test(formData.password)) {
            window.alert('Password must be 8-10 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
            return;
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            window.alert('Passwords do not match.');
            return;
        }

        fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response.text();
            })
            .then(data => {
                if (data === 'Username already exists') {
                    window.alert('Username already exists');
                    console.log('Username already exists');
                    window.location.href = '/register';
                } else {
                    console.log('Success:', data);
                    setIsRegistered(true);
                    setTimeout(() => { window.location.href = '/login' }, 5000)

                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            {isRegistered ? (
                <div className="alert alert-success" role="alert">
                    Registration successful!
                    <br />
                    <NavLink to="/login" className='btn btn-outline-primary ms-4'>Login</NavLink>
                </div>
            ) : null}

            {!isRegistered && (
                <div className="bg-white p-5 rounded-5 siva">

                    <h1 className='text-center signup'><RiAccountCircleFill className='icon' /> Sign Up</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        {/* Your form inputs */}
                        <div className="mb-3">
                            <MdEmail className='me-2' />
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="username" value={formData.email} onChange={handleChange} required/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <RiLockPasswordFill className='me-2' />
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleChange} required/>
                                <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash className='text-dark'/> : <BsEye className='text-dark'/>}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <GiConfirmed className='me-2' />
                            <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputConfirmPassword1" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
                        </div>
                        <div className='justify-content-between d-flex'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <NavLink to="/login" className='btn btn-outline-primary ms-4'>Login</NavLink>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Reg;
