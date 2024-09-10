import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import Sidebar from './Sidebar'; // Import the Sidebar component

const PastReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAdmin = localStorage.getItem('role') === 'admin'; // Determine if user is an admin

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assumes user ID is stored in local storage
                const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}`);
                setReservations(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching past reservations');
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box display="flex">
            <Sidebar isAdmin={isAdmin} /> {/* Include Sidebar */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Past Reservations
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reservation ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.length > 0 ? (
                                reservations.map((reservation) => (
                                    <TableRow key={reservation.id}>
                                        <TableCell>{reservation.id}</TableCell>
                                        <TableCell>{reservation.date}</TableCell>
                                        <TableCell>{reservation.time}</TableCell>
                                        <TableCell>{reservation.serviceType}</TableCell>
                                        <TableCell>{reservation.status}</TableCell> {/* Assuming `status` field is available */}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No past reservations found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default PastReservations;
