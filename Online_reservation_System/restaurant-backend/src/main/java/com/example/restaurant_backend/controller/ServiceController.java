package com.example.restaurant_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.restaurant_backend.model.RestaurantService;
import com.example.restaurant_backend.service.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping("/search")
    public List<RestaurantService> searchServices(
        @RequestParam(required = false, defaultValue = "") String query,
        @RequestParam(required = false, defaultValue = "") String type,
        @RequestParam(required = false, defaultValue = "") String location) {
        
        return serviceService.searchServices(query, type, location);
    }
}
