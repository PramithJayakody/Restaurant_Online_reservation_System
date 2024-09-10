import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import { Box } from '@mui/system';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            if (response.data) {
                const { role } = response.data; // Get user role from the response

                // Save username to local storage
                console.log(response.data.id);
                localStorage.setItem('username', loginData.username);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('role', role); // Save user role to local storage if needed

                if (role === 'customer') {
                    alert('Login successful!');
                    navigate('/reservation'); // Redirect to reservation for customers
                }else if (role === 'staff') {
                    alert('Login successful!');
                    navigate('/all-reservations '); // Redirect to reservation for customers
                } else {
                    alert('Login successful! Redirecting to Admin Panel.');
                    navigate('/reservationlist'); // Redirect to admin panel for non-customers
                }
            } else {
                alert('Invalid credentials, please try again!');
            }
        } catch (error) {
            console.error(error);
            alert('Login failed, please try again later!');
        }
    };

    const goToRegister = () => {
        navigate('/register');
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
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            value={loginData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button 
                            variant="contained" 
                            type="submit" 
                            fullWidth
                            sx={{ backgroundColor: '#AAB7B8', '&:hover': { backgroundColor: '#9AABAC' } }}
                        >
                            Login
                        </Button>
                    </form>
                    <Box textAlign="center" marginTop={2}>
                        <Link href="#" onClick={goToRegister} underline="none">
                            Don't have an account? Register here.
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginForm;
