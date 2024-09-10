import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import Sidebar from './Sidebar'; // Import the Sidebar component

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Fetch reservations from backend on component mount
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reservations');
                setReservations(response.data); // Assume the response contains the reservations data
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    // Function to handle accepting a reservation
    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/reservations/${id}/accept`); // API call to accept the reservation
            alert('Reservation accepted!');
            setReservations(reservations.filter(reservation => reservation.id !== id)); // Optionally remove the reservation from the list
        } catch (error) {
            console.error('Error accepting reservation:', error);
        }
    };

    // Function to handle rejecting a reservation
    const handleReject = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/reservations/${id}/reject`); // API call to reject the reservation
            alert('Reservation rejected!');
            setReservations(reservations.filter(reservation => reservation.id !== id)); // Optionally remove the reservation from the list
        } catch (error) {
            console.error('Error rejecting reservation:', error);
        }
    };

    // Filter to display only pending reservations
    const pendingReservations = reservations.filter(reservation => reservation.status === 'pending');

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar for admin */}
            <Sidebar isAdmin={true} />

            {/* Main content shifted to the right to avoid overlapping with sidebar */}
            <Box component="main" sx={{ flexGrow: 1, p: 4, ml: '250px' }}> {/* Adjust margin to account for sidebar width */}
                <Typography variant="h4" gutterBottom>
                    Pending Reservations
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reservation ID</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Reservation Date</TableCell>
                                <TableCell>Reservation Time</TableCell>
                                <TableCell>Details</TableCell>
                                <TableCell>Actions</TableCell> {/* New column for actions */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingReservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.id}</TableCell>
                                    <TableCell>{reservation.user.username}</TableCell>
                                    <TableCell>{reservation.date}</TableCell>
                                    <TableCell>{reservation.time}</TableCell>
                                    <TableCell>{reservation.serviceType}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAccept(reservation.id)}
                                            sx={{ mr: 1 }} // Margin right for spacing between buttons
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleReject(reservation.id)}
                                        >
                                            Reject
                                        </Button>
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

export default ReservationList;
