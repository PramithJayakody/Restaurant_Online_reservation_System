import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, CardContent, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar component

const UserProfile = () => {
    const { username } = useParams(); // Get username from URL params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve username from local storage if not available in URL params
                const userName = username || localStorage.getItem('username');
                if (userName) {
                    const response = await axios.get(`http://localhost:8080/api/users/find/${userName}`);
                    setUser(response.data);
                    setFormData({ username: response.data.username, password: '' });
                } else {
                    setError('Username not found');
                }
            } catch (error) {
                setError('User not found');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/users/update/${user.id}`, formData);
            setUser(response.data);
            alert('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            console.error(error);
            alert('Failed to update profile, please try again!');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box display="flex">
            <Sidebar /> {/* Include Sidebar */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 4,
                    minHeight: '100vh'
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            User Profile
                        </Typography>
                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }}>
                                    Save Changes
                                </Button>
                                <Button variant="outlined" onClick={handleEditToggle} fullWidth sx={{ marginTop: 2 }}>
                                    Cancel
                                </Button>
                            </form>
                        ) : (
                            <>
                                <Typography variant="h6">UserId: {user.id}</Typography>
                                <Typography>Email: {user.username}</Typography>
                                <Typography>Password: {user.password}</Typography>
                                <Button variant="contained" onClick={handleEditToggle} sx={{ marginTop: 2 }}>
                                    Edit Profile
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default UserProfile;
