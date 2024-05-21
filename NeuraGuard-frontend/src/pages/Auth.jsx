import React, { useState } from 'react';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch user data from db.json or your backend
        try {
            const response = await fetch('http://localhost:3000/users'); // Assuming 'users' is the endpoint in db.json
            const jsonData = await response.json();

            // Check if the entered email and password match any user data
            const user = jsonData.find(user => user.email === formData.email && user.password === formData.password);
            if (user) {
                // Login successful
                console.log('Login successful:', user);
                // You can redirect the user to another page or set some state to indicate successful login
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to sign in. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <input type="submit" value="Sign In" />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default SignIn;


