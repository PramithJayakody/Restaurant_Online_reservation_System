package com.example.restaurant_backend.service;


import com.example.restaurant_backend.model.User;
import com.example.restaurant_backend.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllStaff() {
        // Custom query logic to return all staff members
        return userRepository.findAllByRole("staff");
    }

    public boolean deleteById(Long id) {
        // Logic to delete user by ID
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
