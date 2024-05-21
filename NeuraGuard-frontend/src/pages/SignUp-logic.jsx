import React, { useState } from 'react';

function SignIn() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        phonenumber: '',
        address: '',
        gender:'',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle success
            console.log('User created successfully!');
        } catch (error) {
            // Handle error
            console.error('There was a problem creating the user:', error);
        }
    };

    return (
        <>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstname" placeholder="firstname" value={formData.firstname} onChange={handleChange} />
                <br />
                <input type="text" name="lastname" placeholder="lastname" value={formData.lastname} onChange={handleChange} />
                <br />
                <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
                <br />
                <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
                <br />
                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                <br />
                <input type="password" name="confirmpassword" placeholder="retype password" value={formData.confirmpassword} onChange={handleChange} />
                <br />
                <input type="text" name="phonenumber" placeholder="phone number" value={formData.phonenumber} onChange={handleChange} />
                <br />
                <input type="text" name="address" placeholder="address" value={formData.address} onChange={handleChange} />
                <br />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default SignIn;
