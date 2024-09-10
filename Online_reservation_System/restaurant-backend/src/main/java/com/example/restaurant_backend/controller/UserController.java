package com.example.restaurant_backend.controller;

import com.example.restaurant_backend.model.User;
import com.example.restaurant_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    // Find a user by username
    @GetMapping("/find/{username}")
    public ResponseEntity<?> findUser(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // Login endpoint to authenticate user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            // Assuming the user is successfully authenticated
            return ResponseEntity.ok(existingUser);
        } else {
            // Authentication failed
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User existingUser = userService.findById(id);
        if (existingUser == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword()); // Hash password in real application
        userService.save(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    // Admin: Add new staff member
    @PostMapping("/staff/add")
    public ResponseEntity<?> addStaff(@Valid @RequestBody User user) {
        try {
            // Set the staff role
            user.setRole("staff");
    
            // Save staff to the database
            User newUser = userService.save(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    

    // Admin: Get all staff members
    @GetMapping("/staff/all")
    public ResponseEntity<?> getAllStaff() {
        List<User> staffUsers = userService.findAllStaff();  // Custom method to get all staff
        return ResponseEntity.ok(staffUsers);
    }

    // Admin: Delete a staff member by ID
    @DeleteMapping("/staff/delete/{id}")
    public ResponseEntity<?> deleteStaffMember(@PathVariable Long id) {
        boolean isDeleted = userService.deleteById(id);
        if (isDeleted) {
            return ResponseEntity.ok("Staff member deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Staff member not found");
        }
    }

    // Admin: Update staff member details
    @PutMapping("/staff/update/{id}")
    public ResponseEntity<?> updateStaffMember(@PathVariable Long id, @RequestBody User updatedStaff) {
        User existingStaff = userService.findById(id);
        if (existingStaff == null) {
            return ResponseEntity.status(404).body("Staff member not found");
        }
        existingStaff.setUsername(updatedStaff.getUsername());
        existingStaff.setPassword(updatedStaff.getPassword());  // Hash password in real application
        userService.save(existingStaff);
        return ResponseEntity.ok(existingStaff);
    }
}
