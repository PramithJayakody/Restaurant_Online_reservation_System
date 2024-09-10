import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const UpdateStaff = () => {
    const { id } = useParams(); // Get staff id from URL params
    const [staff, setStaff] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/staff/${id}`);
                setStaff(data);
            } catch (error) {
                setError('Failed to fetch staff details');
            }
        };
        fetchStaff();
    }, [id]);

    const handleChange = (e) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/staff/${id}`, staff);
            alert('Staff updated successfully!');
            navigate('/manage-staff');
        } catch (error) {
            setError('Failed to update staff member');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h5">Update Staff</Typography>
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
                    Update Staff
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </form>
        </Box>
    );
};

export default UpdateStaff;
