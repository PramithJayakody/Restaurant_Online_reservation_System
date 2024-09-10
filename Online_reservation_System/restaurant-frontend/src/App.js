import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ReservationForm from './components/ReservationForm'; // Import ReservationForm
import SearchServices from './components/SearchServices';
import UserProfile from './components/UserProfile';
import ReservationList from './components/ReservationList';
import AllReservations from './components/AllReservations';
import PastReservations from './components/PastReservations';
import AddStaff from './components/AddStaff';
import ManageStaff from './components/ManageStaff';
import UpdateStaff from './components/UpdateStaff';

const App = () => {
    return (
        <Router>
            <div>
                
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/reservation" element={<ReservationForm />} /> {/* Add ReservationForm route */}
                    <Route path="/search" element={<SearchServices />}/>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/reservationlist" element={<ReservationList />} />
                    <Route path="/all-reservations" element={<AllReservations />} />
                    <Route path="/past-reservations" element={<PastReservations />} />
                    <Route path="/add-staff" element={<AddStaff />} />
                    <Route path="/manage-staff" element={<ManageStaff />} />
                    <Route path="/update-staff" element={<UpdateStaff />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
