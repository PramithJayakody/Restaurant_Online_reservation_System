package com.example.restaurant_backend.model;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.restaurant_backend.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.security.Provider.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Configuration
public class DataLoader {

    @Autowired
    private ServiceRepository serviceRepository;

    @Bean
    public CommandLineRunner loadData() {
        return args -> {
            List<RestaurantService> services = Arrays.asList(
                // new RestaurantService("Dining", "Dining", "Fine dining experience", 50.0, "Colombo", "Available"),
                // new RestaurantService("Delivery", "Delivery", "Food delivery to your doorstep", 30.0, "Colombo", "Available"),
                // new RestaurantService("Catering", "Catering", "Catering for events", 100.0, "Kandy", "Not Available"),
                // new RestaurantService("Events", "Events", "Special events hosting", 150.0, "Galle", "Available")
            );

            serviceRepository.saveAll(services);
        };
    }
}
