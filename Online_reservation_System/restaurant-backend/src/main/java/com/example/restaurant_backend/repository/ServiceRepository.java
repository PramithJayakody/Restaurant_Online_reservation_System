package com.example.restaurant_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurant_backend.model.RestaurantService;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<RestaurantService, Long> {
    
    List<RestaurantService> findByServiceNameContainingAndServiceTypeContainingAndLocationContaining(
        String serviceName, String serviceType, String location);
}
