import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import Sidebar from './Sidebar'; // Import your existing Sidebar component

const AddStaff = () => {
    const [staff, setStaff] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/staff/add', staff);
            alert('Staff added successfully!');
        } catch (error) {
            setError('Failed to add staff member');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar /> {/* Use your existing Sidebar component */}
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add Staff
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={staff.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={staff.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Add Staff
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </form>
            </Box>
        </Box>
    );
};

export default AddStaff;
