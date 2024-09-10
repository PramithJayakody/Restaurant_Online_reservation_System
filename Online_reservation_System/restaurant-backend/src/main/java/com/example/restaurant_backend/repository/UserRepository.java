package com.example.restaurant_backend.repository;

import com.example.restaurant_backend.model.User;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findAllByRole(String role);
}