package com.example.restaurant_backend.controller;

import com.example.restaurant_backend.model.Reservation;
import com.example.restaurant_backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.saveReservation(reservation);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getUserReservations(@PathVariable Long userId) {
        return reservationService.getReservationsByUserId(userId);
    }

    @PutMapping("/{id}/accept")
    public Reservation acceptReservation(@PathVariable Long id) {
        return reservationService.updateReservationStatus(id, "accepted");
    }

   
    @PutMapping("/{id}/reject")
    public Reservation rejectReservation(@PathVariable Long id) {
        return reservationService.updateReservationStatus(id, "rejected");
    }
}
