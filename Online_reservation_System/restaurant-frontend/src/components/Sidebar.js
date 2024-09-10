import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider, Drawer, IconButton, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventIcon from '@mui/icons-material/Event';

const Sidebar = () => {
    const navigate = useNavigate(); // Hook for navigation
    const userRole = localStorage.getItem('role'); // Example: 'admin', 'user', or 'staff'
    const isAdmin = userRole === 'admin'; // Check if the user role is admin
    const isStaff = userRole === 'staff'; // Check if the user role is staff

    const handleLogout = () => {
        // Clear all user-related data
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');

        // Redirect to the login page
        navigate('/', { replace: true });
    };

    return (
        <Drawer
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    backgroundColor: '#2C3E50', // Dark background for the sidebar
                    color: '#ECF0F1', // Light text color
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" component="div" gutterBottom>
                        Navigation
                    </Typography>
                    <Tooltip title="Close Sidebar">
                        <IconButton>
                            <MenuIcon sx={{ color: '#ECF0F1' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{ backgroundColor: '#BDC3C7' }} />

                <List>
                    {/* Common Links */}
                    <ListItem button component={Link} to="/profile" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                        <PersonIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Profile" />
                    </ListItem>

                    {/* Admin-specific links */}
                    {isAdmin && (
                        <>
                            <ListItem button component={Link} to="/reservationlist" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <EventBusyIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Pending Reservations" />
                            </ListItem>
                            <ListItem button component={Link} to="/all-reservations" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="All Reservations" />
                            </ListItem>

                            {/* Staff Management Links */}
                            <ListItem button component={Link} to="/add-staff" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Add Staff" />
                            </ListItem>
                            <ListItem button component={Link} to="/manage-staff" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Manage Staff" />
                            </ListItem>
                        </>
                    )}

                    {/* Staff-specific links */}
                    {isStaff && (
                        <>
                            <ListItem button component={Link} to="/all-reservations" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="All Reservations" />
                            </ListItem>
                        </>
                    )}

                    {/* Regular User Links */}
                    {!isAdmin && !isStaff && (
                        <>
                            <ListItem button component={Link} to="/reservation" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <EventIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Make a Reservation" />
                            </ListItem>
                            <ListItem button component={Link} to="/past-reservations" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Past Reservations" />
                            </ListItem>
                            <ListItem button component={Link} to="/search" sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>
                                <ListIcon sx={{ mr: 2 }} />
                                <ListItemText primary="search services" />
                            </ListItem>
                        </>
                    )}

                    {/* Logout */}
                    <ListItem button onClick={handleLogout} sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#C0392B' } }}>
                        <ListIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 2, marginTop: 1 }}
            >
                <Box
                    component="img"
                    src="/logo-no-background.png"
                    alt="Logo"
                    sx={{ width: '200px' }}
                />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
