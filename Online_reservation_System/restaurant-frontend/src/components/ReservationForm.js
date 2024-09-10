import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import Sidebar from './Sidebar'; // Import the Sidebar component

const ReservationForm = () => {
    const [reservation, setReservation] = useState({
        serviceType: '',
        date: '',
        time: '',
        user: { id: 1 } // Assuming logged-in user's ID
    });

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/reservations', reservation);
            alert('Reservation made successfully!');
        } catch (error) {
            console.error(error);
            alert('Reservation failed, please try again!');
        }
    };

    return (
        <Box display="flex">
            <Sidebar /> {/* Add the Sidebar component */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'top',
                    minHeight: '10vh',
                    padding: 2
                }}
            >
                <Card sx={{ maxWidth: 400, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Make a Reservation
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Service Type"
                                name="serviceType"
                                value={reservation.serviceType}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Date"
                                name="date"
                                type="date"
                                value={reservation.date}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }} // For date field label
                            />
                            <TextField
                                label="Time"
                                name="time"
                                type="time"
                                value={reservation.time}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }} // For time field label
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{
                                    backgroundColor: '#BDC3C7',
                                    '&:hover': {
                                        backgroundColor: '#AAB7B8', // Darker shade on hover
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ReservationForm;
