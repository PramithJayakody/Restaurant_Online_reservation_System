import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Select, MenuItem, Button, Typography, Card, CardContent } from '@mui/material';
import Sidebar from './Sidebar'; // Import the Sidebar component

const SearchServices = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/services/search', {
                params: { query: searchQuery, type: serviceType, location }
            });
            console.log('API Response:', response.data);
            // Ensure the response data is an array
            setResults(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Set results to empty array in case of error
            setResults([]);
        }
    };

    return (
        <Box display="flex">
            <Sidebar /> {/* Add the Sidebar component */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Search Hospitality Services & Facilities
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <Box display="flex" gap={2} flexDirection="column" maxWidth={600} margin="auto">
                        <TextField
                            label="Search Service"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            fullWidth
                        />
                        <Select
                            label="Service Type"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Select Service Type</em>
                            </MenuItem>
                            <MenuItem value="Dining">Dining</MenuItem>
                            <MenuItem value="Delivery">Delivery</MenuItem>
                            <MenuItem value="Catering">Catering</MenuItem>
                        </Select>
                        <TextField
                            label="Location"
                            variant="outlined"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                backgroundColor: '#BDC3C7', // Button color
                                '&:hover': {
                                    backgroundColor: '#AAB7B8', // Darker shade on hover
                                }
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </form>

                <Box marginTop={4}>
                    {results.length ? (
                        results.map((service) => (
                            <Card key={service.id} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{service.name}</Typography>
                                    <Typography>{service.description}</Typography>
                                    <Typography>Price: ${service.price}</Typography>
                                    <Typography>Location: {service.location}</Typography>
                                    <Typography>Availability: {service.availability}</Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1">No results found</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default SearchServices;
