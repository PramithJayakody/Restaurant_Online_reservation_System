import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

const RegisterForm = () => {
    const [user, setUser] = useState({ username: '', password: '', reEnterPassword: '', role: 'customer' });
    const [errors, setErrors] = useState({ username: '', password: '', reEnterPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear errors on change
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { username: '', password: '', reEnterPassword: '' };

        // Username validation
        if (!user.username) {
            newErrors.username = 'Username is required';
            valid = false;
        } else if (user.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters long';
            valid = false;
        }

        // Password validation
        if (!user.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (user.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        // Re-enter password validation
        if (user.reEnterPassword !== user.password) {
            newErrors.reEnterPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Only submit if form is valid

        try {
            await axios.post('http://localhost:8080/api/users/register', user);
            alert('User registered successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Registration failed, please try again!');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
            <img 
                src="/logo-no-background.png" 
                alt="Logo" 
                style={{ width: '150px', marginBottom: '20px' }} 
            />
            <Card sx={{ maxWidth: 400, padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            label="Re-enter Password"
                            name="reEnterPassword"
                            type="password"
                            value={user.reEnterPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            error={!!errors.reEnterPassword}
                            helperText={errors.reEnterPassword}
                        />
                        <Button 
                            variant="contained" 
                            type="submit" 
                            fullWidth
                            sx={{ backgroundColor: '#AAB7B8', '&:hover': { backgroundColor: '#9AABAC' } }}
                        >
                            Register
                        </Button>
                    </form>
                    <Button 
                        variant="text" 
                        onClick={() => navigate('/')} 
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Go to Login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterForm;
