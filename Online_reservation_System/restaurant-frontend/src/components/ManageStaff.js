import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';

const ManageStaff = () => {
    const [staffList, setStaffList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/users/staff/all');
            setStaffList(data);
        } catch (error) {
            setError('Failed to fetch staff members');
            console.error('Failed to fetch staff members', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this staff member?');
        if (!confirmDelete) return;

        try {
            if (!id) {
                console.error('No ID provided for deletion');
                return;
            }

            await axios.delete(`http://localhost:8080/api/users/staff/delete/${id}`);
            fetchStaff(); // Re-fetch staff list after successful deletion
        } catch (error) {
            setError('Failed to delete staff member');
            console.error('Failed to delete staff member', error);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar component */}
            <Sidebar /> {/* Include your Sidebar component here */}
            
            <Box sx={{ flex: 1, padding: 2, marginLeft: '240px' }}> {/* Adjust margin for Sidebar */}
                <Typography variant="h5" gutterBottom>Manage Staff</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell> {/* Adjust if needed */}
                                <TableCell>Role</TableCell> {/* Adjust if needed */}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffList.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>{staff.id}</TableCell>
                                    <TableCell>{staff.username}</TableCell>
                                    <TableCell>{staff.email}</TableCell> {/* Adjust if needed */}
                                    <TableCell>{staff.role}</TableCell> {/* Adjust if needed */}
                                    <TableCell>
                                        <IconButton edge="end" onClick={() => handleDelete(staff.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ManageStaff;
